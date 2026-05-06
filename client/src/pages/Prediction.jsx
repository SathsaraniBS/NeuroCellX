import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';
import { useAuth }          from '../contexts/AuthContext';
import { useToast }         from '../contexts/ToastContext';
import Sidebar              from '../components/User/UserSidebar';
import {Cpu, Zap, ThermometerSun, RotateCcw,BatteryCharging, ChevronDown, BarChart2,Save, RefreshCw, AlertTriangle, CheckCircle,
TrendingUp, Activity, Download} from 'lucide-react';

// ─── Model list ────────────────────────────────────────────────
const MODELS = [
  { key: 'random_forest',    label: 'Random Forest',              icon: '🌲' },
  { key: 'svr',              label: 'SVR (Support Vector)',        icon: '📐' },
  { key: 'naive_bayes',      label: 'Naive Bayes',                icon: '📊' },
  { key: 'grv_randomforest', label: 'GRU + Random Forest Hybrid', icon: '🔀' },
  { key: 'lstm_transformer', label: 'LSTM + Transformer',         icon: '🤖' },
];

// ─── Health status helper ───────────────────────────────────────
const getHealthStatus = (soh) => {
  if (soh >= 90) return { label: 'Healthy',  color: 'text-green-400',  bg: 'bg-green-500/20',  border: 'border-green-500/30'  };
  if (soh >= 80) return { label: 'Good',     color: 'text-blue-400',   bg: 'bg-blue-500/20',   border: 'border-blue-500/30'   };
  if (soh >= 70) return { label: 'Warning',  color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' };
  return              { label: 'Critical', color: 'text-red-400',    bg: 'bg-red-500/20',    border: 'border-red-500/30'    };
};

// ─── Metric card ────────────────────────────────────────────────
const MetricCard = ({ label, value, unit = '', color = 'text-cyan-400' }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
    <p className="text-gray-400 text-xs mb-1">{label}</p>
    <p className={`text-2xl font-bold ${color}`}>
      {value ?? '—'}{unit}
    </p>
  </div>
);

// ═══════════════════════════════════════════════════════════════
export default function Prediction() {
  const { user }     = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();

  // ── Form state ────────────────────────────────────────────────
  const [selectedModel, setSelectedModel] = useState('');
  const [inputs, setInputs] = useState({
    voltage:     '',
    current:     '',
    temperature: '',
    cycle_count: '',
    capacity:    '',
  });

  // ── Result state ──────────────────────────────────────────────
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Save report state ─────────────────────────────────────────
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [reportName,    setReportName]    = useState('');
  const [batteryId,     setBatteryId]     = useState('');
  const [saving,        setSaving]        = useState(false);

  // ── Input change ──────────────────────────────────────────────
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Reset ─────────────────────────────────────────────────────
  const handleReset = () => {
    setInputs({ voltage: '', current: '', temperature: '', cycle_count: '', capacity: '' });
    setResult(null);
    setSelectedModel('');
  };

  // ── Predict ───────────────────────────────────────────────────
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
          voltage:     parseFloat(voltage),
          current:     parseFloat(current),
          temperature: parseFloat(temperature),
          cycle_count: parseFloat(cycle_count),
          capacity:    parseFloat(capacity),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Prediction failed');
      }

      const data = await res.json();
      setResult(data);
      addToast('Prediction successful ✅', 'success');
    } catch (err) {
      addToast(`Error: ${err.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // ── Save Report ───────────────────────────────────────────────
  const handleSaveReport = async () => {
    if (!reportName.trim()) {
      addToast('Give the report name!', 'error');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('http://localhost:8000/api/reports', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          report_name:    reportName,
          report_type:    selectedModel,
          battery_id:     batteryId || null,
          soh_predicted:  result.soh * 100,
          rul_predicted:  result.rul,
          health_status:  getHealthStatus(result.soh * 100).label,
          voltage:        parseFloat(inputs.voltage),
          current_a:      parseFloat(inputs.current),
          temperature:    parseFloat(inputs.temperature),
          cycle_count:    parseFloat(inputs.cycle_count),
          capacity:       parseFloat(inputs.capacity),
        }),
      });

      if (!res.ok) throw new Error('Save failed');
      addToast('Report saved! ✅', 'success');
      setShowSaveModal(false);
      navigate('/reports');
    } catch (err) {
      addToast('Report was not saved!', 'error');
    } finally {
      setSaving(false);
    }
  };

  // ─── Computed values ─────────────────────────────────────────
  const sohPct    = result ? +(result.soh * 100).toFixed(2) : null;
  const health    = sohPct !== null ? getHealthStatus(sohPct) : null;
  const modelInfo = MODELS.find((m) => m.key === selectedModel);

  // ════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">
              Battery Prediction <span className="text-cyan-400">🔋</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Select an ML model and predict SOH and RUL   
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

          {/* ══ LEFT — Input Panel ══════════════════════════════ */}
          <div className="space-y-6">

            {/* Model Selector */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu size={18} className="text-cyan-400" /> Select ML Model
              </h3>
              <div className="relative">
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50 transition"
                >
                  <option value="" className="bg-[#0b1120]">-- Select a model --</option>
                  {MODELS.map((m) => (
                    <option key={m.key} value={m.key} className="bg-[#0b1120]">
                      {m.icon}  {m.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Selected model badge */}
              {modelInfo && (
                <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <span className="text-lg">{modelInfo.icon}</span>
                  <span className="text-cyan-400 text-sm font-medium">{modelInfo.label} selected</span>
                </div>
              )}
            </div>

            {/* Sensor Inputs */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity size={18} className="text-cyan-400" /> Enter Sensor Data
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Voltage */}
                <div>
                  <label className="block text-gray-400 text-xs mb-2 flex items-center gap-1">
                    <Zap size={12} className="text-yellow-400" /> Voltage (V)
                  </label>
                  <input
                    type="number" name="voltage"
                    value={inputs.voltage} onChange={handleChange}
                    placeholder="e.g. 3.7"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600"
                  />
                </div>

                {/* Current */}
                <div>
                  <label className="block text-gray-400 text-xs mb-2 flex items-center gap-1">
                    <Activity size={12} className="text-blue-400" /> Current (A)
                  </label>
                  <input
                    type="number" name="current"
                    value={inputs.current} onChange={handleChange}
                    placeholder="e.g. 1.5"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600"
                  />
                </div>

                {/* Temperature */}
                <div>
                  <label className="block text-gray-400 text-xs mb-2 flex items-center gap-1">
                    <ThermometerSun size={12} className="text-orange-400" /> Temperature (°C)
                  </label>
                  <input
                    type="number" name="temperature"
                    value={inputs.temperature} onChange={handleChange}
                    placeholder="e.g. 25"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600"
                  />
                </div>

                {/* Cycle Count */}
                <div>
                  <label className="block text-gray-400 text-xs mb-2 flex items-center gap-1">
                    <RotateCcw size={12} className="text-purple-400" /> Cycle Count
                  </label>
                  <input
                    type="number" name="cycle_count"
                    value={inputs.cycle_count} onChange={handleChange}
                    placeholder="e.g. 200"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600"
                  />
                </div>

                {/* Capacity */}
                <div className="col-span-2">
                  <label className="block text-gray-400 text-xs mb-2 flex items-center gap-1">
                    <BatteryCharging size={12} className="text-green-400" /> Capacity (Ah)
                  </label>
                  <input
                    type="number" name="capacity"
                    value={inputs.capacity} onChange={handleChange}
                    placeholder="e.g. 2.0"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600"
                  />
                </div>
              </div>

              {/* Predict Button */}
              <button
                onClick={handlePredict}
                disabled={loading}
                className="w-full mt-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Predicting...
                  </>
                ) : (
                  <>
                    <TrendingUp size={16} /> Predict 
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ══ RIGHT — Results Panel ═══════════════════════════ */}
          <div>
            {!result ? (
              /* Empty state */
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <BatteryCharging size={64} className="text-gray-600 mb-4" />
                <p className="text-gray-400 text-lg">Results can be seen here</p>
                <p className="text-gray-600 text-sm mt-2">
                    Predict using model and sensor data
                </p>
              </div>
            ) : (
              <div className="space-y-4">

                {/* ── SOH + RUL cards ── */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <BarChart2 size={18} className="text-cyan-400" /> Prediction Results
                    <span className="ml-auto text-xs text-gray-500 font-normal">
                      {modelInfo?.icon} {modelInfo?.label}
                    </span>
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* SOH */}
                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-gray-400 text-xs mb-1">State of Health</p>
                      <p className={`text-4xl font-bold ${health.color}`}>
                        {sohPct}%
                      </p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold ${health.bg} ${health.color}`}>
                        {health.label}
                      </span>
                    </div>

                    {/* RUL */}
                    <div className="bg-white/5 rounded-xl p-5 text-center">
                      <p className="text-gray-400 text-xs mb-1">Remaining Useful Life</p>
                      <p className="text-4xl font-bold text-cyan-400">
                        {result.rul?.toFixed ? result.rul.toFixed(0) : result.rul}
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-400">
                        cycles
                      </span>
                    </div>
                  </div>

                  {/* Health bar */}
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-2">
                      <span>Battery Health</span>
                      <span>{sohPct}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-700 ${
                          sohPct >= 90 ? 'bg-green-400'  :
                          sohPct >= 80 ? 'bg-blue-400'   :
                          sohPct >= 70 ? 'bg-yellow-400' :
                                         'bg-red-400'
                        }`}
                        style={{ width: `${Math.min(sohPct, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── SOH Metrics ── */}
                {result.metrics?.soh && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <CheckCircle size={14} className="text-green-400" /> SOH Model Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <MetricCard
                        label="Accuracy"
                        value={result.metrics.soh.Accuracy?.toFixed(2)}
                        unit="%"
                        color="text-green-400"
                      />
                      <MetricCard
                        label="R² Score"
                        value={result.metrics.soh.R2?.toFixed(4)}
                        color="text-cyan-400"
                      />
                      <MetricCard
                        label="MAE"
                        value={result.metrics.soh.MAE?.toFixed(4)}
                        color="text-yellow-400"
                      />
                      {result.metrics.soh.RMSE && (
                        <MetricCard
                          label="RMSE"
                          value={result.metrics.soh.RMSE?.toFixed(4)}
                          color="text-orange-400"
                        />
                      )}
                      {result.metrics.soh.CV_R2 && (
                        <MetricCard
                          label="CV R²"
                          value={result.metrics.soh.CV_R2?.toFixed(4)}
                          color="text-purple-400"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* ── RUL Metrics ── */}
                {result.metrics?.rul && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                      <AlertTriangle size={14} className="text-yellow-400" /> RUL Model Metrics
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <MetricCard
                        label="Accuracy"
                        value={result.metrics.rul.Accuracy?.toFixed(2)}
                        unit="%"
                        color="text-green-400"
                      />
                      <MetricCard
                        label="R² Score"
                        value={result.metrics.rul.R2?.toFixed(4)}
                        color="text-cyan-400"
                      />
                      {result.metrics.rul.MAE_raw && (
                        <MetricCard
                          label="MAE"
                          value={result.metrics.rul.MAE_raw?.toFixed(4)}
                          color="text-yellow-400"
                        />
                      )}
                      {result.metrics.rul.RMSE_raw && (
                        <MetricCard
                          label="RMSE"
                          value={result.metrics.rul.RMSE_raw?.toFixed(4)}
                          color="text-orange-400"
                        />
                      )}
                      {result.metrics.rul.CV_R2 && (
                        <MetricCard
                          label="CV R²"
                          value={result.metrics.rul.CV_R2?.toFixed(4)}
                          color="text-purple-400"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* ── Save Report Button ── */}
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save the report
                </button>

              </div>
            )}
          </div>
        </div>
      </main>

      {/* ══════ SAVE REPORT MODAL ══════════════════════════════ */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl w-full max-w-md">

            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold">Save the report</h3>
              <button onClick={() => setShowSaveModal(false)}>
                <span className="text-gray-400 hover:text-white text-xl">✕</span>
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-xs mb-2">Report Name *</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g. Battery Test - June 2025"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs mb-2">Battery ID (optional)</label>
                <input
                  type="text"
                  value={batteryId}
                  onChange={(e) => setBatteryId(e.target.value)}
                  placeholder="e.g. BAT-001"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition"
                />
              </div>

              {/* Preview */}
              <div className="bg-white/5 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">SOH</span>
                  <span className={`font-bold ${health?.color}`}>{sohPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">RUL</span>
                  <span className="text-cyan-400 font-bold">{result?.rul?.toFixed ? result.rul.toFixed(0) : result?.rul} cycles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Model</span>
                  <span className="text-white">{modelInfo?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`font-semibold ${health?.color}`}>{health?.label}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-white/10">
              <button
                onClick={handleSaveReport}
                disabled={saving}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <><div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" /> Saving...</>
                ) : (
                  <><Save size={16} /> Save Report</>
                )}
              </button>
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
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