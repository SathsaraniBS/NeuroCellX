# server/train_models.py
# Train Random Forest (SOH) and SVR (SOC) models
# Usage: python train_models.py

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os

print("=" * 50)
print("VoltIQ - ML Model Training")
print("=" * 50)

# ─────────────────────────────────────────
# Step 1 — Load Dataset
# ─────────────────────────────────────────
print("\n📂 Loading NASA B0006 dataset...")

df = pd.read_csv('NASA_B0006_battery_data.csv')
print(f"✅ Loaded {len(df)} rows, {len(df.columns)} columns")
print(f"Columns: {list(df.columns)}")

# ─────────────────────────────────────────
# Step 2 — Data Preprocessing
# ─────────────────────────────────────────
print("\n🔧 Preprocessing data...")

# Drop rows with missing values
df = df.dropna()
print(f"✅ After dropping nulls: {len(df)} rows")

# Remove outliers in voltage (valid range: 2.5V - 4.5V)
df = df[(df['voltage'] >= 2.5) & (df['voltage'] <= 4.5)]

# Remove outliers in temperature (valid range: 0°C - 60°C)
df = df[(df['temperature'] >= 0) & (df['temperature'] <= 60)]

print(f"✅ After removing outliers: {len(df)} rows")

# ─────────────────────────────────────────
# Step 3 — Feature Engineering
# ─────────────────────────────────────────
print("\n⚙️  Engineering features...")

# Capacity fade rate (how fast capacity is dropping)
df['capacity_fade'] = df['capacity'].max() - df['capacity']

# Voltage drop (difference from max voltage)
df['voltage_drop'] = df['voltage'].max() - df['voltage']

# Current magnitude
df['current_abs'] = df['current'].abs()

# Charge rate (current / capacity)
df['charge_rate'] = df['current_abs'] / (df['capacity'] + 1e-6)

# Temperature deviation from mean
df['temp_deviation'] = df['temperature'] - df['temperature'].mean()

# Rolling average voltage (per cycle)
df['voltage_rolling_avg'] = df.groupby('cycle_count')['voltage'] \
                              .transform(lambda x: x.rolling(3, min_periods=1).mean())

print(f"✅ Features created: {list(df.columns)}")

# ─────────────────────────────────────────
# Step 4 — Define Features and Targets
# ─────────────────────────────────────────

# Features (inputs to the model)
FEATURES = [
    'voltage',
    'current',
    'temperature',
    'cycle_count',
    'capacity_fade',
    'voltage_drop',
    'current_abs',
    'charge_rate',
    'temp_deviation',
    'voltage_rolling_avg'
]

# Targets (what we want to predict)
TARGET_SOH = 'soh'   # Random Forest predicts this
TARGET_SOC = 'rul'   # SVR predicts this (using RUL as proxy)

X = df[FEATURES]
y_soh = df[TARGET_SOH]
y_soc = df[TARGET_SOC]

print(f"\n✅ Features shape: {X.shape}")
print(f"✅ SOH target range: {y_soh.min():.2f} - {y_soh.max():.2f}")
print(f"✅ RUL target range: {y_soc.min():.2f} - {y_soc.max():.2f}")

# ─────────────────────────────────────────
# Step 5 — Split Data
# ─────────────────────────────────────────
print("\n✂️  Splitting data (80% train, 20% test)...")

X_train, X_test, y_soh_train, y_soh_test = train_test_split(
    X, y_soh, test_size=0.2, random_state=42
)

_, _, y_soc_train, y_soc_test = train_test_split(
    X, y_soc, test_size=0.2, random_state=42
)

print(f"✅ Training samples: {len(X_train)}")
print(f"✅ Testing samples:  {len(X_test)}")

# ─────────────────────────────────────────
# Step 6 — Scale Features
# ─────────────────────────────────────────
print("\n📊 Scaling features...")

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled  = scaler.transform(X_test)

print("✅ Features scaled successfully")

# ─────────────────────────────────────────
# Step 7 — Train Random Forest (SOH)
# ─────────────────────────────────────────
print("\n🌲 Training Random Forest for SOH prediction...")

rf_model = RandomForestRegressor(
    n_estimators=100,
    max_depth=10,
    random_state=42,
    n_jobs=-1  # use all CPU cores
)
rf_model.fit(X_train_scaled, y_soh_train)

# Evaluate
rf_predictions = rf_model.predict(X_test_scaled)
rf_mae  = mean_absolute_error(y_soh_test, rf_predictions)
rf_rmse = np.sqrt(mean_squared_error(y_soh_test, rf_predictions))
rf_r2   = r2_score(y_soh_test, rf_predictions)

print(f"✅ Random Forest SOH Results:")
print(f"   MAE:  {rf_mae:.4f}")
print(f"   RMSE: {rf_rmse:.4f}")
print(f"   R²:   {rf_r2:.4f}")

# ─────────────────────────────────────────
# Step 8 — Train SVR (RUL)
# ─────────────────────────────────────────
print("\n📈 Training SVR for RUL prediction...")

svr_model = SVR(
    kernel='rbf',
    C=100,
    gamma=0.1,
    epsilon=0.1
)
svr_model.fit(X_train_scaled, y_soc_train)

# Evaluate
svr_predictions = svr_model.predict(X_test_scaled)
svr_mae  = mean_absolute_error(y_soc_test, svr_predictions)
svr_rmse = np.sqrt(mean_squared_error(y_soc_test, svr_predictions))
svr_r2   = r2_score(y_soc_test, svr_predictions)

print(f"✅ SVR RUL Results:")
print(f"   MAE:  {svr_mae:.4f}")
print(f"   RMSE: {svr_rmse:.4f}")
print(f"   R²:   {svr_r2:.4f}")

# ─────────────────────────────────────────
# Step 9 — Save Models
# ─────────────────────────────────────────
print("\n💾 Saving models...")

# Create models directory
os.makedirs('models', exist_ok=True)

# Save models and scaler
joblib.dump(rf_model, 'models/rf_soh_model.pkl')
joblib.dump(svr_model, 'models/svr_rul_model.pkl')
joblib.dump(scaler,    'models/scaler.pkl')

# Save feature list
import json
with open('models/features.json', 'w') as f:
    json.dump(FEATURES, f)

print("✅ Models saved:")
print("   models/rf_soh_model.pkl")
print("   models/svr_rul_model.pkl")
print("   models/scaler.pkl")
print("   models/features.json")

# ─────────────────────────────────────────
# Step 10 — Summary
# ─────────────────────────────────────────
print("\n" + "=" * 50)
print("📊 TRAINING SUMMARY")
print("=" * 50)
print(f"{'Model':<20} {'MAE':>8} {'RMSE':>8} {'R²':>8}")
print("-" * 50)
print(f"{'Random Forest (SOH)':<20} {rf_mae:>8.4f} {rf_rmse:>8.4f} {rf_r2:>8.4f}")
print(f"{'SVR (RUL)':<20} {svr_mae:>8.4f} {svr_rmse:>8.4f} {svr_r2:>8.4f}")
print("=" * 50)
print("\n✅ Training complete! Models ready for predictions.")