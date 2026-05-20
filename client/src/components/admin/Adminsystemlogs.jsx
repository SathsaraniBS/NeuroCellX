// src/components/admin/AdminSystemLogs.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { TbLogs } from 'react-icons/tb';
import {
  RefreshCw, Search, Filter, Download,
  AlertTriangle, CheckCircle, Info, X,
  Clock, User, Database, Cpu, Shield
} from 'lucide-react';

// ── Generate logs from real DB data ──────────────────────────
function buildLogs(reports = [], evaluations = [], users = []) {
  const logs = [];

  reports.forEach((r, i) => {
    const soh = parseFloat(r.soh_predicted) || 0;
    logs.push({
      id:      `RPT-${r.id || i}`,
      type:    soh < 75 ? 'warning' : 'info',
      category:'prediction',
      message: `Battery prediction saved — SOH: ${soh.toFixed(1)}% ${soh < 75 ? '⚠️ Critical' : '✅'}`,
      detail:  `Report: ${r.report_name || '—'} | Model: ${r.report_type || '—'} | Battery: ${r.battery_id || '—'}`,
      time:    r.created_at,
      user:    r.generated_by_name || 'User',
    });
  });

  evaluations.forEach((e, i) => {
    logs.push({
      id:      `EVL-${e.id || i}`,
      type:    'success',
      category:'evaluation',
      message: `Model evaluation completed — ${e.model_key} | Grade: ${e.soh_grade || '—'}`,
      detail:  `Dataset: ${e.dataset_name} | Rows: ${e.total_rows} | SOH R²: ${parseFloat(e.soh_r2 || 0).toFixed(3)}`,
      time:    e.created_at,
      user:    'System',
    });
  });

  users.forEach((u, i) => {
    logs.push({
      id:      `USR-${u.id || i}`,
      type:    'info',
      category:'auth',
      message: `User registered — ${u.name || u.email}`,
      detail:  `Role: ${u.role} | Email: ${u.email}`,
      time:    u.created_at,
      user:    'System',
    });
  });

  return logs.sort((a, b) => new Date(b.time) - new Date(a.time));
}

const TYPE_STYLES = {
  info:    { color: 'text-blue-400',  bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   icon: Info          },
  success: { color: 'text-green-400', bg: 'bg-green-500/10',  border: 'border-green-500/20',  icon: CheckCircle   },
  warning: { color: 'text-yellow-400',bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: AlertTriangle },
  error:   { color: 'text-red-400',   bg: 'bg-red-500/10',    border: 'border-red-500/20',    icon: AlertTriangle },
};

const CATEGORIES = ['all', 'prediction', 'evaluation', 'auth'];

function formatDateTime(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

export default function AdminSystemLogs() {
  const [logs,       setLogs]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCat,  setFilterCat]  = useState('all');
  const [page,       setPage]       = useState(1);
  const PER_PAGE = 15;

  useEffect(() => { fetchAllData(); }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [rRes, eRes, uRes] = await Promise.allSettled([
        api.get('/api/reports/'),
        api.get('/api/ml/evaluate/history', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
        api.get('/api/admin/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }),
      ]);
      const reports     = rRes.status     === 'fulfilled' ? rRes.value.data?.reports     || [] : [];
      const evaluations = eRes.status     === 'fulfilled' ? eRes.value.data?.results     || [] : [];
      const users       = uRes.status     === 'fulfilled' ? uRes.value.data?.users       || [] : [];
      setLogs(buildLogs(reports, evaluations, users));
    } catch {
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = logs.filter(log => {
    const matchSearch = search === '' ||
      log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.detail.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || log.type === filterType;
    const matchCat  = filterCat  === 'all' || log.category === filterCat;
    return matchSearch && matchType && matchCat;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search, filterType, filterCat]);

  const downloadLogs = () => {
    const txt = filtered.map(l =>
      `[${formatDateTime(l.time)}] [${l.type.toUpperCase()}] [${l.category}] ${l.message}\n  ${l.detail}\n  User: ${l.user}`
    ).join('\n\n');
    const blob = new Blob([txt], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = `voltiq_logs_${new Date().toISOString().split('T')[0]}.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  // Counts
  const counts = {
    info:    logs.filter(l => l.type === 'info').length,
    success: logs.filter(l => l.type === 'success').length,
    warning: logs.filter(l => l.type === 'warning').length,
    error:   logs.filter(l => l.type === 'error').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <TbLogs size={24} className="text-cyan-400" /> System Logs
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {logs.length} total events — predictions, evaluations, auth
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadLogs}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
            <Download size={14} /> Export
          </button>
          <button onClick={fetchAllData} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Type Summary */}
      <div className="grid grid-cols-4 gap-3">
        {Object.entries(counts).map(([type, count]) => {
          const s = TYPE_STYLES[type];
          const Icon = s.icon;
          return (
            <button key={type} onClick={() => setFilterType(filterType === type ? 'all' : type)}
              className={`${s.bg} border ${s.border} rounded-xl p-3 text-center transition hover:brightness-110
                ${filterType === type ? 'ring-1 ring-white/30' : ''}`}>
              <Icon size={16} className={`${s.color} mx-auto mb-1`} />
              <p className={`text-xl font-black ${s.color}`}>{count}</p>
              <p className="text-gray-500 text-[10px] uppercase font-bold">{type}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex-1 min-w-48">
          <Search size={14} className="text-gray-400 shrink-0" />
          <input type="text" placeholder="Search logs..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:outline-none text-sm text-white placeholder-gray-600 w-full" />
          {search && <button onClick={() => setSearch('')}><X size={13} className="text-gray-500" /></button>}
        </div>

        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none">
          {CATEGORIES.map(c => (
            <option key={c} value={c} className="bg-[#0b1120]">
              {c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Log List */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {paginated.length} of {filtered.length} logs</span>
          <span className="font-mono">Real-time data from database</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <RefreshCw size={20} className="animate-spin text-cyan-400" />
            <p className="text-gray-400 text-sm">Loading logs...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-2">
            <TbLogs size={32} className="text-gray-600" />
            <p className="text-gray-500 text-sm">No logs found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {paginated.map((log) => {
              const s    = TYPE_STYLES[log.type] || TYPE_STYLES.info;
              const Icon = s.icon;
              return (
                <div key={log.id} className="flex items-start gap-4 px-6 py-4 hover:bg-white/5 transition">
                  <div className={`p-1.5 ${s.bg} border ${s.border} rounded-lg shrink-0 mt-0.5`}>
                    <Icon size={13} className={s.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-bold uppercase ${s.color}`}>{log.type}</span>
                      <span className="text-gray-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded capitalize">{log.category}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{log.id}</span>
                    </div>
                    <p className="text-sm text-white font-medium mt-1">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{log.detail}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-600">
                      <span className="flex items-center gap-1"><User size={9} /> {log.user}</span>
                      <span className="flex items-center gap-1"><Clock size={9} /> {formatDateTime(log.time)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1}
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition disabled:opacity-30">
            Previous
          </button>
          <span className="text-gray-500 text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages}
            className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl text-sm hover:bg-white/10 transition disabled:opacity-30">
            Next
          </button>
        </div>
      )}
    </div>
  );
}