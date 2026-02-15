// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // backend URL (ensure it matches your backend's address and port)
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictDummy = async (voltage, temperature) => {
  try {
    const response = await api.post('/predict-dummy', {
      voltage: Number(voltage),
      temperature: Number(temperature),
    });
    return response.data;
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};