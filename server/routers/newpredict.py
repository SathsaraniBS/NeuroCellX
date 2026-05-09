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

BASE_DIR    = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_ROOT = os.path.join(BASE_DIR, "models")
models      = {}


# ─────────────────────────────────────────────
#  Model Loading
# ─────────────────────────────────────────────
def load_all_models():
    try:
        models['random_forest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "RandomForest", "rf_5feat_scaler.pkl"))
        }
        print("✅ Random Forest Loaded")
    except Exception as e:
        print(f"❌ Random Forest Load Failed: {e}")

    try:
        models['naive_bayes'] = {
            'soh': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_soh_model.pkl")),
            'rul': joblib.load(os.path.join(MODELS_ROOT, "naive_bayes", "nb_5feat_rul_model.pkl"))
        }
        nb_soh = models['naive_bayes']['soh']
        nb_rul = models['naive_bayes']['rul']
        print(f"✅ Naive Bayes Loaded")
        print(f"   NB SOH classes: {getattr(nb_soh, 'classes_', 'N/A')}")
        print(f"   NB RUL classes: {getattr(nb_rul, 'classes_', 'N/A')}")
    except Exception as e:
        print(f"❌ Naive Bayes Load Failed: {e}")

    try:
        models['svr'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "SVR", "svr_5feat_scaler.pkl"))
        }
        print("✅ SVR Loaded")
    except Exception as e:
        print(f"❌ SVR Load Failed: {e}")

    try:
        models['gru_randomforest'] = {
            'soh':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_soh_model.pkl")),
            'rul':    joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_rul_model.pkl")),
            'scaler': joblib.load(os.path.join(MODELS_ROOT, "gru+randomforest", "gru_rf_5feat_feat_scaler.pkl"))
        }
        gru_soh = models['gru_randomforest']['soh']
        gru_rul = models['gru_randomforest']['rul']
        print(f"✅ GRU+RF Loaded")
        print(f"   GRU SOH type: {type(gru_soh).__name__}")
        print(f"   GRU RUL type: {type(gru_rul).__name__}")
    except Exception as e:
        print(f"❌ GRU+RF Load Failed: {e}")

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
            print("✅ LSTM+Transformer Loaded")
        except Exception as e:
            print(f"❌ LSTM Load Failed: {e}")

load_all_models()


# ─────────────────────────────────────────────
#  Helper
# ─────────────────────────────────────────────
def extract_str(value) -> str:
    """numpy / python value → plain string"""
    val_str = str(value).strip()
    m = re.search(r"np\.str_\('(.+?)'\)", val_str)
    return m.group(1) if m else val_str


def is_keras_model(m):
    return hasattr(m, 'layers')


# ─────────────────────────────────────────────
#  SOH resolver
# ─────────────────────────────────────────────
def resolve_soh(raw) -> float:
    s = extract_str(raw)

    soh_label_map = {
        "Poor":     62.0,
        "Moderate": 78.0,
        "Good":     88.0,
        "Healthy":  93.0,
    }
    if s in soh_label_map:
        print(f"   [SOH] label '{s}' → {soh_label_map[s]}")
        return soh_label_map[s]

    try:
        v = float(raw)
        print(f"   [SOH] numeric raw = {v}")
        # Keras sigmoid/linear output: 0–1 range → ×100
        if -1.0 <= v <= 1.0:
            result = abs(v) * 100.0
            print(f"   [SOH] 0-1 scale → {result:.2f}%")
            return result
        return abs(v)
    except Exception:
        nums = re.findall(r"[-+]?\d*\.?\d+", s)
        return float(nums[0]) if nums else 0.0


# ─────────────────────────────────────────────
#  RUL resolver
# ─────────────────────────────────────────────
def resolve_rul(raw) -> float:
    s = extract_str(raw)

    rul_label_map = {
        "Low":      20.0,
        "Medium":   80.0,
        "High":    145.0,
        "Poor":     18.0,
        "Moderate": 65.0,
        "Good":    115.0,
        "Healthy": 148.0,
    }
    if s in rul_label_map:
        print(f"   [RUL] label '{s}' → {rul_label_map[s]}")
        return rul_label_map[s]

    try:
        v = float(raw)
        print(f"   [RUL] numeric raw = {v}")
        v = abs(v)                    # negative RUL fix
        if v <= 1.0:                  # Keras 0-1 output → cycles
            result = v * 200.0
            print(f"   [RUL] 0-1 scale → {result:.2f} cycles")
            return result
        return v
    except Exception:
        nums = re.findall(r"[-+]?\d*\.?\d+", s)
        return float(nums[0]) if nums else 0.0


