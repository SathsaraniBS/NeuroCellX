# server/routers/evaluate.py
import os
import io
import joblib
import numpy as np
import pandas as pd
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Header
from fastapi.responses import JSONResponse, Response
from sqlalchemy.orm import Session
from sqlalchemy import text
from database import get_db
from fastapi import Depends
from typing import Optional
from jose import jwt, JWTError
from pydantic import BaseModel

try:
    import tensorflow as tf
except ImportError:
    tf = None

router = APIRouter(prefix="/api/ml", tags=["Evaluation"])

BASE_DIR    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")

SECRET_KEY = "voltiq-secret-key-change-in-production"
ALGORITHM  = "HS256"

# ─────────────────────────────────────────────────────────────
#  Auth Helper
# ─────────────────────────────────────────────────────────────
def get_current_user_id(authorization: Optional[str] = Header(None)) -> Optional[int]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ")[1]
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        return int(user_id) if user_id else None
    except JWTError:
        return None

# ─────────────────────────────────────────────────────────────
#  Model Loading
# ─────────────────────────────────────────────────────────────
models = {}

def load_models_for_eval():
    try:
        models['random_forest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ RF eval: {e}")

    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
    except Exception as e:
        print(f"❌ NB eval: {e}")

    try:
        models['svr'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ SVR eval: {e}")

    try:
        models['gru_randomforest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ GRU eval: {e}")

    if tf:
        try:
            models['lstm_transformer'] = {
                'soh':    tf.keras.models.load_model(
                    os.path.join(MODELS_ROOT, "lstm+transformer", "soh_model (3).keras")),
                'rul':    tf.keras.models.load_model(
                    os.path.join(MODELS_ROOT, "lstm+transformer", "rul_model (3).keras")),
                'scaler': joblib.load(
                    os.path.join(MODELS_ROOT, "lstm+transformer", "feature_scaler (3).joblib"))
            }
        except Exception as e:
            print(f"❌ LSTM eval: {e}")

load_models_for_eval()

# ─────────────────────────────────────────────────────────────
#  Metric Helpers
# ─────────────────────────────────────────────────────────────
def calc_r2(y_true, y_pred):
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    ss_res = np.sum((y_true - y_pred) ** 2)
    ss_tot = np.sum((y_true - np.mean(y_true)) ** 2)
    return 1 - (ss_res / ss_tot) if ss_tot != 0 else 0.0

def calc_mae(y_true, y_pred):
    return float(np.mean(np.abs(np.array(y_true, dtype=float) - np.array(y_pred, dtype=float))))

def calc_mape(y_true, y_pred):
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    mask   = y_true != 0
    return float(np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100) if mask.any() else 0.0

def calc_smape(y_true, y_pred):
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    denom  = (np.abs(y_true) + np.abs(y_pred)) / 2
    mask   = denom != 0
    return float(np.mean(np.abs(y_true[mask] - y_pred[mask]) / denom[mask]) * 100) if mask.any() else 0.0

def calc_accuracy(y_true, y_pred, tol=5.0):
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    return float(np.mean(np.abs(y_true - y_pred) <= tol) * 100)

def get_grade(r2, mae, mape):
    if r2 >= 0.95 and mae <= 3.0  and mape <= 5.0:  return "A+", "Excellent"
    if r2 >= 0.90 and mae <= 5.0  and mape <= 10.0: return "A",  "Very Good"
    if r2 >= 0.80 and mae <= 8.0  and mape <= 15.0: return "B",  "Good"
    if r2 >= 0.70 and mae <= 12.0 and mape <= 25.0: return "C",  "Fair"
    if r2 >= 0.50:                                   return "D",  "Poor"
    return "F", "Very Poor"

def is_keras_model(m): return hasattr(m, 'layers')

def predict_batch(model_key, features_array):
    m = models.get(model_key)
    if not m:
        raise ValueError(f"Model '{model_key}' not loaded")

    results = []
    SOH_MAP = {"Critical":55.0,"Poor":62.0,"Fair":75.0,"Good":85.0,"Excellent":93.0}
    RUL_MAP = {"End":5.0,"Critical":15.0,"Late":45.0,"Mid":75.0,"Early":145.0}

    import re

    for feat in features_array:
        if model_key == 'lstm_transformer':
            scaled   = m['scaler'].transform([feat])
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
            soh_raw  = float(np.squeeze(m['soh'].predict(reshaped, verbose=0)))
            rul_raw  = float(np.squeeze(m['rul'].predict(reshaped, verbose=0)))
            soh = max(50.0, min(100.0, 2.449 * (-soh_raw) + 77.18))
            rul = 5.0 + (min(15.0, abs(rul_raw)) / 15.0) * 155.0

        elif model_key == 'gru_randomforest':
            scaled = m['scaler'].transform([feat])
            if is_keras_model(m['soh']):
                reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
                soh = float(np.squeeze(m['soh'].predict(reshaped, verbose=0)))
                rul_raw = float(np.squeeze(m['rul'].predict(reshaped, verbose=0)))
            else:
                soh = float(m['soh'].predict(scaled)[0])
                rul_raw = float(m['rul'].predict(scaled)[0])
            v = rul_raw
            rul = min(max(0.0, v + 0.05) / 0.50 * 150.0, 300.0)
            soh = abs(soh)

        elif model_key == 'naive_bayes':
            soh_raw = str(m['soh'].predict([feat])[0]).strip()
            rul_raw = str(m['rul'].predict([feat])[0]).strip()
            sm = re.search(r"np\.str_\('(.+?)'\)", soh_raw)
            rm = re.search(r"np\.str_\('(.+?)'\)", rul_raw)
            if sm: soh_raw = sm.group(1)
            if rm: rul_raw = rm.group(1)
            soh = SOH_MAP.get(soh_raw, 62.0)
            rul = RUL_MAP.get(rul_raw, 5.0)

        else:
            scaler  = m.get('scaler')
            if scaler:
                scaled  = scaler.transform([feat])
                soh_raw = m['soh'].predict(scaled)[0]
                rul_raw = m['rul'].predict(scaled)[0]
            else:
                soh_raw = m['soh'].predict([feat])[0]
                rul_raw = m['rul'].predict([feat])[0]
            soh = abs(float(soh_raw))
            rul_v = abs(float(rul_raw))
            rul = rul_v * 8.0 if rul_v <= 1.0 else rul_v

        results.append((soh, rul))

    return results

# ─────────────────────────────────────────────────────────────
#  CREATE TABLE (call once at startup)
# ─────────────────────────────────────────────────────────────
def create_evaluation_table(db: Session):
    try:
        db.execute(text("""
            CREATE TABLE IF NOT EXISTS evaluation_results (
                id              SERIAL PRIMARY KEY,
                user_id         INTEGER,
                model_key       VARCHAR(50),
                dataset_name    VARCHAR(200),
                total_rows      INTEGER,

                soh_accuracy    FLOAT,
                soh_r2          FLOAT,
                soh_mae         FLOAT,
                soh_mape        FLOAT,
                soh_smape       FLOAT,
                soh_grade       VARCHAR(5),
                soh_grade_label VARCHAR(20),

                rul_accuracy    FLOAT,
                rul_r2          FLOAT,
                rul_mae         FLOAT,
                rul_mape        FLOAT,
                rul_smape       FLOAT,
                rul_grade       VARCHAR(5),
                rul_grade_label VARCHAR(20),

                has_soh_true    BOOLEAN DEFAULT FALSE,
                has_rul_true    BOOLEAN DEFAULT FALSE,
                created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """))
        db.commit()
        print("✅ evaluation_results table ready")
    except Exception as e:
        print(f"⚠️ Table create: {e}")
        db.rollback()

# ─────────────────────────────────────────────────────────────
#  POST /api/ml/evaluate — Run evaluation
# ─────────────────────────────────────────────────────────────
@router.post("/evaluate")
async def evaluate_model(
    file:      UploadFile = File(...),
    model_key: str        = Form(...),
    db: Session           = Depends(get_db),
):
    if model_key not in models:
        raise HTTPException(status_code=400, detail=f"Model '{model_key}' not loaded.")
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    # Read CSV
    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read CSV: {e}")

    # Column mapping
    INPUT_COLS = ['Capacity', 'Voltage', 'Current', 'Temperature', 'CycleCount']
    col_map = {}
    for req in INPUT_COLS:
        for col in df.columns:
            if col.lower().replace(' ', '').replace('_', '') == req.lower():
                col_map[req] = col
                break

    missing = [c for c in INPUT_COLS if c not in col_map]
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing columns: {missing}. Found: {list(df.columns)}")

    soh_true_col = next((c for c in df.columns if c.lower() in ['soh','soh_true','state_of_health','soh_result']), None)
    rul_true_col = next((c for c in df.columns if c.lower() in ['rul','rul_true','remaining_useful_life','rul_result']), None)

    # Prepare features
    try:
        features = [[float(v) for v in row] for row in df[[col_map[c] for c in INPUT_COLS]].values.tolist()]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Data error: {e}")

    if len(features) == 0:
        raise HTTPException(status_code=400, detail="No data rows found.")

    features = features[:500]

    # Predict
    try:
        predictions = predict_batch(model_key, features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}")

    soh_preds = [p[0] for p in predictions]
    rul_preds = [p[1] for p in predictions]

    # Metrics
    metrics       = {}
    has_soh_true  = soh_true_col is not None
    has_rul_true  = rul_true_col is not None

    if has_soh_true:
        try:
            soh_true = df[soh_true_col].astype(float).tolist()[:len(soh_preds)]
            g, gl    = get_grade(calc_r2(soh_true, soh_preds), calc_mae(soh_true, soh_preds), calc_mape(soh_true, soh_preds))
            metrics['soh'] = {
                "accuracy":    round(calc_accuracy(soh_true, soh_preds), 2),
                "r2":          round(calc_r2(soh_true, soh_preds), 4),
                "mae":         round(calc_mae(soh_true, soh_preds), 4),
                "mape":        round(calc_mape(soh_true, soh_preds), 4),
                "smape":       round(calc_smape(soh_true, soh_preds), 4),
                "grade":       g,
                "grade_label": gl,
            }
        except Exception as e:
            print(f"SOH metrics error: {e}")

    if has_rul_true:
        try:
            rul_true = df[rul_true_col].astype(float).tolist()[:len(rul_preds)]
            g, gl    = get_grade(calc_r2(rul_true, rul_preds), calc_mae(rul_true, rul_preds), calc_mape(rul_true, rul_preds))
            metrics['rul'] = {
                "accuracy":    round(calc_accuracy(rul_true, rul_preds, tol=10.0), 2),
                "r2":          round(calc_r2(rul_true, rul_preds), 4),
                "mae":         round(calc_mae(rul_true, rul_preds), 4),
                "mape":        round(calc_mape(rul_true, rul_preds), 4),
                "smape":       round(calc_smape(rul_true, rul_preds), 4),
                "grade":       g,
                "grade_label": gl,
            }
        except Exception as e:
            print(f"RUL metrics error: {e}")

    # Sample rows
    sample_rows = []
    for i in range(min(10, len(features))):
        row = {
            "index": i+1, "capacity": features[i][0], "voltage": features[i][1],
            "current": features[i][2], "temp": features[i][3], "cycles": features[i][4],
            "soh_pred": round(soh_preds[i], 2), "rul_pred": round(rul_preds[i], 2),
        }
        if soh_true_col and i < len(df):
            try: row["soh_true"] = float(df[soh_true_col].iloc[i])
            except: pass
        if rul_true_col and i < len(df):
            try: row["rul_true"] = float(df[rul_true_col].iloc[i])
            except: pass
        sample_rows.append(row)

    return JSONResponse({
        "status":          "success",
        "model_key":       model_key,
        "dataset_name":    file.filename,
        "total_rows":      len(features),
        "has_soh_true":    has_soh_true,
        "has_rul_true":    has_rul_true,
        "metrics":         metrics,
        "sample":          sample_rows,
        "soh_predictions": [round(v, 2) for v in soh_preds],
        "rul_predictions": [round(v, 2) for v in rul_preds],
    })


# ─────────────────────────────────────────────────────────────
#  POST /api/ml/evaluate/save — Save result to DB
# ─────────────────────────────────────────────────────────────
class SaveEvalRequest(BaseModel):
    model_key:      str
    dataset_name:   str
    total_rows:     int
    has_soh_true:   bool = False
    has_rul_true:   bool = False
    soh_accuracy:   Optional[float] = None
    soh_r2:         Optional[float] = None
    soh_mae:        Optional[float] = None
    soh_mape:       Optional[float] = None
    soh_smape:      Optional[float] = None
    soh_grade:      Optional[str]   = None
    soh_grade_label:Optional[str]   = None
    rul_accuracy:   Optional[float] = None
    rul_r2:         Optional[float] = None
    rul_mae:        Optional[float] = None
    rul_mape:       Optional[float] = None
    rul_smape:      Optional[float] = None
    rul_grade:      Optional[str]   = None
    rul_grade_label:Optional[str]   = None

@router.post("/evaluate/save")
def save_evaluation(
    body: SaveEvalRequest,
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)

    # Create table if not exists
    create_evaluation_table(db)

    try:
        db.execute(text("""
            INSERT INTO evaluation_results (
                user_id, model_key, dataset_name, total_rows,
                soh_accuracy, soh_r2, soh_mae, soh_mape, soh_smape, soh_grade, soh_grade_label,
                rul_accuracy, rul_r2, rul_mae, rul_mape, rul_smape, rul_grade, rul_grade_label,
                has_soh_true, has_rul_true
            ) VALUES (
                :user_id, :model_key, :dataset_name, :total_rows,
                :soh_accuracy, :soh_r2, :soh_mae, :soh_mape, :soh_smape, :soh_grade, :soh_grade_label,
                :rul_accuracy, :rul_r2, :rul_mae, :rul_mape, :rul_smape, :rul_grade, :rul_grade_label,
                :has_soh_true, :has_rul_true
            )
        """), {
            "user_id":       user_id,
            "model_key":     body.model_key,
            "dataset_name":  body.dataset_name,
            "total_rows":    body.total_rows,
            "soh_accuracy":  body.soh_accuracy,
            "soh_r2":        body.soh_r2,
            "soh_mae":       body.soh_mae,
            "soh_mape":      body.soh_mape,
            "soh_smape":     body.soh_smape,
            "soh_grade":     body.soh_grade,
            "soh_grade_label": body.soh_grade_label,
            "rul_accuracy":  body.rul_accuracy,
            "rul_r2":        body.rul_r2,
            "rul_mae":       body.rul_mae,
            "rul_mape":      body.rul_mape,
            "rul_smape":     body.rul_smape,
            "rul_grade":     body.rul_grade,
            "rul_grade_label": body.rul_grade_label,
            "has_soh_true":  body.has_soh_true,
            "has_rul_true":  body.has_rul_true,
        })
        db.commit()
        return {"status": "success", "message": "Evaluation saved successfully!"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────
#  GET /api/ml/evaluate/history — Get saved evaluations
# ─────────────────────────────────────────────────────────────
@router.get("/evaluate/history")
def get_evaluation_history(
    db: Session = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    user_id = get_current_user_id(authorization)
    create_evaluation_table(db)

    try:
        # Filter by user if logged in, else return all
        if user_id:
            rows = db.execute(text("""
                SELECT * FROM evaluation_results
                WHERE user_id = :uid
                ORDER BY created_at DESC
                LIMIT 20
            """), {"uid": user_id}).fetchall()
        else:
            rows = db.execute(text("""
                SELECT * FROM evaluation_results
                ORDER BY created_at DESC
                LIMIT 20
            """)).fetchall()

        return {
            "status": "success",
            "count":  len(rows),
            "results": [dict(r._mapping) for r in rows]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────
#  DELETE /api/ml/evaluate/{id} — Delete saved evaluation
# ─────────────────────────────────────────────────────────────
@router.delete("/evaluate/{eval_id}")
def delete_evaluation(
    eval_id: int,
    db: Session = Depends(get_db),
):
    try:
        existing = db.execute(
            text("SELECT 1 FROM evaluation_results WHERE id = :id"),
            {"id": eval_id}
        ).scalar()
        if not existing:
            raise HTTPException(status_code=404, detail="Evaluation not found")
        db.execute(text("DELETE FROM evaluation_results WHERE id = :id"), {"id": eval_id})
        db.commit()
        return {"status": "success", "message": "Deleted"}
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────────────────────────
#  GET /api/ml/evaluate/sample-csv
# ─────────────────────────────────────────────────────────────
@router.get("/evaluate/sample-csv")
def get_sample_csv():
    csv_content = """Capacity,Voltage,Current,Temperature,CycleCount,SOH,RUL
2.0,4.1,1.5,24.0,10,94.98,76
1.9,4.05,1.4,25.0,25,92.5,68
1.8,4.0,1.3,26.0,45,89.2,55
1.7,3.95,1.2,28.0,60,85.1,42
1.6,3.85,1.1,30.0,80,80.3,30
1.5,3.75,1.0,33.0,100,75.8,20
1.4,3.65,0.9,37.0,120,70.2,12
1.3,3.55,0.85,40.0,135,65.5,8
1.2,3.45,0.8,42.0,150,61.7,5
1.15,3.40,0.75,44.0,160,58.2,3"""
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sample_battery_data.csv"}
    )