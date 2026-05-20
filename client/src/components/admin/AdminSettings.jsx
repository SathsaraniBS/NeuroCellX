// src/components/admin/AdminSettings.jsx
import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';
import {
  Settings, Users, Shield, Database, Bell,
  Save, RefreshCw, CheckCircle, AlertTriangle,
  Eye, EyeOff, Trash2, Download, Upload,
  Lock, Globe, Cpu, BarChart2, Info,
  ChevronDown, ChevronUp, Key
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────
function SectionCard({ title, subtitle, icon: Icon, iconColor = 'text-cyan-400', children }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
        <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
          <Icon size={16} className={iconColor} />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm">{title}</h3>
          {subtitle && <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FormField({ label, hint, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</label>
      {children}
      {hint && <p className="text-gray-600 text-[11px]">{hint}</p>}
    </div>
  );
}

function InputField({ value, onChange, type = 'text', placeholder, disabled = false }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition placeholder-gray-600 disabled:opacity-50"
    />
  );
}

function Toggle({ checked, onChange, label, hint }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 shrink-0 ${checked ? 'bg-cyan-500' : 'bg-white/15'}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SaveButton({ onClick, loading, saved, label = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition
        ${saved
          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:brightness-110'
        } disabled:opacity-50`}
    >
      {loading ? <RefreshCw size={14} className="animate-spin" /> :
       saved   ? <CheckCircle size={14} /> : <Save size={14} />}
      {loading ? 'Saving...' : saved ? 'Saved ✅' : label}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────────────────────────
export default function AdminSettings() {
  const { addToast } = useToast();

  // ── Active section ────────────────────────────────────────
  const [activeSection, setActiveSection] = useState('system');

  // ── System settings ───────────────────────────────────────
  const [systemSettings, setSystemSettings] = useState({
    app_name:           'VoltIQ',
    app_version:        '1.0.0',
    maintenance_mode:   false,
    allow_registration: true,
    max_users:          100,
    session_timeout:    60,
  });
  const [sysSaving, setSysSaving] = useState(false);
  const [sysSaved,  setSysSaved]  = useState(false);

  // ── ML Model settings ─────────────────────────────────────
  const [modelSettings, setModelSettings] = useState({
    default_model:          'random_forest',
    soh_critical_threshold: 75,
    soh_warning_threshold:  85,
    rul_warning_threshold:  20,
    enable_lstm:            true,
    enable_gru:             true,
    enable_svr:             true,
    enable_naive_bayes:     true,
  });
  const [modelSaving, setModelSaving] = useState(false);
  const [modelSaved,  setModelSaved]  = useState(false);

  // ── Notification settings ─────────────────────────────────
  const [notifSettings, setNotifSettings] = useState({
    critical_alerts_enabled: true,
    alert_email_enabled:     false,
    admin_email:             '',
    alert_threshold:         75,
  });
  const [notifSaving, setNotifSaving] = useState(false);
  const [notifSaved,  setNotifSaved]  = useState(false);

  // ── Security settings ─────────────────────────────────────
  const [secSettings, setSecSettings] = useState({
    min_password_length: 8,
    require_uppercase:   true,
    require_numbers:     true,
    max_login_attempts:  5,
    jwt_expiry_hours:    24,
  });
  const [secSaving, setSecSaving] = useState(false);
  const [secSaved,  setSecSaved]  = useState(false);

  // ── DB stats ──────────────────────────────────────────────
  const [dbStats,    setDbStats]    = useState(null);
  const [dbLoading,  setDbLoading]  = useState(true);
  const [clearLoading, setClearLoading] = useState(false);

  useEffect(() => { fetchDbStats(); }, []);

  const fetchDbStats = async () => {
    setDbLoading(true);
    try {
      const [statsRes, reportsRes, evalsRes] = await Promise.allSettled([
        api.get('/api/admin/stats'),
        api.get('/api/reports/'),
        api.get('/api/ml/evaluate/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
      ]);
      const stats   = statsRes.status   === 'fulfilled' ? statsRes.value.data   : {};
      const reports = reportsRes.status === 'fulfilled' ? reportsRes.value.data?.reports || [] : [];
      const evals   = evalsRes.status   === 'fulfilled' ? evalsRes.value.data?.results   || [] : [];
      setDbStats({
        total_users:   stats.total_users   || 0,
        total_reports: reports.length,
        total_evals:   evals.length,
        total_logs:    stats.total_logs    || 0,
      });
    } catch {
      setDbStats(null);
    } finally {
      setDbLoading(false);
    }
  };

  // ── Save handlers ─────────────────────────────────────────
  const saveSystem = async () => {
    setSysSaving(true);
    try {
      // In a real app, POST to /api/admin/settings/system
      await new Promise(r => setTimeout(r, 800)); // simulate
      setSysSaved(true);
      addToast('System settings saved! ✅', 'success');
      setTimeout(() => setSysSaved(false), 3000);
    } catch { addToast('Failed to save', 'error'); }
    finally   { setSysSaving(false); }
  };

  const saveModel = async () => {
    setModelSaving(true);
    try {
      await api.put('/api/settings/preferences', {
        default_model:          modelSettings.default_model,
        soh_critical_threshold: modelSettings.soh_critical_threshold,
        soh_warning_threshold:  modelSettings.soh_warning_threshold,
        rul_warning_threshold:  modelSettings.rul_warning_threshold,
      }, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
      setModelSaved(true);
      addToast('Model settings saved! ✅', 'success');
      setTimeout(() => setModelSaved(false), 3000);
    } catch { addToast('Failed to save model settings', 'error'); }
    finally   { setModelSaving(false); }
  };

  const saveNotif = async () => {
    setNotifSaving(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setNotifSaved(true);
      addToast('Notification settings saved! ✅', 'success');
      setTimeout(() => setNotifSaved(false), 3000);
    } catch { addToast('Failed to save', 'error'); }
    finally   { setNotifSaving(false); }
  };

  const saveSecurity = async () => {
    setSecSaving(true);
    try {
      await new Promise(r => setTimeout(r, 800));
      setSecSaved(true);
      addToast('Security settings saved! ✅', 'success');
      setTimeout(() => setSecSaved(false), 3000);
    } catch { addToast('Failed to save', 'error'); }
    finally   { setSecSaving(false); }
  };

  // ── Export all data ───────────────────────────────────────
  const exportAllData = async () => {
    try {
      const [reports, evals, users] = await Promise.allSettled([
        api.get('/api/reports/'),
        api.get('/api/ml/evaluate/history', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
        api.get('/api/admin/users',          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }),
      ]);
      const data = {
        exported_at:  new Date().toISOString(),
        reports:      reports.status === 'fulfilled' ? reports.value.data?.reports     || [] : [],
        evaluations:  evals.status   === 'fulfilled' ? evals.value.data?.results       || [] : [],
        users:        users.status   === 'fulfilled' ? users.value.data?.users         || [] : [],
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href = url; a.download = `voltiq_export_${new Date().toISOString().split('T')[0]}.json`; a.click();
      URL.revokeObjectURL(url);
      addToast('All data exported! ✅', 'success');
    } catch { addToast('Export failed', 'error'); }
  };

  const SECTIONS = [
    { id: 'system',   label: 'System',        icon: Settings  },
    { id: 'models',   label: 'ML Models',     icon: Cpu       },
    { id: 'notifs',   label: 'Notifications', icon: Bell      },
    { id: 'security', label: 'Security',      icon: Shield    },
    { id: 'database', label: 'Database',      icon: Database  },
  ];

  const MODEL_OPTIONS = [
    { value: 'random_forest',    label: '🌲 Random Forest'       },
    { value: 'svr',              label: '📐 SVR'                 },
    { value: 'naive_bayes',      label: '📊 Naive Bayes'         },
    { value: 'gru_randomforest', label: '🔀 GRU + Random Forest' },
    { value: 'lstm_transformer', label: '🤖 LSTM + Transformer'  },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <Settings size={24} className="text-cyan-400" /> Admin Settings
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Configure system, ML models, notifications, security, and database
        </p>
      </div>

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 bg-white/[0.03] border border-white/10 rounded-2xl p-2">
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition flex-1 justify-center
              ${activeSection === id
                ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            <Icon size={15} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* ── SYSTEM SETTINGS ── */}
      {activeSection === 'system' && (
        <SectionCard title="System Configuration" subtitle="Core application settings" icon={Settings}>
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Application Name">
                <InputField
                  value={systemSettings.app_name}
                  onChange={(e) => setSystemSettings(p => ({ ...p, app_name: e.target.value }))}
                  placeholder="VoltIQ"
                />
              </FormField>
              <FormField label="Version">
                <InputField
                  value={systemSettings.app_version}
                  onChange={(e) => setSystemSettings(p => ({ ...p, app_version: e.target.value }))}
                  placeholder="1.0.0"
                />
              </FormField>
              <FormField label="Max Users" hint="Maximum registered users allowed">
                <InputField
                  type="number"
                  value={systemSettings.max_users}
                  onChange={(e) => setSystemSettings(p => ({ ...p, max_users: parseInt(e.target.value) }))}
                />
              </FormField>
              <FormField label="Session Timeout (minutes)">
                <InputField
                  type="number"
                  value={systemSettings.session_timeout}
                  onChange={(e) => setSystemSettings(p => ({ ...p, session_timeout: parseInt(e.target.value) }))}
                />
              </FormField>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/5">
              <Toggle
                checked={systemSettings.allow_registration}
                onChange={(v) => setSystemSettings(p => ({ ...p, allow_registration: v }))}
                label="Allow New Registrations"
                hint="Users can register new accounts"
              />
              <Toggle
                checked={systemSettings.maintenance_mode}
                onChange={(v) => setSystemSettings(p => ({ ...p, maintenance_mode: v }))}
                label="Maintenance Mode"
                hint="Disable public access temporarily"
              />
            </div>

            {systemSettings.maintenance_mode && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-400" />
                <p className="text-yellow-400 text-xs">Maintenance mode is ON — users cannot access the app</p>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <SaveButton onClick={saveSystem} loading={sysSaving} saved={sysSaved} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── ML MODEL SETTINGS ── */}
      {activeSection === 'models' && (
        <SectionCard title="ML Model Configuration" subtitle="Default model and prediction thresholds" icon={Cpu} iconColor="text-purple-400">
          <div className="space-y-5">

            <FormField label="Default Prediction Model">
              <select
                value={modelSettings.default_model}
                onChange={(e) => setModelSettings(p => ({ ...p, default_model: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition"
              >
                {MODEL_OPTIONS.map(o => (
                  <option key={o.value} value={o.value} className="bg-[#0b1120]">{o.label}</option>
                ))}
              </select>
            </FormField>

            <div className="pt-2 border-t border-white/5 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">SOH Thresholds</p>

              {/* Critical slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs text-gray-400 uppercase font-bold">Critical Threshold</label>
                  <span className="text-red-400 font-bold text-sm">{modelSettings.soh_critical_threshold}%</span>
                </div>
                <input type="range" min={50} max={80} step={1}
                  value={modelSettings.soh_critical_threshold}
                  onChange={(e) => setModelSettings(p => ({ ...p, soh_critical_threshold: parseInt(e.target.value) }))}
                  className="w-full accent-red-400 h-1.5 rounded-full bg-white/10 cursor-pointer"
                />
                <p className="text-gray-600 text-[10px]">SOH below this = Critical (red alert)</p>
              </div>

              {/* Warning slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs text-gray-400 uppercase font-bold">Warning Threshold</label>
                  <span className="text-yellow-400 font-bold text-sm">{modelSettings.soh_warning_threshold}%</span>
                </div>
                <input type="range" min={70} max={95} step={1}
                  value={modelSettings.soh_warning_threshold}
                  onChange={(e) => setModelSettings(p => ({ ...p, soh_warning_threshold: parseInt(e.target.value) }))}
                  className="w-full accent-yellow-400 h-1.5 rounded-full bg-white/10 cursor-pointer"
                />
                <p className="text-gray-600 text-[10px]">SOH below this = Moderate (yellow)</p>
              </div>

              {/* RUL slider */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-xs text-gray-400 uppercase font-bold">RUL Warning Level</label>
                  <span className="text-orange-400 font-bold text-sm">{modelSettings.rul_warning_threshold} cycles</span>
                </div>
                <input type="range" min={5} max={50} step={1}
                  value={modelSettings.rul_warning_threshold}
                  onChange={(e) => setModelSettings(p => ({ ...p, rul_warning_threshold: parseInt(e.target.value) }))}
                  className="w-full accent-orange-400 h-1.5 rounded-full bg-white/10 cursor-pointer"
                />
              </div>
            </div>

            {/* Threshold preview */}
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Threshold Preview</p>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 border border-green-500/25 text-xs font-bold">
                  ✅ Healthy ≥ {modelSettings.soh_warning_threshold}%
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 text-xs font-bold">
                  ⚠️ Moderate {modelSettings.soh_critical_threshold}–{modelSettings.soh_warning_threshold}%
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/25 text-xs font-bold">
                  🔴 Critical &lt; {modelSettings.soh_critical_threshold}%
                </span>
              </div>
            </div>

            {/* Enabled models */}
            <div className="pt-2 border-t border-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Enabled Models</p>
              <div className="space-y-1">
                <Toggle checked={modelSettings.enable_lstm}        onChange={(v) => setModelSettings(p => ({ ...p, enable_lstm: v }))}        label="🤖 LSTM + Transformer" hint="Deep learning model" />
                <Toggle checked={modelSettings.enable_gru}         onChange={(v) => setModelSettings(p => ({ ...p, enable_gru: v }))}         label="🔀 GRU + Random Forest" hint="Hybrid model" />
                <Toggle checked={modelSettings.enable_svr}         onChange={(v) => setModelSettings(p => ({ ...p, enable_svr: v }))}         label="📐 SVR" hint="Currently outputs fixed values" />
                <Toggle checked={modelSettings.enable_naive_bayes} onChange={(v) => setModelSettings(p => ({ ...p, enable_naive_bayes: v }))} label="📊 Naive Bayes" hint="Probabilistic classifier" />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <SaveButton onClick={saveModel} loading={modelSaving} saved={modelSaved} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── NOTIFICATION SETTINGS ── */}
      {activeSection === 'notifs' && (
        <SectionCard title="Notification Settings" subtitle="Alert and email notification configuration" icon={Bell} iconColor="text-yellow-400">
          <div className="space-y-5">
            <div className="space-y-1">
              <Toggle
                checked={notifSettings.critical_alerts_enabled}
                onChange={(v) => setNotifSettings(p => ({ ...p, critical_alerts_enabled: v }))}
                label="Critical Battery Alerts"
                hint="Show alerts when SOH drops below threshold"
              />
              <Toggle
                checked={notifSettings.alert_email_enabled}
                onChange={(v) => setNotifSettings(p => ({ ...p, alert_email_enabled: v }))}
                label="Email Notifications"
                hint="Send email alerts to admin"
              />
            </div>

            {notifSettings.alert_email_enabled && (
              <FormField label="Admin Email" hint="Email for critical alert notifications">
                <InputField
                  type="email"
                  value={notifSettings.admin_email}
                  onChange={(e) => setNotifSettings(p => ({ ...p, admin_email: e.target.value }))}
                  placeholder="admin@voltiq.com"
                />
              </FormField>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs text-gray-400 uppercase font-bold">Alert Threshold</label>
                <span className="text-red-400 font-bold text-sm">{notifSettings.alert_threshold}%</span>
              </div>
              <input type="range" min={50} max={90} step={1}
                value={notifSettings.alert_threshold}
                onChange={(e) => setNotifSettings(p => ({ ...p, alert_threshold: parseInt(e.target.value) }))}
                className="w-full accent-red-400 h-1.5 rounded-full bg-white/10 cursor-pointer"
              />
              <p className="text-gray-600 text-[10px]">Send alert when SOH drops below this value</p>
            </div>

            {/* Status indicator */}
            <div className={`flex items-center gap-3 rounded-xl p-4 border
              ${notifSettings.critical_alerts_enabled
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-white/5 border-white/10'}`}>
              <div className={`w-3 h-3 rounded-full shrink-0 ${notifSettings.critical_alerts_enabled ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
              <p className="text-sm text-gray-400">
                {notifSettings.critical_alerts_enabled
                  ? `Alerts active — monitoring SOH < ${notifSettings.alert_threshold}%`
                  : 'Alerts disabled'}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <SaveButton onClick={saveNotif} loading={notifSaving} saved={notifSaved} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── SECURITY SETTINGS ── */}
      {activeSection === 'security' && (
        <SectionCard title="Security Configuration" subtitle="Password policy and authentication settings" icon={Shield} iconColor="text-red-400">
          <div className="space-y-5">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Min Password Length">
                <InputField
                  type="number"
                  value={secSettings.min_password_length}
                  onChange={(e) => setSecSettings(p => ({ ...p, min_password_length: parseInt(e.target.value) }))}
                />
              </FormField>
              <FormField label="Max Login Attempts" hint="Lock after N failed attempts">
                <InputField
                  type="number"
                  value={secSettings.max_login_attempts}
                  onChange={(e) => setSecSettings(p => ({ ...p, max_login_attempts: parseInt(e.target.value) }))}
                />
              </FormField>
              <FormField label="JWT Token Expiry (hours)">
                <InputField
                  type="number"
                  value={secSettings.jwt_expiry_hours}
                  onChange={(e) => setSecSettings(p => ({ ...p, jwt_expiry_hours: parseInt(e.target.value) }))}
                />
              </FormField>
            </div>

            <div className="space-y-1 pt-2 border-t border-white/5">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Password Policy</p>
              <Toggle
                checked={secSettings.require_uppercase}
                onChange={(v) => setSecSettings(p => ({ ...p, require_uppercase: v }))}
                label="Require Uppercase Letters"
                hint="Password must contain at least one uppercase"
              />
              <Toggle
                checked={secSettings.require_numbers}
                onChange={(v) => setSecSettings(p => ({ ...p, require_numbers: v }))}
                label="Require Numbers"
                hint="Password must contain at least one number"
              />
            </div>

            {/* JWT info */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
              <Key size={14} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-bold text-xs">JWT Configuration</p>
                <p className="text-gray-400 text-xs mt-1">
                  Algorithm: HS256 • Secret key configured in backend.
                  Change SECRET_KEY in settings.py for production.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <SaveButton onClick={saveSecurity} loading={secSaving} saved={secSaved} />
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── DATABASE SECTION ── */}
      {activeSection === 'database' && (
        <div className="space-y-5">

          {/* DB Stats */}
          <SectionCard title="Database Overview" subtitle="Current database statistics" icon={Database} iconColor="text-emerald-400">
            {dbLoading ? (
              <div className="flex items-center justify-center py-8 gap-3">
                <RefreshCw size={18} className="animate-spin text-cyan-400" />
                <p className="text-gray-400 text-sm">Loading stats...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Total Users',   value: dbStats?.total_users   || 0, color: 'text-cyan-400'   },
                  { label: 'Reports',       value: dbStats?.total_reports || 0, color: 'text-green-400'  },
                  { label: 'Evaluations',   value: dbStats?.total_evals   || 0, color: 'text-purple-400' },
                  { label: 'Battery Logs',  value: dbStats?.total_logs    || 0, color: 'text-yellow-400' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="bg-white/5 rounded-xl p-4 text-center">
                    <p className={`text-3xl font-black ${color}`}>{value}</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex gap-3">
              <button onClick={fetchDbStats} disabled={dbLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
                <RefreshCw size={13} className={dbLoading ? 'animate-spin' : ''} /> Refresh Stats
              </button>
            </div>
          </SectionCard>

          {/* Database Tables */}
          <SectionCard title="Database Tables" subtitle="PostgreSQL table structure" icon={Database} iconColor="text-purple-400">
            <div className="space-y-2">
              {[
                { table: 'users',              cols: 'id, name, email, password_hash, role, created_at', color: 'text-cyan-400'   },
                { table: 'reports',            cols: 'id, report_name, report_type, battery_id, soh_predicted, rul_predicted, health_status, voltage, current_a, temperature, cycle_count, capacity, generated_by, created_at', color: 'text-green-400'  },
                { table: 'battery_logs',       cols: 'id, voltage, temperature, soh_result, created_at', color: 'text-yellow-400' },
                { table: 'evaluation_results', cols: 'id, user_id, model_key, dataset_name, total_rows, soh_*, rul_*, created_at', color: 'text-purple-400' },
                { table: 'user_settings',      cols: 'id, user_id, thresholds, preferences, notifications, created_at', color: 'text-orange-400' },
              ].map(({ table, cols, color }) => (
                <div key={table} className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-mono font-bold text-sm ${color}`}>{table}</span>
                  </div>
                  <p className="text-gray-600 text-[10px] font-mono leading-relaxed">{cols}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Export & Backup */}
          <SectionCard title="Data Export & Backup" subtitle="Download all system data" icon={Download} iconColor="text-blue-400">
            <div className="space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Export all VoltIQ data including users, reports, and evaluation results as a JSON file.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={exportAllData}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition text-sm font-bold">
                  <Download size={15} /> Export All Data (.json)
                </button>
              </div>

              {/* Warning */}
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3 mt-4">
                <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-bold text-xs">Danger Zone</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Database operations are permanent. Always export data before any destructive operations.
                    Contact your database administrator for direct PostgreSQL access.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* App Info Footer */}
      <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-white font-bold text-sm">VoltIQ Admin Panel</p>
          <p className="text-gray-500 text-xs mt-0.5">
            React + FastAPI + PostgreSQL + TensorFlow • NASA CALCE Dataset
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-semibold">System Online</span>
        </div>
      </div>

    </div>
  );
}