# ─────────────────────────────────────────────
#  Prediction Endpoint
# ─────────────────────────────────────────────
@router.post("/predict")
async def predict(data: dict):
    model_key = data.get('model_key', 'random_forest')
    print(f"\n{'='*55}")
    print(f"🔮 model={model_key}")

    try:
        input_features = [
            float(data.get('Capacity',    0.0)),
            float(data.get('Voltage',     0.0)),
            float(data.get('Current',     0.0)),
            float(data.get('Temperature', 0.0)),
            float(data.get('CycleCount',  0.0))
        ]
        print(f"   inputs = {input_features}")

        current_model = models.get(model_key)
        if not current_model:
            return {"status": "error", "message": f"Model '{model_key}' not loaded."}

        soh_model = current_model['soh']
        rul_model = current_model['rul']

        # ══════════════════════════════
        # LSTM + Transformer
        # ══════════════════════════════
        if model_key == 'lstm_transformer':
            scaler   = current_model['scaler']
            scaled   = scaler.transform([input_features])
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)

            raw_soh_arr = soh_model.predict(reshaped, verbose=0)
            raw_rul_arr = rul_model.predict(reshaped, verbose=0)

            raw_soh = float(np.squeeze(raw_soh_arr))
            raw_rul = float(np.squeeze(raw_rul_arr))

            print(f"[LSTM] soh_output={raw_soh_arr}  →  squeezed={raw_soh}")
            print(f"[LSTM] rul_output={raw_rul_arr}  →  squeezed={raw_rul}")

            soh_final = resolve_soh(raw_soh)
            rul_final = resolve_rul(raw_rul)

        # ══════════════════════════════
        # GRU + Random Forest
        # ══════════════════════════════
        elif model_key == 'gru_randomforest':
            scaler = current_model['scaler']
            scaled = scaler.transform([input_features])

            if is_keras_model(soh_model):
                reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)
                raw_soh  = float(np.squeeze(soh_model.predict(reshaped, verbose=0)))
                raw_rul  = float(np.squeeze(rul_model.predict(reshaped, verbose=0)))
                print(f"[GRU Keras] raw soh={raw_soh}, rul={raw_rul}")
            else:
                raw_soh = soh_model.predict(scaled)[0]
                raw_rul = rul_model.predict(scaled)[0]
                print(f"[GRU RF] raw soh={raw_soh!r}  rul={raw_rul!r}")

            soh_final = resolve_soh(raw_soh)
            rul_final = resolve_rul(raw_rul)

        # ══════════════════════════════
        # Naive Bayes
        # ══════════════════════════════
        elif model_key == 'naive_bayes':
            raw_soh = soh_model.predict([input_features])[0]
            raw_rul = rul_model.predict([input_features])[0]

            print(f"[NB] raw_soh = {raw_soh!r}  type={type(raw_soh).__name__}")
            print(f"[NB] raw_rul = {raw_rul!r}  type={type(raw_rul).__name__}")

            # Debug: class probabilities
            try:
                soh_proba = soh_model.predict_proba([input_features])[0]
                rul_proba = rul_model.predict_proba([input_features])[0]
                print(f"[NB] SOH classes={soh_model.classes_}  proba={soh_proba}")
                print(f"[NB] RUL classes={rul_model.classes_}  proba={rul_proba}")
            except Exception:
                pass

            soh_final = resolve_soh(raw_soh)
            rul_final = resolve_rul(raw_rul)

        # ══════════════════════════════
        # Random Forest / SVR
        # ══════════════════════════════
        else:
            scaler  = current_model['scaler']
            scaled  = scaler.transform([input_features])
            raw_soh = soh_model.predict(scaled)[0]
            raw_rul = rul_model.predict(scaled)[0]
            print(f"[{model_key}] raw soh={raw_soh!r}  rul={raw_rul!r}")
            soh_final = resolve_soh(raw_soh)
            rul_final = resolve_rul(raw_rul)

        # ── Safety Clamp ────────────────
        soh_final = max(0.0, min(100.0, float(soh_final)))
        rul_final = max(0.0, min(300.0, float(rul_final)))

        print(f"✅ Final → SOH={soh_final}%  RUL={rul_final} cycles")

        return {
            "status": "success",
            "predictions": {
                "SOH": round(soh_final, 2),
                "RUL": round(rul_final, 2)
            }
        }

    except Exception as e:
        import traceback
        print(f"❌ Error [{model_key}]:")
        traceback.print_exc()
        return {"status": "error", "message": str(e)}