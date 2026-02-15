// src/components/PredictForm.jsx
import React, { useState } from 'react';
import { predictDummy } from '../services/api';

const PredictForm = () => {
  const [voltage, setVoltage] = useState('');
  const [temperature, setTemperature] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await predictDummy(voltage, temperature);
      setResult(data);
    } catch (err) {
      setError('Error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>EV Battery Dummy Prediction</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Voltage:</label><br />
          <input
            type="number"
            step="0.01"
            value={voltage}
            onChange={(e) => setVoltage(e.target.value)}
            placeholder="e.g. 3.85"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Temperature (°C):</label><br />
          <input
            type="number"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            placeholder="e.g. 28.5"
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: loading ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Predicting...' : 'Get Prediction'}
        </button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>
      )}

      {result && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #ccc',
          color: 'black',
        }}>
          <h3>Prediction Result</h3>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Predicted SOH:</strong> {result.predicted_soh}%</p>
          <p><strong>Saved Record ID:</strong> {result.saved_record_id}</p>
          <p><strong>Message:</strong> {result.message}</p>
        </div>
      )}
    </div>
  );
};

export default PredictForm;