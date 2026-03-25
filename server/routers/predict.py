# server/routers/predict.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import joblib
import json
import numpy as np
import os

router = APIRouter(prefix="/api/predict", tags=["Predictions"])

# ─────────────────────────────────────────
# Load models on startup
# ─────────────────────────────────────────
MODEL_DIR = "models"

def load_models():
    try:
        rf_model  = joblib.load(f"{MODEL_DIR}/rf_soh_model.pkl")
        svr_model = joblib.load(f"{MODEL_DIR}/svr_rul_model.pkl")
        scaler    = joblib.load(f"{MODEL_DIR}/scaler.pkl")

        with open(f"{MODEL_DIR}/features.json", "r") as f:
            features = json.load(f)

        print("✅ ML Models loaded successfully!")
        return rf_model, svr_model, scaler, features

    except Exception as e:
        print(f"❌ Error loading models: {e}")
        return None, None, None, None

# Load models when server starts
rf_model, svr_model, scaler, FEATURES = load_models()


# ─────────────────────────────────────────
# Input Schema
# ─────────────────────────────────────────
class BatteryInput(BaseModel):
    voltage:      float  # Battery voltage (V)
    current:      float  # Battery current (A)
    temperature:  float  # Battery temperature (°C)
    cycle_count:  int    # Number of charge/discharge cycles
    capacity:     Optional[float] = 2.0353  # Battery capacity (Ah)

# ─────────────────────────────────────────
# Feature Engineering Helper
# ─────────────────────────────────────────
def engineer_features(data: BatteryInput) -> np.ndarray:
    """
    Create the same features used during training
    """
    voltage     = data.voltage
    current     = data.current
    temperature = data.temperature
    cycle_count = data.cycle_count
    capacity    = data.capacity

    # Engineered features (same as training)
    initial_capacity = 2.0353
    capacity_fade    = initial_capacity - capacity
    voltage_drop     = 4.2 - voltage          # max voltage - current
    current_abs      = abs(current)
    charge_rate      = current_abs / (capacity + 1e-6)
    temp_deviation   = temperature - 24.5     # mean temp from training
    voltage_rolling  = voltage                # single point = same value

    features = [
        voltage,
        current,
        temperature,
        cycle_count,
        capacity_fade,
        voltage_drop,
        current_abs,
        charge_rate,
        temp_deviation,
        voltage_rolling
    ]

    return np.array(features).reshape(1, -1)


# ─────────────────────────────────────────
# Health Status Helper
# ─────────────────────────────────────────
def get_health_status(soh: float) -> dict:
    if soh >= 90:
        return {"status": "Healthy",  "color": "green",  "icon": "✅"}
    elif soh >= 80:
        return {"status": "Good",     "color": "blue",   "icon": "🔵"}
    elif soh >= 70:
        return {"status": "Warning",  "color": "yellow", "icon": "⚠️"}
    else:
        return {"status": "Critical", "color": "red",    "icon": "🔴"}


