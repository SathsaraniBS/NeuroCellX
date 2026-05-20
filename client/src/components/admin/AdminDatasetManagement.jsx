// src/components/admin/AdminDatasetManagement.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useToast } from '../../contexts/ToastContext';
import {
  Database, RefreshCw, Download, Upload,
  FileText, CheckCircle, AlertTriangle,
  BarChart2, Battery, Thermometer, Zap,
  Info, Clock
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  NASA Dataset info (static — known facts)
// ─────────────────────────────────────────────────────────────
const NASA_BATTERIES = [
  { id: 'B0005', cycles: 168, capacity: '2.0 Ah', status: 'active', rows: '591,458' },
  { id: 'B0006', cycles: 168, capacity: '2.0 Ah', status: 'active', rows: '591,458' },
  { id: 'B0007', cycles: 168, capacity: '2.0 Ah', status: 'active', rows: '591,458' },
  { id: 'B0018', cycles: 132, capacity: '2.0 Ah', status: 'active', rows: '314,676' },
];

const DATASET_STATS = [
  { label: 'Total Batteries',    value: '4',            icon: Battery,      color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20'   },
  { label: 'Total Cycles',       value: '636',          icon: RefreshCw,    color: 'text-green-400',  bg: 'bg-green-500/10',  border: 'border-green-500/20'  },
  { label: 'Timeseries Rows',    value: '~2.09M',       icon: BarChart2,    color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { label: 'Input Features',     value: '5',            icon: Database,     color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
];

const INPUT_FEATURES = [
  { name: 'Capacity',     unit: 'Ah',  range: '0 – 2.0',   desc: 'Discharge capacity'       },
  { name: 'Voltage',      unit: 'V',   range: '3.4 – 4.2', desc: 'Terminal voltage'         },
  { name: 'Current',      unit: 'A',   range: '0 – 2.0',   desc: 'Charge/discharge current' },
  { name: 'Temperature',  unit: '°C',  range: '20 – 45',   desc: 'Cell temperature'         },
  { name: 'CycleCount',   unit: '',    range: '0 – 168',   desc: 'Cumulative cycles'        },
];

export default function AdminDatasetManagement() {
  const { addToast }           = useToast();
  const [reports,    setReports]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading,  setUploading]  = useState(false);

  useEffect(() => { fetchReports(); }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/reports/');
      setReports(res.data?.reports || []);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // Download sample CSV
  const downloadSample = () => {
    const csv = `Capacity,Voltage,Current,Temperature,CycleCount,SOH,RUL
2.0,4.1,1.5,24.0,10,94.98,76
1.9,4.05,1.4,25.0,25,92.5,68
1.8,4.0,1.3,26.0,45,89.2,55
1.6,3.85,1.1,30.0,80,80.3,30
1.4,3.65,0.9,37.0,120,70.2,12
1.2,3.45,0.8,42.0,150,61.7,5`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'sample_battery_data.csv'; a.click();
    URL.revokeObjectURL(url);
    addToast('Sample CSV downloaded! ✅', 'success');
  };

  // Export all reports as CSV
  const exportReports = () => {
    if (reports.length === 0) { addToast('No reports to export', 'error'); return; }
    const headers = 'ID,Report Name,Model,Battery ID,SOH%,RUL,Health Status,Created At';
    const rows    = reports.map(r =>
      `${r.id},"${r.report_name || ''}","${r.report_type || ''}","${r.battery_id || ''}",${r.soh_predicted || ''},${r.rul_predicted || ''},"${r.health_status || ''}","${r.created_at || ''}"`
    );
    const csv  = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `voltiq_reports_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Reports exported! ✅', 'success');
  };

  const totalReports  = reports.length;
  const criticalCount = reports.filter(r => (parseFloat(r.soh_predicted) || 100) < 75).length;
  const avgSoh        = totalReports
    ? (reports.reduce((s, r) => s + (parseFloat(r.soh_predicted) || 0), 0) / totalReports).toFixed(1)
    : null;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Database size={24} className="text-cyan-400" /> Dataset Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            NASA CALCE Li-ion battery dataset overview and prediction records
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={downloadSample}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm">
            <Download size={14} /> Sample CSV
          </button>
          <button onClick={exportReports}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-xl hover:bg-cyan-500/30 transition text-sm font-semibold">
            <Download size={14} /> Export Reports
          </button>
          <button onClick={fetchReports} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:bg-white/10 transition text-sm">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Dataset Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DATASET_STATS.map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`${bg} border ${border} rounded-2xl p-5 text-center`}>
            <div className={`p-2 ${bg} border ${border} rounded-xl w-fit mx-auto mb-2`}>
              <Icon size={18} className={color} />
            </div>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
            <p className="text-gray-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* NASA Dataset Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Battery Details */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
            <Battery size={15} className="text-cyan-400" />
            <h3 className="font-bold text-sm">NASA CALCE Battery Dataset</h3>
          </div>
          <div className="p-5 space-y-3">
            {/* Info row */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex items-start gap-3">
              <Info size={14} className="text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-cyan-400 font-semibold text-xs">Dataset Info</p>
                <p className="text-gray-400 text-xs mt-1">
                  18650 cylindrical Li-ion cells • 2.0 Ah • 3.6V–4.2V • Lab conditions
                </p>
              </div>
            </div>

            {/* Battery table */}
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-[10px] uppercase tracking-wider">
                  <th className="text-left py-2 px-3">Battery ID</th>
                  <th className="text-left py-2 px-3">Cycles</th>
                  <th className="text-left py-2 px-3">Capacity</th>
                  <th className="text-left py-2 px-3">Rows</th>
                  <th className="text-left py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {NASA_BATTERIES.map(b => (
                  <tr key={b.id} className="hover:bg-white/5 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-cyan-400">{b.id}</td>
                    <td className="py-2.5 px-3 text-white">{b.cycles}</td>
                    <td className="py-2.5 px-3 text-gray-300">{b.capacity}</td>
                    <td className="py-2.5 px-3 text-gray-400 text-xs">{b.rows}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/15 text-green-400 border border-green-500/25">
                        ✅ Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Input Features */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
            <BarChart2 size={15} className="text-purple-400" />
            <h3 className="font-bold text-sm">Input Features (5)</h3>
          </div>
          <div className="p-5 space-y-2">
            {INPUT_FEATURES.map(({ name, unit, range, desc }) => (
              <div key={name} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">
                    {name} {unit && <span className="text-gray-500 text-xs font-normal">({unit})</span>}
                  </p>
                  <p className="text-gray-600 text-[10px]">{desc}</p>
                </div>
                <code className="text-cyan-400 text-[10px] bg-cyan-500/10 px-2 py-0.5 rounded shrink-0">
                  {range}
                </code>
              </div>
            ))}

            {/* Outputs */}
            <div className="mt-3 pt-3 border-t border-white/5">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Output Targets</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                  <p className="text-green-400 font-black text-lg">SOH</p>
                  <p className="text-gray-500 text-[10px]">0% – 100%</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-3 text-center">
                  <p className="text-cyan-400 font-black text-lg">RUL</p>
                  <p className="text-gray-500 text-[10px]">0 – 168 cycles</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Records Summary */}
      <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <FileText size={15} className="text-cyan-400" /> Prediction Records
          </h3>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{totalReports} total records</span>
            {avgSoh && <span>Avg SOH: <span className="text-green-400 font-bold">{avgSoh}%</span></span>}
            {criticalCount > 0 && <span className="text-red-400 font-bold">{criticalCount} critical</span>}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 gap-3">
            <RefreshCw size={20} className="animate-spin text-cyan-400" />
            <p className="text-gray-400 text-sm">Loading records...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="flex flex-col items-center py-12 gap-3">
            <Database size={36} className="text-gray-600" />
            <p className="text-gray-500 text-sm">No prediction records yet</p>
            <p className="text-gray-600 text-xs">Records will appear after predictions are saved</p>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 p-5 border-b border-white/5">
              {[
                { label: 'Total Records', value: totalReports,  color: 'text-cyan-400'   },
                { label: 'Avg SOH',       value: avgSoh ? `${avgSoh}%` : '—', color: 'text-green-400'  },
                { label: 'Critical SOH',  value: criticalCount, color: 'text-red-400'    },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-black ${color}`}>{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Recent records table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-gray-500 text-[10px] uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Report Name</th>
                    <th className="px-5 py-3 text-left">Model</th>
                    <th className="px-5 py-3 text-left">Battery ID</th>
                    <th className="px-5 py-3 text-left">SOH</th>
                    <th className="px-5 py-3 text-left">RUL</th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reports.slice(0, 10).map((r, i) => {
                    const soh   = parseFloat(r.soh_predicted) || 0;
                    const color = soh >= 90 ? 'text-green-400' : soh >= 75 ? 'text-yellow-400' : 'text-red-400';
                    return (
                      <tr key={r.id ?? i} className="hover:bg-white/5 transition">
                        <td className="px-5 py-3 text-white font-medium truncate max-w-[150px]">
                          {r.report_name || `Report #${i+1}`}
                        </td>
                        <td className="px-5 py-3 text-gray-400 text-xs">
                          {(r.report_type || '').replace(/_/g, ' ')}
                        </td>
                        <td className="px-5 py-3 text-gray-400">{r.battery_id || '—'}</td>
                        <td className="px-5 py-3">
                          <span className={`font-bold ${color}`}>{soh.toFixed(1)}%</span>
                        </td>
                        <td className="px-5 py-3 text-cyan-400 font-bold">
                          {Math.round(parseFloat(r.rul_predicted) || 0)}
                        </td>
                        <td className="px-5 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border
                            ${soh >= 90 ? 'bg-green-500/15 text-green-400 border-green-500/25' :
                              soh >= 75 ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25' :
                              'bg-red-500/15 text-red-400 border-red-500/25'}`}>
                            {r.health_status || (soh >= 90 ? 'Healthy' : soh >= 75 ? 'Moderate' : 'Critical')}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-gray-500 text-xs">
                          {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {reports.length > 10 && (
              <div className="px-5 py-3 border-t border-white/5 text-center">
                <p className="text-gray-500 text-xs">
                  Showing 10 of {reports.length} records — use Export to download all
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Research Disclaimer */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex items-start gap-3">
        <AlertTriangle size={16} className="text-yellow-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-400 font-bold text-sm">Research Dataset Disclaimer</p>
          <p className="text-yellow-200/60 text-xs mt-1 leading-relaxed">
            This system uses the NASA CALCE Li-ion battery dataset (B0005–B0018) for research purposes.
            Maximum ~168 cycles vs real EV batteries (1,000–2,000 cycles).
            Predictions are for proof-of-concept demonstration only.
          </p>
        </div>
      </div>

    </div>
  );
}