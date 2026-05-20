// src/pages/Settings.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }     from '../contexts/AuthContext';
import { useToast }    from '../contexts/ToastContext';
import Sidebar         from '../components/User/UserSidebar';
import {
  User, Lock, Bell, Monitor, Trash2,
  Save, RefreshCw, Eye, EyeOff, Download,
  AlertTriangle, CheckCircle, Settings as SettingsIcon,
  ChevronRight, Shield, Database, Globe,
  Sliders, Mail, Smartphone, Calendar
} from 'lucide-react';
import api from '../services/api';

// ─────────────────────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────────────────────
const MODEL_OPTIONS = [
  { value: 'random_forest',    label: '🌲 Random Forest'       },
  { value: 'svr',              label: '📐 SVR'                 },
  { value: 'naive_bayes',      label: '📊 Naive Bayes'         },
  { value: 'gru_randomforest', label: '🔀 GRU + Random Forest' },
  { value: 'lstm_transformer', label: '🤖 LSTM + Transformer'  },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: '🇬🇧 English'  },
  { value: 'si', label: '🇱🇰 Sinhala'  },
  { value: 'ta', label: '🇮🇳 Tamil'    },
];

const DATE_FORMATS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)'    },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (EU)'    },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)'   },
];

const TABS = [
  { id: 'profile',       label: 'Profile',       icon: User    },
  { id: 'preferences',   label: 'Preferences',   icon: Sliders },
  { id: 'notifications', label: 'Notifications', icon: Bell    },
  { id: 'display',       label: 'Display',       icon: Monitor },
  { id: 'account',       label: 'Account',       icon: Shield  },
];

