import React, { useState } from 'react';
import {
  Brain, Zap, Thermometer, Battery, RefreshCw,
  ChevronDown, ChevronUp, CheckCircle, AlertTriangle,
  Database, Cpu, TrendingUp, Activity, BarChart2, Info,
  ArrowRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
/* ─────────────────────────────────────────
   DATA  (unchanged — same as original)
───────────────────────────────────────── */
const STATS = [
  { label: 'ML Models',      value: '5',       icon: Brain,     color: 'text-cyan-300',   border: 'border-cyan-400/25',   bg: 'bg-cyan-400/10',   glow: 'shadow-[0_0_30px_rgba(34,211,238,0.12)]' },
  { label: 'Predictions',    value: 'SOH+RUL', icon: TrendingUp, color: 'text-emerald-300', border: 'border-emerald-400/25', bg: 'bg-emerald-400/10', glow: 'shadow-[0_0_30px_rgba(52,211,153,0.12)]' },
  { label: 'Input Features', value: '5',       icon: Activity,  color: 'text-violet-300', border: 'border-violet-400/25', bg: 'bg-violet-400/10', glow: 'shadow-[0_0_30px_rgba(167,139,250,0.12)]' },
  { label: 'Dataset',        value: 'NASA',    icon: Database,  color: 'text-orange-300', border: 'border-orange-400/25', bg: 'bg-orange-400/10', glow: 'shadow-[0_0_30px_rgba(251,146,60,0.12)]' },
];

const INPUT_FEATURES = [
  { icon: Battery,     label: 'Capacity',    unit: 'Ah',  desc: 'Current battery capacity',          range: '0 – 2.0 Ah' },
  { icon: Zap,         label: 'Voltage',     unit: 'V',   desc: 'Terminal voltage of battery',       range: '3.4 – 4.2 V' },
  { icon: Activity,    label: 'Current',     unit: 'A',   desc: 'Charge / discharge current',        range: '0 – 2.0 A' },
  { icon: Thermometer, label: 'Temperature', unit: '°C',  desc: 'Battery cell temperature',          range: '20 – 45 °C' },
  { icon: RefreshCw,   label: 'Cycle Count', unit: '',    desc: 'Number of charge-discharge cycles', range: '0 – 168' },
];

const MODELS = [
  {
    key: 'random_forest', icon: '🌲', name: 'Random Forest', badge: 'Ensemble',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    cardBorder: 'border-emerald-400/20', accentColor: 'text-emerald-300',
    barColor: 'bg-emerald-400', barGlow: 'shadow-[0_0_8px_rgba(52,211,153,0.6)]',
    headerGlow: 'shadow-[0_0_35px_rgba(52,211,153,0.10)]',
    accuracy: 92, speed: 90, status: 'active',
    library: 'scikit-learn', inputShape: '2D (1×5)', outputType: 'Numeric',
    description: 'An ensemble method that builds multiple decision trees during training and outputs the mean prediction. Each tree is trained on a random subset of data and features, reducing overfitting and improving generalization.',
    howItWorks: ['Splits training data into random subsets', 'Builds 100+ independent decision trees', 'Each tree votes on the prediction', 'Final output = average of all tree votes'],
    strengths: ['High accuracy', 'Stable predictions', 'Fast inference', 'Handles non-linear patterns'],
    limitations: ['RUL scaling variation', 'Less interpretable', 'Memory intensive'],
    sohRange: '61% – 95%', rulRange: '6 – 76 cycles', note: null,
  },
  {
    key: 'svr', icon: '📐', name: 'SVR (Support Vector Regression)', badge: 'Kernel-based',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    cardBorder: 'border-blue-400/20', accentColor: 'text-blue-300',
    barColor: 'bg-blue-400', barGlow: 'shadow-[0_0_8px_rgba(96,165,250,0.6)]',
    headerGlow: 'shadow-[0_0_35px_rgba(96,165,250,0.10)]',
    accuracy: 55, speed: 85, status: 'limited',
    library: 'scikit-learn', inputShape: '2D scaled (1×5)', outputType: 'Numeric',
    description: 'Support Vector Regression maps input features into a high-dimensional space using a kernel function and finds the best-fit hyperplane. Effective for small datasets but sensitive to feature scaling.',
    howItWorks: ['Scales input features using MinMaxScaler', 'Maps features to high-dimensional space via RBF kernel', 'Finds optimal regression hyperplane', 'Predictions based on support vectors near the boundary'],
    strengths: ['Works on small datasets', 'Robust to outliers', 'Effective with scaling'],
    limitations: ['All inputs give same output ⚠️', 'Limited generalization', 'Needs retraining'],
    sohRange: '84.61% (fixed)', rulRange: '37 cycles (fixed)',
    note: '⚠️ Model outputs identical predictions for all inputs — retraining required for proper differentiation.',
  },
  {
    key: 'naive_bayes', icon: '📊', name: 'Naive Bayes', badge: 'Probabilistic',
    badgeColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    cardBorder: 'border-yellow-400/20', accentColor: 'text-yellow-300',
    barColor: 'bg-yellow-400', barGlow: 'shadow-[0_0_8px_rgba(250,204,21,0.6)]',
    headerGlow: 'shadow-[0_0_35px_rgba(250,204,21,0.08)]',
    accuracy: 40, speed: 95, status: 'limited',
    library: 'scikit-learn', inputShape: '2D raw (1×5)', outputType: 'Class Label',
    description: 'A probabilistic classifier based on Bayes theorem with the "naive" assumption of feature independence. Predicts SOH and RUL as class labels (e.g., Poor, Fair, Good) rather than exact numeric values.',
    howItWorks: ['Assumes all input features are independent', 'Calculates probability for each class label', 'SOH classes: Critical, Poor, Fair, Good, Excellent', 'RUL classes: End, Critical, Late, Mid, Early', 'Assigns label with highest probability'],
    strengths: ['Extremely fast', 'Simple to understand', 'Works with small data'],
    limitations: ['Always predicts "Poor"/"End" ⚠️', 'No scaler used', 'Class imbalance issue', 'Needs retraining'],
    sohRange: '62% (Poor label)', rulRange: '5 cycles (End label)',
    note: '⚠️ Model is biased — always predicts worst class with 100% confidence. Class-balanced retraining required.',
  },
  {
    key: 'gru_randomforest', icon: '🔀', name: 'GRU + Random Forest Hybrid', badge: 'Hybrid Deep',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    cardBorder: 'border-purple-400/20', accentColor: 'text-purple-300',
    barColor: 'bg-purple-400', barGlow: 'shadow-[0_0_8px_rgba(192,132,252,0.6)]',
    headerGlow: 'shadow-[0_0_35px_rgba(192,132,252,0.10)]',
    accuracy: 88, speed: 70, status: 'active',
    library: 'scikit-learn + TensorFlow', inputShape: 'RF: 2D (1×5)', outputType: 'Numeric',
    description: 'A hybrid architecture combining Gated Recurrent Unit (GRU) temporal feature extraction with Random Forest regression. The GRU captures sequential battery degradation patterns while the RF provides robust final predictions.',
    howItWorks: ['Scales input using MinMaxScaler', 'GRU extracts temporal degradation patterns', 'Random Forest uses GRU features for prediction', 'SOH output: direct numeric percentage', 'RUL output: normalized 0-1 range (scaled to cycles)'],
    strengths: ['Captures time patterns', 'High SOH accuracy', 'Robust hybrid approach'],
    limitations: ['RUL small for mid-life inputs', 'Complex architecture', 'Slower than pure ML'],
    sohRange: '61% – 95%', rulRange: '9 – 134 cycles', note: null,
  },
  {
    key: 'lstm_transformer', icon: '🤖', name: 'LSTM + Transformer', badge: 'Deep Learning',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    cardBorder: 'border-cyan-400/20', accentColor: 'text-cyan-300',
    barColor: 'bg-cyan-400', barGlow: 'shadow-[0_0_8px_rgba(34,211,238,0.6)]',
    headerGlow: 'shadow-[0_0_35px_rgba(34,211,238,0.10)]',
    accuracy: 82, speed: 55, status: 'active',
    library: 'TensorFlow / Keras', inputShape: '3D (1×15×5)', outputType: 'Linear (scaled)',
    description: 'A deep learning architecture combining Long Short-Term Memory (LSTM) networks with Transformer attention mechanisms. Designed to capture both sequential and global patterns in battery degradation sequences.',
    howItWorks: ['Input reshaped to 3D sequence: (1, 15, 5)', 'LSTM captures sequential degradation over time', 'Transformer attention focuses on key features', 'SOH output is inverted linear (negated + mapped)', 'RUL output is linear (0-15 range → 5-160 cycles)'],
    strengths: ['Captures complex patterns', 'Attention mechanism', 'Good SOH accuracy'],
    limitations: ['Inverted SOH output (requires post-processing)', 'Slowest inference', 'Needs more data'],
    sohRange: '61% – 90%', rulRange: '43 – 112 cycles',
    note: '⚠️ SOH output is inverted by the model — backend applies calibration fix before displaying results.',
  },
];

const DATASET_INFO = [
  { label: 'Dataset Name',  value: 'NASA CALCE Li-ion Battery Dataset' },
  { label: 'Battery IDs',   value: 'B0005, B0006, B0007, B0018' },
  { label: 'Battery Type',  value: '18650 Li-ion Cells' },
  { label: 'Capacity',      value: '2.0 Ah (nominal)' },
  { label: 'Voltage Range', value: '3.6V – 4.2V' },
  { label: 'Max Cycles',    value: '~168 cycles' },
  { label: 'Environment',   value: 'Controlled Laboratory' },
  { label: 'Purpose',       value: 'Research / Proof of Concept' },
];

const COMPARISON_ROWS = [
  { icon:'🌲', name:'Random Forest',     type:'Ensemble',      soh:'High',    sohColor:'text-emerald-400', rul:'Good',    rulColor:'text-emerald-400', speed:'Fast',    speedColor:'text-cyan-400',   status:'active'  },
  { icon:'📐', name:'SVR',               type:'Kernel SVM',    soh:'Fixed ⚠️', sohColor:'text-yellow-400', rul:'Fixed ⚠️',rulColor:'text-yellow-400', speed:'Fast',    speedColor:'text-cyan-400',   status:'limited' },
  { icon:'📊', name:'Naive Bayes',       type:'Probabilistic', soh:'Biased ⚠️',sohColor:'text-red-400',    rul:'Biased ⚠️',rulColor:'text-red-400',   speed:'Fastest', speedColor:'text-emerald-400',status:'limited' },
  { icon:'🔀', name:'GRU + RF Hybrid',   type:'Hybrid',        soh:'High',    sohColor:'text-emerald-400', rul:'Good',    rulColor:'text-emerald-400', speed:'Medium',  speedColor:'text-orange-400', status:'active'  },
  { icon:'🤖', name:'LSTM + Transformer',type:'Deep Learning', soh:'Good',    sohColor:'text-cyan-400',    rul:'Good',    rulColor:'text-cyan-400',    speed:'Slow',    speedColor:'text-red-400',    status:'active'  },
];

/* ─────────────────────────────────────────
   Sub-Components
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-3">{children}</p>
);

function StatusBadge({ status }) {
  return status === 'active' ? (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-400/25">
      <CheckCircle size={11} /> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 text-yellow-300 border border-yellow-400/25">
      <AlertTriangle size={11} /> Limited
    </span>
  );
}

function MiniBar({ value, barColor, barGlow, label }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] text-slate-500 uppercase font-bold tracking-wider">
        <span>{label}</span>
        <span className="text-slate-300">{value}%</span>
      </div>
      <div className="w-full bg-white/[0.06] rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${barColor} ${barGlow}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ModelCard({ model }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] border ${model.cardBorder} bg-[#071124]/70 backdrop-blur-xl ${model.headerGlow} transition-all duration-300 hover:bg-white/[0.05]`}>
      {/* Top accent line */}
      <div className={`absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${model.accentColor}`} />

      {/* Card Header */}
      <div className="p-7">
        {/* Title row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${model.cardBorder} bg-white/[0.04] text-2xl`}>
              {model.icon}
            </div>
            <div>
              <h3 className={`text-lg font-black tracking-tight ${model.accentColor}`}>{model.name}</h3>
              <span className={`inline-flex items-center mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${model.badgeColor}`}>
                {model.badge}
              </span>
            </div>
          </div>
          <StatusBadge status={model.status} />
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-6">{model.description}</p>

        {/* Warning Note */}
        {model.note && (
          <div className="flex items-start gap-3 rounded-2xl border border-yellow-400/25 bg-yellow-400/8 p-4 mb-6">
            <AlertTriangle size={14} className="text-yellow-300 mt-0.5 shrink-0" />
            <p className="text-yellow-200/80 text-xs leading-relaxed">{model.note}</p>
          </div>
        )}

        {/* Quick stats chips */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Library',     value: model.library },
            { label: 'Input Shape', value: model.inputShape },
            { label: 'Output',      value: model.outputType },
          ].map((s) => (
            <div key={s.label} className={`rounded-xl border ${model.cardBorder} bg-white/[0.04] p-3 text-center`}>
              <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mb-1">{s.label}</p>
              <p className="text-white text-xs font-bold leading-snug">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Progress bars */}
        <div className="space-y-3 mb-6">
          <MiniBar value={model.accuracy} barColor={model.barColor} barGlow={model.barGlow} label="Accuracy" />
          <MiniBar value={model.speed}    barColor={model.barColor} barGlow={model.barGlow} label="Speed" />
        </div>

        {/* SOH / RUL range chips */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'SOH Range', value: model.sohRange },
            { label: 'RUL Range', value: model.rulRange },
          ].map((r) => (
            <div key={r.label} className={`rounded-xl border ${model.cardBorder} bg-white/[0.04] p-4 text-center`}>
              <p className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mb-1">{r.label}</p>
              <p className={`text-sm font-black ${model.accentColor}`}>{r.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-7 py-4 border-t border-white/[0.07] flex items-center justify-between text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all text-sm font-semibold`}
      >
        <span>{open ? 'Hide Details' : 'Show Details'}</span>
        {open ? <ChevronUp size={16} className={model.accentColor} /> : <ChevronDown size={16} className={model.accentColor} />}
      </button>

      {/* Expanded details */}
      {open && (
        <div className="px-7 pb-7 space-y-6 border-t border-white/[0.07] pt-6">
          {/* How it works */}
          <div>
            <SectionLabel>How It Works</SectionLabel>
            <ol className="space-y-3">
              {model.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${model.barColor} text-[#050816] text-[10px] font-black mt-0.5`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Strengths & Limitations */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/80 mb-3">Strengths</p>
              <ul className="space-y-2">
                {model.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-300/80 mb-3">Limitations</p>
              <ul className="space-y-2">
                {model.limitations.map((l) => (
                  <li key={l} className="flex items-start gap-2 text-xs text-slate-400">
                    <AlertTriangle size={12} className="text-red-400 mt-0.5 shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function ModelsPrediction() {
  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* ── Page shell (assumes sidebar is rendered by parent layout) ── */}
      <div className="pt-40 max-w-[1400px] mx-auto overflow-auto">

        {/* ── Page Header ── */}
        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/70 backdrop-blur-xl p-8 mb-8 shadow-[0_0_60px_rgba(34,211,238,0.10)]">
          {/* accent lines */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_50%,rgba(34,211,238,0.07),transparent_40%),radial-gradient(circle_at_95%_50%,rgba(52,211,153,0.05),transparent_40%)]" />

          <div className="relative flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/15">
              <Brain size={28} className="text-cyan-300" />
            </div>
            <div>
              <SectionLabel>VoltIQ AI Engine</SectionLabel>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white">
                ML Models{' '}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  Overview
                </span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                5 machine learning models used for SOH &amp; RUL prediction of EV batteries
              </p>
            </div>
          </div>
        </div>

        {/* ── Overview Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {STATS.map(({ label, value, icon: Icon, color, border, bg, glow }) => (
            <div
              key={label}
              className={`relative overflow-hidden rounded-[1.75rem] border ${border} bg-[#071124]/60 backdrop-blur-xl p-6 flex items-center gap-4 ${glow} transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]`}
            >
              <div className={`absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${color}`} />
              <div className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border ${border} ${bg} ${color} h-12 w-12`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-black text-white">{value}</p>
                <p className="text-slate-500 text-xs mt-0.5 font-semibold uppercase tracking-wider">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Input Features + Output Metrics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Input Features */}
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/60 backdrop-blur-xl p-7 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                <Activity size={16} className="text-cyan-300" />
              </div>
              <div>
                <SectionLabel>Sensors</SectionLabel>
                <h2 className="text-lg font-black uppercase tracking-tight text-white -mt-2">Input Features</h2>
              </div>
            </div>
            <p className="text-slate-500 text-xs mb-6 pl-12">5 sensor parameters used by all models</p>

            <div className="flex flex-col gap-3">
              {INPUT_FEATURES.map(({ icon: Icon, label, unit, desc, range }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-4 hover:border-cyan-400/25 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                    <Icon size={15} className="text-cyan-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-black text-white">{label}</span>
                      {unit && <span className="text-[10px] text-slate-500">({unit})</span>}
                    </div>
                    <p className="text-xs text-slate-500 truncate">{desc}</p>
                  </div>
                  <span className="text-[10px] text-cyan-300 font-mono font-bold bg-cyan-500/10 border border-cyan-400/20 px-3 py-1.5 rounded-xl shrink-0">
                    {range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Output Metrics */}
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/20 bg-[#071124]/60 backdrop-blur-xl p-7 shadow-[0_0_40px_rgba(52,211,153,0.08)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />

            <div className="flex items-center gap-3 mb-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                <BarChart2 size={16} className="text-emerald-300" />
              </div>
              <div>
                <SectionLabel>Results</SectionLabel>
                <h2 className="text-lg font-black uppercase tracking-tight text-white -mt-2">Output Predictions</h2>
              </div>
            </div>
            <p className="text-slate-500 text-xs mb-6 pl-12">What the models predict from the inputs</p>

            <div className="flex flex-col gap-5">
              {/* SOH */}
              <div className="relative overflow-hidden rounded-2xl border border-emerald-400/25 bg-emerald-500/8 p-6">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(52,211,153,0.08),transparent_50%)]" />
                <div className="relative flex items-start justify-between mb-3">
                  <div>
                    <p className="text-emerald-300 font-black text-2xl leading-none">SOH</p>
                    <p className="text-white text-base font-bold mt-1">State of Health</p>
                  </div>
                  <span className="text-4xl font-black text-emerald-400/25">%</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 relative">
                  Ratio of current capacity to rated capacity. Indicates how degraded the battery is.
                </p>
                <div className="grid grid-cols-3 gap-2 relative">
                  {[['Range','0% – 100%'],['Healthy','≥ 90%'],['Critical','< 65%']].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-emerald-400/15 bg-emerald-400/8 p-3 text-center">
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{k}</p>
                      <p className="text-xs font-black text-emerald-300">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RUL */}
              <div className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-cyan-500/8 p-6">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(34,211,238,0.08),transparent_50%)]" />
                <div className="relative flex items-start justify-between mb-3">
                  <div>
                    <p className="text-cyan-300 font-black text-2xl leading-none">RUL</p>
                    <p className="text-white text-base font-bold mt-1">Remaining Useful Life</p>
                  </div>
                  <span className="text-4xl font-black text-cyan-400/25">⟳</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4 relative">
                  Estimated cycles remaining before battery reaches end-of-life threshold.
                </p>
                <div className="grid grid-cols-3 gap-2 relative">
                  {[['Scale','NASA cycles'],['Max','~168 cycles'],['Dataset','B0005-B0018']].map(([k, v]) => (
                    <div key={k} className="rounded-xl border border-cyan-400/15 bg-cyan-400/8 p-3 text-center">
                      <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider mb-1">{k}</p>
                      <p className="text-xs font-black text-cyan-300">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Model Cards ── */}
        <div className="mb-8">
          <div className="mb-8">
            <SectionLabel>AI Engine</SectionLabel>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Model{' '}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Details
              </span>
            </h2>
            <p className="text-slate-500 text-sm mt-2">Click "Show Details" on each card to see full model information</p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {MODELS.map((m) => <ModelCard key={m.key} model={m} />)}
          </div>
        </div>

        {/* ── Comparison Table ── */}
        <div className=" relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071124]/70 backdrop-blur-xl p-8 mb-8 shadow-[0_0_40px_rgba(34,211,238,0.06)]">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

          <div className="mb-6">
            <SectionLabel>Side-by-Side</SectionLabel>
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Model{' '}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Comparison
              </span>
            </h2>
            <p className="text-slate-500 text-xs mt-1">Side-by-side comparison of all 5 models</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Model','Type','SOH Accuracy','RUL Accuracy','Speed','Status'].map(h => (
                    <th key={h} className="text-left py-4 px-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr
                    key={row.name}
                    className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.03] ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span>{row.icon}</span>
                        <span className="font-bold text-white">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-400">{row.type}</td>
                    <td className={`py-4 px-4 font-bold ${row.sohColor}`}>{row.soh}</td>
                    <td className={`py-4 px-4 font-bold ${row.rulColor}`}>{row.rul}</td>
                    <td className={`py-4 px-4 font-bold ${row.speedColor}`}>{row.speed}</td>
                    <td className="py-4 px-4"><StatusBadge status={row.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Dataset Info ── */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#071124]/70 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.06)]">
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/30 to-transparent" />

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Database size={18} className="text-cyan-300" />
            </div>
            <div>
              <SectionLabel>Source Data</SectionLabel>
              <h2 className="text-2xl font-black uppercase tracking-tight -mt-2">
                Training{' '}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  Dataset
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Dataset rows */}
            <div className="flex flex-col gap-0">
              {DATASET_INFO.map(({ label, value }, i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between py-3.5 border-b border-white/[0.07] ${i === 0 ? 'border-t border-white/[0.07]' : ''}`}
                >
                  <span className="text-slate-400 text-sm">{label}</span>
                  <span className="text-white text-sm font-bold">{value}</span>
                </div>
              ))}
            </div>

            {/* Info callouts */}
            <div className="flex flex-col gap-4">
              {/* Research disclaimer */}
              <div className="relative overflow-hidden rounded-2xl border border-yellow-400/25 bg-yellow-400/8 p-5">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-yellow-400/20 bg-yellow-400/10">
                    <Info size={15} className="text-yellow-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300/80 mb-2">Research Disclaimer</p>
                    <p className="text-yellow-200/70 text-xs leading-relaxed">
                      Predictions are based on NASA laboratory test batteries (18650 Li-ion, ~168 max cycles).
                      Results are for research and demonstration purposes only and may not directly
                      translate to real-world EV battery systems (1000–2000 cycle range).
                    </p>
                  </div>
                </div>
              </div>

              {/* SOH vs RUL note */}
              <div className="pb-20 relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-cyan-400/8 p-5">
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                    <Info size={15} className="text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/80 mb-2">SOH vs RUL Interpretation</p>
                    <p className="text-cyan-200/70 text-xs leading-relaxed">
                      <strong className="text-cyan-300">SOH %</strong> is universally applicable across all battery types.
                      <br /><br />
                      <strong className="text-cyan-300">RUL cycles</strong> are NASA-scale (0–168). For real EV batteries,
                      interpret RUL as a relative health indicator, not absolute cycle count.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    <Footer />

    </div>
    
  );
}