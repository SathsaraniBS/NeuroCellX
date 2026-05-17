import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import {
  Bell, User, Search, Battery, BatteryCharging,
  TrendingUp, TrendingDown, Activity, AlertTriangle,
  CheckCircle, Clock, BarChart2, Zap, RefreshCw,
  ChevronRight, FileText, Cpu, ThermometerSun
} from 'lucide-react';
import Sidebar from '../components/User/UserSidebar';
import api from '../services/api';

// ─── Helper ──────────────────────────────────────────────────
function getHealthStatus(soh) {
  if (soh >= 90) return { label: 'Healthy',   color: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-500/25',  dot: 'bg-green-400' };
  if (soh >= 75) return { label: 'Moderate',  color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/25', dot: 'bg-yellow-400' };
  return               { label: 'Critical',   color: 'text-red-400',    bg: 'bg-red-500/15',    border: 'border-red-500/25',    dot: 'bg-red-400' };
}

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

// ─── Sub-components ──────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition">
      <div className={`p-2.5 rounded-xl border ${color.bg} ${color.border}`}>
        <Icon size={18} className={color.text} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className={`text-2xl font-bold ${color.text}`}>{value}</p>
        {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 rounded-2xl h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 rounded-2xl h-64" />
        <div className="bg-white/5 rounded-2xl h-64" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
export default function Dashboard() {
  const [batteryLogs, setBatteryLogs]   = useState([]);
  const [loading,     setLoading]       = useState(true);
  const [error,       setError]         = useState(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const [lastUpdated, setLastUpdated]   = useState(null);

  const { user }     = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();

  const fetchBatteryLogs = async () => {
    setLoading(true);
    try {
      const res  = await api.get('/api/dashboard/battery-logs');
      const logs = res.data?.logs;
      setBatteryLogs(Array.isArray(logs) ? logs : []);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      const message = err.response?.data?.detail || 'Failed to load dashboard data';
      setError(message);
      addToast(message, 'error');
      setBatteryLogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBatteryLogs(); }, []);

  // ── Derived stats ──────────────────────────────────────────
  const totalLogs    = batteryLogs.length;
  const avgSoh       = totalLogs
    ? Math.round(batteryLogs.reduce((s, l) => s + (l.soh_predicted ?? 0), 0) / totalLogs)
    : null;
  const avgRul       = totalLogs
    ? Math.round(batteryLogs.reduce((s, l) => s + (l.rul_predicted ?? 0), 0) / totalLogs)
    : null;
  const criticalCount = batteryLogs.filter(l => (l.soh_predicted ?? 100) < 75).length;
  const healthyCount  = batteryLogs.filter(l => (l.soh_predicted ?? 0)   >= 90).length;

  const recentLogs = [...batteryLogs]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const filteredLogs = recentLogs.filter(log =>
    (log.battery_id  ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.report_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ── Quick actions ──────────────────────────────────────────
  const QUICK_ACTIONS = [
    { icon: Zap,       label: 'New Prediction', path: '/prediction', color: 'from-cyan-500 to-emerald-500' },
    { icon: FileText,  label: 'View Reports',   path: '/reports',    color: 'from-purple-500 to-pink-500'  },
    { icon: Cpu,       label: 'ML Models',      path: '/models',     color: 'from-blue-500 to-cyan-500'    },
    { icon: Clock,     label: 'History',        path: '/history',    color: 'from-orange-500 to-yellow-500'},
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top Navigation Bar ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-72">
            <Search size={16} className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-500 w-full"
            />
          </div>

          <div className="flex items-center gap-5">
            {/* Refresh */}
            <button
              onClick={fetchBatteryLogs}
              disabled={loading}
              title="Refresh data"
              className="text-gray-400 hover:text-cyan-400 transition disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>

            {/* Notification */}
            <div className="relative">
              <Bell size={18} className="text-gray-400 cursor-pointer hover:text-cyan-400 transition" />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center">
                  {criticalCount}
                </span>
              )}
            </div>

            {/* User */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-5">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold">{user?.name || 'User'}</p>
                <p className="text-[10px] text-gray-500">{user?.email}</p>
              </div>
              <Link
                to="/profile"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold text-sm hover:opacity-80 transition"
              >
                {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto space-y-8">

          {/* ── Welcome Header ── */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Hello, {user?.name || user?.email?.split('@')[0] || 'User'}!
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                Here's your EV battery health overview.
              </p>
              {user?.role && (
                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold border
                  ${user.role === 'admin'    ? 'bg-red-500/15    text-red-400    border-red-500/25'    :
                    user.role === 'engineer' ? 'bg-blue-500/15   text-blue-400   border-blue-500/25'   :
                    user.role === 'analyst'  ? 'bg-purple-500/15 text-purple-400 border-purple-500/25' :
                                               'bg-cyan-500/15   text-cyan-400   border-cyan-500/25'}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              )}
            </div>
            {lastUpdated && (
              <p className="text-gray-600 text-xs mt-1">
                Updated {getTimeAgo(lastUpdated)}
              </p>
            )}
          </div>

          {/* ── Loading / Error / Content ── */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertTriangle size={48} className="text-red-400" />
              <p className="text-red-400 font-semibold">{error}</p>
              <button
                onClick={fetchBatteryLogs}
                className="px-5 py-2.5 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/30 transition text-sm"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* ── Stats Cards ── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={BarChart2}
                  label="Total Predictions"
                  value={totalLogs}
                  sub="All time records"
                  color={{ text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' }}
                />
                <StatCard
                  icon={Battery}
                  label="Avg SOH"
                  value={avgSoh !== null ? `${avgSoh}%` : '—'}
                  sub="State of Health"
                  color={{ text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' }}
                  trend={avgSoh !== null ? (avgSoh >= 80 ? 2 : -3) : undefined}
                />
                <StatCard
                  icon={Activity}
                  label="Avg RUL"
                  value={avgRul !== null ? `${avgRul}` : '—'}
                  sub="Remaining cycles"
                  color={{ text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' }}
                />
                <StatCard
                  icon={AlertTriangle}
                  label="Critical Alerts"
                  value={criticalCount}
                  sub={`${healthyCount} healthy batteries`}
                  color={{ text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' }}
                />
              </div>

              {/* ── Middle Section ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Prediction Logs */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Clock size={16} className="text-cyan-400" /> Recent Predictions
                    </h3>
                    <Link
                      to="/history"
                      className="text-cyan-400 text-xs hover:underline flex items-center gap-1"
                    >
                      View all <ChevronRight size={13} />
                    </Link>
                  </div>

                  {filteredLogs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <BatteryCharging size={40} className="text-gray-600" />
                      <p className="text-gray-500 text-sm">
                        {searchQuery ? 'No results found' : 'No predictions yet'}
                      </p>
                      {!searchQuery && (
                        <Link
                          to="/prediction"
                          className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl text-xs hover:bg-cyan-500/30 transition"
                        >
                          Make your first prediction
                        </Link>
                      )}
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {filteredLogs.map((log, i) => {
                        const soh    = log.soh_predicted ?? 0;
                        const status = getHealthStatus(soh);
                        return (
                          <div
                            key={log.id ?? i}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition cursor-pointer"
                            onClick={() => navigate('/reports')}
                          >
                            {/* Status dot */}
                            <div className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />

                            {/* Battery ID */}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white truncate">
                                {log.report_name || log.battery_id || `Log #${i + 1}`}
                              </p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {log.report_type || 'Unknown model'} • {getTimeAgo(log.created_at)}
                              </p>
                            </div>

                            {/* SOH */}
                            <div className="text-right shrink-0">
                              <p className={`text-sm font-bold ${status.color}`}>
                                {soh.toFixed(1)}%
                              </p>
                              <p className="text-[10px] text-gray-500">SOH</p>
                            </div>

                            {/* RUL */}
                            <div className="text-right shrink-0 w-16">
                              <p className="text-sm font-bold text-cyan-400">
                                {(log.rul_predicted ?? 0).toFixed(0)}
                              </p>
                              <p className="text-[10px] text-gray-500">RUL cyc</p>
                            </div>

                            {/* Status badge */}
                            <span className={`hidden md:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${status.bg} ${status.color} ${status.border}`}>
                              {status.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">

                  {/* Battery Health Summary */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                      <Battery size={15} className="text-cyan-400" /> Health Summary
                    </h3>

                    {totalLogs === 0 ? (
                      <p className="text-gray-500 text-xs text-center py-4">No data available</p>
                    ) : (
                      <div className="space-y-3">
                        {[
                          { label: 'Healthy',  count: healthyCount,                              color: 'bg-green-400'  },
                          { label: 'Moderate', count: batteryLogs.filter(l => { const s = l.soh_predicted ?? 100; return s >= 75 && s < 90; }).length, color: 'bg-yellow-400' },
                          { label: 'Critical', count: criticalCount,                             color: 'bg-red-400'    },
                        ].map(({ label, count, color }) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-400">{label}</span>
                              <span className="text-white font-bold">{count}</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                                style={{ width: totalLogs > 0 ? `${(count / totalLogs) * 100}%` : '0%' }}
                              />
                            </div>
                          </div>
                        ))}
                        <p className="text-gray-600 text-[10px] text-center pt-1">
                          Based on {totalLogs} prediction{totalLogs !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Dataset Info */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                      <ThermometerSun size={15} className="text-cyan-400" /> Dataset Info
                    </h3>
                    <div className="space-y-2.5">
                      {[
                        { label: 'Dataset',   value: 'NASA CALCE' },
                        { label: 'Batteries', value: 'B0005-B0018' },
                        { label: 'Max Cycles',value: '~168' },
                        { label: 'Capacity',  value: '2.0 Ah' },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-gray-500">{label}</span>
                          <span className="text-white font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-[10px] mt-3 leading-relaxed">
                      For research purposes only. NASA lab scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Quick Actions ── */}
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {QUICK_ACTIONS.map(({ icon: Icon, label, path, color }) => (
                    <Link
                      key={path}
                      to={path}
                      className="group bg-white/[0.03] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] transition flex flex-col items-center gap-3 text-center"
                    >
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${color} group-hover:scale-110 transition`}>
                        <Icon size={20} className="text-black" />
                      </div>
                      <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition">
                        {label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ── Critical Alert Banner ── */}
              {criticalCount > 0 && (
                <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4">
                  <AlertTriangle size={20} className="text-red-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-red-400 font-semibold text-sm">
                      {criticalCount} Critical Battery Alert{criticalCount > 1 ? 's' : ''}
                    </p>
                    <p className="text-red-300/60 text-xs mt-0.5">
                      {criticalCount} prediction{criticalCount > 1 ? 's' : ''} show SOH below 75%. Immediate attention recommended.
                    </p>
                  </div>
                  <Link
                    to="/reports"
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/30 transition shrink-0"
                  >
                    View Reports
                  </Link>
                </div>
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
}