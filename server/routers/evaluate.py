# server/routers/evaluate.py
import os
import io
import joblib
import numpy as np
import pandas as pd
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse

try:
    import tensorflow as tf
except ImportError:
    tf = None

router = APIRouter(prefix="/api/ml", tags=["Evaluation"])

BASE_DIR    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")

# ─────────────────────────────────────────────────────────────
#  Reuse loaded models from newpredict.py
#  (import models dict if possible, else reload here)
# ─────────────────────────────────────────────────────────────
models = {}

def load_models_for_eval():
    """Load all models for evaluation (same as newpredict.py)"""
    try:
        models['random_forest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ RF eval load: {e}")

    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
    except Exception as e:
        print(f"❌ NB eval load: {e}")

    try:
        models['svr'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ SVR eval load: {e}")

    try:
        models['gru_randomforest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
    except Exception as e:
        print(f"❌ GRU eval load: {e}")

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
            print(f"❌ LSTM eval load: {e}")

load_models_for_eval()


# ─────────────────────────────────────────────────────────────
#  Metric Calculations
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
    if not mask.any():
        return 0.0
    return float(np.mean(np.abs((y_true[mask] - y_pred[mask]) / y_true[mask])) * 100)

def calc_smape(y_true, y_pred):
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    denom  = (np.abs(y_true) + np.abs(y_pred)) / 2
    mask   = denom != 0
    if not mask.any():
        return 0.0
    return float(np.mean(np.abs(y_true[mask] - y_pred[mask]) / denom[mask]) * 100)

def calc_accuracy(y_true, y_pred, tolerance=5.0):
    """% of predictions within ±tolerance of true value"""
    y_true = np.array(y_true, dtype=float)
    y_pred = np.array(y_pred, dtype=float)
    within = np.abs(y_true - y_pred) <= tolerance
    return float(np.mean(within) * 100)

def get_grade(r2, mae, mape):
    """Grade based on R², MAE, MAPE"""
    if r2 >= 0.95 and mae <= 3.0 and mape <= 5.0:
        return "A+", "Excellent", "#00ff88"
    elif r2 >= 0.90 and mae <= 5.0 and mape <= 10.0:
        return "A",  "Very Good", "#22c55e"
    elif r2 >= 0.80 and mae <= 8.0 and mape <= 15.0:
        return "B",  "Good",      "#84cc16"
    elif r2 >= 0.70 and mae <= 12.0 and mape <= 25.0:
        return "C",  "Fair",      "#eab308"
    elif r2 >= 0.50:
        return "D",  "Poor",      "#f97316"
    else:
        return "F",  "Very Poor", "#ef4444"

def is_keras_model(m):
    return hasattr(m, 'layers')

def predict_batch(model_key, features_array):
    """
    Run batch predictions for given model.
    Returns list of (soh_pred, rul_pred) tuples.
    """
    m = models.get(model_key)
    if not m:
        raise ValueError(f"Model '{model_key}' not loaded")

    results = []

    if model_key == 'lstm_transformer':
        scaler = m['scaler']
        for feat in features_array:
            scaled   = scaler.transform([feat])
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
            soh_raw  = float(np.squeeze(m['soh'].predict(reshaped, verbose=0)))
            rul_raw  = float(np.squeeze(m['rul'].predict(reshaped, verbose=0)))
            # Apply LSTM calibration
            soh = max(50.0, min(100.0, 2.449 * (-soh_raw) + 77.18))
            raw_abs = abs(rul_raw)
            rul = 5.0 + (min(15.0, raw_abs) / 15.0) * 155.0
            results.append((soh, rul))

    elif model_key == 'gru_randomforest':
        scaler = m['scaler']
        for feat in features_array:
            scaled  = scaler.transform([feat])
            soh_m   = m['soh']
            rul_m   = m['rul']
            if is_keras_model(soh_m):
                reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
                soh = float(np.squeeze(soh_m.predict(reshaped, verbose=0)))
                rul_raw = float(np.squeeze(rul_m.predict(reshaped, verbose=0)))
            else:
                soh = float(soh_m.predict(scaled)[0])
                rul_raw = float(rul_m.predict(scaled)[0])
            v = rul_raw
            shifted = max(0.0, v + 0.05)
            rul = min((shifted / 0.50) * 150.0, 300.0)
            results.append((abs(soh), rul))

    elif model_key == 'naive_bayes':
        SOH_MAP = {"Critical": 55.0, "Poor": 62.0, "Fair": 75.0, "Good": 85.0, "Excellent": 93.0}
        RUL_MAP = {"End": 5.0, "Critical": 15.0, "Late": 45.0, "Mid": 75.0, "Early": 145.0}
        for feat in features_array:
            soh_raw = str(m['soh'].predict([feat])[0]).strip()
            rul_raw = str(m['rul'].predict([feat])[0]).strip()
            import re
            sm = re.search(r"np\.str_\('(.+?)'\)", soh_raw)
            rm = re.search(r"np\.str_\('(.+?)'\)", rul_raw)
            if sm: soh_raw = sm.group(1)
            if rm: rul_raw = rm.group(1)
            soh = SOH_MAP.get(soh_raw, 62.0)
            rul = RUL_MAP.get(rul_raw, 5.0)
            results.append((soh, rul))

    else:
        # Random Forest / SVR
        scaler = m.get('scaler')
        for feat in features_array:
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
#  POST /api/ml/evaluate
#  Accepts: CSV file + model_key form field
# ─────────────────────────────────────────────────────────────
@router.post("/evaluate")
async def evaluate_model(
    file:      UploadFile = File(...),
    model_key: str        = Form(...),
):
    # ── 1. Validate model ─────────────────────────────────────
    if model_key not in models:
        raise HTTPException(
            status_code=400,
            detail=f"Model '{model_key}' not loaded. Available: {list(models.keys())}"
        )

    # ── 2. Read CSV ───────────────────────────────────────────
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="Please upload a CSV file.")

    try:
        contents = await file.read()
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read CSV: {str(e)}")

    # ── 3. Validate columns ───────────────────────────────────
    # Required input columns
    INPUT_COLS = ['Capacity', 'Voltage', 'Current', 'Temperature', 'CycleCount']

    # Flexible column name matching (case-insensitive)
    col_map = {}
    for req in INPUT_COLS:
        for col in df.columns:
            if col.lower().replace(' ', '').replace('_', '') == req.lower():
                col_map[req] = col
                break

    missing_inputs = [c for c in INPUT_COLS if c not in col_map]
    if missing_inputs:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing_inputs}. "
                   f"CSV must have: {INPUT_COLS}. Found: {list(df.columns)}"
        )

    # Check for true label columns (optional but needed for metrics)
    has_soh_true = any(c.lower() in ['soh', 'soh_true', 'state_of_health', 'soh_result'] for c in df.columns)
    has_rul_true = any(c.lower() in ['rul', 'rul_true', 'remaining_useful_life', 'rul_result'] for c in df.columns)

    soh_true_col = next((c for c in df.columns if c.lower() in ['soh', 'soh_true', 'state_of_health', 'soh_result']), None)
    rul_true_col = next((c for c in df.columns if c.lower() in ['rul', 'rul_true', 'remaining_useful_life', 'rul_result']), None)

    # ── 4. Prepare features ───────────────────────────────────
    try:
        features = df[[col_map[c] for c in INPUT_COLS]].values.tolist()
        # Convert to float lists
        features = [[float(v) for v in row] for row in features]
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Data conversion error: {str(e)}")

    if len(features) == 0:
        raise HTTPException(status_code=400, detail="CSV has no data rows.")

    if len(features) > 500:
        features = features[:500]  # Limit to 500 rows

    # ── 5. Run predictions ────────────────────────────────────
    try:
        predictions = predict_batch(model_key, features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

    soh_preds = [p[0] for p in predictions]
    rul_preds = [p[1] for p in predictions]

    # ── 6. Calculate metrics ──────────────────────────────────
    metrics = {}

    if has_soh_true and soh_true_col:
        try:
            soh_true = df[soh_true_col].astype(float).tolist()[:len(soh_preds)]
            metrics['soh'] = {
                "accuracy": round(calc_accuracy(soh_true, soh_preds), 2),
                "r2":       round(calc_r2(soh_true, soh_preds), 4),
                "mae":      round(calc_mae(soh_true, soh_preds), 4),
                "mape":     round(calc_mape(soh_true, soh_preds), 4),
                "smape":    round(calc_smape(soh_true, soh_preds), 4),
            }
            grade_letter, grade_label, grade_color = get_grade(
                metrics['soh']['r2'],
                metrics['soh']['mae'],
                metrics['soh']['mape']
            )
            metrics['soh']['grade']       = grade_letter
            metrics['soh']['grade_label'] = grade_label
            metrics['soh']['grade_color'] = grade_color
        except Exception as e:
            print(f"SOH metrics error: {e}")

    if has_rul_true and rul_true_col:
        try:
            rul_true = df[rul_true_col].astype(float).tolist()[:len(rul_preds)]
            metrics['rul'] = {
                "accuracy": round(calc_accuracy(rul_true, rul_preds, tolerance=10.0), 2),
                "r2":       round(calc_r2(rul_true, rul_preds), 4),
                "mae":      round(calc_mae(rul_true, rul_preds), 4),
                "mape":     round(calc_mape(rul_true, rul_preds), 4),
                "smape":    round(calc_smape(rul_true, rul_preds), 4),
            }
            grade_letter, grade_label, grade_color = get_grade(
                metrics['rul']['r2'],
                metrics['rul']['mae'],
                metrics['rul']['mape']
            )
            metrics['rul']['grade']       = grade_letter
            metrics['rul']['grade_label'] = grade_label
            metrics['rul']['grade_color'] = grade_color
        except Exception as e:
            print(f"RUL metrics error: {e}")

    # ── 7. Sample predictions (first 10 rows) ─────────────────
    sample_rows = []
    for i in range(min(10, len(features))):
        row = {
            "index":    i + 1,
            "capacity": features[i][0],
            "voltage":  features[i][1],
            "current":  features[i][2],
            "temp":     features[i][3],
            "cycles":   features[i][4],
            "soh_pred": round(soh_preds[i], 2),
            "rul_pred": round(rul_preds[i], 2),
        }
        if soh_true_col and i < len(df):
            try:
                row["soh_true"] = float(df[soh_true_col].iloc[i])
            except:
                pass
        if rul_true_col and i < len(df):
            try:
                row["rul_true"] = float(df[rul_true_col].iloc[i])
            except:
                pass
        sample_rows.append(row)

    return JSONResponse({
        "status":         "success",
        "model_key":      model_key,
        "total_rows":     len(features),
        "has_soh_true":   has_soh_true,
        "has_rul_true":   has_rul_true,
        "metrics":        metrics,
        "sample":         sample_rows,
        "soh_predictions":[ round(v, 2) for v in soh_preds ],
        "rul_predictions":[ round(v, 2) for v in rul_preds ],
    })


# ─────────────────────────────────────────────────────────────
#  GET /api/ml/evaluate/sample-csv
#  Returns a sample CSV template for download
# ─────────────────────────────────────────────────────────────
@router.get("/evaluate/sample-csv")
def get_sample_csv():
    """Return sample CSV content"""
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
    from fastapi.responses import Response
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=sample_battery_data.csv"}
    )