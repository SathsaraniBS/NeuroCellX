import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import {
  Cpu, Trash2, Plus, X, CheckCircle, XCircle,
  AlertTriangle, RefreshCw, ChevronDown, ChevronUp,
  FlaskConical, ToggleLeft, ToggleRight, Database,
  Activity, Info, TrendingUp, Pencil
} from 'lucide-react';

// ─── Static model registry ─────────
const DEFAULT_MODELS = [
  {
    key: 'random_forest',
    label: 'Random Forest',
    icon: '🌲',
    type: 'Classical ML',
    file_soh: 'rf_5feat_soh_model.pkl',
    file_rul: 'rf_5feat_rul_model.pkl',
    file_scaler: 'rf_5feat_scaler.pkl',
    notes: 'S1/S2 numeric output. S3 (0–1 range) × 8 fix applied.',
    limitations: '⚠️ RUL range inconsistency for critical battery — fixed with ×8 multiplier.',
    accuracy_note: 'High for healthy/mid-life. Moderate for critical.',
    enabled: true,
  },
  {
    key: 'svr',
    label: 'SVR (Support Vector)',
    icon: '📐',
    type: 'Classical ML',
    file_soh: 'svr_5feat_soh_model.pkl',
    file_rul: 'svr_5feat_rul_model.pkl',
    file_scaler: 'svr_5feat_scaler.pkl',
    notes: 'All scenarios produce identical output (SOH=84.61%, RUL=37).',
    limitations: '⚠️ Outputs clamped to support vector boundary. Cannot differentiate scenarios without retraining.',
    accuracy_note: 'Low — identical predictions regardless of input.',
    enabled: true,
  },
  {
    key: 'naive_bayes',
    label: 'Naive Bayes',
    icon: '📊',
    type: 'Probabilistic',
    file_soh: 'nb_5feat_soh_model.pkl',
    file_rul: 'nb_5feat_rul_model.pkl',
    file_scaler: null,
    notes: 'Categorical output mapped to numeric: Poor→62%, End→5 cycles.',
    limitations: '⚠️ Model always predicts "Poor/End" (100% confident). Requires retraining.',
    accuracy_note: 'Low — model bias toward worst-case class.',
    enabled: true,
  },
  {
    key: 'gru_randomforest',
    label: 'GRU + Random Forest Hybrid',
    icon: '🔀',
    type: 'Hybrid Deep Learning',
    file_soh: 'gru_rf_5feat_soh_model.pkl',
    file_rul: 'gru_rf_5feat_rul_model.pkl',
    file_scaler: 'gru_rf_5feat_feat_scaler.pkl',
    notes: 'RUL calibrated: (raw + 0.05) / 0.50 × 150 cycles.',
    limitations: 'Mid-life RUL slightly low due to training data distribution.',
    accuracy_note: 'Good for healthy/critical. Mid-life RUL moderate.',
    enabled: true,
  },
  {
    key: 'lstm_transformer',
    label: 'LSTM + Transformer',
    icon: '🤖',
    type: 'Deep Learning',
    file_soh: 'soh_model (3).keras',
    file_rul: 'rul_model (3).keras',
    file_scaler: 'feature_scaler (3).joblib',
    notes: 'SOH is inverted → negated. Linear calibration from 3 scenarios applied.',
    limitations: 'Requires TensorFlow. SOH inversion workaround in place.',
    accuracy_note: 'Best overall — deep temporal feature extraction.',
    enabled: true,
  },
];

const TYPE_COLORS = {
  'Classical ML':          'bg-blue-500/20 text-blue-400',
  'Probabilistic':         'bg-purple-500/20 text-purple-400',
  'Hybrid Deep Learning':  'bg-amber-500/20 text-amber-400',
  'Deep Learning':         'bg-emerald-500/20 text-emerald-400',
};

const EMPTY_MODEL = {
  key: '', label: '', icon: '🔮', type: 'Classical ML',
  file_soh: '', file_rul: '', file_scaler: '',
  notes: '', limitations: '', accuracy_note: '', enabled: true,
};

