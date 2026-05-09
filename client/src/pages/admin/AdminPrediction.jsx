import React, { useState, useEffect } from 'react';
import {
  Cpu, Trash2, PlusCircle, BarChart2, Activity, AlertTriangle,
  CheckCircle, RefreshCw, Eye, TrendingUp, Database, Zap,
  ShieldCheck, XCircle, ChevronDown, ChevronUp, Settings,
  FlaskConical, ToggleLeft, ToggleRight, Info
} from 'lucide-react';

// ─── Sidebar Placeholder (AdminSidebar use ) ───────────────
import Sidebar from '../components/Admin/AdminSidebar';

// ─── Hardcoded model registry (backend  models list) ─────────
const MODEL_REGISTRY = [
  {
    key: 'random_forest',
    label: 'Random Forest',
    icon: '🌲',
    type: 'Classical ML',
    file_soh: 'rf_5feat_soh_model.pkl',
    file_rul: 'rf_5feat_rul_model.pkl',
    file_scaler: 'rf_5feat_scaler.pkl',
    notes: 'S1/S2 numeric output. S3 (0-1 range) × 8 fix applied.',
    limitations: 'RUL range inconsistency for critical battery — fixed with ×8 multiplier.',
    accuracy_note: 'High accuracy for healthy/mid-life. Moderate for critical.',
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
    limitations: '⚠️ Model outputs clamped to support vector boundary. Cannot differentiate scenarios without retraining.',
    accuracy_note: 'Low — identical predictions regardless of input.',
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
    limitations: '⚠️ Model always predicts "Poor/End" (100% confident). Requires retraining for variability.',
    accuracy_note: 'Low — model bias toward worst-case class.',
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
  },
];

const TYPE_COLORS = {
  'Classical ML':       { bg: 'bg-blue-500/10',   text: 'text-blue-400',   border: 'border-blue-500/20'   },
  'Probabilistic':      { bg: 'bg-purple-500/10',  text: 'text-purple-400', border: 'border-purple-500/20' },
  'Hybrid Deep Learning':{ bg: 'bg-amber-500/10',  text: 'text-amber-400',  border: 'border-amber-500/20'  },
  'Deep Learning':      { bg: 'bg-emerald-500/10', text: 'text-emerald-400',border: 'border-emerald-500/20'},
};

const STAT_CARDS = [
  { label: 'Total Models',      icon: Cpu,       key: 'total',    color: 'text-cyan-400'    },
  { label: 'Active Models',     icon: CheckCircle,key: 'active',  color: 'text-emerald-400' },
  { label: 'With Limitations',  icon: AlertTriangle, key: 'limited', color: 'text-amber-400' },
  { label: 'Deep Learning',     icon: Zap,        key: 'deep',    color: 'text-purple-400'  },
];

