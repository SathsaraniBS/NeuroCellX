import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import {
  Bell, Search, Battery, BatteryCharging,
  TrendingUp, TrendingDown, Activity, AlertTriangle,
  Clock, BarChart2, Zap, RefreshCw,
  ChevronRight, FileText, Cpu, ThermometerSun, X
} from 'lucide-react';
import Sidebar from '../components/User/UserSidebar';
import api from '../services/api';

// ─────────────────────────────────────────────────────────────
//  Field names (reports table — confirmed from API):
//  id, report_name, report_type, battery_id,
//  soh_predicted, rul_predicted, health_status,
//  voltage, current_a, temperature, cycle_count,
//  capacity, created_at, generated_by_name
// ─────────────────────────────────────────────────────────────

function getHealthStatus(soh) {
  if (soh >= 90) return { label: 'Healthy',  color: 'text-green-400',  bg: 'bg-green-500/15',  border: 'border-green-500/25',  dot: 'bg-green-400'  };
  if (soh >= 75) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-500/15', border: 'border-yellow-500/25', dot: 'bg-yellow-400' };
  return               { label: 'Critical',  color: 'text-red-400',    bg: 'bg-red-500/15',    border: 'border-red-500/25',    dot: 'bg-red-400'    };
}

function getTimeAgo(dateStr) {
  if (!dateStr) return '—';
  const diff = Date.now() - new Date(dateStr).getTime();
  const m    = Math.floor(diff / 60000);
  if (m < 1)  return 'Just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Stat Card ─────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, colorText, colorBg, colorBorder, trend, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`bg-white/[0.03] border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/[0.06] transition ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className={`p-2.5 rounded-xl border ${colorBg} ${colorBorder}`}>
        <Icon size={18} className={colorText} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-400 text-[10px] uppercase font-bold tracking-wider mb-1">{label}</p>
        <p className={`text-2xl font-bold ${colorText}`}>{value}</p>
        {sub && <p className="text-gray-500 text-xs mt-1">{sub}</p>}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-bold ${trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <div key={i} className="bg-white/5 rounded-2xl h-28" />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/5 rounded-2xl h-72" />
        <div className="bg-white/5 rounded-2xl h-72" />
      </div>
    </div>
  );
}

