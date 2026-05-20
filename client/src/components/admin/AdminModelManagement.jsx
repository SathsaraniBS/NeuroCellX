// src/components/admin/AdminModelManagement.jsx
import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';
import {
  BrainCircuit, CheckCircle, AlertTriangle, Clock,
  RefreshCw, BarChart2, Cpu, TrendingUp, Activity,
  ChevronDown, ChevronUp, Zap
} from 'lucide-react';

const MODELS = [
  {
    key:     'random_forest',
    name:    'Random Forest',
    icon:    '🌲',
    type:    'Ensemble',
    library: 'scikit-learn',
    status:  'active',
    soh_out: 'Numeric %',
    rul_out: 'Numeric cycles',
    note:    'High accuracy — best overall performer',
    color:   { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  },
  {
    key:     'svr',
    name:    'SVR (Support Vector)',
    icon:    '📐',
    type:    'Kernel SVM',
    library: 'scikit-learn',
    status:  'limited',
    soh_out: 'Numeric %',
    rul_out: 'Numeric cycles',
    note:    'Outputs identical predictions for all inputs — needs retraining',
    color:   { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  },
  {
    key:     'naive_bayes',
    name:    'Naive Bayes',
    icon:    '📊',
    type:    'Probabilistic',
    library: 'scikit-learn',
    status:  'limited',
    soh_out: 'Class label',
    rul_out: 'Class label',
    note:    'Class imbalance — always predicts worst class. Needs retraining',
    color:   { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
  },
  {
    key:     'gru_randomforest',
    name:    'GRU + Random Forest',
    icon:    '🔀',
    type:    'Hybrid Deep',
    library: 'TF + sklearn',
    status:  'active',
    soh_out: 'Numeric %',
    rul_out: '0–1 calibrated',
    note:    'GRU extracts temporal features, RF predicts',
    color:   { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  },
  {
    key:     'lstm_transformer',
    name:    'LSTM + Transformer',
    icon:    '🤖',
    type:    'Deep Learning',
    library: 'TensorFlow/Keras',
    status:  'active',
    soh_out: 'Inverted linear',
    rul_out: 'Linear (0–15)',
    note:    'Backend calibration applied for inverted SOH output',
    color:   { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  },
];

export default function AdminModelManagement() {
  const { addToast }          = useToast();
  const [evalHistory, setEvalHistory] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [expanded,    setExpanded]    = useState(null);

  useEffect(() => { fetchEvalHistory(); }, []);

  const fetchEvalHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/ml/evaluate/history', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEvalHistory(res.data?.results || []);
    } catch {
      setEvalHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const activeCount  = MODELS.filter(m => m.status === 'active').length;
  const limitedCount = MODELS.filter(m => m.status === 'limited').length;

  const gradeColor = (g) => {
    const map = { 'A+': '#00ff88', A: '#22c55e', B: '#84cc16', C: '#eab308', D: '#f97316', F: '#ef4444' };
    return map[g] || '#9ca3af';
  };

  const MODEL_LABELS = {
    random_forest: '🌲 Random Forest', svr: '📐 SVR',
    naive_bayes: '📊 Naive Bayes', gru_randomforest: '🔀 GRU+RF',
    lstm_transformer: '🤖 LSTM',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <BrainCircuit size={24} className="text-cyan-400" /> Model Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">Monitor and manage ML model status</p>
        </div>
        <button onClick={fetchEvalHistory} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Models',    value: MODELS.length,  color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
          { label: 'Active',          value: activeCount,    color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
          { label: 'Limited',         value: limitedCount,   color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-5 text-center`}>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Model Cards */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">ML Models Status</h3>
        {MODELS.map((m) => {
          const isExp = expanded === m.key;
          return (
            <div key={m.key} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <button onClick={() => setExpanded(isExp ? null : m.key)}
                className="w-full flex items-center gap-4 px-6 py-4 text-left hover:bg-white/5 transition">
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{m.name}</p>
                  <p className="text-gray-500 text-xs">{m.type} • {m.library}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border
                  ${m.status === 'active'
                    ? 'bg-green-500/15 text-green-400 border-green-500/25'
                    : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'}`}>
                  {m.status === 'active' ? '✅ Active' : '⚠️ Limited'}
                </span>
                {isExp ? <ChevronUp size={15} className="text-gray-400" /> : <ChevronDown size={15} className="text-gray-400" />}
              </button>

              {isExp && (
                <div className="border-t border-white/5 px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'SOH Output', value: m.soh_out },
                    { label: 'RUL Output', value: m.rul_out },
                    { label: 'Library',    value: m.library },
                    { label: 'Type',       value: m.type },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3">
                      <p className="text-gray-500 text-[9px] uppercase font-bold mb-1">{label}</p>
                      <p className="text-white text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                  <div className="col-span-2 md:col-span-4 bg-white/5 rounded-xl p-3 flex items-start gap-2">
                    <AlertTriangle size={12} className="text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-gray-300 text-xs">{m.note}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Recent Evaluations */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <BarChart2 size={15} className="text-cyan-400" /> Recent Model Evaluations
          </h3>
          <span className="text-gray-500 text-xs">{evalHistory.length} saved</span>
        </div>
        {evalHistory.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-2">
            <BarChart2 size={32} className="text-gray-600" />
            <p className="text-gray-500 text-sm">No evaluations saved yet</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {evalHistory.slice(0, 8).map((ev, i) => (
              <div key={ev.id ?? i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{MODEL_LABELS[ev.model_key] || ev.model_key}</p>
                  <p className="text-[10px] text-gray-500 truncate">{ev.dataset_name} • {ev.total_rows} rows</p>
                </div>
                {ev.soh_grade && (
                  <div className="text-center shrink-0">
                    <p className="text-lg font-black" style={{ color: gradeColor(ev.soh_grade) }}>{ev.soh_grade}</p>
                    <p className="text-[9px] text-gray-500">SOH</p>
                  </div>
                )}
                {ev.rul_grade && (
                  <div className="text-center shrink-0">
                    <p className="text-lg font-black" style={{ color: gradeColor(ev.rul_grade) }}>{ev.rul_grade}</p>
                    <p className="text-[9px] text-gray-500">RUL</p>
                  </div>
                )}
                {ev.soh_accuracy != null && (
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-green-400">{parseFloat(ev.soh_accuracy).toFixed(1)}%</p>
                    <p className="text-[10px] text-gray-500">Accuracy</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}