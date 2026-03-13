import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import {
  ChartLine, History, Settings,
  LayoutDashboard, FileText
} from "lucide-react";
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import api from '../services/api'; 

function Dashboard() {

  const [batteryLogs, setBatteryLogs] = useState([]); 
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  const { user }      = useAuth();
  const { addToast }  = useToast();

  useEffect(() => {
    const fetchBatteryLogs = async () => {
      try {
        const res = await api.get('/api/dashboard/battery-logs');

        const logs = res.data?.logs;
        if (Array.isArray(logs)) {
          setBatteryLogs(logs);
        } else {
          setBatteryLogs([]); 
        }

        addToast("Dashboard data loaded!", "success");

      } catch (err) {
        const message = err.response?.data?.detail || "Failed to load dashboard data";
        setError(message);
        addToast(message, "error");
        setBatteryLogs([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryLogs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">

      <div className="flex flex-1">
        <Sidebar />

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          {/* ========== TOP HEADER ========== */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold">
              Good morning, {user?.name || user?.email || "User"}!
              <span className="text-cyan-400"> 👋</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Here's your EV battery health overview.
            </p>

            {/* Role Badge */}
            {user?.role && (
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                ${user.role === 'admin'    ? 'bg-red-500/20    text-red-400'    :
                  user.role === 'engineer' ? 'bg-blue-500/20   text-blue-400'   :
                  user.role === 'analyst'  ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-cyan-500/20   text-cyan-400'}`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            )}
          </div>

          {/* ========== KPI CARDS ========== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {/* SOC */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm">State of Charge (SOC)</p>
              <p className="text-3xl font-bold text-green-400 mt-2">82%</p>
              <p className="text-gray-500 text-xs mt-1">Updated 2 mins ago</p>
            </div>

            {/* SOH */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm">State of Health (SOH)</p>
              <p className="text-3xl font-bold text-cyan-400 mt-2">92%</p>
              <p className="text-gray-500 text-xs mt-1">+4% from last month</p>
            </div>

            {/* RUL */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm">Remaining Useful Life</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">520 cycles</p>
              <p className="text-gray-500 text-xs mt-1">Moderate Risk</p>
            </div>

            {/* Range */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-gray-400 text-sm">Estimated Driving Range</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">420 km</p>
              <p className="text-gray-500 text-xs mt-1">Based on SOH</p>
            </div>
          </div>

          {/* ========== BATTERY LOGS TABLE ========== */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              Battery Logs
            </h3>

            {/* Loading state */}
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                <p className="ml-3 text-gray-400">Loading battery logs...</p>
              </div>

            /* Error state */
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-400 mb-2">⚠️ {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="text-sm text-cyan-400 hover:text-cyan-300 underline"
                >
                  Try again
                </button>
              </div>

            /* ✅ FIXED: batteryLogs.length is safe now */
            ) : batteryLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm">
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Voltage (V)</th>
                      <th className="p-4 text-left">Temperature (°C)</th>
                      <th className="p-4 text-left">SOH (%)</th>
                      <th className="p-4 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batteryLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-t border-white/10 hover:bg-white/5 transition text-sm"
                      >
                        <td className="p-4">{log.id}</td>
                        <td className="p-4">{log.voltage}</td>
                        <td className="p-4">{log.temperature}</td>
                        <td className="p-4">
                          <span className={`font-semibold
                            ${log.soh_result >= 90 ? 'text-green-400'  :
                              log.soh_result >= 80 ? 'text-cyan-400'   :
                              log.soh_result >= 70 ? 'text-yellow-400' :
                                                     'text-red-400'}`}>
                            {log.soh_result}%
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">
                          {/* ✅ FIXED: safe date parsing */}
                          {log.created_at
                            ? new Date(log.created_at).toLocaleString()
                            : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            /* Empty state */
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">No battery logs available yet.</p>
                <p className="text-gray-500 text-sm mt-2">
                  Upload a dataset to see battery data here.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Dashboard;