# server/routers/ml_models.py

import json
import numpy as np
import joblib
import tensorflow as tf
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pathlib import Path

router = APIRouter(prefix="/api/ml", tags=["ML Models"])

# ─────────────────────────────────────────
# 📁 Models folder path
# ─────────────────────────────────────────
MODELS_DIR = Path(__file__).parent.parent / "models"

# ─────────────────────────────────────────
# 📦 Model configs - file names හදලා
# ─────────────────────────────────────────
MODEL_CONFIGS = {
    "random_forest": {
        "name": "Random Forest",
        "dir": MODELS_DIR / "Random_Forest",
        "soh_model":    "voltiq_rf_soh_model.joblib",
        "rul_model":    "voltiq_rf_rul_model.joblib",
        "scaler":       "voltiq_rf_feature_scaler.joblib",
        "features":     "voltiq_rf_features.joblib",
        "metrics":      "voltiq_rf_metrics.json",
        "type":         "sklearn",
    },
    "svr": {
        "name": "SVR",
        "dir": MODELS_DIR / "SVR",
        "soh_model":    "voltiq_svr_soh_model.joblib",
        "rul_model":    "voltiq_svr_rul_model.joblib",
        "scaler":       "voltiq_svr_feature_scaler.joblib",
        "features":     "voltiq_svr_features.joblib",
        "metrics":      "voltiq_svr_metrics.json",
        "type":         "sklearn",
    },
    "naive_bayes": {
        "name": "Naive Bayes",
        "dir": MODELS_DIR / "naive_bayes",
        "soh_model":    "voltiq_nb_soh_model.joblib",
        "rul_model":    "voltiq_nb_rul_model.joblib",
        "scaler":       "voltiq_nb_feature_scaler.joblib",
        "features":     "voltiq_nb_features.joblib",
        "metrics":      "voltiq_nb_metrics.json",
        "type":         "sklearn",
    },
    "grv_randomforest": {
        "name": "GRU + Random Forest (Hybrid)",
        "dir": MODELS_DIR / "grv+randomforest",
        "soh_model":    "voltiq_grv_rf_soh_model.joblib",
        "rul_model":    "voltiq_grv_rf_rul_model.joblib",
        "scaler":       "voltiq_grv_rf_feature_scaler.joblib",
        "features":     "voltiq_grv_rf_features.joblib",
        "metrics":      "voltiq_grv_rf_metrics.json",
        "type":         "sklearn",
    },
    "lstm_transformer": {
        "name": "LSTM + Transformer",
        "dir": MODELS_DIR / "lstm+transformer",
        "soh_model":    "soh_model.keras",
        "rul_model":    "rul_model.keras",
        "scaler":       "feature_scaler.joblib",
        "features":     "features.joblib",
        "metrics":      "metrics.json",
        "type":         "keras",
    },
}

# ─────────────────────────────────────────
# 📥 User Input Structure
# ─────────────────────────────────────────
class PredictionRequest(BaseModel):
    model_key: str        # "random_forest", "svr", etc.
    voltage: float        # e.g. 3.7
    current: float        # e.g. 0.5
    temperature: float    # e.g. 25
    cycle_count: float    # e.g. 100
    capacity: float       # e.g. 2.035

# ─────────────────────────────────────────
# 🔮 Prediction Endpoint
# ─────────────────────────────────────────
@router.post("/predict")
def predict(req: PredictionRequest):

    # Step 1: Check if model is valid
    if req.model_key not in MODEL_CONFIGS:
        raise HTTPException(status_code=400, detail="Invalid model selected")

    config = MODEL_CONFIGS[req.model_key]
    model_dir = config["dir"]

    try:
        # Step 2: Load model, scaler, features
        scaler   = joblib.load(model_dir / config["scaler"])
        features = joblib.load(model_dir / config["features"])

        # Step 3: Input array create
        input_data = np.array([[
            req.voltage,
            req.current,
            req.temperature,
            req.cycle_count,
            req.capacity,
        ]])

        # Step 4: Scale input
        input_scaled = scaler.transform(input_data)

        # Step 5: Predict according to the model type
        if config["type"] == "keras":
            # Change shape for LSTM + Transformer model
            input_3d = input_scaled.reshape(1, 1, input_scaled.shape[1])
            soh_model = tf.keras.models.load_model(model_dir / config["soh_model"])
            rul_model = tf.keras.models.load_model(model_dir / config["rul_model"])
            soh = float(soh_model.predict(input_3d)[0][0])
            rul = float(rul_model.predict(input_3d)[0][0])
        else:
            soh_model = joblib.load(model_dir / config["soh_model"])
            rul_model = joblib.load(model_dir / config["rul_model"])
            soh = float(soh_model.predict(input_scaled)[0])
            rul = float(rul_model.predict(input_scaled)[0])

        # Step 6: Loading metrics (from json file)
        with open(model_dir / config["metrics"], "r") as f:
            metrics = json.load(f)

        # Step 7: Returning the results
        return {
            "model_name": config["name"],
            "soh": round(soh, 4),
            "rul": round(rul, 2),
            "metrics": metrics,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ─────────────────────────────────────────
# 📋 Available Models List Endpoint
# ─────────────────────────────────────────
@router.get("/models")
def get_models():
    return [
        {"key": key, "name": val["name"]}
        for key, val in MODEL_CONFIGS.items()
    ]