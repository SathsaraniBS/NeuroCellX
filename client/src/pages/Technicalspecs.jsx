import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, Cpu, Database, Globe, Shield,
  Zap, Battery, BarChart2, Server, Code2,
  GitBranch, Layers, ChevronDown, ChevronUp,
  CheckCircle, AlertTriangle, ExternalLink
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  Animated counter hook
// ─────────────────────────────────────────────────────────────
function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ─────────────────────────────────────────────────────────────
//  Section wrapper with fade-in
// ─────────────────────────────────────────────────────────────
function Section({ id, children, className = '' }) {
  const ref  = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} ref={ref}
      className={`transition-all duration-700 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
//  Stat card with animated number
// ─────────────────────────────────────────────────────────────
function StatCard({ value, unit, label, color, started }) {
  const isNum = typeof value === 'number';
  const count = useCounter(isNum ? value : 0, 1400, started && isNum);
  return (
    <div className={`relative overflow-hidden rounded-2xl border ${color.border} ${color.bg} p-6 text-center group`}>
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${color.glow}`} />
      <p className={`text-5xl font-black tracking-tight ${color.text} relative z-10`}>
        {isNum ? count : value}
        <span className="text-2xl ml-1 font-bold">{unit}</span>
      </p>
      <p className="text-gray-400 text-sm mt-2 relative z-10">{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Data
// ─────────────────────────────────────────────────────────────
const ML_MODELS = [
  {
    icon: '🌲', name: 'Random Forest',
    type: 'Ensemble', library: 'scikit-learn',
    input: '2D (1×5)', soh: 'Numeric %', rul: 'Numeric cycles',
    accuracy: 'High', speed: 'Fast', status: 'active',
    note: 'Best overall performance for SOH prediction',
  },
  {
    icon: '📐', name: 'Support Vector Regression',
    type: 'Kernel SVM', library: 'scikit-learn',
    input: '2D scaled (1×5)', soh: 'Numeric %', rul: 'Numeric cycles',
    accuracy: 'Limited', speed: 'Fast', status: 'limited',
    note: 'Identical output for all inputs — needs retraining',
  },
  {
    icon: '📊', name: 'Naive Bayes (Gaussian)',
    type: 'Probabilistic', library: 'scikit-learn',
    input: '2D raw (1×5)', soh: 'Class label', rul: 'Class label',
    accuracy: 'Limited', speed: 'Fastest', status: 'limited',
    note: 'Class imbalance causes biased predictions',
  },
  {
    icon: '🔀', name: 'GRU + Random Forest',
    type: 'Hybrid Deep', library: 'TensorFlow + sklearn',
    input: '2D (1×5)', soh: 'Numeric %', rul: '0–1 (calibrated)',
    accuracy: 'High', speed: 'Medium', status: 'active',
    note: 'GRU extracts temporal features, RF predicts',
  },
  {
    icon: '🤖', name: 'LSTM + Transformer',
    type: 'Deep Learning', library: 'TensorFlow / Keras',
    input: '3D (1×15×5)', soh: 'Inverted linear', rul: 'Linear (0–15)',
    accuracy: 'Good', speed: 'Slow', status: 'active',
    note: 'Attention mechanism — backend calibration applied',
  },
];

const TECH_STACK = [
  {
    icon: Globe, label: 'Frontend', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20',
    items: [
      { name: 'React.js 18', desc: 'UI framework' },
      { name: 'React Router DOM v6', desc: 'Client-side routing' },
      { name: 'Tailwind CSS', desc: 'Utility-first styling' },
      { name: 'Lucide React', desc: 'Icon library' },
      { name: 'Vite', desc: 'Build tool' },
      { name: 'Fetch API + Axios', desc: 'HTTP client' },
    ]
  },
  {
    icon: Server, label: 'Backend', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
    items: [
      { name: 'FastAPI', desc: 'Python web framework' },
      { name: 'Uvicorn', desc: 'ASGI server' },
      { name: 'SQLAlchemy', desc: 'ORM layer' },
      { name: 'Pydantic v2', desc: 'Data validation' },
      { name: 'python-jose', desc: 'JWT authentication' },
      { name: 'passlib / bcrypt', desc: 'Password hashing' },
    ]
  },
  {
    icon: Database, label: 'Database', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20',
    items: [
      { name: 'PostgreSQL', desc: 'Primary database' },
      { name: 'psycopg2', desc: 'DB driver' },
      { name: 'users table', desc: 'Authentication & roles' },
      { name: 'reports table', desc: 'Prediction reports' },
      { name: 'battery_logs', desc: 'Sensor readings' },
      { name: 'evaluation_results', desc: 'Model evaluations' },
    ]
  },
  {
    icon: Cpu, label: 'Machine Learning', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20',
    items: [
      { name: 'scikit-learn', desc: 'RF, SVR, Naive Bayes' },
      { name: 'TensorFlow / Keras', desc: 'GRU+RF, LSTM+Trans' },
      { name: 'NumPy + Pandas', desc: 'Data processing' },
      { name: 'SciPy', desc: '.mat file conversion' },
      { name: 'joblib', desc: 'Model serialization (.pkl)' },
      { name: 'MinMaxScaler', desc: 'Feature normalization' },
    ]
  },
];

const API_ENDPOINTS = [
  { method: 'POST', path: '/api/auth/login',             desc: 'User authentication',          color: 'bg-blue-500/20 text-blue-400' },
  { method: 'POST', path: '/api/auth/register',          desc: 'User registration',            color: 'bg-blue-500/20 text-blue-400' },
  { method: 'POST', path: '/api/ml/predict',             desc: 'SOH & RUL prediction',         color: 'bg-green-500/20 text-green-400' },
  { method: 'GET',  path: '/api/reports/',               desc: 'List all reports',             color: 'bg-cyan-500/20 text-cyan-400' },
  { method: 'POST', path: '/api/reports/',               desc: 'Save prediction report',       color: 'bg-green-500/20 text-green-400' },
  { method: 'PUT',  path: '/api/reports/{id}',           desc: 'Update report',                color: 'bg-yellow-500/20 text-yellow-400' },
  { method: 'DELETE',path: '/api/reports/{id}',          desc: 'Delete report',                color: 'bg-red-500/20 text-red-400' },
  { method: 'GET',  path: '/api/dashboard/battery-logs', desc: 'Dashboard prediction logs',   color: 'bg-cyan-500/20 text-cyan-400' },
  { method: 'GET',  path: '/api/dashboard/summary',      desc: 'Avg SOH, RUL, counts',        color: 'bg-cyan-500/20 text-cyan-400' },
  { method: 'GET',  path: '/api/dashboard/evaluations',  desc: 'Recent evaluation results',   color: 'bg-cyan-500/20 text-cyan-400' },
  { method: 'POST', path: '/api/ml/evaluate',            desc: 'Run model evaluation on CSV', color: 'bg-green-500/20 text-green-400' },
  { method: 'POST', path: '/api/ml/evaluate/save',       desc: 'Save evaluation to dashboard',color: 'bg-green-500/20 text-green-400' },
  { method: 'GET',  path: '/api/ml/evaluate/history',    desc: 'Get saved evaluations',       color: 'bg-cyan-500/20 text-cyan-400' },
  { method: 'DELETE',path: '/api/ml/evaluate/{id}',      desc: 'Delete evaluation',           color: 'bg-red-500/20 text-red-400' },
];

const METRICS = [
  { label: 'Accuracy',  desc: '% of predictions within ±5% of true SOH value' },
  { label: 'R² Score',  desc: 'Coefficient of determination — 1.0 = perfect fit' },
  { label: 'MAE',       desc: 'Mean Absolute Error — lower is better' },
  { label: 'MAPE',      desc: 'Mean Absolute Percentage Error' },
  { label: 'sMAPE',     desc: 'Symmetric MAPE — handles zero values better' },
];

const GRADE_SCALE = [
  { grade: 'A+', label: 'Excellent', r2: '≥ 0.95', mae: '≤ 3.0', mape: '≤ 5%',  color: '#00ff88' },
  { grade: 'A',  label: 'Very Good', r2: '≥ 0.90', mae: '≤ 5.0', mape: '≤ 10%', color: '#22c55e' },
  { grade: 'B',  label: 'Good',      r2: '≥ 0.80', mae: '≤ 8.0', mape: '≤ 15%', color: '#84cc16' },
  { grade: 'C',  label: 'Fair',      r2: '≥ 0.70', mae: '≤ 12',  mape: '≤ 25%', color: '#eab308' },
  { grade: 'D',  label: 'Poor',      r2: '≥ 0.50', mae: '—',     mape: '—',     color: '#f97316' },
  { grade: 'F',  label: 'Very Poor', r2: '< 0.50', mae: '—',     mape: '—',     color: '#ef4444' },
];

const NAV_SECTIONS = [
  { id: 'overview',    label: 'Overview'    },
  { id: 'dataset',     label: 'Dataset'     },
  { id: 'models',      label: 'ML Models'   },
  { id: 'metrics',     label: 'Metrics'     },
  { id: 'stack',       label: 'Tech Stack'  },
  { id: 'api',         label: 'API'         },
  { id: 'limitations', label: 'Limitations' },
];

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
function TechnicalSpecs() {
  const [activeSection, setActiveSection] = useState('overview');
  const [statsStarted,  setStatsStarted]  = useState(false);
  const [expandedModel, setExpandedModel] = useState(null);
  const statsRef = useRef(null);

  // Sticky nav highlight
  useEffect(() => {
    const handler = () => {
      NAV_SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) setActiveSection(id);
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Stats counter trigger
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsStarted(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#040c18] text-white font-sans">

      {/* ── Animated background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/8 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-purple-500/8 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-emerald-500/6 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-50 border-b border-white/8 bg-[#040c18]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">
          {/* Back */}
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition text-sm font-medium group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <Zap size={16} className="text-black" />
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              VoltIQ
            </span>
            <span className="text-white/40 text-sm">/ Technical Specs</span>
          </div>

          {/* Section nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_SECTIONS.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                  ${activeSection === id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-24 relative z-10">

        {/* ── HERO ── */}
        <div className="text-center space-y-6 pt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-widest">
            <Code2 size={12} /> Technical Documentation
          </div>
          <h1 className="text-6xl lg:text-7xl font-black leading-none">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              Technical
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Specifications
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Complete technical documentation for the VoltIQ EV Battery Health
            Prediction System — architecture, ML models, APIs, and dataset details.
          </p>

          {/* Quick stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6">
            <StatCard value={5}    unit="" label="ML Models"        started={statsStarted}
              color={{ text:'text-cyan-400', bg:'bg-cyan-500/10', border:'border-cyan-500/20', glow:'bg-gradient-to-br from-cyan-500/10 to-transparent' }} />
            <StatCard value={636}  unit="" label="Training Cycles"  started={statsStarted}
              color={{ text:'text-emerald-400', bg:'bg-emerald-500/10', border:'border-emerald-500/20', glow:'bg-gradient-to-br from-emerald-500/10 to-transparent' }} />
            <StatCard value={14}   unit="" label="API Endpoints"    started={statsStarted}
              color={{ text:'text-purple-400', bg:'bg-purple-500/10', border:'border-purple-500/20', glow:'bg-gradient-to-br from-purple-500/10 to-transparent' }} />
            <StatCard value={168}  unit="cyc" label="Max Cycles"    started={statsStarted}
              color={{ text:'text-yellow-400', bg:'bg-yellow-500/10', border:'border-yellow-500/20', glow:'bg-gradient-to-br from-yellow-500/10 to-transparent' }} />
          </div>
        </div>

        {/* ── SYSTEM OVERVIEW ── */}
        <Section id="overview">
          <SectionTitle icon={Layers} label="System Overview" color="text-cyan-400" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

            {/* Architecture flow */}
            <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">System Architecture</h3>
              <div className="space-y-3">
                {[
                  { layer: 'CLIENT', desc: 'React.js SPA + Tailwind CSS', port: ':5173', color: 'from-cyan-500/20 to-cyan-500/5', border: 'border-cyan-500/30', text: 'text-cyan-400' },
                  { layer: 'API LAYER', desc: 'FastAPI + Uvicorn (ASGI)', port: ':8000', color: 'from-emerald-500/20 to-emerald-500/5', border: 'border-emerald-500/30', text: 'text-emerald-400' },
                  { layer: 'DATABASE', desc: 'PostgreSQL + SQLAlchemy ORM', port: ':5432', color: 'from-purple-500/20 to-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400' },
                  { layer: 'ML ENGINE', desc: 'scikit-learn + TensorFlow/Keras', port: 'local', color: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/30', text: 'text-yellow-400' },
                ].map((l, i) => (
                  <div key={l.layer}>
                    <div className={`flex items-center justify-between bg-gradient-to-r ${l.color} border ${l.border} rounded-xl px-5 py-4`}>
                      <div>
                        <p className={`text-xs font-black uppercase tracking-widest ${l.text}`}>{l.layer}</p>
                        <p className="text-white text-sm font-medium mt-0.5">{l.desc}</p>
                      </div>
                      <code className={`text-xs font-mono ${l.text} bg-black/30 px-3 py-1 rounded-lg`}>{l.port}</code>
                    </div>
                    {i < 3 && (
                      <div className="flex justify-center py-1">
                        <div className="w-px h-4 bg-white/20" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* User Roles */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">User Roles</h3>
              <div className="space-y-3">
                {[
                  { role: 'Admin',    color: 'bg-red-500/20 text-red-400 border-red-500/30',       desc: 'Full system access' },
                  { role: 'Engineer', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',     desc: 'Technical access' },
                  { role: 'Analyst',  color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',desc: 'Analysis access' },
                  { role: 'User',     color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',     desc: 'Standard access' },
                ].map(({ role, color, desc }) => (
                  <div key={role} className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${color}`}>{role}</span>
                    <span className="text-gray-400 text-sm">{desc}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Security</h3>
                <div className="space-y-2">
                  {['JWT Bearer Token auth', 'bcrypt password hashing', 'ProtectedRoute guards', 'Role-based access'].map(s => (
                    <div key={s} className="flex items-center gap-2 text-xs text-gray-400">
                      <Shield size={11} className="text-cyan-400 shrink-0" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── DATASET ── */}
        <Section id="dataset">
          <SectionTitle icon={Database} label="Training Dataset" color="text-emerald-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <Database size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-bold text-white">NASA CALCE Li-ion Battery Dataset</p>
                  <p className="text-gray-500 text-xs">Prognostics Center of Excellence (PCoE)</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Battery IDs',      value: 'B0005, B0006, B0007, B0018' },
                  { label: 'Battery Type',     value: '18650 cylindrical Li-ion' },
                  { label: 'Nominal Capacity', value: '2.0 Ah' },
                  { label: 'Voltage Range',    value: '3.6V – 4.2V' },
                  { label: 'Max Cycles',       value: '~168 per battery' },
                  { label: 'Total Cycles',     value: '636 discharge cycles' },
                  { label: 'Charging',         value: 'CC at 1.5A → CV until 20mA' },
                  { label: 'Discharging',      value: 'CC at 2A until 2.7V' },
                  { label: 'Environment',      value: 'Controlled laboratory' },
                  { label: 'Timeseries Rows',  value: '~2.09 million measurements' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between py-2 border-b border-white/5 text-sm">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-white font-semibold text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Input features */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Input Features (5)
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'Capacity',     unit: 'Ah',  desc: 'Current discharge capacity',       range: '0 – 2.0 Ah' },
                    { name: 'Voltage',      unit: 'V',   desc: 'Terminal battery voltage',          range: '3.4 – 4.2 V' },
                    { name: 'Current',      unit: 'A',   desc: 'Charge/discharge current',          range: '0 – 2.0 A' },
                    { name: 'Temperature',  unit: '°C',  desc: 'Cell temperature',                  range: '20 – 45 °C' },
                    { name: 'CycleCount',   unit: '',    desc: 'Cumulative cycle number',           range: '0 – 168' },
                  ].map(({ name, unit, desc, range }) => (
                    <div key={name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-white text-sm font-semibold">{name}</span>
                        {unit && <span className="text-gray-500 text-xs ml-1">({unit})</span>}
                        <p className="text-gray-600 text-[10px]">{desc}</p>
                      </div>
                      <code className="text-cyan-400 text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded shrink-0">{range}</code>
                    </div>
                  ))}
                </div>
              </div>

              {/* Output targets */}
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Output Targets (2)
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                    <p className="text-green-400 text-2xl font-black">SOH</p>
                    <p className="text-white text-xs font-semibold mt-1">State of Health</p>
                    <p className="text-gray-500 text-[10px] mt-1">0% – 100%</p>
                    <p className="text-gray-600 text-[10px]">Battery condition %</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 text-center">
                    <p className="text-cyan-400 text-2xl font-black">RUL</p>
                    <p className="text-white text-xs font-semibold mt-1">Remaining Useful Life</p>
                    <p className="text-gray-500 text-[10px] mt-1">0 – 168 cycles</p>
                    <p className="text-gray-600 text-[10px]">NASA scale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── ML MODELS ── */}
        <Section id="models">
          <SectionTitle icon={Cpu} label="Machine Learning Models" color="text-yellow-400" />
          <div className="mt-8 space-y-3">
            {ML_MODELS.map((m) => {
              const isExp = expandedModel === m.name;
              return (
                <div key={m.name} className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
                  <button onClick={() => setExpandedModel(isExp ? null : m.name)}
                    className="w-full flex items-center gap-4 px-6 py-5 text-left">
                    <span className="text-2xl shrink-0">{m.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold">{m.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{m.type} • {m.library}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-xs">
                      <div className="text-center">
                        <p className="text-gray-500 mb-1">Accuracy</p>
                        <span className={`font-bold ${m.accuracy === 'High' ? 'text-green-400' : m.accuracy === 'Good' ? 'text-cyan-400' : 'text-yellow-400'}`}>
                          {m.accuracy}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 mb-1">Speed</p>
                        <span className="text-white font-bold">{m.speed}</span>
                      </div>
                    </div>
                    <span className={`hidden md:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0
                      ${m.status === 'active' ? 'bg-green-500/15 text-green-400 border-green-500/25' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'}`}>
                      {m.status === 'active' ? '✅ Active' : '⚠️ Limited'}
                    </span>
                    {isExp ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                  </button>

                  {isExp && (
                    <div className="border-t border-white/5 px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'Library',     value: m.library },
                        { label: 'Input Shape', value: m.input },
                        { label: 'SOH Output',  value: m.soh },
                        { label: 'RUL Output',  value: m.rul },
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
        </Section>

        {/* ── METRICS ── */}
        <Section id="metrics">
          <SectionTitle icon={BarChart2} label="Evaluation Metrics & Grade Scale" color="text-purple-400" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* Metrics list */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">Metrics Used</h3>
              <div className="space-y-3">
                {METRICS.map(({ label, desc }) => (
                  <div key={label} className="flex items-start gap-3 bg-white/5 rounded-xl p-3">
                    <div className="p-1.5 bg-purple-500/20 rounded-lg shrink-0 mt-0.5">
                      <BarChart2 size={12} className="text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{label}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Grade scale */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-5">Grade Scale</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-4 text-[10px] text-gray-600 uppercase font-bold px-3 pb-2">
                  <span>Grade</span><span>R²</span><span>MAE</span><span>MAPE</span>
                </div>
                {GRADE_SCALE.map(({ grade, label, r2, mae, mape, color }) => (
                  <div key={grade} className="grid grid-cols-4 items-center bg-white/5 rounded-xl px-3 py-3 hover:bg-white/8 transition">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black" style={{ color }}>{grade}</span>
                      <span className="text-gray-500 text-[10px]">{label}</span>
                    </div>
                    <span className="text-white text-xs font-semibold">{r2}</span>
                    <span className="text-white text-xs font-semibold">{mae}</span>
                    <span className="text-white text-xs font-semibold">{mape}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ── TECH STACK ── */}
        <Section id="stack">
          <SectionTitle icon={Code2} label="Technology Stack" color="text-emerald-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {TECH_STACK.map(({ icon: Icon, label, color, bg, border, items }) => (
              <div key={label} className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2 rounded-xl border ${bg} ${border}`}>
                    <Icon size={17} className={color} />
                  </div>
                  <h3 className={`font-bold ${color}`}>{label}</h3>
                </div>
                <div className="space-y-2">
                  {items.map(({ name, desc }) => (
                    <div key={name} className="flex items-center justify-between py-2 border-b border-white/5 text-sm">
                      <span className="text-white font-semibold">{name}</span>
                      <span className="text-gray-500 text-xs">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── API ── */}
        <Section id="api">
          <SectionTitle icon={GitBranch} label="API Endpoints" color="text-cyan-400" />
          <div className="mt-8 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
              <code className="text-gray-500 text-sm">Base URL:</code>
              <code className="text-cyan-400 text-sm font-mono">http://localhost:8000</code>
            </div>
            <div className="divide-y divide-white/5">
              {API_ENDPOINTS.map(({ method, path, desc, color }) => (
                <div key={path} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition flex-wrap">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg shrink-0 ${color}`}>
                    {method}
                  </span>
                  <code className="text-white text-sm font-mono flex-1 min-w-0">{path}</code>
                  <span className="text-gray-500 text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── LIMITATIONS ── */}
        <Section id="limitations">
          <SectionTitle icon={AlertTriangle} label="Limitations & Scope" color="text-yellow-400" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                title: 'Dataset Scale',
                icon: '📏',
                type: 'warning',
                desc: 'NASA dataset contains laboratory-grade 18650 Li-ion cells with ~168 max cycles. Real EV batteries operate for 1,000–2,000 cycles. Direct cycle-count comparison is not recommended.',
              },
              {
                title: 'SVR Model Limitation',
                icon: '📐',
                type: 'error',
                desc: 'SVR model produces identical predictions for all inputs due to support vector boundary clamping. Requires retraining with a more diverse and balanced dataset.',
              },
              {
                title: 'Naive Bayes Bias',
                icon: '📊',
                type: 'error',
                desc: 'Naive Bayes always predicts the worst class (Poor/End) with 100% confidence due to severe class imbalance in the training data. Retraining with balanced classes required.',
              },
              {
                title: 'LSTM Output Inversion',
                icon: '🤖',
                type: 'info',
                desc: 'LSTM+Transformer SOH output is inverted (negative = healthy, positive = critical). Backend applies calibration formula: SOH = 2.449 × (−raw) + 77.18. Fixed and working.',
              },
              {
                title: 'Research Scope',
                icon: '🔬',
                type: 'info',
                desc: 'This system is a proof-of-concept for research purposes. Not intended for direct deployment in real EV battery management without retraining on domain-specific data.',
              },
              {
                title: 'RUL Interpretation',
                icon: '🔄',
                type: 'warning',
                desc: 'RUL predictions are NASA-scale (0–168 cycles). For real EV applications, interpret RUL as a relative health indicator, not an absolute cycle count.',
              },
            ].map(({ title, icon, type, desc }) => (
              <div key={title} className={`rounded-2xl p-5 border flex items-start gap-4
                ${type === 'error'   ? 'bg-red-500/8 border-red-500/20' :
                  type === 'warning' ? 'bg-yellow-500/8 border-yellow-500/20' :
                  'bg-blue-500/8 border-blue-500/20'}`}>
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <p className={`font-bold text-sm mb-1
                    ${type === 'error' ? 'text-red-400' : type === 'warning' ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {title}
                  </p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer box */}
          <div className="mt-6 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-6 text-center">
            <CheckCircle size={24} className="text-cyan-400 mx-auto mb-3" />
            <p className="text-white font-bold text-lg mb-2">Research Disclaimer</p>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              VoltIQ is trained on the NASA CALCE Li-ion battery dataset (B0005–B0018)
              and represents a proof-of-concept for ML-based battery health monitoring.
              Predictions are for <strong className="text-white">research and demonstration purposes only</strong> and
              are not intended for direct real-world EV deployment without retraining
              on domain-specific EV battery datasets.
            </p>
          </div>
        </Section>

        {/* ── Footer ── */}
        <div className="border-t border-white/8 pt-10 text-center">
          <p className="text-gray-600 text-sm">
            VoltIQ Technical Documentation •
            NASA CALCE Dataset •
            React + FastAPI + PostgreSQL + TensorFlow
          </p>
          <Link to="/" className="inline-flex items-center gap-2 mt-4 text-cyan-400 text-sm hover:text-cyan-300 transition">
            <ArrowLeft size={14} /> Back to VoltIQ Home
          </Link>
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Section Title component
// ─────────────────────────────────────────────────────────────
function SectionTitle({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10`}>
        <Icon size={20} className={color} />
      </div>
      <h2 className="text-3xl font-black text-white">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

export default TechnicalSpecs;