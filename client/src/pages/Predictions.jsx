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
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">
      <div className="flex flex-1">

        {/*  Sidebar */}
        <Sidebar />

        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">
              Battery Predictions <span className="text-cyan-400">⚡</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Enter battery sensor values to predict SOH and RUL.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ══════ INPUT FORM ══════ */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-6">
                Battery Sensor Inputs
              </h3>

              <div className="space-y-4">

                {/* Voltage */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Voltage (V)
                  </label>
                  <input
                    type="number"
                    name="voltage"
                    step="0.01"
                    value={inputs.voltage}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Normal range: 2.5V - 4.2V
                  </p>
                </div>

                {/* Current */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Current (A)
                  </label>
                  <input
                    type="number"
                    name="current"
                    step="0.01"
                    value={inputs.current}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Negative = discharging, Positive = charging
                  </p>
                </div>

                {/* Temperature */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    step="0.1"
                    value={inputs.temperature}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Normal range: 15°C - 35°C
                  </p>
                </div>

                {/* Cycle Count */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Cycle Count
                  </label>
                  <input
                    type="number"
                    name="cycle_count"
                    step="1"
                    value={inputs.cycle_count}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Number of charge/discharge cycles
                  </p>
                </div>

                {/* Capacity */}
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">
                    Capacity (Ah)
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    step="0.001"
                    value={inputs.capacity}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Initial capacity: 2.0353 Ah
                  </p>
                </div>

                {/* Predict Button */}
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <Battery size={64} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      Enter sensor values and click
                    </p>
                    <p className="text-cyan-400 font-semibold">
                      "Predict SOH & RUL"
                    </p>
                  </div>
                </div>

              ) : result && (
                <div className="space-y-4">

                  {/* SOH Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      State of Health (SOH)
                    </p>
                    <div className="flex items-end gap-3">
                      <p className={`text-6xl font-bold ${healthColor[result.health_status] || 'text-white'}`}>
                        {result.soh}%
                      </p>
                      <span className="text-2xl mb-2">{result.health_icon}</span>
                    </div>
                    <div className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
                      ${result.health_color === 'green'  ? 'bg-green-500/20  text-green-400'  :
                        result.health_color === 'blue'   ? 'bg-blue-500/20   text-blue-400'   :
                        result.health_color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                                                           'bg-red-500/20    text-red-400'}`}>
                      {result.health_status}
                    </div>

                    {/* SOH Progress Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-1000
                            ${result.soh >= 90 ? 'bg-green-400'  :
                              result.soh >= 80 ? 'bg-blue-400'   :
                              result.soh >= 70 ? 'bg-yellow-400' :
                                                 'bg-red-400'}`}
                          style={{ width: `${result.soh}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* RUL Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      Remaining Useful Life (RUL)
                    </p>
                    <p className={`text-5xl font-bold
                      ${result.rul_color === 'green'  ? 'text-green-400'  :
                        result.rul_color === 'yellow' ? 'text-yellow-400' :
                                                        'text-red-400'}`}>
                      {result.rul_cycles} cycles
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {result.rul_status}
                    </p>
                  </div>

                  {/* Driving Range Card */}
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-1">
                      Estimated Driving Range
                    </p>
                    <p className="text-5xl font-bold text-purple-400">
                      {result.estimated_range_km} km
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Based on current SOH
                    </p>
                  </div>

                  {/*  Save as Report Button */}
                  <button
                    onClick={handleSaveReport}
                    disabled={saving}
                    className="w-full py-3 rounded-xl bg-white/10 border border-cyan-500/30 text-cyan-400 font-semibold hover:bg-cyan-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      '💾 Save as Report'
                    )}
                  </button>

                  {/* View Reports Button */}
                  <button
                    onClick={() => navigate('/reports')}
                    className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> View All Reports
                  </button>

                  {/* New Prediction */}
                  <button
                    onClick={() => { setResult(null); setPredicted(false); }}
                    className="w-full py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={16} /> New Prediction
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