// ── Critical Alerts Dropdown ──────────────────────────────────
function AlertsDropdown({ alerts, onClose }) {
  return (
    <div className="absolute right-0 top-10 w-80 bg-[#0d1628] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-red-500/10">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} className="text-red-400" />
          <span className="text-red-400 font-bold text-sm">
            Critical Alerts ({alerts.length})
          </span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={15} />
        </button>
      </div>

      {/* Alert List */}
      <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Battery size={18} className="text-green-400" />
            </div>
            <p className="text-green-400 text-sm font-semibold">All batteries healthy!</p>
            <p className="text-gray-500 text-xs">No critical alerts at this time.</p>
          </div>
        ) : (
          alerts.map((log, i) => {
            const soh = parseFloat(log.soh_predicted) || 0;
            return (
              <div key={log.id ?? i} className="px-4 py-3 hover:bg-white/5 transition">
                <div className="flex items-start gap-3">
                  {/* Severity icon */}
                  <div className="p-1.5 rounded-lg bg-red-500/15 border border-red-500/20 shrink-0 mt-0.5">
                    <AlertTriangle size={12} className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {log.report_name || log.battery_id || `Log #${i + 1}`}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {log.battery_id && (
                        <span className="text-[10px] text-gray-500">{log.battery_id}</span>
                      )}
                      {log.report_type && (
                        <span className="text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">
                          {log.report_type.replace(/_/g, ' ')}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-red-400 text-xs font-bold">SOH: {soh.toFixed(1)}%</span>
                      <span className="text-gray-500 text-xs">
                        RUL: {Math.round(parseFloat(log.rul_predicted) || 0)} cycles
                      </span>
                      <span className="text-gray-600 text-[10px]">{getTimeAgo(log.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/[0.02]">
        <Link
          to="/reports"
          onClick={onClose}
          className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-semibold hover:text-cyan-300 transition"
        >
          View all reports <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────
export default function Dashboard() {
  const [batteryLogs,   setBatteryLogs]   = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [searchQuery,   setSearchQuery]   = useState('');
  const [lastUpdated,   setLastUpdated]   = useState(null);
  const [showAlerts,    setShowAlerts]    = useState(false);
  const [showCritModal, setShowCritModal] = useState(false);

  const alertsRef = useRef(null);
  const { user }     = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (alertsRef.current && !alertsRef.current.contains(e.target)) {
        setShowAlerts(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // ── Derived stats ─────────────────────────────────────────
  const totalLogs = batteryLogs.length;

  const avgSoh = totalLogs
    ? Math.round(batteryLogs.reduce((s, l) => s + (parseFloat(l.soh_predicted) || 0), 0) / totalLogs)
    : null;

  const avgRul = totalLogs
    ? Math.round(batteryLogs.reduce((s, l) => s + (parseFloat(l.rul_predicted) || 0), 0) / totalLogs)
    : null;

  // ✅ Critical = SOH < 75%
  const criticalLogs  = batteryLogs.filter(l => (parseFloat(l.soh_predicted) || 100) < 75);
  const criticalCount = criticalLogs.length;
  const healthyCount  = batteryLogs.filter(l => (parseFloat(l.soh_predicted) || 0) >= 90).length;
  const moderateCount = batteryLogs.filter(l => {
    const s = parseFloat(l.soh_predicted) || 0;
    return s >= 75 && s < 90;
  }).length;

  const recentLogs = [...batteryLogs]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const filteredLogs = recentLogs.filter(log =>
    (log.report_name ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.battery_id  ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (log.report_type ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const QUICK_ACTIONS = [
    { icon: Zap,      label: 'New Prediction', path: '/prediction', color: 'from-cyan-500 to-emerald-500'  },
    { icon: FileText, label: 'View Reports',   path: '/reports',    color: 'from-purple-500 to-pink-500'   },
    { icon: Cpu,      label: 'ML Models',      path: '/models',     color: 'from-blue-500 to-cyan-500'     },
    { icon: Clock,    label: 'History',        path: '/history',    color: 'from-orange-500 to-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        {/* ── Top Nav ── */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 w-72">
            <Search size={15} className="text-gray-400 shrink-0" />
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
              title="Refresh"
              className="text-gray-400 hover:text-cyan-400 transition disabled:opacity-50"
            >
              <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            </button>

            {/* ✅ WORKING Notification Bell with Dropdown */}
            <div className="relative" ref={alertsRef}>
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className={`relative transition ${criticalCount > 0 ? 'text-red-400 hover:text-red-300' : 'text-gray-400 hover:text-cyan-400'}`}
                title={criticalCount > 0 ? `${criticalCount} critical alerts` : 'No alerts'}
              >
                <Bell size={17} />

                {/* ✅ Badge — shows count */}
                {criticalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-red-500 rounded-full text-[9px] font-bold flex items-center justify-center px-1 animate-pulse">
                    {criticalCount > 9 ? '9+' : criticalCount}
                  </span>
                )}
              </button>

              {/* ✅ Alerts Dropdown */}
              {showAlerts && (
                <AlertsDropdown
                  alerts={criticalLogs}
                  onClose={() => setShowAlerts(false)}
                />
              )}
            </div>

            {/* User Avatar */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-5">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold leading-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{user?.email}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold text-sm cursor-pointer hover:opacity-80 transition">
                {(user?.name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 p-6 lg:p-8 overflow-auto space-y-8">

          {/* Welcome */}
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-3xl font-bold">
                Hello, {user?.name || user?.email?.split('@')[0] || 'User'}!
                <span className="ml-2">👋</span>
              </h1>
              <p className="text-gray-400 text-sm mt-1">Here's your EV battery health overview.</p>
              {user?.role && (
                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold border
                  ${user.role === 'admin'    ? 'bg-red-500/15    text-red-400    border-red-500/25'    :
                    user.role === 'engineer' ? 'bg-blue-500/15   text-blue-400   border-blue-500/25'   :
                                               'bg-cyan-500/15   text-cyan-400   border-cyan-500/25'}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              )}
            </div>
            {lastUpdated && (
              <p className="text-gray-600 text-xs self-start mt-1">
                Updated {getTimeAgo(lastUpdated)}
              </p>
            )}
          </div>

          {/* ── Loading / Error / Content ── */}
          {loading ? <LoadingSkeleton /> : error ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <AlertTriangle size={48} className="text-red-400" />
              <p className="text-red-400 font-semibold text-sm">{error}</p>
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
                  colorText="text-cyan-400"
                  colorBg="bg-cyan-500/10"
                  colorBorder="border-cyan-500/20"
                />
                <StatCard
                  icon={Battery}
                  label="Avg SOH"
                  value={avgSoh !== null ? `${avgSoh}%` : '—'}
                  sub="State of Health"
                  colorText="text-green-400"
                  colorBg="bg-green-500/10"
                  colorBorder="border-green-500/20"
                  trend={avgSoh !== null ? (avgSoh >= 80 ? 2 : -3) : undefined}
                />
                <StatCard
                  icon={Activity}
                  label="Avg RUL"
                  value={avgRul !== null ? `${avgRul}` : '—'}
                  sub="Remaining cycles"
                  colorText="text-purple-400"
                  colorBg="bg-purple-500/10"
                  colorBorder="border-purple-500/20"
                />
                {/* ✅ Critical Alerts Card — click to open modal */}
                <StatCard
                  icon={AlertTriangle}
                  label="Critical Alerts"
                  value={criticalCount}
                  sub={criticalCount > 0
                    ? `Click to view ${criticalCount} alert${criticalCount > 1 ? 's' : ''}`
                    : `${healthyCount} healthy · ${moderateCount} moderate`
                  }
                  colorText={criticalCount > 0 ? 'text-red-400' : 'text-gray-400'}
                  colorBg={criticalCount > 0 ? 'bg-red-500/10' : 'bg-gray-500/10'}
                  colorBorder={criticalCount > 0 ? 'border-red-500/20' : 'border-gray-500/20'}
                  onClick={() => criticalCount > 0 && setShowCritModal(true)}
                />
              </div>

              {/* ── Middle Section ── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Logs */}
                <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Clock size={15} className="text-cyan-400" /> Recent Predictions
                    </h3>
                    <Link to="/history" className="text-cyan-400 text-xs hover:underline flex items-center gap-1">
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
                        const soh    = parseFloat(log.soh_predicted) || 0;
                        const rul    = parseFloat(log.rul_predicted)  || null;
                        const status = getHealthStatus(soh);

                        return (
                          <div
                            key={log.id ?? i}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition cursor-pointer"
                            onClick={() => navigate('/reports')}
                          >
                            <div className={`w-2 h-2 rounded-full shrink-0 ${status.dot}`} />

                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-white truncate">
                                {log.report_name || log.battery_id || `Log #${i + 1}`}
                              </p>
                              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                {log.report_type && (
                                  <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                                    {log.report_type.replace(/_/g, ' ')}
                                  </span>
                                )}
                                {log.battery_id && (
                                  <span className="text-[10px] text-cyan-600 capitalize">
                                    {log.battery_id}
                                  </span>
                                )}
                                <span className="text-[10px] text-gray-500">
                                  {getTimeAgo(log.created_at)}
                                </span>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <p className={`text-sm font-bold ${status.color}`}>
                                {soh > 0 ? `${soh.toFixed(1)}%` : '—'}
                              </p>
                              <p className="text-[10px] text-gray-500">SOH</p>
                            </div>

                            <div className="text-right shrink-0 w-14">
                              <p className="text-sm font-bold text-cyan-400">
                                {rul !== null ? Math.round(rul) : '—'}
                              </p>
                              <p className="text-[10px] text-gray-500">RUL</p>
                            </div>

                            <span className={`hidden md:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${status.bg} ${status.color} ${status.border}`}>
                              {log.health_status || status.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-4">

                  {/* Health Summary */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                      <Battery size={15} className="text-cyan-400" /> Health Summary
                    </h3>
                    {totalLogs === 0 ? (
                      <p className="text-gray-500 text-xs text-center py-4">No data available</p>
                    ) : (
                      <div className="space-y-3">
                        {[
                          { label: 'Healthy',  count: healthyCount,  color: 'bg-green-400',  text: 'text-green-400'  },
                          { label: 'Moderate', count: moderateCount, color: 'bg-yellow-400', text: 'text-yellow-400' },
                          { label: 'Critical', count: criticalCount, color: 'bg-red-400',    text: 'text-red-400'    },
                        ].map(({ label, count, color, text }) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className={count > 0 && label === 'Critical' ? text : 'text-gray-400'}>
                                {label}
                              </span>
                              <span className={`font-bold ${count > 0 && label === 'Critical' ? text : 'text-white'}`}>
                                {count}
                              </span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${color} transition-all duration-700`}
                                style={{ width: `${totalLogs > 0 ? (count / totalLogs) * 100 : 0}%` }}
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
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <ThermometerSun size={15} className="text-cyan-400" /> Dataset Info
                    </h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Dataset',    value: 'NASA CALCE'  },
                        { label: 'Batteries',  value: 'B0005-B0018' },
                        { label: 'Max Cycles', value: '~168'        },
                        { label: 'Capacity',   value: '2.0 Ah'      },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-gray-500">{label}</span>
                          <span className="text-white font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-[10px] mt-3 leading-relaxed">
                      Research purposes only. NASA lab scale.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Quick Actions ── */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
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

              {/* ✅ Critical Alert Banner — only shows when critical > 0 */}
              {criticalCount > 0 && (
                <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 rounded-2xl px-6 py-4">
                  <div className="p-2 bg-red-500/20 rounded-xl border border-red-500/30">
                    <AlertTriangle size={20} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-red-400 font-bold text-sm">
                      ⚠️ {criticalCount} Critical Battery Alert{criticalCount > 1 ? 's' : ''} Detected
                    </p>
                    <p className="text-red-300/60 text-xs mt-0.5">
                      {criticalCount} battery prediction{criticalCount > 1 ? 's' : ''} showing SOH below 75%.
                      Immediate inspection recommended.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCritModal(true)}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500/30 transition shrink-0"
                  >
                    View Alerts
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ✅ Critical Alerts MODAL */}
      {showCritModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d1628] border border-red-500/20 rounded-2xl w-full max-w-lg overflow-hidden">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-red-500/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/20 rounded-xl border border-red-500/30">
                  <AlertTriangle size={16} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-red-400 font-bold">Critical Battery Alerts</h3>
                  <p className="text-red-300/60 text-xs">{criticalCount} battery{criticalCount > 1 ? 'ies' : 'y'} below 75% SOH</p>
                </div>
              </div>
              <button onClick={() => setShowCritModal(false)} className="text-gray-400 hover:text-white transition">
                <X size={20} />
              </button>
            </div>

            {/* Alert List */}
            <div className="divide-y divide-white/5 max-h-80 overflow-y-auto">
              {criticalLogs.map((log, i) => {
                const soh    = parseFloat(log.soh_predicted) || 0;
                const rul    = parseFloat(log.rul_predicted) || 0;
                const status = getHealthStatus(soh);
                return (
                  <div key={log.id ?? i} className="px-6 py-4 flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${status.dot} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {log.report_name || `Log #${i + 1}`}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                        {log.battery_id && <span>{log.battery_id}</span>}
                        {log.report_type && <span className="bg-white/5 px-1.5 py-0.5 rounded">{log.report_type.replace(/_/g, ' ')}</span>}
                        <span>{getTimeAgo(log.created_at)}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-red-400 font-bold text-sm">{soh.toFixed(1)}%</p>
                      <p className="text-[10px] text-gray-500">SOH</p>
                    </div>
                    <div className="text-right shrink-0 w-14">
                      <p className="text-cyan-400 font-bold text-sm">{Math.round(rul)}</p>
                      <p className="text-[10px] text-gray-500">RUL</p>
                    </div>
                    <span className={`hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.bg} ${status.color} ${status.border}`}>
                      {log.health_status || status.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4 border-t border-white/10">
              <Link
                to="/reports"
                onClick={() => setShowCritModal(false)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm hover:brightness-110 transition flex items-center justify-center gap-2"
              >
                <FileText size={15} /> View All Reports
              </Link>
              <button
                onClick={() => setShowCritModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}