import React, { useState, useEffect } from 'react';
import axios from 'axios';  
import { useAuth } from '../contexts/AuthContext';  
import { useToast } from '../contexts/ToastContext';  
import {Bell,User,Search,ChartLine,History,Settings,Download,LayoutDashboard,FileText,AlertTriangle,Moon} from "lucide-react";
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

function Dashboard() {

  const [batteryLogs, setBatteryLogs] = useState([]);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  const { currentUser } = useAuth();  
  const { addToast } = useToast();

   const links = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/dashboard/predictions', icon:ChartLine , label: 'predictions' },
        { path: '/dashboard/history', icon: History, label: 'History' },
        { path: '/dashboard/reports', icon: FileText, label: 'Reports' },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname.startsWith(path)) return true;
        return false;
    };

  useEffect(() => {
    const fetchBatteryLogs = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/dashboard/battery-logs');
        setBatteryLogs(res.data.logs);  
        addToast("Dashboard data loaded successfully!", "success");
      } catch (err) {
        const message = err.response?.data?.detail || "Failed to load dashboard data";
        setError(message);
        addToast(message, "error");
      } finally {
        setLoading(false);  
      }
    };

    fetchBatteryLogs();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">

      {/* ================= SIDEBAR + MAIN CONTEN ================= */}
      <div className="flex flex-1">
        <Sidebar />
        {/* ================= SIDEBAR ================= */}
        {/* <aside className="w-64 bg-[#0b1220]/80 backdrop-blur-lg border-r border-cyan-500/20 p-6 hidden lg:flex flex-col">
          <h1 className="text-2xl font-bold text-cyan-400 mb-10">
            Volt<span className="text-green-400">IQ</span>
          </h1>

          <nav className="space-y-4 flex-1">
            {["Dashboard", "Predictions", "History", "Reports", "Settings"].map(
              (item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-400 cursor-pointer transition"
                >
                  {item}
                </div>
              )
            )}
          </nav>

          <div className="mt-auto pt-6 border-t border-cyan-500/20">
            <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white w-full">
              <Moon size={16} /> Dark Mode
            </button>
          </div>
        </aside> */}

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          {/* ========== TOP NAVBAR ========== */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold">
                Welcome, {currentUser?.name}! <span className="text-cyan-400"> 👋</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Here’s your EV battery health overview.
              </p>

              {loading ? (
          <p className="text-center">Loading dashboard data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-2xl mb-4">Battery Logs</h2>
            {batteryLogs.length > 0 ? (
              <table className="w-full border-collapse bg-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="p-4 text-left">ID</th>
                    <th className="p-4 text-left">Voltage</th>
                    <th className="p-4 text-left">Temperature</th>
                    <th className="p-4 text-left">SOH</th>
                    <th className="p-4 text-left">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {batteryLogs.map((log) => (
                    <tr key={log.id} className="border-t border-white/10">
                      <td className="p-4">{log.id}</td>
                      <td className="p-4">{log.voltage}</td>
                      <td className="p-4">{log.temperature}</td>
                      <td className="p-4">{log.soh_result}</td>
                      <td className="p-4">{new Date(log.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No battery logs available yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
      {/* ================= FOOTER  ================= */}
      <Footer />

    </div>
  );
}

export default Dashboard;