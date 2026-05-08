import os
import joblib
import numpy as np
import re
from fastapi import APIRouter

try:
    import tensorflow as tf
except ImportError:
    tf = None
    print("⚠️ Warning: TensorFlow not found.")

router = APIRouter(prefix="/api/ml", tags=["Prediction"])

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")

models = {}

def load_all_models():
    try:
        models['random_forest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
        print("✅ Random Forest Loaded")
    except Exception as e: print(f"❌ Random Forest Load Failed: {e}")

    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
        print("✅ Naive Bayes Loaded")
    except Exception as e: print(f"❌ Naive Bayes Load Failed: {e}")

    try:
        models['svr'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
        print("✅ SVR Loaded")
    except Exception as e: print(f"❌ SVR Load Failed: {e}")

    try:
        models['gru_randomforest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
        print("✅ GRU+RF Hybrid Loaded")
    except Exception as e: print(f"❌ GRU+RF Hybrid Load Failed: {e}")

    if tf:
        try:
            models['lstm_transformer'] = {
                'soh': tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "soh_model (3).keras")),
                'rul': tf.keras.models.load_model(os.path.join(MODELS_ROOT, "lstm+transformer", "rul_model (3).keras")),
                'scaler': joblib.load(os.path.join(MODELS_ROOT, "lstm+transformer", "feature_scaler (3).joblib"))
            }
            print("✅ LSTM+Transformer Loaded")
        except Exception as e: print(f"❌ LSTM Load Failed: {e}")

load_all_models()


def is_keras_model(model):
    """Keras model ද sklearn model ද check කිරීම"""
    return hasattr(model, 'layers')


def clean_prediction(value):
    """String → float (Naive Bayes fix)"""
    val_str = str(value).strip()

    match = re.search(r"np\.str_\('(.+?)'\)", val_str)
    if match:
        val_str = match.group(1)

    mapping = {
        "Poor": 65.0, "Moderate": 80.0,
        "Healthy": 95.0, "Good": 90.0,
        "Low": 20.0, "Medium": 80.0, "High": 150.0
    }
    if val_str in mapping:
        return mapping[val_str]

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
            return {"status": "error", "message": f"Model '{model_key}' is not loaded on server."}

        soh_model = current_model['soh']
        rul_model = current_model['rul']

        # ── LSTM Transformer (Keras) ──────────────────────────────
        if model_key == 'lstm_transformer':
            scaled = current_model['scaler'].transform([input_features])
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
            soh_final = float(np.squeeze(soh_model.predict(reshaped, verbose=0)))
            rul_final = float(np.squeeze(rul_model.predict(reshaped, verbose=0)))

        # ── GRU + Random Forest (sklearn RF) ─────────────────────
        elif model_key == 'gru_randomforest':
            scaled = current_model['scaler'].transform([input_features])

            if is_keras_model(soh_model):
                # Keras නම් 3D shape
                reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
                soh_final = float(np.squeeze(soh_model.predict(reshaped, verbose=0)))
                rul_final = float(np.squeeze(rul_model.predict(reshaped, verbose=0)))
            else:
                # sklearn RF නම් 2D shape, verbose නැහැ
                soh_raw = soh_model.predict(scaled)[0]
                rul_raw = rul_model.predict(scaled)[0]
                soh_final = clean_prediction(soh_raw)
                rul_final = clean_prediction(rul_raw)

        # ── ML Models: RF, SVR, Naive Bayes ──────────────────────
        else:
            if 'scaler' in current_model:
                scaled = current_model['scaler'].transform([input_features])
                soh_raw = soh_model.predict(scaled)[0]
                rul_raw = rul_model.predict(scaled)[0]
            else:
                soh_raw = soh_model.predict([input_features])[0]
                rul_raw = rul_model.predict([input_features])[0]

            soh_final = clean_prediction(soh_raw)
            rul_final = clean_prediction(rul_raw)

        return {
            "status": "success",
            "predictions": {
                "SOH": round(float(soh_final), 2),
                "RUL": round(float(rul_final), 2)
            }
        }

    except Exception as e:
        print(f"Prediction Error: {str(e)}")
        return {"status": "error", "message": str(e)}