export default function AdminPrediction() {
  const [models, setModels]                 = useState(MODEL_REGISTRY.map(m => ({ ...m, enabled: true })));
  const [loadedStatus, setLoadedStatus]     = useState({});
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [expandedKey, setExpandedKey]       = useState(null);
  const [showAddModal, setShowAddModal]     = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [testModelKey, setTestModelKey]     = useState('');
  const [testResult, setTestResult]         = useState(null);
  const [testLoading, setTestLoading]       = useState(false);
  const [toast, setToast]                   = useState(null);

  const [newModel, setNewModel] = useState({
    key: '', label: '', icon: '🔮', type: 'Classical ML',
    file_soh: '', file_rul: '', file_scaler: '', notes: '', limitations: '', accuracy_note: '',
  });

  // ── Toast helper ──────────────────────────────────────────────
  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // ── Fetch backend debug-models status ─────────────────────────
  const fetchLoadedStatus = async () => {
    setFetchingStatus(true);
    try {
      const res = await fetch('http://localhost:8000/api/ml/debug-models');
      if (res.ok) {
        const data = await res.json();
        setLoadedStatus(data);
        showToast('Backend model status refreshed ✅');
      } else {
        showToast('Backend unreachable', 'error');
      }
    } catch {
      showToast('Cannot connect to backend', 'error');
    } finally {
      setFetchingStatus(false);
    }
  };

  useEffect(() => { fetchLoadedStatus(); }, []);

  // ── Stats ──────────────────────────────────────────────────────
  const stats = {
    total:   models.length,
    active:  models.filter(m => m.enabled).length,
    limited: models.filter(m => m.limitations?.includes('⚠️')).length,
    deep:    models.filter(m => m.type.includes('Deep')).length,
  };

  // ── Toggle model enabled/disabled ──────────────────────────────
  const toggleModel = (key) => {
    setModels(prev => prev.map(m => m.key === key ? { ...m, enabled: !m.enabled } : m));
    const m = models.find(x => x.key === key);
    showToast(`${m.label} ${m.enabled ? 'disabled' : 'enabled'}`);
  };

  // ── Delete model ───────────────────────────────────────────────
  const deleteModel = (key) => {
    setModels(prev => prev.filter(m => m.key !== key));
    setShowDeleteConfirm(null);
    showToast('Model removed from registry', 'error');
  };

  // ── Add new model ──────────────────────────────────────────────
  const addModel = () => {
    if (!newModel.key || !newModel.label) {
      showToast('Key and Label are required!', 'error');
      return;
    }
    if (models.find(m => m.key === newModel.key)) {
      showToast('Model key already exists!', 'error');
      return;
    }
    setModels(prev => [...prev, { ...newModel, enabled: true }]);
    setShowAddModal(false);
    setNewModel({ key:'',label:'',icon:'🔮',type:'Classical ML',file_soh:'',file_rul:'',file_scaler:'',notes:'',limitations:'',accuracy_note:'' });
    showToast('New model added ✅');
  };

  // ── Quick Test (real prediction) ───────────────────────────────
  const runTest = async () => {
    if (!testModelKey) { showToast('Select a model to test', 'error'); return; }
    setTestLoading(true);
    setTestResult(null);
    try {
      const res = await fetch('http://localhost:8000/api/ml/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model_key: testModelKey,
          Capacity: 2.0, Voltage: 4.1, Current: 1.5, Temperature: 24, CycleCount: 10,
        }),
      });
      const data = await res.json();
      setTestResult(data);
      if (data.status === 'success') showToast(`Test passed ✅ SOH=${data.predictions.SOH}%`);
      else showToast(data.message || 'Test failed', 'error');
    } catch (e) {
      showToast('Backend unreachable', 'error');
    } finally {
      setTestLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      {/* ── Toast ─────────────────────────────────────────────── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2 transition-all
          ${toast.type === 'error' ? 'bg-red-500/20 border border-red-500/40 text-red-300' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'}`}>
          {toast.type === 'error' ? <XCircle size={16} /> : <CheckCircle size={16} />}
          {toast.msg}
        </div>
      )}

      <main className="flex-1 p-8 overflow-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Settings size={28} className="text-cyan-400" />
              ML Model Management
              <span className="text-sm font-normal text-gray-400 ml-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">Admin</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">Manage, enable/disable, test and analyze prediction models</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchLoadedStatus}
              disabled={fetchingStatus}
              className="flex items-center gap-2 px-4 py-2.5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition text-sm"
            >
              <RefreshCw size={14} className={fetchingStatus ? 'animate-spin' : ''} />
              {fetchingStatus ? 'Refreshing...' : 'Refresh Status'}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold rounded-xl hover:brightness-110 transition text-sm"
            >
              <PlusCircle size={15} /> Add Model
            </button>
          </div>
        </div>

        {/* ── Stat Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map(({ label, icon: Icon, key, color }) => (
            <div key={key} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-white/5 ${color}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-gray-400 text-xs">{label}</p>
                <p className={`text-3xl font-bold ${color}`}>{stats[key]}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Models List ─────────────────────────────────────── */}
        <div className="space-y-4 mb-8">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <Database size={18} className="text-cyan-400" /> Registered Models
          </h3>

          {models.map((model) => {
            const tc = TYPE_COLORS[model.type] || TYPE_COLORS['Classical ML'];
            const backendInfo = loadedStatus[model.key];
            const isLoaded = !!backendInfo;
            const isExpanded = expandedKey === model.key;

            return (
              <div key={model.key}
                className={`bg-white/5 border rounded-2xl overflow-hidden transition-all duration-300
                  ${model.enabled ? 'border-white/10' : 'border-white/5 opacity-60'}`}
              >
                {/* Row header */}
                <div className="flex items-center gap-4 p-5">
                  <span className="text-2xl">{model.icon}</span>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-white">{model.label}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${tc.bg} ${tc.text} ${tc.border}`}>
                        {model.type}
                      </span>
                      {/* Backend load status */}
                      {isLoaded ? (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                          <CheckCircle size={10} /> Loaded
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full">
                          <XCircle size={10} /> Not Loaded
                        </span>
                      )}
                      {model.limitations?.includes('⚠️') && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          <AlertTriangle size={10} /> Has Limitations
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-xs mt-0.5 font-mono">{model.key}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Enable/Disable toggle */}
                    <button
                      onClick={() => toggleModel(model.key)}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition
                        ${model.enabled
                          ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                          : 'border-gray-500/30 text-gray-400 hover:bg-white/5'}`}
                    >
                      {model.enabled ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                      {model.enabled ? 'Enabled' : 'Disabled'}
                    </button>

                    {/* Expand */}
                    <button
                      onClick={() => setExpandedKey(isExpanded ? null : model.key)}
                      className="p-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 transition"
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setShowDeleteConfirm(model.key)}
                      className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-white/5 p-5 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/[0.02]">

                    {/* Model Files */}
                    <div>
                      <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2">
                        <Database size={12} /> Model Files
                      </h4>
                      <div className="space-y-2">
                        {[
                          { label: 'SOH Model',   val: model.file_soh },
                          { label: 'RUL Model',   val: model.file_rul },
                          { label: 'Scaler',      val: model.file_scaler || 'None' },
                        ].map(({ label, val }) => (
                          <div key={label} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                            <span className="text-gray-400 text-xs">{label}</span>
                            <span className={`text-xs font-mono ${val === 'None' ? 'text-gray-600' : 'text-cyan-300'}`}>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Backend Info */}
                    <div>
                      <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 flex items-center gap-2">
                        <Activity size={12} /> Backend Info
                      </h4>
                      {backendInfo ? (
                        <div className="space-y-2">
                          {[
                            { label: 'SOH Model Type', val: backendInfo.soh_type },
                            { label: 'RUL Model Type', val: backendInfo.rul_type },
                            { label: 'SOH Classes', val: backendInfo.soh_classes?.join(', ') || '—' },
                            { label: 'RUL Classes', val: backendInfo.rul_classes?.join(', ') || '—' },
                            { label: 'Keras SOH', val: backendInfo.is_keras_soh ? 'Yes' : 'No' },
                            { label: 'Keras RUL', val: backendInfo.is_keras_rul ? 'Yes' : 'No' },
                          ].map(({ label, val }) => (
                            <div key={label} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
                              <span className="text-gray-400 text-xs">{label}</span>
                              <span className="text-xs font-mono text-white">{val}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 text-sm bg-white/5 rounded-xl p-4">
                          <XCircle size={14} className="text-red-400" />
                          Not loaded in backend. Check model files.
                        </div>
                      )}
                    </div>

                    {/* Notes & Limitations */}
                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 flex items-center gap-1"><Info size={10}/> Notes</p>
                        <p className="text-gray-300 text-xs">{model.notes || '—'}</p>
                      </div>
                      <div className="bg-amber-500/5 rounded-xl p-4 border border-amber-500/10">
                        <p className="text-[10px] uppercase font-bold text-amber-500 mb-1 flex items-center gap-1"><AlertTriangle size={10}/> Limitations</p>
                        <p className="text-gray-300 text-xs">{model.limitations || 'None'}</p>
                      </div>
                      <div className="bg-emerald-500/5 rounded-xl p-4 border border-emerald-500/10">
                        <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1 flex items-center gap-1"><TrendingUp size={10}/> Accuracy Note</p>
                        <p className="text-gray-300 text-xs">{model.accuracy_note || '—'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── Quick Test Panel ─────────────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FlaskConical size={18} className="text-cyan-400" /> Quick Model Test
            <span className="text-xs text-gray-500 font-normal ml-1">(Uses healthy battery defaults: Cap=2.0, V=4.1, I=1.5, T=24, Cycles=10)</span>
          </h3>
          <div className="flex gap-3 flex-wrap">
            <select
              value={testModelKey}
              onChange={(e) => { setTestModelKey(e.target.value); setTestResult(null); }}
              className="bg-[#0b1120] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 transition min-w-[240px]"
            >
              <option value="">-- Select model to test --</option>
              {models.filter(m => m.enabled).map(m => (
                <option key={m.key} value={m.key}>{m.icon} {m.label}</option>
              ))}
            </select>
            <button
              onClick={runTest}
              disabled={testLoading || !testModelKey}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition disabled:opacity-50"
            >
              {testLoading ? 'Testing...' : 'Run Test'}
            </button>
          </div>

          {testResult && (
            <div className={`mt-4 p-4 rounded-xl border text-sm
              ${testResult.status === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-red-500/10 border-red-500/20 text-red-300'}`}
            >
              {testResult.status === 'success' ? (
                <div className="flex gap-6 flex-wrap items-center">
                  <span className="flex items-center gap-2"><CheckCircle size={14}/> Test Passed</span>
                  <span>SOH: <strong>{testResult.predictions.SOH}%</strong></span>
                  <span>RUL: <strong>{testResult.predictions.RUL} cycles</strong></span>
                </div>
              ) : (
                <span className="flex items-center gap-2"><XCircle size={14}/> {testResult.message}</span>
              )}
            </div>
          )}
        </div>

        {/* ── Comparison Summary Table ─────────────────────────── */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart2 size={18} className="text-cyan-400" /> Model Comparison Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 text-xs uppercase">
                  <th className="text-left pb-3 pr-4">Model</th>
                  <th className="text-left pb-3 pr-4">Type</th>
                  <th className="text-left pb-3 pr-4">Status</th>
                  <th className="text-left pb-3 pr-4">Backend</th>
                  <th className="text-left pb-3">Accuracy Level</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {models.map((m) => {
                  const tc = TYPE_COLORS[m.type] || TYPE_COLORS['Classical ML'];
                  const loaded = !!loadedStatus[m.key];
                  const accLow = m.accuracy_note?.toLowerCase().includes('low') || m.accuracy_note?.toLowerCase().includes('identical');
                  const accHigh = m.accuracy_note?.toLowerCase().includes('best') || m.accuracy_note?.toLowerCase().includes('high');

                  return (
                    <tr key={m.key} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                      <td className="py-3 pr-4">
                        <span className="mr-2">{m.icon}</span>
                        <span className="text-white font-medium">{m.label}</span>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${tc.bg} ${tc.text} ${tc.border}`}>
                          {m.type}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        {m.enabled
                          ? <span className="text-emerald-400 text-xs flex items-center gap-1"><CheckCircle size={11}/>Active</span>
                          : <span className="text-gray-500 text-xs flex items-center gap-1"><XCircle size={11}/>Disabled</span>}
                      </td>
                      <td className="py-3 pr-4">
                        {loaded
                          ? <span className="text-emerald-400 text-xs">✅ Loaded</span>
                          : <span className="text-red-400 text-xs">❌ Not Loaded</span>}
                      </td>
                      <td className="py-3">
                        <span className={`text-xs font-semibold ${accHigh ? 'text-emerald-400' : accLow ? 'text-red-400' : 'text-amber-400'}`}>
                          {accHigh ? '🟢 High' : accLow ? '🔴 Low' : '🟡 Moderate'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ── Delete Confirm Modal ─────────────────────────────── */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0b1220] border border-red-500/20 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                <AlertTriangle size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Remove Model</h3>
                <p className="text-gray-400 text-sm">This will remove the model from the registry.</p>
              </div>
            </div>
            <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4 mb-6">
              <p className="text-red-300 text-sm">
                Model: <strong>{models.find(m => m.key === showDeleteConfirm)?.label}</strong>
              </p>
              <p className="text-gray-500 text-xs mt-1">This only removes it from the UI registry. Backend model files are unaffected.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => deleteModel(showDeleteConfirm)}
                className="flex-1 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-bold hover:bg-red-500/30 transition text-sm"
              >
                Confirm Remove
              </button>
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Model Modal ──────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-[#0b1220] border border-cyan-500/20 rounded-2xl w-full max-w-lg p-6 my-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <PlusCircle size={18} className="text-cyan-400" /> Add New Model
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Model Key *</label>
                  <input
                    value={newModel.key}
                    onChange={e => setNewModel(p => ({ ...p, key: e.target.value.replace(/\s/g,'_') }))}
                    placeholder="e.g. xgboost"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Display Label *</label>
                  <input
                    value={newModel.label}
                    onChange={e => setNewModel(p => ({ ...p, label: e.target.value }))}
                    placeholder="e.g. XGBoost"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Icon (emoji)</label>
                  <input
                    value={newModel.icon}
                    onChange={e => setNewModel(p => ({ ...p, icon: e.target.value }))}
                    placeholder="🔮"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">Type</label>
                  <select
                    value={newModel.type}
                    onChange={e => setNewModel(p => ({ ...p, type: e.target.value }))}
                    className="w-full bg-[#0b1120] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition"
                  >
                    {Object.keys(TYPE_COLORS).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {[
                { field: 'file_soh',    label: 'SOH Model File',  ph: 'e.g. xgb_soh.pkl' },
                { field: 'file_rul',    label: 'RUL Model File',  ph: 'e.g. xgb_rul.pkl' },
                { field: 'file_scaler', label: 'Scaler File',     ph: 'e.g. xgb_scaler.pkl (optional)' },
                { field: 'notes',       label: 'Notes',           ph: 'Calibration or fix notes...' },
                { field: 'limitations', label: 'Limitations',     ph: 'Known limitations...' },
                { field: 'accuracy_note',label:'Accuracy Note',   ph: 'e.g. High accuracy for healthy batteries' },
              ].map(({ field, label, ph }) => (
                <div key={field}>
                  <label className="block text-gray-400 text-xs mb-1 uppercase">{label}</label>
                  <input
                    value={newModel[field]}
                    onChange={e => setNewModel(p => ({ ...p, [field]: e.target.value }))}
                    placeholder={ph}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-cyan-500 outline-none transition"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={addModel}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold hover:brightness-110 transition text-sm"
              >
                Add Model
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition text-sm"
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