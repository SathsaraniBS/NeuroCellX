import api from './api';

// ─────────────────────────────────────────
// Predict SOH only
// ─────────────────────────────────────────
export const predictSOH = async (batteryData) => {
  const response = await api.post('/api/predict/soh', batteryData);
  return response.data;
};

// ─────────────────────────────────────────
// Predict RUL only
// ─────────────────────────────────────────
export const predictRUL = async (batteryData) => {
  const response = await api.post('/api/predict/rul', batteryData);
  return response.data;
};

// ─────────────────────────────────────────
// Predict SOH + RUL together
// ─────────────────────────────────────────
export const predictBoth = async (batteryData) => {
  const response = await api.post('/api/predict/both', batteryData);
  return response.data;
};

// ─────────────────────────────────────────
// Get model info
// ─────────────────────────────────────────
export const getModelInfo = async () => {
  const response = await api.get('/api/predict/model-info');
  return response.data;
};