// ─────────────────────────────────────────────────────────────────
const AdminPrediction = ({ showAddModal, setShowAddModal, onModelChange }) => {
  const { addToast } = useToast();

  const [models, setModels]               = useState(DEFAULT_MODELS);
  const [loading, setLoading]             = useState(true);
  const [backendStatus, setBackendStatus] = useState({});
  const [expandedKey, setExpandedKey]     = useState(null);

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModel, setEditModel]         = useState(null);

  // Quick test
  const [testKey, setTestKey]       = useState('');
  const [testResult, setTestResult] = useState(null);
  const [testLoading, setTestLoading] = useState(false);

  // New model form state (used by the Add modal controlled from parent)
  const [newModel, setNewModel] = useState(EMPTY_MODEL);

  // ── Fetch backend loaded-model status ──────────────────────────
  const fetchBackendStatus = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/ml/debug-models');
      setBackendStatus(res.data || {});
    } catch {
      addToast('Could not reach backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBackendStatus(); }, []);

  // ── Toggle enable / disable ─────────────────────────────────────
  const handleToggle = (key) => {
    const m = models.find(x => x.key === key);
    setModels(prev => prev.map(x => x.key === key ? { ...x, enabled: !x.enabled } : x));
    addToast(`${m.label} ${m.enabled ? 'disabled' : 'enabled'}`, 'success');
    if (onModelChange) onModelChange();
  };

  // ── Delete ──────────────────────────────────────────────────────
  const handleDelete = (key, label) => {
    if (!window.confirm(`Remove model "${label}" from registry?`)) return;
    setModels(prev => prev.filter(m => m.key !== key));
    addToast('Model removed from registry', 'success');
    if (onModelChange) onModelChange();
  };

  // ── Add ─────────────────────────────────────────────────────────
  const handleAddModel = () => {
    if (!newModel.key.trim() || !newModel.label.trim()) {
      addToast('Key and Label are required!', 'error');
      return;
    }
    if (models.find(m => m.key === newModel.key)) {
      addToast('Model key already exists!', 'error');
      return;
    }
    setModels(prev => [...prev, { ...newModel }]);
    addToast('New model added successfully!', 'success');
    setShowAddModal(false);
    setNewModel(EMPTY_MODEL);
    if (onModelChange) onModelChange();
  };

  // ── Edit ────────────────────────────────────────────────────────
  const handleEditModel = () => {
    setModels(prev => prev.map(m => m.key === editModel.key ? { ...editModel } : m));
    addToast('Model updated successfully!', 'success');
    setShowEditModal(false);
    if (onModelChange) onModelChange();
  };

  // ── Quick Test ──────────────────────────────────────────────────
  const handleTest = async () => {
    if (!testKey) { addToast('Select a model to test', 'error'); return; }
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await api.post('/api/ml/predict', {
        model_key: testKey,
        Capacity: 2.0, Voltage: 4.1, Current: 1.5, Temperature: 24, CycleCount: 10,
      });
      setTestResult(res.data);
      if (res.data.status === 'success') {
        addToast(`Test passed ✅  SOH=${res.data.predictions.SOH}%`, 'success');
      } else {
        addToast(res.data.message || 'Test failed', 'error');
      }
    } catch {
      addToast('Backend unreachable', 'error');
    } finally {
      setTestLoading(false);
    }
  };

  // ── Loading state ────────────────────────────────────────────────
  if (loading)
    return <div className="p-10 text-center text-cyan-400">Loading model status...</div>;

  // ── Stats ────────────────────────────────────────────────────────
  const stats = {
    total:   models.length,
    active:  models.filter(m => m.enabled).length,
    limited: models.filter(m => m.limitations?.includes('⚠️')).length,
    loaded:  Object.keys(backendStatus).length,
  };

  return (
    <div className="space-y-6 animate-fade-in p-4">

      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-cyan-400">ML Model Management</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage, test and analyse prediction models</p>
        </div>
        <button
          onClick={fetchBackendStatus}
          className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition text-sm"
        >
          <RefreshCw size={14} /> Refresh Status
        </button>
      </div>

      {/* ── Stat Cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Models',      value: stats.total,   color: 'text-cyan-400'    },
          { label: 'Active Models',     value: stats.active,  color: 'text-emerald-400' },
          { label: 'Has Limitations',   value: stats.limited, color: 'text-amber-400'   },
          { label: 'Loaded in Backend', value: stats.loaded,  color: 'text-purple-400'  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="text-gray-500 text-xs mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Model Cards ─────────────────────────────────────────── */}
      <div className="space-y-4">
        {models.length === 0 ? (
          <p className="text-gray-500">No models registered.</p>
        ) : (
          models.map((model) => {
            const isLoaded   = !!backendStatus[model.key];
            const isExpanded = expandedKey === model.key;
            const typeColor  = TYPE_COLORS[model.type] || TYPE_COLORS['Classical ML'];
            const info       = backendStatus[model.key];

            return (
              <div
                key={model.key}
                className={`group bg-white/5 border rounded-2xl overflow-hidden hover:border-cyan-500/30 transition shadow-xl
                  ${model.enabled ? 'border-white/10' : 'border-white/5 opacity-60'}`}
              >
                {/* ── Card Row ────────────────────────────────── */}
                <div className="flex items-center gap-4 p-5">
                  <span className="text-2xl">{model.icon}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white">{model.label}</h3>
                      <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${typeColor}`}>
                        {model.type}
                      </span>
                      {isLoaded ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle className="w-2.5 h-2.5" /> Loaded
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                          <XCircle className="w-2.5 h-2.5" /> Not Loaded
                        </span>
                      )}
                      {model.limitations?.includes('⚠️') && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          <AlertTriangle className="w-2.5 h-2.5" /> Limitation
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 font-mono">{model.key}</p>
                  </div>

                  {/* Actions — opacity-0 → group-hover:opacity-100 (same as AdminContacts) */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggle(model.key)}
                      className={`p-2 rounded-lg transition-colors ${
                        model.enabled
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
                      }`}
                      title={model.enabled ? 'Disable model' : 'Enable model'}
                    >
                      {model.enabled
                        ? <ToggleRight className="w-4 h-4" />
                        : <ToggleLeft  className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditModel({ ...model }); setShowEditModal(true); }}
                      className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Edit model"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setExpandedKey(isExpanded ? null : model.key)}
                      className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-colors"
                      title="View details"
                    >
                      {isExpanded
                        ? <ChevronUp   className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleDelete(model.key, model.label)}
                      className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Remove model"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* ── Expanded Detail ──────────────────────────── */}
                {isExpanded && (
                  <div className="border-t border-white/5 p-5 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Model Files */}
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500 mb-3 flex items-center gap-1">
                        <Database className="w-3 h-3" /> Model Files
                      </p>
                      <div className="space-y-2">
                        {[
                          { label: 'SOH Model', val: model.file_soh },
                          { label: 'RUL Model', val: model.file_rul },
                          { label: 'Scaler',    val: model.file_scaler || 'None' },
                        ].map(({ label, val }) => (
                          <div key={label} className="flex justify-between items-center bg-white/5 rounded-xl px-3 py-2">
                            <span className="text-gray-400 text-xs">{label}</span>
                            <span className={`text-xs font-mono ${val === 'None' ? 'text-gray-600' : 'text-cyan-300'}`}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Backend Runtime Info */}
                    <div>
                      <p className="text-[10px] font-bold uppercase text-gray-500 mb-3 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Backend Runtime
                      </p>
                      {info ? (
                        <div className="space-y-2">
                          {[
                            { label: 'SOH Type',    val: info.soh_type },
                            { label: 'RUL Type',    val: info.rul_type },
                            { label: 'SOH Classes', val: info.soh_classes?.join(', ') || '—' },
                            { label: 'RUL Classes', val: info.rul_classes?.join(', ') || '—' },
                            { label: 'Keras SOH',   val: info.is_keras_soh ? 'Yes' : 'No' },
                            { label: 'Keras RUL',   val: info.is_keras_rul ? 'Yes' : 'No' },
                          ].map(({ label, val }) => (
                            <div key={label} className="flex justify-between items-center bg-white/5 rounded-xl px-3 py-2">
                              <span className="text-gray-400 text-xs">{label}</span>
                              <span className="text-xs font-mono text-white">{val}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-red-400 text-sm">
                          <XCircle className="w-4 h-4" /> Not loaded in backend. Check model files.
                        </div>
                      )}
                    </div>

                    {/* Notes / Limitations / Accuracy */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1">
                          <Info className="w-3 h-3" /> Notes
                        </p>
                        <p className="text-gray-300 text-xs italic">"{model.notes || '—'}"</p>
                      </div>
                      <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/10">
                        <p className="text-[10px] uppercase font-bold text-amber-500 mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Limitations
                        </p>
                        <p className="text-gray-300 text-xs">{model.limitations || 'None'}</p>
                      </div>
                      <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
                        <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" /> Accuracy Note
                        </p>
                        <p className="text-gray-300 text-xs">{model.accuracy_note || '—'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ── Quick Test Panel ────────────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
          <FlaskConical size={18} className="text-cyan-400" /> Quick Model Test
        </h3>
        <p className="text-gray-500 text-xs mb-4">
          Uses healthy battery defaults — Cap: 2.0 Ah, V: 4.1 V, I: 1.5 A, T: 24 °C, Cycles: 10
        </p>
        <div className="flex gap-3 flex-wrap">
          <select
            value={testKey}
            onChange={e => { setTestKey(e.target.value); setTestResult(null); }}
            className="bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition min-w-[240px] text-sm"
          >
            <option value="">-- Select model to test --</option>
            {models.filter(m => m.enabled).map(m => (
              <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
            ))}
          </select>
          <button
            onClick={handleTest}
            disabled={testLoading || !testKey}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold text-sm hover:brightness-110 transition disabled:opacity-50"
          >
            {testLoading ? 'Testing...' : 'Run Test'}
          </button>
        </div>
        {testResult && (
          <div className={`mt-4 p-4 rounded-xl border text-sm flex items-center gap-4 flex-wrap
            ${testResult.status === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
              : 'bg-red-500/10 border-red-500/20 text-red-300'}`}
          >
            {testResult.status === 'success' ? (
              <>
                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Test Passed</span>
                <span>SOH: <strong>{testResult.predictions.SOH}%</strong></span>
                <span>RUL: <strong>{testResult.predictions.RUL} cycles</strong></span>
              </>
            ) : (
              <span className="flex items-center gap-1"><XCircle className="w-4 h-4" /> {testResult.message}</span>
            )}
          </div>
        )}
      </div>

      {/* ── Comparison Table ─────────────────────────────────────── */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/5">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" /> Model Comparison
          </h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-white/5 text-gray-400 text-xs uppercase">
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Backend</th>
              <th className="p-4 text-left">Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {models.map((m) => {
              const tc   = TYPE_COLORS[m.type] || TYPE_COLORS['Classical ML'];
              const low  = m.accuracy_note?.toLowerCase().includes('low') || m.accuracy_note?.toLowerCase().includes('identical');
              const high = m.accuracy_note?.toLowerCase().includes('best') || m.accuracy_note?.toLowerCase().includes('high');
              return (
                <tr key={m.key} className="border-t border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 font-medium">
                    <span className="mr-2">{m.icon}</span>{m.label}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${tc}`}>
                      {m.type}
                    </span>
                  </td>
                  <td className="p-4">
                    {m.enabled
                      ? <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Active</span>
                      : <span className="text-gray-500 text-xs flex items-center gap-1"><XCircle className="w-3 h-3" /> Disabled</span>}
                  </td>
                  <td className="p-4">
                    {backendStatus[m.key]
                      ? <span className="text-emerald-400 text-xs">✅ Loaded</span>
                      : <span className="text-red-400 text-xs">❌ Not Loaded</span>}
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold ${high ? 'text-emerald-400' : low ? 'text-red-400' : 'text-amber-400'}`}>
                      {high ? '🟢 High' : low ? '🔴 Low' : '🟡 Moderate'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {models.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400">No models registered.</p>
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ADD MODEL MODAL                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 w-full max-w-lg my-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add New Model</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Model Key *</label>
                  <input
                    type="text"
                    placeholder="e.g. xgboost"
                    value={newModel.key}
                    onChange={e => setNewModel({ ...newModel, key: e.target.value.replace(/\s/g, '_') })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Display Label *</label>
                  <input
                    type="text"
                    placeholder="e.g. XGBoost"
                    value={newModel.label}
                    onChange={e => setNewModel({ ...newModel, label: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Icon (emoji)</label>
                  <input
                    type="text"
                    placeholder="🔮"
                    value={newModel.icon}
                    onChange={e => setNewModel({ ...newModel, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Type</label>
                  <select
                    value={newModel.type}
                    onChange={e => setNewModel({ ...newModel, type: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0b1220] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60 text-sm"
                  >
                    {Object.keys(TYPE_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {[
                { field: 'file_soh',      label: 'SOH Model File',  ph: 'e.g. xgb_soh.pkl' },
                { field: 'file_rul',      label: 'RUL Model File',  ph: 'e.g. xgb_rul.pkl' },
                { field: 'file_scaler',   label: 'Scaler File',     ph: 'e.g. xgb_scaler.pkl (optional)' },
                { field: 'notes',         label: 'Notes',           ph: 'Calibration notes...' },
                { field: 'limitations',   label: 'Limitations',     ph: 'Known limitations...' },
                { field: 'accuracy_note', label: 'Accuracy Note',   ph: 'e.g. High accuracy for healthy batteries' },
              ].map(({ field, label, ph }) => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>
                  <input
                    type="text"
                    placeholder={ph}
                    value={newModel[field]}
                    onChange={e => setNewModel({ ...newModel, [field]: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddModel}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition"
              >
                Add Model
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════ */}
      {/* EDIT MODEL MODAL                                          */}
      {/* ══════════════════════════════════════════════════════════ */}
      {showEditModal && editModel && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 w-full max-w-lg my-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit Model</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>
            <div className="space-y-4">
              {/* Key — read-only (same pattern as disabled email in AdminUsers) */}
              <div>
                <label className="block text-gray-400 text-xs mb-1 uppercase">Model Key</label>
                <input
                  type="text"
                  value={editModel.key}
                  disabled
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed text-sm font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Display Label</label>
                  <input
                    type="text"
                    value={editModel.label}
                    onChange={e => setEditModel({ ...editModel, label: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Type</label>
                  <select
                    value={editModel.type}
                    onChange={e => setEditModel({ ...editModel, type: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0b1220] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60 text-sm"
                  >
                    {Object.keys(TYPE_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              {[
                { field: 'notes',         label: 'Notes' },
                { field: 'limitations',   label: 'Limitations' },
                { field: 'accuracy_note', label: 'Accuracy Note' },
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>
                  <input
                    type="text"
                    value={editModel[field] || ''}
                    onChange={e => setEditModel({ ...editModel, [field]: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 text-sm"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditModel}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPrediction;