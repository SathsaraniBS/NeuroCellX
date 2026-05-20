import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth }   from '../../contexts/AuthContext';
import { useToast }  from '../../contexts/ToastContext';
import api           from '../../services/api';
import {
  Users, Database, Activity, Plus, Wrench,
  BarChart3, BrainCircuit, Bell, MessageSquare,
  Settings, ExternalLink, AlertTriangle,
  RefreshCw, Clock, Battery, TrendingUp
} from 'lucide-react';
import { TbLogs } from 'react-icons/tb';

// ── Child Components ───────────────────────────────────────
import AdminUsers             from '../../components/admin/AdminUsers';
import AdminContacts          from '../../components/admin/AdminContacts';
import AdminSettings          from '../../components/admin/AdminSettings';
import AdminPrediction        from '../../components/admin/AdminPrediction';
import AdminDatasetManagement from '../../components/admin/AdminDatasetManagement';
import AdminModelManagement   from '../../components/admin/AdminModelManagement';
import AdminSystemLogs        from '../../components/admin/AdminSystemLogs';
import AdminAlerts            from '../../components/admin/AdminAlerts';

// ── Error Boundary ─────────────────────────────────────────
class TabErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('Tab error:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <AlertTriangle size={48} className="text-red-400" />
          <p className="text-red-400 font-semibold">Component Error</p>
          <p className="text-gray-500 text-sm text-center max-w-md">
            {this.state.error?.message || 'Something went wrong loading this section'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition"
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ── Helpers ────────────────────────────────────────────────
function getTimeAgo(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ─────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { addToast }     = useToast();
  const navigate         = useNavigate();

  const [stats,         setStats]        = useState(null);
  const [recentReports, setRecentReports]= useState([]);
  const [activeTab,     setActiveTab]    = useState('overview');
  const [showAddModal,  setShowAddModal] = useState(false);
  const [loading,       setLoading]      = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [statsRes, logsRes] = await Promise.allSettled([
        api.get('/api/admin/stats'),
        api.get('/api/dashboard/battery-logs'),
      ]);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data);
      if (logsRes.status  === 'fulfilled') setRecentReports(logsRes.value.data?.logs || []);
    } catch (err) {
      addToast('Failed to load stats', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchStats(); }, []);

  const handleLogout = () => { logout(); navigate('/login', { replace: true }); };

  // Derived
  const criticalCount = recentReports.filter(r => (parseFloat(r.soh_predicted) || 100) < 75).length;
  const healthyCount  = recentReports.filter(r => (parseFloat(r.soh_predicted) || 0) >= 90).length;
  const avgSoh        = recentReports.length
    ? Math.round(recentReports.reduce((s, r) => s + (parseFloat(r.soh_predicted) || 0), 0) / recentReports.length)
    : null;

  const NAV_ITEMS = [
    { id: 'overview',   label: 'Overview',              icon: Activity     },
    { id: 'users',      label: 'User Management',        icon: Users        },
    { id: 'prediction', label: 'Prediction',             icon: BarChart3    },
    { id: 'dataset',    label: 'Dataset Management',     icon: Database     },
    { id: 'model',      label: 'Model Management',       icon: BrainCircuit },
    { id: 'logs',       label: 'System Logs',            icon: TbLogs       },
    { id: 'alerts',     label: 'Alerts & Notifications', icon: Bell         },
    { id: 'contacts',   label: 'Queries',                icon: MessageSquare},
    { id: 'settings',   label: 'Settings',               icon: Settings     },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-[#0b1220]/80 border-r border-cyan-500/20 flex flex-col p-6 shrink-0 h-screen sticky top-0">
        {/* Logo */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            VoltIQ
          </h1>
          <Link to="/"
            className="p-2 rounded-full hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 group text-cyan-400 transition"
            title="View Website">
            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>
        <p className="text-xs text-gray-500 mb-5">Admin Panel</p>

        {/* Admin info */}
        <div className="mb-4 p-3 bg-transparent">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-orange-400 flex items-center justify-center text-black font-black text-sm shrink-0">
              {(user?.name?.[0] || 'A').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{user?.name || user?.email}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">Admin</span>
            </div>
          </div>
        </div>

        {/* Critical alert badge */}
        {criticalCount > 0 && (
          <button onClick={() => setActiveTab('alerts')}
            className="mb-3 w-full flex items-center gap-2 px-3 py-2 bg-red-500/15 border border-red-500/25 rounded-xl text-red-400 text-xs font-bold hover:bg-red-500/20 transition">
            <AlertTriangle size={12} />
            {criticalCount} Critical Alert{criticalCount > 1 ? 's' : ''}
          </button>
        )}

        {/* Nav */}
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-left
                ${activeTab === id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/40 text-cyan-300'
                  : 'hover:bg-white/5 text-gray-400'}`}
            >
              <Icon size={17} />
              <span className="text-sm">{label}</span>
              {id === 'alerts' && criticalCount > 0 && (
                <span className="ml-auto w-5 h-5 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                  {criticalCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button onClick={handleLogout}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-sm hover:brightness-110 transition">
          Log Out
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 p-8 overflow-auto">

        {/* ══ OVERVIEW TAB ══ */}
        {activeTab === 'overview' && (
          <div className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Admin Overview</h2>
                <p className="text-gray-400 text-sm mt-1">VoltIQ system summary</p>
              </div>
              <button onClick={fetchStats} disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
              </button>
            </div>

            {/* Stats Cards Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Users,    label: 'Total Users',   value: stats?.total_users    ?? '—', color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
                { icon: Wrench,   label: 'Engineers',     value: stats?.engineer_count ?? '—', color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20'   },
                { icon: BarChart3, label: 'Analysts',     value: stats?.analyst_count  ?? '—', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
                { icon: Database, label: 'Battery Logs',  value: stats?.total_logs     ?? '—', color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
              ].map(({ icon: Icon, label, value, color, bg, border }) => (
                <div key={label} className={`${bg} border ${border} rounded-2xl p-5`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 ${bg} rounded-lg border ${border}`}>
                      <Icon size={20} className={color} />
                    </div>
                    <p className="text-gray-400 text-sm">{label}</p>
                  </div>
                  <p className={`text-4xl font-bold ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Stats Cards Row 2 — Predictions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-gray-400 text-xs uppercase font-bold mb-2 tracking-wider">Total Predictions</p>
                <p className="text-4xl font-black text-cyan-400">{recentReports.length}</p>
                <p className="text-gray-600 text-xs mt-1">All time records</p>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-gray-400 text-xs uppercase font-bold mb-2 tracking-wider">Avg SOH</p>
                <p className={`text-4xl font-black ${avgSoh !== null ? (avgSoh >= 90 ? 'text-green-400' : avgSoh >= 75 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-500'}`}>
                  {avgSoh !== null ? `${avgSoh}%` : '—'}
                </p>
                <p className="text-gray-600 text-xs mt-1">State of Health</p>
              </div>
              <div className={`rounded-2xl p-5 text-center border ${criticalCount > 0 ? 'bg-red-500/10 border-red-500/20' : 'bg-white/[0.03] border-white/10'}`}>
                <p className="text-gray-400 text-xs uppercase font-bold mb-2 tracking-wider">Critical Alerts</p>
                <p className={`text-4xl font-black ${criticalCount > 0 ? 'text-red-400' : 'text-gray-500'}`}>
                  {criticalCount}
                </p>
                <p className="text-gray-600 text-xs mt-1">SOH below 75%</p>
              </div>
            </div>

            {/* Recent Predictions */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Clock size={15} className="text-cyan-400" /> Recent Predictions
                </h3>
                <button onClick={() => setActiveTab('prediction')} className="text-cyan-400 text-xs hover:underline">
                  View all →
                </button>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-10 gap-3">
                  <RefreshCw size={18} className="animate-spin text-cyan-400" />
                  <p className="text-gray-400 text-sm">Loading...</p>
                </div>
              ) : recentReports.length === 0 ? (
                <div className="flex flex-col items-center py-10 gap-2">
                  <Battery size={32} className="text-gray-600" />
                  <p className="text-gray-500 text-sm">No predictions yet</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {recentReports.slice(0, 5).map((r, i) => {
                    const soh    = parseFloat(r.soh_predicted) || 0;
                    const sColor = soh >= 90 ? 'text-green-400' : soh >= 75 ? 'text-yellow-400' : 'text-red-400';
                    const dot    = soh >= 90 ? 'bg-green-400'   : soh >= 75 ? 'bg-yellow-400'   : 'bg-red-400';
                    return (
                      <div key={r.id ?? i} className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{r.report_name || `Report #${i+1}`}</p>
                          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
                            {r.report_type && <span className="bg-white/5 px-1.5 py-0.5 rounded">{r.report_type.replace(/_/g,' ')}</span>}
                            {r.battery_id  && <span>{r.battery_id}</span>}
                            <span>{getTimeAgo(r.created_at)}</span>
                          </div>
                        </div>
                        <p className={`text-sm font-bold shrink-0 ${sColor}`}>{soh.toFixed(1)}%</p>
                        <p className="text-sm font-bold text-cyan-400 shrink-0 w-10 text-right">
                          {Math.round(parseFloat(r.rul_predicted) || 0)}
                        </p>
                        <span className={`hidden md:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0
                          ${soh >= 90 ? 'bg-green-500/15 text-green-400 border-green-500/25' :
                            soh >= 75 ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' :
                            'bg-red-500/15 text-red-400 border-red-500/25'}`}>
                          {r.health_status || (soh >= 90 ? 'Healthy' : soh >= 75 ? 'Moderate' : 'Critical')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-cyan-400 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => { setActiveTab('users'); setShowAddModal(true); }}
                  className="flex items-center gap-2 px-5 py-3 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition text-sm">
                  <Plus size={15} /> Add New User
                </button>
                <button onClick={() => setActiveTab('users')}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm">
                  <Users size={15} /> Manage Users
                </button>
                <button onClick={() => setActiveTab('model')}
                  className="flex items-center gap-2 px-5 py-3 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl hover:bg-purple-500/30 transition text-sm">
                  <BrainCircuit size={15} /> Model Status
                </button>
                <button onClick={() => setActiveTab('logs')}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm">
                  <TbLogs size={15} /> System Logs
                </button>
                {criticalCount > 0 && (
                  <button onClick={() => setActiveTab('alerts')}
                    className="flex items-center gap-2 px-5 py-3 bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl hover:bg-red-500/30 transition text-sm">
                    <AlertTriangle size={15} /> View {criticalCount} Alert{criticalCount > 1 ? 's' : ''}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ ALL OTHER TABS — wrapped in Error Boundary ══ */}
        {activeTab === 'users' && (
          <TabErrorBoundary key="users">
            <AdminUsers showAddModal={showAddModal} setShowAddModal={setShowAddModal} onUserChange={fetchStats} />
          </TabErrorBoundary>
        )}

        {activeTab === 'prediction' && (
          <TabErrorBoundary key="prediction">
            <AdminPrediction showAddModal={showAddModal} setShowAddModal={setShowAddModal} onMessageChange={fetchStats} />
          </TabErrorBoundary>
        )}

        {activeTab === 'dataset' && (
          <TabErrorBoundary key="dataset">
            <AdminDatasetManagement />
          </TabErrorBoundary>
        )}

        {activeTab === 'model' && (
          <TabErrorBoundary key="model">
            <AdminModelManagement />
          </TabErrorBoundary>
        )}

        {activeTab === 'logs' && (
          <TabErrorBoundary key="logs">
            <AdminSystemLogs />
          </TabErrorBoundary>
        )}

        {activeTab === 'alerts' && (
          <TabErrorBoundary key="alerts">
            <AdminAlerts />
          </TabErrorBoundary>
        )}

        {activeTab === 'contacts' && (
          <TabErrorBoundary key="contacts">
            <AdminContacts showAddModal={showAddModal} setShowAddModal={setShowAddModal} onMessageChange={fetchStats} />
          </TabErrorBoundary>
        )}

        {activeTab === 'settings' && (
          <TabErrorBoundary key="settings">
            <AdminSettings showAddModal={showAddModal} setShowAddModal={setShowAddModal} onMessageChange={fetchStats} />
          </TabErrorBoundary>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;