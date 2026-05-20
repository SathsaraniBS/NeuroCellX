import React, { useState, useRef } from 'react';
import Sidebar from '../components/User/UserSidebar';
import {
  Upload, FileText, BarChart2, Cpu, CheckCircle,
  AlertTriangle, Download, RefreshCw,
  TrendingUp, Target, Activity, Zap, Info, Eye
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────────
const MODELS = [
  { key: 'random_forest',    label: 'Random Forest',        icon: '🌲', desc: 'Ensemble decision trees'    },
  { key: 'svr',              label: 'SVR (Support Vector)', icon: '📐', desc: 'Kernel-based regression'    },
  { key: 'naive_bayes',      label: 'Naive Bayes',          icon: '📊', desc: 'Probabilistic classifier'   },
  { key: 'gru_randomforest', label: 'GRU + Random Forest',  icon: '🔀', desc: 'Hybrid deep+ensemble'       },
  { key: 'lstm_transformer', label: 'LSTM + Transformer',   icon: '🤖', desc: 'Deep learning sequential'   },
];

const REQUIRED_COLS = ['Capacity', 'Voltage', 'Current', 'Temperature', 'CycleCount'];
const OPTIONAL_COLS = ['SOH', 'RUL'];

// ─────────────────────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────────────────────
function gradeColor(grade) {
  const map = { 'A+': '#00ff88', A: '#22c55e', B: '#84cc16', C: '#eab308', D: '#f97316', F: '#ef4444' };
  return map[grade] || '#9ca3af';
}

function gradeRing(grade) {
  const map = {
    'A+': 'ring-green-400', A: 'ring-green-500',
    B: 'ring-lime-500', C: 'ring-yellow-500',
    D: 'ring-orange-500', F: 'ring-red-500'
  };
  return map[grade] || 'ring-gray-500';
}

// ─────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────
function MetricCard({ label, value, unit = '', icon: Icon, color, tooltip }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 relative">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl border ${color.bg} ${color.border}`}>
          <Icon size={16} className={color.text} />
        </div>
        {tooltip && (
          <button
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            className="text-gray-600 hover:text-gray-400 transition"
          >
            <Info size={13} />
          </button>
        )}
        {showTip && tooltip && (
          <div className="absolute right-4 top-12 z-20 bg-[#0d1628] border border-white/20 rounded-xl px-3 py-2 text-xs text-gray-300 w-52 shadow-2xl">
            {tooltip}
          </div>
        )}
      </div>
      <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-1">{label}</p>
      <p className={`text-3xl font-black ${color.text}`}>
        {typeof value === 'number' ? value.toFixed(2) : value}
        <span className="text-base font-normal text-gray-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}

function GradeBadge({ grade, label }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-black ring-2 ${gradeRing(grade)}`}
        style={{ color: gradeColor(grade), background: `${gradeColor(grade)}18` }}
      >
        {grade}
      </div>
      <p className="text-sm font-semibold text-white">{label}</p>
    </div>
  );
}

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-4 z-10">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Cpu size={20} className="text-cyan-400" />
        </div>
      </div>
      <p className="text-cyan-400 font-semibold text-sm">Evaluating model...</p>
      <p className="text-gray-500 text-xs">Running predictions on your dataset</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
function ModelEvaluate() {
  const [selectedModel, setSelectedModel] = useState('');
  const [file,          setFile]          = useState(null);
  const [loading,       setLoading]       = useState(false);
  const [result,        setResult]        = useState(null);
  const [error,         setError]         = useState(null);
  const [dragOver,      setDragOver]      = useState(false);

  const fileRef = useRef(null);

  // ── File Handling ────────────────────────────────────────
  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.endsWith('.csv')) {
      setError('Please upload a CSV file (.csv)');
      return;
    }
    setFile(f);
    setError(null);
    setResult(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setSelectedModel('');
    if (fileRef.current) fileRef.current.value = '';
  };

  // ── Download Sample CSV ──────────────────────────────────
  const downloadSample = async () => {
    try {
      const res  = await fetch('http://localhost:8000/api/ml/evaluate/sample-csv');
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = 'sample_battery_data.csv'; a.click();
      URL.revokeObjectURL(url);
    } catch {
      const csv = `Capacity,Voltage,Current,Temperature,CycleCount,SOH,RUL
2.0,4.1,1.5,24.0,10,94.98,76
1.9,4.05,1.4,25.0,25,92.5,68
1.8,4.0,1.3,26.0,45,89.2,55
1.6,3.85,1.1,30.0,80,80.3,30
1.2,3.45,0.8,42.0,150,61.7,5`;
      const blob = new Blob([csv], { type: 'text/csv' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = 'sample_battery_data.csv'; a.click();
      URL.revokeObjectURL(url);
    }
  };

  // ── Submit Evaluation ────────────────────────────────────
  const handleEvaluate = async () => {
    if (!selectedModel) { setError('Please select a model.'); return; }
    if (!file)          { setError('Please upload a CSV file.'); return; }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file',      file);
      formData.append('model_key', selectedModel);

      const res  = await fetch('http://localhost:8000/api/ml/evaluate', {
        method: 'POST',
        body:   formData,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.detail || 'Evaluation failed');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Evaluation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ── Download Results ─────────────────────────────────────
  const downloadResults = () => {
    if (!result) return;
    const modelLabel = MODELS.find(m => m.key === result.model_key)?.label || result.model_key;
    let csv = `VoltIQ — Model Evaluation Results\nModel: ${modelLabel}\nTotal Rows: ${result.total_rows}\n\n`;

    if (result.metrics?.soh) {
      const m = result.metrics.soh;
      csv += `SOH METRICS\nAccuracy,${m.accuracy}%\nR2 Score,${m.r2}\nMAE,${m.mae}\nMAPE,${m.mape}%\nsMAPE,${m.smape}%\nGrade,${m.grade} (${m.grade_label})\n\n`;
    }
    if (result.metrics?.rul) {
      const m = result.metrics.rul;
      csv += `RUL METRICS\nAccuracy,${m.accuracy}%\nR2 Score,${m.r2}\nMAE,${m.mae}\nMAPE,${m.mape}%\nsMAPE,${m.smape}%\nGrade,${m.grade} (${m.grade_label})\n\n`;
    }

    csv += `SAMPLE PREDICTIONS\nIndex,Capacity,Voltage,Current,Temp,Cycles,SOH Pred,RUL Pred`;
    if (result.has_soh_true) csv += ',SOH True';
    if (result.has_rul_true) csv += ',RUL True';
    csv += '\n';

    result.sample.forEach(row => {
      csv += `${row.index},${row.capacity},${row.voltage},${row.current},${row.temp},${row.cycles},${row.soh_pred},${row.rul_pred}`;
      if (result.has_soh_true) csv += `,${row.soh_true ?? ''}`;
      if (result.has_rul_true) csv += `,${row.rul_true ?? ''}`;
      csv += '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `voltiq_eval_${result.model_key}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  // ─────────────────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto space-y-8">

        {/* ── Header ── */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                <BarChart2 size={24} className="text-cyan-400" />
              </div>
              Model Evaluation
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              Upload your battery dataset, select a model, and view accuracy metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadSample}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm"
            >
              <Download size={15} /> Sample CSV
            </button>
            {result && (
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm"
              >
                <RefreshCw size={15} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* ── CSV Format Info ── */}
        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-cyan-400 font-bold text-sm mb-2">CSV Format Requirements</p>
              <div className="flex flex-wrap gap-3">
                <div>
                  <span className="text-gray-500 text-xs">Required: </span>
                  {REQUIRED_COLS.map(c => (
                    <code key={c} className="text-cyan-300 text-[11px] bg-cyan-500/10 px-1.5 py-0.5 rounded mr-1">{c}</code>
                  ))}
                </div>
                <div>
                  <span className="text-gray-500 text-xs">Optional (for metrics): </span>
                  {OPTIONAL_COLS.map(c => (
                    <code key={c} className="text-green-300 text-[11px] bg-green-500/10 px-1.5 py-0.5 rounded mr-1">{c}</code>
                  ))}
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Without SOH/RUL columns, predictions are generated but accuracy metrics cannot be calculated.
              </p>
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* LEFT: Model Select + Upload */}
          <div className="space-y-6">

            {/* Model Selection */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Cpu size={16} className="text-cyan-400" /> Select ML Model
              </h3>
              <div className="space-y-2">
                {MODELS.map((m) => (
                  <button
                    key={m.key}
                    onClick={() => setSelectedModel(m.key)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left
                      ${selectedModel === m.key
                        ? 'bg-cyan-500/15 border-cyan-500/40'
                        : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05]'}`}
                  >
                    <span className="text-xl shrink-0">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${selectedModel === m.key ? 'text-cyan-300' : 'text-white'}`}>
                        {m.label}
                      </p>
                      <p className="text-[11px] text-gray-500">{m.desc}</p>
                    </div>
                    {selectedModel === m.key && (
                      <CheckCircle size={16} className="text-cyan-400 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
              {loading && <LoadingOverlay />}

              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Upload size={16} className="text-cyan-400" /> Upload Dataset
              </h3>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all
                  ${dragOver
                    ? 'border-cyan-400 bg-cyan-500/10'
                    : file
                    ? 'border-green-500/40 bg-green-500/5'
                    : 'border-white/15 hover:border-cyan-500/40 hover:bg-white/[0.02]'}`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />

                {file ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto">
                      <FileText size={22} className="text-green-400" />
                    </div>
                    <p className="text-green-400 font-semibold text-sm">{file.name}</p>
                    <p className="text-gray-500 text-xs">{(file.size / 1024).toFixed(1)} KB — Click to change</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto">
                      <Upload size={22} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Drop your CSV file here</p>
                      <p className="text-gray-500 text-xs mt-1">or click to browse</p>
                    </div>
                    <p className="text-gray-600 text-[11px]">Supports: .csv • Max 500 rows</p>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="mt-4 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                  <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-400 text-xs">{error}</p>
                </div>
              )}

              {/* Evaluate Button */}
              <button
                onClick={handleEvaluate}
                disabled={loading || !file || !selectedModel}
                className="w-full mt-5 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading
                  ? <><RefreshCw size={16} className="animate-spin" /> Evaluating...</>
                  : <><Zap size={16} /> Evaluate Model</>
                }
              </button>
            </div>
          </div>

          {/* RIGHT: Results */}
          <div>
            {!result ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl h-full flex flex-col items-center justify-center text-center min-h-[500px] p-8 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <BarChart2 size={28} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-400 font-semibold">Evaluation Results</p>
                  <p className="text-gray-600 text-sm mt-1">Upload a dataset and select a model to see metrics</p>
                </div>

                {/* Steps guide */}
                <div className="space-y-2 text-left w-full max-w-xs mt-4">
                  {[
                    { n: '1', text: 'Download sample CSV template',  done: false          },
                    { n: '2', text: 'Select an ML model',            done: !!selectedModel },
                    { n: '3', text: 'Upload your CSV dataset',       done: !!file          },
                    { n: '4', text: 'Click Evaluate Model',          done: false           },
                  ].map(({ n, text, done }) => (
                    <div key={n} className="flex items-center gap-3 text-sm">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 border
                        ${done ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                        {done ? '✓' : n}
                      </div>
                      <span className={done ? 'text-green-400' : 'text-gray-500'}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">

                {/* Result Header */}
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-1">Evaluation Complete</p>
                    <h3 className="text-lg font-bold text-white">
                      {MODELS.find(m => m.key === result.model_key)?.icon}{' '}
                      {MODELS.find(m => m.key === result.model_key)?.label}
                    </h3>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {result.total_rows} rows evaluated
                      {!result.has_soh_true && !result.has_rul_true && ' • No true labels'}
                    </p>
                  </div>
                  <button
                    onClick={downloadResults}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs font-bold hover:bg-cyan-500/30 transition"
                  >
                    <Download size={14} /> Export
                  </button>
                </div>

                {/* SOH Metrics */}
                {result.metrics?.soh && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <Activity size={15} className="text-green-400" /> SOH Metrics
                      </h4>
                      <GradeBadge grade={result.metrics.soh.grade} label={result.metrics.soh.grade_label} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Accuracy" value={result.metrics.soh.accuracy} unit="%" icon={Target}
                        color={{ text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }}
                        tooltip="% of predictions within ±5% of true SOH" />
                      <MetricCard label="R² Score" value={result.metrics.soh.r2} icon={TrendingUp}
                        color={{ text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }}
                        tooltip="1.0 = perfect fit. Higher is better." />
                      <MetricCard label="MAE (Mean Absolute Error)" value={result.metrics.soh.mae} unit="%" icon={Activity}
                        color={{ text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }}
                        tooltip="Mean Absolute Error — lower is better" />
                      <MetricCard label="MAPE (Mean Absolute Percentage Error)" value={result.metrics.soh.mape} unit="%" icon={BarChart2}
                        color={{ text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' }}
                        tooltip="Mean Absolute Percentage Error" />
                    </div>
                    <div className="mt-3">
                      <MetricCard label="sMAPE" value={result.metrics.soh.smape} unit="%" icon={Zap}
                        color={{ text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' }}
                        tooltip="Symmetric MAPE — handles zero values better" />
                    </div>
                  </div>
                )}

                {/* RUL Metrics */}
                {result.metrics?.rul && (
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-sm flex items-center gap-2">
                        <Zap size={15} className="text-cyan-400" /> RUL Metrics
                      </h4>
                      <GradeBadge grade={result.metrics.rul.grade} label={result.metrics.rul.grade_label} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <MetricCard label="Accuracy" value={result.metrics.rul.accuracy} unit="%" icon={Target}
                        color={{ text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }}
                        tooltip="% of predictions within ±10 cycles of true RUL" />
                      <MetricCard label="R² Score" value={result.metrics.rul.r2} icon={TrendingUp}
                        color={{ text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }}
                        tooltip="1.0 = perfect fit. Higher is better." />
                      <MetricCard label="MAE" value={result.metrics.rul.mae} unit=" cyc" icon={Activity}
                        color={{ text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }}
                        tooltip="Mean Absolute Error in cycles" />
                      <MetricCard label="MAPE" value={result.metrics.rul.mape} unit="%" icon={BarChart2}
                        color={{ text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' }}
                        tooltip="Mean Absolute Percentage Error" />
                    </div>
                    <div className="mt-3">
                      <MetricCard label="sMAPE" value={result.metrics.rul.smape} unit="%" icon={Zap}
                        color={{ text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' }}
                        tooltip="Symmetric MAPE" />
                    </div>
                  </div>
                )}

                {/* No metrics warning */}
                {!result.metrics?.soh && !result.metrics?.rul && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-start gap-3">
                    <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-yellow-400 font-semibold text-sm">Metrics not available</p>
                      <p className="text-yellow-200/60 text-xs mt-1">
                        Add <code className="bg-yellow-500/20 px-1 rounded">SOH</code> and/or{' '}
                        <code className="bg-yellow-500/20 px-1 rounded">RUL</code> columns to your CSV
                        to calculate accuracy metrics.
                      </p>
                    </div>
                  </div>
                )}

                {/* Grade Legend */}
                <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4">
                  <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider mb-3">Grade Scale</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { grade: 'A+', label: 'Excellent', r2: '≥0.95' },
                      { grade: 'A',  label: 'Very Good', r2: '≥0.90' },
                      { grade: 'B',  label: 'Good',      r2: '≥0.80' },
                      { grade: 'C',  label: 'Fair',      r2: '≥0.70' },
                      { grade: 'D',  label: 'Poor',      r2: '≥0.50' },
                      { grade: 'F',  label: 'Very Poor', r2: '<0.50'  },
                    ].map(({ grade, label, r2 }) => (
                      <div key={grade} className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2.5 py-1.5">
                        <span className="font-black text-xs" style={{ color: gradeColor(grade) }}>{grade}</span>
                        <span className="text-gray-500 text-[10px]">{label} (R²{r2})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Sample Predictions Table ── */}
        {result?.sample && result.sample.length > 0 && (
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Eye size={15} className="text-cyan-400" />
                Sample Predictions
                <span className="text-gray-500 font-normal text-xs">(first {result.sample.length} rows)</span>
              </h3>
              <span className="text-gray-500 text-xs">{result.total_rows} total rows processed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-gray-500 text-[10px] uppercase tracking-wider">
                    {['#', 'Capacity', 'Voltage', 'Current', 'Temp', 'Cycles',
                      'SOH Pred',
                      result.has_soh_true ? 'SOH True' : null,
                      'RUL Pred',
                      result.has_rul_true ? 'RUL True' : null,
                    ].filter(Boolean).map(h => (
                      <th key={h} className="px-4 py-3 text-left font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {result.sample.map((row) => {
                    const soh    = row.soh_pred;
                    const color  = soh >= 90 ? 'text-green-400' : soh >= 75 ? 'text-yellow-400' : 'text-red-400';
                    return (
                      <tr key={row.index} className="hover:bg-white/5 transition">
                        <td className="px-4 py-3 text-gray-600">{row.index}</td>
                        <td className="px-4 py-3 text-gray-300">{row.capacity}</td>
                        <td className="px-4 py-3 text-gray-300">{row.voltage}</td>
                        <td className="px-4 py-3 text-gray-300">{row.current}</td>
                        <td className="px-4 py-3 text-gray-300">{row.temp}°C</td>
                        <td className="px-4 py-3 text-gray-300">{row.cycles}</td>
                        <td className="px-4 py-3">
                          <span className={`font-bold ${color}`}>{row.soh_pred}%</span>
                        </td>
                        {result.has_soh_true && (
                          <td className="px-4 py-3 text-gray-400">{row.soh_true ?? '—'}%</td>
                        )}
                        <td className="px-4 py-3 text-cyan-400 font-bold">{row.rul_pred}</td>
                        {result.has_rul_true && (
                          <td className="px-4 py-3 text-gray-400">{row.rul_true ?? '—'}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// ✅ FIXED: export default — this was missing!
export default ModelEvaluate;