// ─────────────────────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────────────────────
function SectionCard({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-5 border-b border-white/5 flex items-center gap-3">
        <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
          <Icon size={16} className="text-cyan-400" />
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

function Input({ value, onChange, type = 'text', placeholder, disabled = false, ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition placeholder-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition"
    >
      {options.map(o => (
        <option key={o.value} value={o.value} className="bg-[#0b1120]">{o.label}</option>
      ))}
    </select>
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
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${checked ? 'bg-cyan-500' : 'bg-white/15'}`}
      >
        <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SliderField({ label, value, onChange, min, max, step = 1, unit = '', hint }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</label>
        <span className="text-cyan-400 font-bold text-sm">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full accent-cyan-400 h-1.5 rounded-full bg-white/10 cursor-pointer"
      />
      <div className="flex justify-between text-[10px] text-gray-600">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
      {hint && <p className="text-gray-600 text-[11px]">{hint}</p>}
    </div>
  );
}

function SaveButton({ onClick, loading, saved, text = 'Save Changes' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition
        ${saved
          ? 'bg-green-500/20 border border-green-500/30 text-green-400'
          : 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-black hover:brightness-110'
        } disabled:opacity-50`}
    >
      {loading ? <RefreshCw size={15} className="animate-spin" /> :
       saved   ? <CheckCircle size={15} /> :
                 <Save size={15} />}
      {loading ? 'Saving...' : saved ? 'Saved ✅' : text}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main Settings Page
// ─────────────────────────────────────────────────────────────
export default function Settings() {
  const { user, logout } = useAuth();
  const { addToast }     = useToast();
  const navigate         = useNavigate();

  const [activeTab, setActiveTab] = useState('profile');

  // ── Profile state ─────────────────────────────────────────
  const [profile,       setProfile]       = useState({ name: '', email: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved,  setProfileSaved]  = useState(false);

  // ── Password state ────────────────────────────────────────
  const [passwords,      setPasswords]     = useState({ current: '', newPass: '', confirm: '' });
  const [showPw,         setShowPw]        = useState({ current: false, new: false, confirm: false });
  const [pwSaving,       setPwSaving]      = useState(false);
  const [pwErrors,       setPwErrors]      = useState([]);

  // ── Preferences state ─────────────────────────────────────
  const [prefs,         setPrefs]          = useState({
    soh_critical_threshold: 75,
    soh_warning_threshold:  85,
    rul_warning_threshold:  20,
    default_model:          'random_forest',
    items_per_page:         8,
  });
  const [prefsSaving,   setPrefsSaving]    = useState(false);
  const [prefsSaved,    setPrefsSaved]     = useState(false);

  // ── Notifications state ───────────────────────────────────
  const [notifs,        setNotifs]         = useState({
    critical_alerts_push:  true,
    critical_alerts_email: false,
    alert_threshold:       75,
  });
  const [notifSaving,   setNotifSaving]    = useState(false);
  const [notifSaved,    setNotifSaved]     = useState(false);

  // ── Display state ─────────────────────────────────────────
  const [display,       setDisplay]        = useState({ language: 'en', date_format: 'MM/DD/YYYY' });
  const [displaySaving, setDisplaySaving]  = useState(false);
  const [displaySaved,  setDisplaySaved]   = useState(false);

  // ── Account state ─────────────────────────────────────────
  const [deleteForm,    setDeleteForm]     = useState({ password: '', confirm: '' });
  const [deleteLoading, setDeleteLoading]  = useState(false);
  const [exportLoading, setExportLoading]  = useState(false);
  const [showDeletePw,  setShowDeletePw]   = useState(false);

  const authHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

  // ── Load data ─────────────────────────────────────────────
  useEffect(() => {
    if (user) setProfile({ name: user.name || '', email: user.email || '' });
    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    try {
      const res = await api.get('/api/settings/preferences', authHeader());
      const p   = res.data?.preferences || {};
      setPrefs({
        soh_critical_threshold: p.soh_critical_threshold ?? 75,
        soh_warning_threshold:  p.soh_warning_threshold  ?? 85,
        rul_warning_threshold:  p.rul_warning_threshold  ?? 20,
        default_model:          p.default_model          ?? 'random_forest',
        items_per_page:         p.items_per_page         ?? 8,
      });
      setNotifs({
        critical_alerts_push:  p.critical_alerts_push  ?? true,
        critical_alerts_email: p.critical_alerts_email ?? false,
        alert_threshold:       p.alert_threshold       ?? 75,
      });
      setDisplay({
        language:    p.language    ?? 'en',
        date_format: p.date_format ?? 'MM/DD/YYYY',
      });
    } catch {
      // use defaults
    }
  };

  // ── Save Profile ──────────────────────────────────────────
  const saveProfile = async () => {
    if (!profile.name.trim()) { addToast('Name cannot be empty', 'error'); return; }
    setProfileSaving(true);
    try {
      await api.put('/api/settings/profile', profile, authHeader());
      setProfileSaved(true);
      addToast('Profile updated! ✅', 'success');
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to update profile', 'error');
    } finally {
      setProfileSaving(false);
    }
  };

  // ── Change Password ───────────────────────────────────────
  const changePassword = async () => {
    const errs = [];
    if (!passwords.current)              errs.push('Enter current password');
    if (passwords.newPass.length < 8)    errs.push('New password must be 8+ characters');
    if (passwords.newPass !== passwords.confirm) errs.push('Passwords do not match');
    if (errs.length) { setPwErrors(errs); return; }
    setPwErrors([]);
    setPwSaving(true);
    try {
      await api.put('/api/settings/password', {
        current_password: passwords.current,
        new_password:     passwords.newPass,
      }, authHeader());
      setPasswords({ current: '', newPass: '', confirm: '' });
      addToast('Password changed successfully! ✅', 'success');
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to change password', 'error');
    } finally {
      setPwSaving(false);
    }
  };

  // ── Save Preferences ──────────────────────────────────────
  const savePrefs = async () => {
    setPrefsSaving(true);
    try {
      await api.put('/api/settings/preferences', prefs, authHeader());
      setPrefsSaved(true);
      addToast('Preferences saved! ✅', 'success');
      setTimeout(() => setPrefsSaved(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to save preferences', 'error');
    } finally {
      setPrefsSaving(false);
    }
  };

  // ── Save Notifications ────────────────────────────────────
  const saveNotifs = async () => {
    setNotifSaving(true);
    try {
      await api.put('/api/settings/preferences', notifs, authHeader());
      setNotifSaved(true);
      addToast('Notification settings saved! ✅', 'success');
      setTimeout(() => setNotifSaved(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to save notifications', 'error');
    } finally {
      setNotifSaving(false);
    }
  };

  // ── Save Display ──────────────────────────────────────────
  const saveDisplay = async () => {
    setDisplaySaving(true);
    try {
      await api.put('/api/settings/preferences', display, authHeader());
      setDisplaySaved(true);
      addToast('Display settings saved! ✅', 'success');
      setTimeout(() => setDisplaySaved(false), 3000);
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to save display settings', 'error');
    } finally {
      setDisplaySaving(false);
    }
  };

  // ── Export Data ───────────────────────────────────────────
  const exportData = async () => {
    setExportLoading(true);
    try {
      const res  = await api.get('/api/settings/export-data', authHeader());
      const data = res.data?.data || {};
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement('a');
      a.href     = url;
      a.download = `voltiq_data_${user?.name || 'user'}_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      addToast('Data exported successfully! ✅', 'success');
    } catch {
      addToast('Failed to export data', 'error');
    } finally {
      setExportLoading(false);
    }
  };

  // ── Delete Account ────────────────────────────────────────
  const deleteAccount = async () => {
    if (deleteForm.confirm !== 'DELETE') {
      addToast('Please type DELETE to confirm', 'error'); return;
    }
    if (!deleteForm.password) {
      addToast('Enter your password', 'error'); return;
    }
    setDeleteLoading(true);
    try {
      await api.delete('/api/settings/account', {
        ...authHeader(),
        data: { password: deleteForm.password, confirm: deleteForm.confirm }
      });
      addToast('Account deleted', 'success');
      logout();
      navigate('/login');
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to delete account', 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
              <SettingsIcon size={22} className="text-cyan-400" />
            </div>
            Settings
          </h1>
          <p className="text-gray-400 text-sm mt-1">Manage your account, preferences, and notifications</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/[0.03] border border-white/10 rounded-2xl p-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition flex-1 justify-center
                ${activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-cyan-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <Icon size={15} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-6 max-w-3xl">

          {/* ── PROFILE TAB ── */}
          {activeTab === 'profile' && (
            <>
              {/* Avatar + Name */}
              <SectionCard title="Profile Information" subtitle="Update your name and email" icon={User}>
                {/* Avatar */}
                <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-black text-3xl shrink-0">
                    {(profile.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg">{profile.name || 'User'}</p>
                    <p className="text-gray-500 text-sm">{profile.email}</p>
                    <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold
                      ${user?.role === 'admin'    ? 'bg-red-500/20 text-red-400'    :
                        user?.role === 'engineer' ? 'bg-blue-500/20 text-blue-400'  :
                                                    'bg-cyan-500/20 text-cyan-400'}`}>
                      {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <FormField label="Full Name">
                    <Input
                      value={profile.name}
                      onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your full name"
                    />
                  </FormField>
                  <FormField label="Email Address" hint="Changing email will require re-login">
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </FormField>
                  <div className="flex justify-end pt-2">
                    <SaveButton onClick={saveProfile} loading={profileSaving} saved={profileSaved} />
                  </div>
                </div>
              </SectionCard>

              {/* Password */}
              <SectionCard title="Change Password" subtitle="Keep your account secure" icon={Lock}>
                <div className="space-y-4">
                  {pwErrors.length > 0 && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 space-y-1">
                      {pwErrors.map((e, i) => (
                        <p key={i} className="text-red-400 text-xs flex items-center gap-2">
                          <AlertTriangle size={11} /> {e}
                        </p>
                      ))}
                    </div>
                  )}

                  {[
                    { key: 'current', label: 'Current Password', showKey: 'current' },
                    { key: 'newPass', label: 'New Password',     showKey: 'new' },
                    { key: 'confirm', label: 'Confirm New Password', showKey: 'confirm' },
                  ].map(({ key, label, showKey }) => (
                    <FormField key={key} label={label}>
                      <div className="relative">
                        <Input
                          type={showPw[showKey] ? 'text' : 'password'}
                          value={passwords[key]}
                          onChange={(e) => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                          placeholder="••••••••"
                        />
                        <button
                          onClick={() => setShowPw(p => ({ ...p, [showKey]: !p[showKey] }))}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                        >
                          {showPw[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </FormField>
                  ))}

                  {/* Password strength */}
                  {passwords.newPass && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Password Strength</p>
                      <div className="flex gap-1">
                        {[1,2,3,4].map(n => {
                          const strength = passwords.newPass.length >= 12 ? 4 :
                                           passwords.newPass.length >= 10 ? 3 :
                                           passwords.newPass.length >= 8  ? 2 : 1;
                          const colors   = ['bg-red-500','bg-orange-500','bg-yellow-500','bg-green-500'];
                          return (
                            <div key={n} className={`h-1.5 flex-1 rounded-full transition-all ${n <= strength ? colors[strength-1] : 'bg-white/10'}`} />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-2">
                    <button
                      onClick={changePassword}
                      disabled={pwSaving}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-sm hover:brightness-110 transition disabled:opacity-50"
                    >
                      {pwSaving ? <><RefreshCw size={15} className="animate-spin" /> Saving...</> : <><Lock size={15} /> Change Password</>}
                    </button>
                  </div>
                </div>
              </SectionCard>
            </>
          )}

          {/* ── PREFERENCES TAB ── */}
          {activeTab === 'preferences' && (
            <SectionCard title="Dashboard Preferences" subtitle="Customize how VoltIQ works for you" icon={Sliders}>
              <div className="space-y-6">
                <FormField label="Default ML Model" hint="Pre-selected model on the Prediction page">
                  <Select
                    value={prefs.default_model}
                    onChange={(e) => setPrefs(p => ({ ...p, default_model: e.target.value }))}
                    options={MODEL_OPTIONS}
                  />
                </FormField>

                <FormField label="Items Per Page" hint="Number of records shown in History and Reports">
                  <Select
                    value={prefs.items_per_page}
                    onChange={(e) => setPrefs(p => ({ ...p, items_per_page: parseInt(e.target.value) }))}
                    options={[5,8,10,15,20,25].map(n => ({ value: n, label: `${n} items` }))}
                  />
                </FormField>

                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">SOH Thresholds</p>
                  <div className="space-y-5">
                    <SliderField
                      label="Critical Threshold"
                      value={prefs.soh_critical_threshold}
                      onChange={(v) => setPrefs(p => ({ ...p, soh_critical_threshold: v }))}
                      min={50} max={80} step={1} unit="%"
                      hint="SOH below this = Critical (red)"
                    />
                    <SliderField
                      label="Warning Threshold"
                      value={prefs.soh_warning_threshold}
                      onChange={(v) => setPrefs(p => ({ ...p, soh_warning_threshold: v }))}
                      min={70} max={95} step={1} unit="%"
                      hint="SOH below this = Moderate (yellow)"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">RUL Threshold</p>
                  <SliderField
                    label="RUL Warning Level"
                    value={prefs.rul_warning_threshold}
                    onChange={(v) => setPrefs(p => ({ ...p, rul_warning_threshold: v }))}
                    min={5} max={50} step={1} unit=" cycles"
                    hint="RUL below this = warning shown"
                  />
                </div>

                {/* Preview */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-3">Threshold Preview</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1.5 rounded-lg bg-green-500/15 text-green-400 border border-green-500/25 text-xs font-bold">
                      ✅ Healthy ≥ {prefs.soh_warning_threshold}%
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 text-xs font-bold">
                      ⚠️ Moderate {prefs.soh_critical_threshold}–{prefs.soh_warning_threshold}%
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/25 text-xs font-bold">
                      🔴 Critical &lt; {prefs.soh_critical_threshold}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <SaveButton onClick={savePrefs} loading={prefsSaving} saved={prefsSaved} />
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── NOTIFICATIONS TAB ── */}
          {activeTab === 'notifications' && (
            <SectionCard title="Notification Settings" subtitle="Control how and when you receive alerts" icon={Bell}>
              <div className="space-y-1">
                <Toggle
                  checked={notifs.critical_alerts_push}
                  onChange={(v) => setNotifs(p => ({ ...p, critical_alerts_push: v }))}
                  label="Push Notifications"
                  hint="Bell icon alerts for critical batteries"
                />
                <Toggle
                  checked={notifs.critical_alerts_email}
                  onChange={(v) => setNotifs(p => ({ ...p, critical_alerts_email: v }))}
                  label="Email Alerts"
                  hint="Send email when SOH drops below threshold"
                />
              </div>

              <div className="mt-6 pt-5 border-t border-white/5">
                <SliderField
                  label="Alert Threshold"
                  value={notifs.alert_threshold}
                  onChange={(v) => setNotifs(p => ({ ...p, alert_threshold: v }))}
                  min={50} max={90} step={1} unit="%"
                  hint="Send alert when SOH drops below this value"
                />
              </div>

              {/* Status preview */}
              <div className="mt-5 bg-white/5 rounded-xl p-4 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${notifs.critical_alerts_push ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                <p className="text-sm text-gray-400">
                  {notifs.critical_alerts_push
                    ? `Alerts active — notifying when SOH < ${notifs.alert_threshold}%`
                    : 'Push notifications disabled'}
                </p>
              </div>

              <div className="flex justify-end mt-5">
                <SaveButton onClick={saveNotifs} loading={notifSaving} saved={notifSaved} />
              </div>
            </SectionCard>
          )}

          {/* ── DISPLAY TAB ── */}
          {activeTab === 'display' && (
            <SectionCard title="Display Settings" subtitle="Language and formatting preferences" icon={Monitor}>
              <div className="space-y-5">
                <FormField label="Language">
                  <Select
                    value={display.language}
                    onChange={(e) => setDisplay(p => ({ ...p, language: e.target.value }))}
                    options={LANGUAGE_OPTIONS}
                  />
                </FormField>

                <FormField label="Date Format" hint="How dates are displayed across the app">
                  <Select
                    value={display.date_format}
                    onChange={(e) => setDisplay(p => ({ ...p, date_format: e.target.value }))}
                    options={DATE_FORMATS}
                  />
                </FormField>

                {/* Preview */}
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Date Preview</p>
                  <p className="text-cyan-400 font-mono text-sm">
                    {display.date_format === 'MM/DD/YYYY' ? '05/20/2026' :
                     display.date_format === 'DD/MM/YYYY' ? '20/05/2026' :
                     '2026-05-20'}
                  </p>
                </div>

                <div className="flex justify-end pt-2">
                  <SaveButton onClick={saveDisplay} loading={displaySaving} saved={displaySaved} />
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── ACCOUNT TAB ── */}
          {activeTab === 'account' && (
            <>
              {/* Account Info */}
              <SectionCard title="Account Information" subtitle="Your account details" icon={Shield}>
                <div className="space-y-3">
                  {[
                    { label: 'Name',       value: user?.name     || '—' },
                    { label: 'Email',      value: user?.email    || '—' },
                    { label: 'Role',       value: user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User' },
                    { label: 'User ID',    value: `#${user?.id || '—'}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between py-2.5 border-b border-white/5 text-sm">
                      <span className="text-gray-500">{label}</span>
                      <span className="text-white font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Export Data */}
              <SectionCard title="Export My Data" subtitle="Download all your predictions and evaluations" icon={Database}>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  Download all your VoltIQ data as a JSON file including predictions, reports, and evaluation results.
                </p>
                <button
                  onClick={exportData}
                  disabled={exportLoading}
                  className="flex items-center gap-2 px-5 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl hover:bg-blue-500/30 transition text-sm font-bold disabled:opacity-50"
                >
                  {exportLoading
                    ? <><RefreshCw size={15} className="animate-spin" /> Exporting...</>
                    : <><Download size={15} /> Export My Data (.json)</>}
                </button>
              </SectionCard>

              {/* Delete Account */}
              <SectionCard title="Delete Account" subtitle="Permanently delete your account and all data" icon={Trash2}>
                <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-4 mb-5 flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <p className="text-red-300/80 text-sm leading-relaxed">
                    This action is <strong className="text-red-400">permanent and irreversible</strong>.
                    All your predictions, reports, and evaluations will be permanently deleted.
                  </p>
                </div>

                <div className="space-y-4">
                  <FormField label="Your Password">
                    <div className="relative">
                      <Input
                        type={showDeletePw ? 'text' : 'password'}
                        value={deleteForm.password}
                        onChange={(e) => setDeleteForm(p => ({ ...p, password: e.target.value }))}
                        placeholder="Enter your password"
                      />
                      <button
                        onClick={() => setShowDeletePw(!showDeletePw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                      >
                        {showDeletePw ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </FormField>

                  <FormField label='Type "DELETE" to confirm'>
                    <Input
                      value={deleteForm.confirm}
                      onChange={(e) => setDeleteForm(p => ({ ...p, confirm: e.target.value }))}
                      placeholder="DELETE"
                    />
                  </FormField>

                  <button
                    onClick={deleteAccount}
                    disabled={deleteLoading || deleteForm.confirm !== 'DELETE' || !deleteForm.password}
                    className="flex items-center gap-2 px-5 py-3 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {deleteLoading
                      ? <><RefreshCw size={15} className="animate-spin" /> Deleting...</>
                      : <><Trash2 size={15} /> Delete My Account</>}
                  </button>
                </div>
              </SectionCard>
            </>
          )}

        </div>
      </main>
    </div>
  );
}