# ─────────────────────────────────────────
# POST /api/predict/soh
# Predict State of Health
# ─────────────────────────────────────────
@router.post("/soh")
def predict_soh(data: BatteryInput):
    if rf_model is None:
        raise HTTPException(
            status_code=503,
            detail="SOH model not loaded. Please train the model first."
        )
    try:
        # Engineer features
        features = engineer_features(data)

        # Scale features
        features_scaled = scaler.transform(features)

        # Predict SOH
        soh_raw = float(rf_model.predict(features_scaled)[0])
        soh     = round(min(max(soh_raw, 0), 100), 2)  # clamp 0-100

        # Get health status
        health = get_health_status(soh)

        return {
            "status":        "success",
            "prediction":    "SOH",
            "soh":           soh,
            "health_status": health["status"],
            "color":         health["color"],
            "icon":          health["icon"],
            "input": {
                "voltage":     data.voltage,
                "current":     data.current,
                "temperature": data.temperature,
                "cycle_count": data.cycle_count,
                "capacity":    data.capacity
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# ─────────────────────────────────────────
# POST /api/predict/rul
# Predict Remaining Useful Life
# ─────────────────────────────────────────
@router.post("/rul")
def predict_rul(data: BatteryInput):
    if svr_model is None:
        raise HTTPException(
            status_code=503,
            detail="RUL model not loaded. Please train the model first."
        )
    try:
        # Engineer features
        features = engineer_features(data)

        # Scale features
        features_scaled = scaler.transform(features)

        # Predict RUL
        rul_raw = float(svr_model.predict(features_scaled)[0])
        rul     = max(round(rul_raw, 0), 0)  # clamp to 0+

        # RUL status
        if rul >= 50:
            rul_status = "Long Life Remaining"
            rul_color  = "green"
        elif rul >= 20:
            rul_status = "Moderate Life Remaining"
            rul_color  = "yellow"
        else:
            rul_status = "Replace Soon"
            rul_color  = "red"

        return {
            "status":     "success",
            "prediction": "RUL",
            "rul_cycles": int(rul),
            "rul_status": rul_status,
            "rul_color":  rul_color,
            "input": {
                "voltage":     data.voltage,
                "current":     data.current,
                "temperature": data.temperature,
                "cycle_count": data.cycle_count
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# ─────────────────────────────────────────
# POST /api/predict/both
# Predict SOH + RUL together
# ─────────────────────────────────────────
@router.post("/both")
def predict_both(data: BatteryInput):
    if rf_model is None or svr_model is None:
        raise HTTPException(
            status_code=503,
            detail="Models not loaded. Please train models first."
        )
    try:
        # Engineer features
        features        = engineer_features(data)
        features_scaled = scaler.transform(features)

        # Predict SOH
        soh_raw = float(rf_model.predict(features_scaled)[0])
        soh     = round(min(max(soh_raw, 0), 100), 2)

        # Predict RUL
        rul_raw = float(svr_model.predict(features_scaled)[0])
        rul     = max(round(rul_raw, 0), 0)

        # Health status
        health = get_health_status(soh)

        # RUL status
        if rul >= 50:
            rul_status = "Long Life Remaining"
            rul_color  = "green"
        elif rul >= 20:
            rul_status = "Moderate Life Remaining"
            rul_color  = "yellow"
        else:
            rul_status = "Replace Soon"
            rul_color  = "red"

        # Estimated driving range based on SOH
        base_range      = 400  # km at 100% SOH
        estimated_range = round(base_range * (soh / 100), 1)

        return {
            "status":     "success",
            "prediction": "SOH + RUL",

            # SOH
            "soh":           soh,
            "health_status": health["status"],
            "health_color":  health["color"],
            "health_icon":   health["icon"],

            # RUL
            "rul_cycles":  int(rul),
            "rul_status":  rul_status,
            "rul_color":   rul_color,

            # Extras
            "estimated_range_km": estimated_range,

            # Input echo
            "input": {
                "voltage":     data.voltage,
                "current":     data.current,
                "temperature": data.temperature,
                "cycle_count": data.cycle_count,
                "capacity":    data.capacity
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")


# ─────────────────────────────────────────
# GET /api/predict/model-info
# Get model information
# ─────────────────────────────────────────
@router.get("/model-info")
def get_model_info():
    models_loaded = rf_model is not None and svr_model is not None

    return {
        "status":        "success",
        "models_loaded": models_loaded,
        "models": {
            "soh_model": {
                "name":      "Random Forest Regressor",
                "predicts":  "State of Health (SOH %)",
                "status":    "Ready" if rf_model else "Not Loaded",
                "accuracy":  "R² = 1.0000"
            },
            "rul_model": {
                "name":      "Support Vector Regression",
                "predicts":  "Remaining Useful Life (cycles)",
                "status":    "Ready" if svr_model else "Not Loaded",
                "accuracy":  "R² = 0.9992"
            }
        },
        "features": FEATURES
    }