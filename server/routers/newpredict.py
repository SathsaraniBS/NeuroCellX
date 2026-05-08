import os
import joblib
import numpy as np
from fastapi import APIRouter

# TensorFlow පරීක්ෂා කිරීම
try:
    import tensorflow as tf
except ImportError:
    tf = None
    print("⚠️ Warning: TensorFlow not found.")

router = APIRouter(
    prefix="/api/ml",
    tags=["Prediction"]
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")

models = {}

def load_all_models():
    """සියලුම මාදිලි එකින් එක load කිරීම (එකක් fail වුවත් අනෙක්වා වැඩ කරන පරිදි)"""
    
    # 1. Random Forest
    try:
        models['random_forest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
        print("✅ Random Forest Loaded")
    except: print("❌ Random Forest Load Failed")

    # 2. Naive Bayes
    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
        print("✅ Naive Bayes Loaded")
    except: print("❌ Naive Bayes Load Failed")

    # 3. SVR
    try:
        models['svr'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
        print("✅ SVR Loaded")
    except: print("❌ SVR Load Failed")

    # 4. GRU + Random Forest (Frontend එකේ නම 'grv_randomforest' ලෙස ඇති නිසා එය භාවිතා කරන ලදී)
    try:
        models['grv_randomforest'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
        print("✅ GRU+RF Hybrid Loaded")
    except: print("❌ GRU+RF Hybrid Load Failed")

    # 5. LSTM + Transformer
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

def clean_prediction(value):
    """ප්‍රතිඵලය string එකක් නම් එය float අගයකට හැරවීම (Naive Bayes සඳහා)"""
    if isinstance(value, (str, np.str_)):
        mapping = {"Poor": 65.0, "Moderate": 80.0, "Healthy": 95.0, "Good": 90.0}
        return mapping.get(value, 0.0)
    return float(value)

@router.post("/predict")
async def predict(data: dict):
    model_key = data.get('model_key', 'random_forest')
    
    try:
        # Frontend එකේ keys Capitalized (Capacity) නිසා එයට ගැලපෙන පරිදි දත්ත ලබා ගැනීම
        input_features = [
            float(data.get('Capacity', 0.0)),
            float(data.get('Voltage', 0.0)),   
            float(data.get('Current', 0.0)),   
            float(data.get('Temperature', 0.0)), 
            float(data.get('CycleCount', 0.0))  
        ]
        
        current_model = models.get(model_key)
        if not current_model:
            return {"status": "error", "message": f"Model '{model_key}' not loaded on server."}

        # --- Deep Learning / Hybrid Logic (3D Reshaping) ---
        if model_key in ['lstm_transformer', 'grv_randomforest']:
            # 1. Scale input
            scaled_input = current_model['scaler'].transform([input_features])
            
            # 2. Reshape to (1, 15, 5) - වැදගත්: LSTM එක බලාපොරොත්තු වන shape එකට සැකසීම
            # මෙහිදී අප ලබාදෙන තනි දත්තය 15 වතාවක් repeat කර sequence එකක් සාදයි.
            reshaped_input = np.repeat(scaled_input, 15, axis=0).reshape(1, 15, 5)
            
            soh_pred = current_model['soh'].predict(reshaped_input, verbose=0)
            rul_pred = current_model['rul'].predict(reshaped_input, verbose=0)
            
            soh_final = float(soh_pred[0][0])
            rul_final = float(rul_pred[0][0])

        # --- Standard ML Models (RF, SVR, NB) ---
        else:
            if 'scaler' in current_model:
                scaled_input = current_model['scaler'].transform([input_features])
                soh_raw = current_model['soh'].predict(scaled_input)[0]
                rul_raw = current_model['rul'].predict(scaled_input)[0]
            else:
                soh_raw = current_model['soh'].predict([input_features])[0]
                rul_raw = current_model['rul'].predict([input_features])[0]

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
        return {"status": "error", "message": str(e)}