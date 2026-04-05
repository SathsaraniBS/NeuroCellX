// src/pages/Predictions.jsx
import React, { useState }       from 'react';  
import { useAuth }               from '../contexts/AuthContext';   
import { useToast }              from '../contexts/ToastContext';  
import { useNavigate }           from 'react-router-dom';         
import { predictBoth }           from '../services/predictionService';
import { createReport }          from '../services/reportService'; 
import Footer                    from '../components/Footer';
import Sidebar                   from '../components/User/UserSidebar';    
import {Zap, Battery, RefreshCw, Download} from 'lucide-react';

function Predictions() {
  const { user }     = useAuth();   
  const { addToast } = useToast();  
  const navigate     = useNavigate(); 

  // ── Input state ────────────────────────
  const [inputs, setInputs] = useState({     
    voltage:     3.8,
    current:     -2.0,
    temperature: 24.5,
    cycle_count: 50,
    capacity:    2.0
  });

  // ── Result + UI state ──────────────────
  const [result,    setResult]    = useState(null);   
  const [loading,   setLoading]   = useState(false);  
  const [predicted, setPredicted] = useState(false);  
  const [saving,    setSaving]    = useState(false);  

  // ── Handle input change ────────────────
  const handleChange = (e) => {             
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
  };

  // ── Handle predict ─────────────────────
  const handlePredict = async () => {       
    setLoading(true);
    try {
      const data = await predictBoth(inputs);
      setResult(data);
      setPredicted(true);
      addToast('Prediction successful!', 'success');
    } catch (err) {
      addToast(err.response?.data?.detail || 'Prediction failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReport = async () => {
    if (!result) return;
    setSaving(true);
    try {
      await createReport({
        report_name:   `Battery Report - ${new Date().toLocaleDateString()}`,
        report_type:   'Battery Health Report',
        battery_id:    'B0006',
        soh_predicted: result.soh,
        rul_predicted: result.rul_cycles,
        voltage:       inputs.voltage,
        current_a:     inputs.current,
        temperature:   inputs.temperature,
        cycle_count:   inputs.cycle_count,
        capacity:      inputs.capacity,
        health_status: result.health_status,
        generated_by:  user?.id
      });
      addToast('Report saved successfully!', 'success');
    } catch (err) {
      addToast('Failed to save report', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ── Health color ───────────────────────
  const healthColor = {                      
    Healthy:  'text-green-400',
    Good:     'text-blue-400',
    Warning:  'text-yellow-400',
    Critical: 'text-red-400'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b18] via-[#071b2f] to-[#020617] text-white flex flex-col relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,255,255,0.05),transparent_50%)] pointer-events-none" />

      <div className="flex flex-1 relative z-10">

        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold tracking-wide">
              Battery <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">Predictions</span>
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Enter battery sensor values to predict SOH and RUL using the VoltIQ engine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ══════ INPUT FORM ══════ */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-8">
              <h3 className="text-lg font-semibold text-cyan-400 mb-6 flex items-center gap-2">
                <Zap size={20} /> Sensor Inputs
              </h3>

              <div className="space-y-5">

                {/* Voltage */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    name="voltage"
                    step="0.01"
                    value={inputs.voltage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-500"
                  />
                  <p className="text-gray-500 text-xs mt-1.5">
                    Normal range: 2.5V - 4.2V
                  </p>
                </div>

                {/* Current */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    name="current"
                    step="0.01"
                    value={inputs.current}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-500"
                  />
                  <p className="text-gray-500 text-xs mt-1.5">
                    Negative = discharging, Positive = charging
                  </p>
                </div>

                {/* Temperature */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    step="0.1"
                    value={inputs.temperature}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-500"
                  />
                  <p className="text-gray-500 text-xs mt-1.5">
                    Normal range: 15°C - 35°C
                  </p>
                </div>

                {/* Cycle Count */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Cycle Count
                  </label>
                  <input
                    type="number"
                    name="cycle_count"
                    step="1"
                    value={inputs.cycle_count}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-500"
                  />
                  <p className="text-gray-500 text-xs mt-1.5">
                    Number of charge/discharge cycles
                  </p>
                </div>

                {/* Capacity */}
                <div>
                  <label className="text-sm text-gray-400 mb-1.5 block">
                    Capacity (Ah)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    step="0.001"
                    value={inputs.capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-transparent border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition placeholder-gray-500"
                  />
                  <p className="text-gray-500 text-xs mt-1.5">
                    Initial capacity: 2.0353 Ah
                  </p>
                </div>

                {/* Predict Button */}
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full py-3.5 mt-4 rounded-xl font-semibold text-lg bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:opacity-90 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Predicting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Zap size={20} /> Predict SOH & RUL
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* ══════ RESULTS ══════ */}
            <div>
              {!predicted ? (
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6 h-full flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                    <Battery size={48} className="text-cyan-500/50" />
                  </div>
                  <p className="text-gray-400 text-lg text-center px-8">
                    Enter the sensor parameters and click <br/>
                    <span className="text-cyan-400 font-semibold">Predict SOH & RUL</span> <br/>
                    to generate a health analysis.
                  </p>
                </div>

              ) : result && (
                <div className="space-y-6">

                  {/* SOH Card */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-2 font-medium uppercase tracking-wider">
                      State of Health (SOH)
                    </p>
                    <div className="flex items-end gap-3">
                      <p className={`text-6xl font-bold ${healthColor[result.health_status] || 'text-white'}`}>
                        {result.soh}%
                      </p>
                      <span className="text-3xl mb-2">{result.health_icon}</span>
                    </div>
                    <div className={`inline-block mt-3 px-4 py-1.5 rounded-lg text-sm font-semibold border
                      ${result.health_color === 'green'  ? 'bg-green-500/10 border-green-500/20 text-green-400'  :
                        result.health_color === 'blue'   ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'   :
                        result.health_color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                                           'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                      {result.health_status}
                    </div>

                    {/* SOH Progress Bar */}
                    <div className="mt-5">
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000
                            ${result.soh >= 90 ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]'  :
                              result.soh >= 80 ? 'bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]'   :
                              result.soh >= 70 ? 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]' :
                                                 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]'}`}
                          style={{ width: `${result.soh}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {/* RUL Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6">
                      <p className="text-gray-400 text-xs mb-2 font-medium uppercase tracking-wider">
                        Remaining Useful Life
                      </p>
                      <p className={`text-4xl font-bold
                        ${result.rul_color === 'green'  ? 'text-green-400'  :
                          result.rul_color === 'yellow' ? 'text-yellow-400' :
                                                          'text-red-400'}`}>
                        {result.rul_cycles}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        cycles
                      </p>
                      <p className="text-gray-400 text-xs mt-3 bg-white/5 p-2 rounded-lg border border-white/5">
                        {result.rul_status}
                      </p>
                    </div>

                    {/* Driving Range Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl p-6">
                      <p className="text-gray-400 text-xs mb-2 font-medium uppercase tracking-wider">
                        Estimated Range
                      </p>
                      <p className="text-4xl font-bold text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]">
                        {result.estimated_range_km}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        kilometers
                      </p>
                      <p className="text-gray-400 text-xs mt-3 bg-white/5 p-2 rounded-lg border border-white/5">
                        Based on current SOH
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {/* View Reports Button */}
                    <button
                      onClick={() => navigate('/reports')}
                      className="w-full py-3.5 rounded-xl border border-white/20 bg-transparent text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center justify-center gap-2 font-medium"
                    >
                      <Download size={18} /> View Reports
                    </button>

                    {/* New Prediction */}
                    <button
                      onClick={() => { setResult(null); setPredicted(false); }}
                      className="w-full py-3.5 rounded-xl border border-white/20 bg-transparent text-gray-300 hover:bg-white/10 hover:text-white transition flex items-center justify-center gap-2 font-medium"
                    >
                      <RefreshCw size={18} /> Reset Data
                    </button>
                  </div>

                  {/* Save as Report Button */}
                  <button
                    onClick={handleSaveReport}
                    disabled={saving}
                    className="w-full py-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-semibold hover:bg-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        Saving Report...
                      </span>
                    ) : (
                      '💾 Save Analysis Report'
                    )}
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Predictions;