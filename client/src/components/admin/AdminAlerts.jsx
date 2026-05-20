// src/components/admin/AdminAlerts.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bell, AlertTriangle, CheckCircle, RefreshCw, Battery, Clock, X } from 'lucide-react';

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

export default function AdminAlerts() {
  const [alerts,     setAlerts]     = useState([]);
  const [allReports, setAllReports] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [dismissed,  setDismissed]  = useState(new Set());
  const [filter,     setFilter]     = useState('all');

  useEffect(() => { fetchAlerts(); }, []);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const [alertRes, reportRes] = await Promise.allSettled([
        api.get('/api/dashboard/recent-alerts'),
        api.get('/api/reports/'),
      ]);
      const a = alertRes.status  === 'fulfilled' ? alertRes.value.data?.alerts   || [] : [];
      const r = reportRes.status === 'fulfilled' ? reportRes.value.data?.reports || [] : [];
      setAlerts(a);
      setAllReports(r);
    } catch {
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  const activeAlerts   = alerts.filter(a => !dismissed.has(a.id));
  const criticalAlerts = activeAlerts.filter(a => (parseFloat(a.soh) || 100) < 65);
  const warningAlerts  = activeAlerts.filter(a => { const s = parseFloat(a.soh) || 100; return s >= 65 && s < 75; });

  // SOH distribution from all reports
  const healthy  = allReports.filter(r => (parseFloat(r.soh_predicted) || 0) >= 90).length;
  const moderate = allReports.filter(r => { const s = parseFloat(r.soh_predicted) || 0; return s >= 75 && s < 90; }).length;
  const critical = allReports.filter(r => (parseFloat(r.soh_predicted) || 100) < 75).length;
  const total    = allReports.length;

  const filtered = filter === 'all'      ? activeAlerts :
                   filter === 'critical' ? criticalAlerts :
                   warningAlerts;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Bell size={24} className="text-cyan-400" /> Alerts & Notifications
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Battery health alerts — SOH below threshold
          </p>
        </div>
        <button onClick={fetchAlerts} disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Predictions', value: total,    color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
          { label: 'Healthy ≥90%',      value: healthy,  color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
          { label: 'Moderate 75–90%',   value: moderate, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
          { label: 'Critical <75%',     value: critical, color: 'text-red-400',    bg: 'bg-red-500/10',    border: 'border-red-500/20'    },
        ].map(({ label, value, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-5 text-center`}>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Health Bar */}
      {total > 0 && (
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
          <p className="text-sm font-bold text-gray-400 mb-3">Battery Health Distribution</p>
          <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
            {healthy  > 0 && <div className="bg-green-400  transition-all" style={{ width: `${(healthy/total)*100}%` }} title={`Healthy: ${healthy}`} />}
            {moderate > 0 && <div className="bg-yellow-400 transition-all" style={{ width: `${(moderate/total)*100}%` }} title={`Moderate: ${moderate}`} />}
            {critical > 0 && <div className="bg-red-400    transition-all" style={{ width: `${(critical/total)*100}%` }} title={`Critical: ${critical}`} />}
          </div>
          <div className="flex gap-4 mt-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />Healthy ({healthy})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />Moderate ({moderate})</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />Critical ({critical})</span>
          </div>
        </div>
      )}

      {/* Alert Filters */}
      <div className="flex gap-2">
        {[
          { value: 'all',      label: `All (${activeAlerts.length})` },
          { value: 'critical', label: `Critical (${criticalAlerts.length})` },
          { value: 'warning',  label: `Warning (${warningAlerts.length})` },
        ].map(({ value, label }) => (
          <button key={value} onClick={() => setFilter(value)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition
              ${filter === value
                ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Alert List */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <RefreshCw size={20} className="animate-spin text-cyan-400" />
            <p className="text-gray-400 text-sm">Loading alerts...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <CheckCircle size={24} className="text-green-400" />
            </div>
            <p className="text-green-400 font-semibold">No active alerts!</p>
            <p className="text-gray-500 text-sm">All batteries are within safe thresholds</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((alert, i) => {
              const soh      = parseFloat(alert.soh) || 0;
              const isCrit   = soh < 65;
              const rul      = parseFloat(alert.rul) || 0;
              return (
                <div key={alert.id ?? i}
                  className={`flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition
                    ${isCrit ? 'border-l-2 border-red-500' : 'border-l-2 border-yellow-500'}`}>

                  <div className={`p-2 rounded-xl shrink-0 ${isCrit ? 'bg-red-500/15 border border-red-500/25' : 'bg-yellow-500/15 border border-yellow-500/25'}`}>
                    <AlertTriangle size={16} className={isCrit ? 'text-red-400' : 'text-yellow-400'} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">
                      {alert.report_name || alert.battery_id || `Alert #${i+1}`}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 flex-wrap">
                      {alert.battery_id && <span>{alert.battery_id}</span>}
                      <span className={`font-bold ${isCrit ? 'text-red-400' : 'text-yellow-400'}`}>
                        SOH: {soh.toFixed(1)}%
                      </span>
                      <span>RUL: {Math.round(rul)} cycles</span>
                      <span className="flex items-center gap-1"><Clock size={9} />{getTimeAgo(alert.created_at)}</span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0
                    ${isCrit ? 'bg-red-500/15 text-red-400 border-red-500/25' : 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25'}`}>
                    {isCrit ? 'Critical' : 'Warning'}
                  </span>

                  <button onClick={() => setDismissed(s => new Set([...s, alert.id]))}
                    className="p-1.5 text-gray-600 hover:text-gray-300 transition shrink-0" title="Dismiss">
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Dismiss all */}
      {activeAlerts.length > 0 && (
        <div className="flex justify-end">
          <button onClick={() => setDismissed(new Set(alerts.map(a => a.id)))}
            className="text-xs text-gray-500 hover:text-gray-300 transition">
            Dismiss all alerts
          </button>
        </div>
      )}
    </div>
  );
}