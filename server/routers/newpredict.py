import os
import joblib
import numpy as np
import re
from fastapi import APIRouter

try:
    import tensorflow as tf
except ImportError:
    tf = None
    print("⚠️ TensorFlow not found.")

router = APIRouter(prefix="/api/ml", tags=["Prediction"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")
models = {}

def load_all_models():
    try:
        models['random_forest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
        print("✅ Random Forest Loaded")
    except Exception as e: print(f"❌ RF Failed: {e}")

    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
        print("✅ Naive Bayes Loaded")
    except Exception as e: print(f"❌ NB Failed: {e}")

    try:
        models['svr'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
        print("✅ SVR Loaded")
    except Exception as e: print(f"❌ SVR Failed: {e}")

    try:
        models['gru_randomforest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
        print("✅ GRU+RF Loaded")
    except Exception as e: print(f"❌ GRU+RF Failed: {e}")

    if tf:
        try:
            models['lstm_transformer'] = {
                'soh':    tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "soh_model (3).keras")),
                'rul':    tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "rul_model (3).keras")),
                'scaler': joblib.load(os.path.join(MODELS_ROOT, "lstm+transformer", "feature_scaler (3).joblib"))
            }
            print("✅ LSTM+Transformer Loaded")
        except Exception as e: print(f"❌ LSTM Failed: {e}")

load_all_models()


def is_keras_model(model):
    return hasattr(model, 'layers')


def clean_prediction(value):
    """String labels → float numbers (Naive Bayes fix)"""
    val_str = str(value).strip()

    # np.str_('Poor') format handle
    match = re.search(r"np\.str_\('(.+?)'\)", val_str)
    if match:
        val_str = match.group(1)

    # SOH + RUL label mapping
    label_map = {
        # SOH labels
        "Poor": 62.0,
        "Moderate": 78.0,
        "Healthy": 93.0,
        "Good": 88.0,
        # RUL labels
        "Low": 18.0,
        "Medium": 75.0,
        "High": 145.0,
    }

    if val_str in label_map:
        return label_map[val_str]

    try:
        return float(value)
    except:
        nums = re.findall(r"[-+]?\d*\.?\d+", val_str)
        return float(nums[0]) if nums else 0.0


@router.post("/predict")
async def predict(data: dict):
    model_key = data.get('model_key', 'random_forest')

    try:
        input_features = [
            float(data.get('Capacity', 0.0)),
            float(data.get('Voltage', 0.0)),
            float(data.get('Current', 0.0)),
            float(data.get('Temperature', 0.0)),
            float(data.get('CycleCount', 0.0))
        ]

        current_model = models.get(model_key)
        if not current_model:
            return {"status": "error", "message": f"Model '{model_key}' not loaded."}

        soh_model = current_model['soh']
        rul_model = current_model['rul']

        # ── LSTM + Transformer (Keras) ────────────────────────────
        if model_key == 'lstm_transformer':
            scaler = current_model['scaler']
            scaled = scaler.transform([input_features])           # (1, 5)
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5) # (1, 15, 5)

            soh_final = float(np.squeeze(soh_model.predict(reshaped, verbose=0)))
            rul_final = float(np.squeeze(rul_model.predict(reshaped, verbose=0)))

        # ── GRU + Random Forest ───────────────────────────────────
        elif model_key == 'gru_randomforest':
            scaler = current_model['scaler']
            scaled = scaler.transform([input_features])

            if is_keras_model(soh_model):
                # Keras GRU model
                reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
                soh_final = float(np.squeeze(soh_model.predict(reshaped, verbose=0)))
                rul_final = float(np.squeeze(rul_model.predict(reshaped, verbose=0)))
            else:
                # sklearn RF model - verbose argument නැහැ!
                soh_raw = soh_model.predict(scaled)[0]
                rul_raw = rul_model.predict(scaled)[0]
                soh_final = clean_prediction(soh_raw)
                rul_final = clean_prediction(rul_raw)

        # ── Random Forest / SVR / Naive Bayes ────────────────────
        else:
            if 'scaler' in current_model:
                scaled = current_model['scaler'].transform([input_features])
                soh_raw = soh_model.predict(scaled)[0]
                rul_raw = rul_model.predict(scaled)[0]
            else:
                # Naive Bayes - scaler නැහැ
                soh_raw = soh_model.predict([input_features])[0]
                rul_raw = rul_model.predict([input_features])[0]

            soh_final = clean_prediction(soh_raw)
            rul_final = clean_prediction(rul_raw)

        # Clamp: SOH 0-100, RUL 0-300
        soh_final = max(0.0, min(100.0, soh_final))
        rul_final = max(0.0, min(300.0, rul_final))

        return {
            "status": "success",
            "predictions": {
                "SOH": round(float(soh_final), 2),
                "RUL": round(float(rul_final), 2)
            }
        }

    except Exception as e:
        print(f"❌ Prediction Error [{model_key}]: {str(e)}")
        return {"status": "error", "message": str(e)}