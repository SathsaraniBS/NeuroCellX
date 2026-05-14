import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import { useAuth }          from '../contexts/AuthContext';
import { useToast }         from '../contexts/ToastContext';
import { createReport }     from '../services/reportService';   // ✅ service import
import Sidebar              from '../components/User/UserSidebar';
import { Cpu, BatteryCharging, BarChart2, Save, RefreshCw, Activity } from 'lucide-react';

const MODELS = [
  { key: 'random_forest',    label: 'Random Forest',              icon: '🌲' },
  { key: 'svr',              label: 'SVR (Support Vector)',       icon: '📐' },
  { key: 'naive_bayes',      label: 'Naive Bayes',                icon: '📊' },
  { key: 'gru_randomforest', label: 'GRU + Random Forest Hybrid', icon: '🔀' },
  { key: 'lstm_transformer', label: 'LSTM + Transformer',         icon: '🤖' },
];

const getHealthStatus = (soh) => {
  if (soh >= 90) return { label: 'Healthy',            color: 'text-green-400',  bg: 'bg-green-500/20',  border: 'border-green-500/30'  };
  if (soh >= 75) return { label: 'Fair / Moderate',    color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
  return              { label: 'Critical / Replace',   color: 'text-red-400',    bg: 'bg-red-500/20',    border: 'border-red-500/30'    };
};

export default function Prediction() {
  const { user }     = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();

  const [selectedModel, setSelectedModel] = useState('');
  const [inputs, setInputs] = useState({
    voltage: '', current: '', temperature: '', cycle_count: '', capacity: '',
  });

  const [result,        setResult]        = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [reportName,    setReportName]    = useState('');
  const [batteryId,     setBatteryId]     = useState('');
  const [saving,        setSaving]        = useState(false);

  const handleChange = (e) =>
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleReset = () => {
    setInputs({ voltage: '', current: '', temperature: '', cycle_count: '', capacity: '' });
    setResult(null);
    setSelectedModel('');
    setReportName('');
    setBatteryId('');
  };

  // ── Predict ────────────────────────────────────────────────────────────────
  const handlePredict = async () => {
    if (!selectedModel) {
      addToast('Please select a model!', 'error');
      return;
    }
    const { voltage, current, temperature, cycle_count, capacity } = inputs;
    if (!voltage || !current || !temperature || !cycle_count || !capacity) {
      addToast('Please fill in all fields!', 'error');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:8000/api/ml/predict', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_key:   selectedModel,
          Capacity:    parseFloat(capacity),
          Voltage:     parseFloat(voltage),
          Current:     parseFloat(current),
          Temperature: parseFloat(temperature),
          CycleCount:  parseFloat(cycle_count),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Prediction failed');
      }

      const data = await res.json();

      if (data.status === 'success') {
        setResult({
          soh:     data.predictions.SOH,
          rul:     data.predictions.RUL,
          metrics: data.metrics || null,
        });
        addToast('Prediction successful ✅', 'success');
      } else {
        throw new Error(data.message || 'Error in prediction');
      }

    } catch (err) {
      addToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── Save Report — ✅ createReport() service use කරනවා (direct fetch නෙවෙයි) ──
  const handleSaveReport = async () => {
    if (!reportName.trim()) {
      addToast('Give the report name!', 'error');
      return;
    }
    setSaving(true);
    try {
      await createReport({
        report_name:   reportName,
        report_type:   selectedModel,
        battery_id:    batteryId || null,
        soh_predicted: result.soh,
        rul_predicted: result.rul,
        health_status: getHealthStatus(result.soh).label,
        voltage:       parseFloat(inputs.voltage),
        current_a:     parseFloat(inputs.current),
        temperature:   parseFloat(inputs.temperature),
        cycle_count:   parseFloat(inputs.cycle_count),
        capacity:      parseFloat(inputs.capacity),
      });

      addToast('Report saved! ✅', 'success');
      setShowSaveModal(false);
      navigate('/reports');

    } catch (err) {
      // ✅ Exact error message console එකේ පෙන්වනවා — debug කරන්න ලේසියි
      console.error('Save report error:', err);
      addToast(`Report was not saved! ${err?.response?.data?.detail || err.message}`, 'error');
    } finally {
      setSaving(false);
    }
  };

  const sohPct = result ? +(result.soh).toFixed(2) : null;
  const health = sohPct !== null ? getHealthStatus(sohPct) : null;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Battery Prediction <span className="text-cyan-400">🔋</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Simulate healthy, mid-life, or critical battery scenarios
            </p>
            <p className="text-2xl text-white/50 mt-2">
               * Based on NASA CALCE research dataset.
            For demonstration purposes only.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-5 py-2.5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition text-sm"
          >
            <RefreshCw size={15} /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Left — Inputs */}
          <div className="space-y-6">

            {/* Model Select */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" /> Select ML Model
              </h3>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition"
              >
                <option value="">-- Select a model --</option>
                {MODELS.map((m) => (
                  <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
                ))}
              </select>
            </div>

            {/* Sensor Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" /> Enter Sensor Data
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'voltage',     label: 'Voltage (V)',     placeholder: 'e.g. 4.1' },
                  { name: 'current',     label: 'Current (A)',     placeholder: 'e.g. 1.5' },
                  { name: 'temperature', label: 'Temperature (°C)', placeholder: 'e.g. 24'  },
                  { name: 'cycle_count', label: 'Cycle Count',     placeholder: 'e.g. 10'  },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-gray-400 text-xs mb-2">{field.label}</label>
                    <input
                      type="number" name={field.name} value={inputs[field.name]}
                      onChange={handleChange} placeholder={field.placeholder}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500/50 outline-none"
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-gray-400 text-xs mb-2">Capacity (Ah)</label>
                  <input
                    type="number" name="capacity" value={inputs.capacity}
                    onChange={handleChange} placeholder="e.g. 2.0"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500/50 outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Predict Health'}
              </button>
            </div>
          </div>

          {/* Right — Results */}
          <div>
            {!result ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <BatteryCharging size={64} className="text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Results will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <BarChart2 size={18} className="text-cyan-400" /> Analysis Result
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-5 text-center border border-white/5">
                      <p className="text-gray-400 text-xs mb-1">State of Health</p>
                      <p className={`text-4xl font-bold ${health.color}`}>{sohPct}%</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${health.bg} ${health.color}`}>
                        {health.label}
                      </span>
                    </div>
                    <div className="bg-white/5 rounded-xl p-5 text-center border border-white/5">
                      <p className="text-gray-400 text-xs mb-1">Remaining Life</p>
                      <p className="text-4xl font-bold text-cyan-400">{result.rul?.toFixed(0)}</p>
                      <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 uppercase">Cycles</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase mb-2">
                      <span>Health Bar</span><span>{sohPct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          sohPct >= 90 ? 'bg-green-400' : sohPct >= 75 ? 'bg-yellow-400' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(sohPct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Prediction Report
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ══ SAVE MODAL ══════════════════════════════════════════════════════════ */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Save Prediction Report</h3>
              <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase">Report Title</label>
                <input
                  type="text" value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g. Battery A-12 Test"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2 uppercase">Battery ID (Optional)</label>
                <input
                  type="text" value={batteryId}
                  onChange={(e) => setBatteryId(e.target.value)}
                  placeholder="e.g. BATT-001"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSaveReport}
                disabled={saving}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold hover:brightness-110 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Confirm & Save'}
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}