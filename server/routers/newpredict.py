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


# ─────────────────────────────────────────────────────────────
#  Model Loading
# ─────────────────────────────────────────────────────────────
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
        # sklearn RF නම් classes print කරන්න
        if hasattr(gru_rul, 'classes_'):
            print(f"   GRU RUL classes: {gru_rul.classes_}")
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


# ─────────────────────────────────────────────────────────────
#  ✅ CONFIRMED NB LABELS FROM TERMINAL LOGS:
#
#  SOH classes: ['Critical' 'Excellent' 'Fair' 'Good' 'Poor']
#  RUL classes: ['Critical' 'Early' 'End' 'Late' 'Mid']
# ─────────────────────────────────────────────────────────────

# SOH label → realistic SOH percentage
NB_SOH_MAP = {
    "Critical":  55.0,   # very bad battery
    "Poor":      62.0,   # bad battery
    "Fair":      75.0,   # okay battery
    "Good":      85.0,   # good battery
    "Excellent": 95.0,   # great battery
}

# RUL label → realistic remaining cycles
# 'End'      = battery life end        → very few cycles left
# 'Critical' = almost dead             → few cycles left
# 'Mid'      = middle of life          → moderate cycles left
# 'Late'     = late stage              → some cycles left
# 'Early'    = early stage / healthy   → many cycles left
NB_RUL_MAP = {
    "End":      5.0,    # ✅ 'End' label fix — ශේෂ cycles ඉතා අඩුයි
    "Critical": 15.0,   # critical stage
    "Mid":      75.0,   # mid life
    "Late":     45.0,   # late stage
    "Early":   145.0,   # early / healthy stage
}


# ─────────────────────────────────────────────────────────────
#  Helpers
# ─────────────────────────────────────────────────────────────
def extract_str(value) -> str:
    val_str = str(value).strip()
    # np.str_('Poor') → 'Poor'
    m = re.search(r"np\.str_\('(.+?)'\)", val_str)
    return m.group(1) if m else val_str


def is_keras_model(m):
    return hasattr(m, 'layers')


def resolve_soh(raw, model_key: str = '') -> float:
    s = extract_str(raw)
    print(f"   [SOH] raw='{s}'  model={model_key}")

    # ✅ Naive Bayes SOH labels
    if s in NB_SOH_MAP:
        val = NB_SOH_MAP[s]
        print(f"   [SOH] NB label '{s}' → {val}%")
        return val

    try:
        v = float(raw)
        # Keras output: 0–1 range → ×100
        if -1.0 <= v <= 1.0:
            result = abs(v) * 100.0
            print(f"   [SOH] 0-1 range {v:.6f} → {result:.2f}%")
            return result
        print(f"   [SOH] numeric {v:.4f}%")
        return abs(v)
    except Exception:
        nums = re.findall(r"[-+]?\d*\.?\d+", s)
        return float(nums[0]) if nums else 0.0


def resolve_rul(raw, model_key: str = '') -> float:
    s = extract_str(raw)
    print(f"   [RUL] raw='{s}'  model={model_key}")

    # ✅ Naive Bayes RUL labels — confirmed from terminal
    if s in NB_RUL_MAP:
        val = NB_RUL_MAP[s]
        print(f"   [RUL] NB label '{s}' → {val} cycles")
        return val

    try:
        v = float(raw)
        v = abs(v)          # negative RUL fix (GRU+RF)
        # Keras 0–1 output → realistic cycles
        if v <= 1.0:
            result = v * 200.0
            print(f"   [RUL] 0-1 range → {result:.2f} cycles")
            return result
        print(f"   [RUL] numeric {v:.4f} cycles")
        return v
    except Exception:
        nums = re.findall(r"[-+]?\d*\.?\d+", s)
        return float(nums[0]) if nums else 0.0


# ─────────────────────────────────────────────────────────────
#  Prediction Endpoint
# ─────────────────────────────────────────────────────────────
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

        # ══════════════════════════════════════════
        # 1. LSTM + Transformer (Keras)
        # ══════════════════════════════════════════
        if model_key == 'lstm_transformer':
            scaler   = current_model['scaler']
            scaled   = scaler.transform([input_features])
            reshaped = np.tile(scaled, (15, 1)).reshape(1, 15, 5)

            raw_soh_arr = soh_model.predict(reshaped, verbose=0)
            raw_rul_arr = rul_model.predict(reshaped, verbose=0)

            raw_soh = float(np.squeeze(raw_soh_arr))
            raw_rul = float(np.squeeze(raw_rul_arr))

            print(f"[LSTM] soh_array={raw_soh_arr.tolist()} → {raw_soh}")
            print(f"[LSTM] rul_array={raw_rul_arr.tolist()} → {raw_rul}")

            soh_final = resolve_soh(raw_soh, model_key)
            rul_final = resolve_rul(raw_rul, model_key)

        # ══════════════════════════════════════════
        # 2. GRU + Random Forest
        # ══════════════════════════════════════════
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

            soh_final = resolve_soh(raw_soh, model_key)
            rul_final = resolve_rul(raw_rul, model_key)

        # ══════════════════════════════════════════
        # 3. Naive Bayes (no scaler)
        # ══════════════════════════════════════════
        elif model_key == 'naive_bayes':
            raw_soh = soh_model.predict([input_features])[0]
            raw_rul = rul_model.predict([input_features])[0]

            print(f"[NB] raw_soh={raw_soh!r}  raw_rul={raw_rul!r}")

            try:
                soh_proba = soh_model.predict_proba([input_features])[0]
                rul_proba = rul_model.predict_proba([input_features])[0]
                print(f"[NB] SOH classes={soh_model.classes_}  proba={soh_proba}")
                print(f"[NB] RUL classes={rul_model.classes_}  proba={rul_proba}")
            except Exception:
                pass

            soh_final = resolve_soh(raw_soh, model_key)
            rul_final = resolve_rul(raw_rul, model_key)

        # ══════════════════════════════════════════
        # 4. Random Forest / SVR (with scaler)
        # ══════════════════════════════════════════
        else:
            scaler  = current_model['scaler']
            scaled  = scaler.transform([input_features])
            raw_soh = soh_model.predict(scaled)[0]
            raw_rul = rul_model.predict(scaled)[0]
            print(f"[{model_key}] raw soh={raw_soh!r}  rul={raw_rul!r}")
            soh_final = resolve_soh(raw_soh, model_key)
            rul_final = resolve_rul(raw_rul, model_key)

        # ── Safety Clamp ─────────────────────────────────
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


# ─────────────────────────────────────────────────────────────
#  Debug Endpoints (Development Only)
# ─────────────────────────────────────────────────────────────
@router.get("/debug-models")
async def debug_models():
    info = {}
    for key, m in models.items():
        soh = m['soh']
        rul = m['rul']
        info[key] = {
            "soh_type":     type(soh).__name__,
            "rul_type":     type(rul).__name__,
            "soh_classes":  [str(c) for c in getattr(soh, 'classes_', [])],
            "rul_classes":  [str(c) for c in getattr(rul, 'classes_', [])],
            "is_keras_soh": is_keras_model(soh),
            "is_keras_rul": is_keras_model(rul),
        }
    return info