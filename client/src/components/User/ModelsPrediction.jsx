// ModelsPrediction.jsx
// Reusable React component converted from the uploaded JSX file.

import React, { useState } from 'react';
import {
  Brain, Zap, Thermometer, Battery, RefreshCw,
  ChevronDown, ChevronUp, CheckCircle, AlertTriangle,
  Database, Cpu, TrendingUp, Activity, BarChart2, Info
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────
const STATS = [
  { label: 'ML Models',     value: '5',       icon: Brain },
  { label: 'Predictions',   value: 'SOH+RUL', icon: TrendingUp },
  { label: 'Input Features',value: '5',       icon: Activity },
  { label: 'Dataset',       value: 'NASA',    icon: Database },
];

const INPUT_FEATURES = [
  { icon: Battery,     label: 'Capacity',    unit: 'Ah',  desc: 'Current battery capacity',         range: '0 – 2.0 Ah' },
  { icon: Zap,         label: 'Voltage',     unit: 'V',   desc: 'Terminal voltage of battery',      range: '3.4 – 4.2 V' },
  { icon: Activity,    label: 'Current',     unit: 'A',   desc: 'Charge / discharge current',       range: '0 – 2.0 A' },
  { icon: Thermometer, label: 'Temperature', unit: '°C',  desc: 'Battery cell temperature',         range: '20 – 45 °C' },
  { icon: RefreshCw,   label: 'Cycle Count', unit: '',    desc: 'Number of charge-discharge cycles', range: '0 – 168' },
];

const MODELS = [
  {
    key:   'random_forest',
    icon:  '🌲',
    name:  'Random Forest',
    badge: 'Ensemble',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cardBorder: 'border-emerald-500/20',
    accentColor: 'text-emerald-400',
    barColor: 'bg-emerald-400',
    accuracy: 92,
    speed: 90,
    status: 'active',
    library: 'scikit-learn',
    inputShape: '2D (1×5)',
    outputType: 'Numeric',
    description:
      'An ensemble method that builds multiple decision trees during training and outputs the mean prediction. Each tree is trained on a random subset of data and features, reducing overfitting and improving generalization.',
    howItWorks: [
      'Splits training data into random subsets',
      'Builds 100+ independent decision trees',
      'Each tree votes on the prediction',
      'Final output = average of all tree votes',
    ],
    strengths:  ['High accuracy', 'Stable predictions', 'Fast inference', 'Handles non-linear patterns'],
    limitations:['RUL scaling variation', 'Less interpretable', 'Memory intensive'],
    sohRange: '61% – 95%',
    rulRange: '6 – 76 cycles',
    note: null,
  },
  {
    key:   'svr',
    icon:  '📐',
    name:  'SVR (Support Vector Regression)',
    badge: 'Kernel-based',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    cardBorder: 'border-blue-500/20',
    accentColor: 'text-blue-400',
    barColor: 'bg-blue-400',
    accuracy: 55,
    speed: 85,
    status: 'limited',
    library: 'scikit-learn',
    inputShape: '2D scaled (1×5)',
    outputType: 'Numeric',
    description:
      'Support Vector Regression maps input features into a high-dimensional space using a kernel function and finds the best-fit hyperplane. Effective for small datasets but sensitive to feature scaling.',
    howItWorks: [
      'Scales input features using MinMaxScaler',
      'Maps features to high-dimensional space via RBF kernel',
      'Finds optimal regression hyperplane',
      'Predictions based on support vectors near the boundary',
    ],
    strengths:  ['Works on small datasets', 'Robust to outliers', 'Effective with scaling'],
    limitations:['All inputs give same output ⚠️', 'Limited generalization', 'Needs retraining'],
    sohRange: '84.61% (fixed)',
    rulRange: '37 cycles (fixed)',
    note: '⚠️ Model outputs identical predictions for all inputs — retraining required for proper differentiation.',
  },
  {
    key:   'naive_bayes',
    icon:  '📊',
    name:  'Naive Bayes',
    badge: 'Probabilistic',
    badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    cardBorder: 'border-yellow-500/20',
    accentColor: 'text-yellow-400',
    barColor: 'bg-yellow-400',
    accuracy: 40,
    speed: 95,
    status: 'limited',
    library: 'scikit-learn',
    inputShape: '2D raw (1×5)',
    outputType: 'Class Label',
    description:
      'A probabilistic classifier based on Bayes theorem with the "naive" assumption of feature independence. Predicts SOH and RUL as class labels (e.g., Poor, Fair, Good) rather than exact numeric values.',
    howItWorks: [
      'Assumes all input features are independent',
      'Calculates probability for each class label',
      'SOH classes: Critical, Poor, Fair, Good, Excellent',
      'RUL classes: End, Critical, Late, Mid, Early',
      'Assigns label with highest probability',
    ],
    strengths:  ['Extremely fast', 'Simple to understand', 'Works with small data'],
    limitations:['Always predicts "Poor"/"End" ⚠️', 'No scaler used', 'Class imbalance issue', 'Needs retraining'],
    sohRange: '62% (Poor label)',
    rulRange: '5 cycles (End label)',
    note: '⚠️ Model is biased — always predicts worst class with 100% confidence. Class-balanced retraining required.',
  },
  {
    key:   'gru_randomforest',
    icon:  '🔀',
    name:  'GRU + Random Forest Hybrid',
    badge: 'Hybrid Deep',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    cardBorder: 'border-purple-500/20',
    accentColor: 'text-purple-400',
    barColor: 'bg-purple-400',
    accuracy: 88,
    speed: 70,
    status: 'active',
    library: 'scikit-learn + TensorFlow',
    inputShape: 'RF: 2D (1×5)',
    outputType: 'Numeric',
    description:
      'A hybrid architecture combining Gated Recurrent Unit (GRU) temporal feature extraction with Random Forest regression. The GRU captures sequential battery degradation patterns while the RF provides robust final predictions.',
    howItWorks: [
      'Scales input using MinMaxScaler',
      'GRU extracts temporal degradation patterns',
      'Random Forest uses GRU features for prediction',
      'SOH output: direct numeric percentage',
      'RUL output: normalized 0-1 range (scaled to cycles)',
    ],
    strengths:  ['Captures time patterns', 'High SOH accuracy', 'Robust hybrid approach'],
    limitations:['RUL small for mid-life inputs', 'Complex architecture', 'Slower than pure ML'],
    sohRange: '61% – 95%',
    rulRange: '9 – 134 cycles',
    note: null,
  },
  {
    key:   'lstm_transformer',
    icon:  '🤖',
    name:  'LSTM + Transformer',
    badge: 'Deep Learning',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    cardBorder: 'border-cyan-500/20',
    accentColor: 'text-cyan-400',
    barColor: 'bg-cyan-400',
    accuracy: 82,
    speed: 55,
    status: 'active',
    library: 'TensorFlow / Keras',
    inputShape: '3D (1×15×5)',
    outputType: 'Linear (scaled)',
    description:
      'A deep learning architecture combining Long Short-Term Memory (LSTM) networks with Transformer attention mechanisms. Designed to capture both sequential and global patterns in battery degradation sequences.',
    howItWorks: [
      'Input reshaped to 3D sequence: (1, 15, 5)',
      'LSTM captures sequential degradation over time',
      'Transformer attention focuses on key features',
      'SOH output is inverted linear (negated + mapped)',
      'RUL output is linear (0-15 range → 5-160 cycles)',
    ],
    strengths:  ['Captures complex patterns', 'Attention mechanism', 'Good SOH accuracy'],
    limitations:['Inverted SOH output (requires post-processing)', 'Slowest inference', 'Needs more data'],
    sohRange: '61% – 90%',
    rulRange: '43 – 112 cycles',
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

// ─── Sub-components ──────────────────────────────────────────
function StatusBadge({ status }) {
  return status === 'active' ? (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 text-green-400 border border-green-500/25">
      <CheckCircle size={11} /> Active
    </span>
  ) : (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/25">
      <AlertTriangle size={11} /> Limited
    </span>
  );
}

function MiniBar({ value, color, label }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="w-full bg-white/5 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ModelCard({ model }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`bg-white/[0.03] border ${model.cardBorder} rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/[0.05]`}>
      {/* Card Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{model.icon}</span>
            <div>
              <h3 className={`text-lg font-bold ${model.accentColor}`}>{model.name}</h3>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${model.badgeColor}`}>
                {model.badge}
              </span>
            </div>
          </div>
          <StatusBadge status={model.status} />
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-5">{model.description}</p>

        {/* Warning Note */}
        {model.note && (
          <div className="flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 mb-5">
            <AlertTriangle size={14} className="text-yellow-400 mt-0.5 shrink-0" />
            <p className="text-yellow-300 text-xs leading-relaxed">{model.note}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Library',     value: model.library },
            { label: 'Input Shape', value: model.inputShape },
            { label: 'Output',      value: model.outputType },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 rounded-xl p-3 text-center">
              <p className="text-gray-500 text-[9px] uppercase font-bold mb-1">{s.label}</p>
              <p className="text-white text-xs font-semibold">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Accuracy & Speed bars */}
        <div className="space-y-2.5 mb-5">
          <MiniBar value={model.accuracy} color={model.barColor} label="Accuracy" />
          <MiniBar value={model.speed}    color={model.barColor} label="Speed" />
        </div>

        {/* Typical Output */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-gray-500 text-[9px] uppercase font-bold mb-1">SOH Range</p>
            <p className={`text-sm font-bold ${model.accentColor}`}>{model.sohRange}</p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center">
            <p className="text-gray-500 text-[9px] uppercase font-bold mb-1">RUL Range</p>
            <p className={`text-sm font-bold ${model.accentColor}`}>{model.rulRange}</p>
          </div>
        </div>
      </div>

      {/* Expand Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-3 border-t border-white/5 flex items-center justify-between text-gray-400 hover:text-white hover:bg-white/5 transition text-sm"
      >
        <span>{open ? 'Hide Details' : 'Show Details'}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Expanded Details */}
      {open && (
        <div className="px-6 pb-6 space-y-5 border-t border-white/5 pt-5">
          {/* How It Works */}
          <div>
            <h4 className="text-xs font-bold uppercase text-gray-400 mb-3 tracking-wider">How It Works</h4>
            <ol className="space-y-2">
              {model.howItWorks.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className={`shrink-0 w-5 h-5 rounded-full ${model.barColor} text-black text-[10px] font-bold flex items-center justify-center mt-0.5`}>
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Strengths & Limitations */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-bold uppercase text-green-400 mb-3 tracking-wider">✅ Strengths</h4>
              <ul className="space-y-1.5">
                {model.strengths.map((s) => (
                  <li key={s} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span>{s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase text-red-400 mb-3 tracking-wider">⚠️ Limitations</h4>
              <ul className="space-y-1.5">
                {model.limitations.map((l) => (
                  <li key={l} className="text-xs text-gray-300 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5">•</span>{l}
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

// ─── Main Page ───────────────────────────────────────────────
export default function ModelsPrediction() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <main className="flex-1 p-8 overflow-auto">

        {/* ── Page Header ── */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
              <Brain size={22} className="text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">ML Models Overview</h1>
              <p className="text-gray-400 text-sm mt-0.5">
                5 machine learning models used for SOH &amp; RUL prediction of EV batteries
              </p>
            </div>
          </div>
        </div>

        {/* ── Overview Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Icon size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-gray-400 text-xs mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Input Features + Output Metrics ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Input Features */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold mb-1 flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" /> Input Features
            </h2>
            <p className="text-gray-500 text-xs mb-5">5 sensor parameters used by all models</p>
            <div className="space-y-3">
              {INPUT_FEATURES.map(({ icon: Icon, label, unit, desc, range }) => (
                <div key={label} className="flex items-center gap-4 bg-white/5 rounded-xl p-3.5">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20 shrink-0">
                    <Icon size={15} className="text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-white">{label}</span>
                      {unit && <span className="text-[10px] text-gray-500">({unit})</span>}
                    </div>
                    <p className="text-xs text-gray-500 truncate">{desc}</p>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-500/10 px-2 py-1 rounded-lg shrink-0">
                    {range}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Output Metrics */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold mb-1 flex items-center gap-2">
              <BarChart2 size={16} className="text-cyan-400" /> Output Predictions
            </h2>
            <p className="text-gray-500 text-xs mb-5">What the models predict from the inputs</p>

            <div className="space-y-4">
              {/* SOH Card */}
              <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-green-400 font-bold text-lg">SOH</p>
                    <p className="text-white text-sm font-semibold">State of Health</p>
                  </div>
                  <span className="text-3xl font-black text-green-400/30">%</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  Ratio of current capacity to rated capacity. Indicates how degraded the battery is.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[['Range','0% – 100%'],['Healthy','≥ 90%'],['Critical','< 65%']].map(([k,v])=>(
                    <div key={k} className="bg-white/5 rounded-lg p-2">
                      <p className="text-[9px] text-gray-500 uppercase">{k}</p>
                      <p className="text-xs font-bold text-green-400">{v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RUL Card */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-cyan-400 font-bold text-lg">RUL</p>
                    <p className="text-white text-sm font-semibold">Remaining Useful Life</p>
                  </div>
                  <span className="text-3xl font-black text-cyan-400/30">⟳</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  Estimated cycles remaining before battery reaches end-of-life threshold.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[['Scale','NASA cycles'],['Max','~168 cycles'],['Dataset','B0005-B0018']].map(([k,v])=>(
                    <div key={k} className="bg-white/5 rounded-lg p-2">
                      <p className="text-[9px] text-gray-500 uppercase">{k}</p>
                      <p className="text-xs font-bold text-cyan-400">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Model Cards ── */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Cpu size={18} className="text-cyan-400" /> Model Details
          </h2>
          <p className="text-gray-500 text-sm mb-6">Click "Show Details" on each card to see full model information</p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {MODELS.map((m) => <ModelCard key={m.key} model={m} />)}
          </div>
        </div>

        {/* ── Comparison Table ── */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-base font-bold mb-1 flex items-center gap-2">
            <BarChart2 size={16} className="text-cyan-400" /> Model Comparison
          </h2>
          <p className="text-gray-500 text-xs mb-5">Side-by-side comparison of all 5 models</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Model','Type','SOH Accuracy','RUL Accuracy','Speed','Status'].map(h=>(
                    <th key={h} className="text-left py-3 px-4 text-gray-400 text-xs uppercase font-bold tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { icon:'🌲', name:'Random Forest',    type:'Ensemble',   soh:'✅ High',    rul:'✅ Good',    speed:'⚡ Fast',   status:'active' },
                  { icon:'📐', name:'SVR',              type:'Kernel SVM', soh:'⚠️ Fixed',  rul:'⚠️ Fixed',  speed:'⚡ Fast',   status:'limited' },
                  { icon:'📊', name:'Naive Bayes',      type:'Probabilistic',soh:'⚠️ Biased',rul:'⚠️ Biased', speed:'⚡ Fastest',status:'limited' },
                  { icon:'🔀', name:'GRU + RF Hybrid',  type:'Hybrid',     soh:'✅ High',    rul:'✅ Good',    speed:'🔶 Medium', status:'active' },
                  { icon:'🤖', name:'LSTM+Transformer', type:'Deep Learning',soh:'✅ Good',  rul:'✅ Good',    speed:'🔴 Slow',   status:'active' },
                ].map((row)=>(
                  <tr key={row.name} className="hover:bg-white/5 transition">
                    <td className="py-3.5 px-4">
                      <span className="mr-2">{row.icon}</span>
                      <span className="font-medium text-white">{row.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400">{row.type}</td>
                    <td className="py-3.5 px-4">{row.soh}</td>
                    <td className="py-3.5 px-4">{row.rul}</td>
                    <td className="py-3.5 px-4">{row.speed}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Dataset Info ── */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-base font-bold mb-1 flex items-center gap-2">
            <Database size={16} className="text-cyan-400" /> Training Dataset
          </h2>
          <p className="text-gray-500 text-xs mb-5">NASA CALCE Li-ion Battery Dataset details</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              {DATASET_INFO.map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5 border-b border-white/5">
                  <span className="text-gray-400 text-sm">{label}</span>
                  <span className="text-white text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {/* Disclaimer */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-400 font-bold text-sm mb-2">Research Disclaimer</p>
                    <p className="text-yellow-200/70 text-xs leading-relaxed">
                      Predictions are based on NASA laboratory test batteries (18650 Li-ion, ~168 max cycles).
                      Results are for research and demonstration purposes only and may not directly
                      translate to real-world EV battery systems (1000–2000 cycle range).
                    </p>
                  </div>
                </div>
              </div>

              {/* RUL Note */}
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <Info size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cyan-400 font-bold text-sm mb-2">SOH vs RUL Interpretation</p>
                    <p className="text-cyan-200/70 text-xs leading-relaxed">
                      <strong>SOH %</strong> is universally applicable across all battery types.
                      <br /><br />
                      <strong>RUL cycles</strong> are NASA-scale (0–168). For real EV batteries,
                      interpret RUL as a relative health indicator, not absolute cycle count.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}