import React from 'react';
import {Bell,Search,ChartLine,History,Settings,Download,LayoutDashboard,FileText,AlertTriangle,Moon} from "lucide-react";
import Footer from '../components/Footer';

function Dashboard() {

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">

      {/* ================= SIDEBAR + MAIN CONTEN ================= */}
      <div className="flex flex-1">

        {/* ================= SIDEBAR ================= */}
        <aside className="w-64 bg-[#0b1220]/80 backdrop-blur-lg border-r border-cyan-500/20 p-6 hidden lg:flex flex-col">
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
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          {/* ========== TOP NAVBAR ========== */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold">
                Good morning, <span className="text-cyan-400">Sathsarani 👋</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Here’s your EV battery health overview.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Search className="text-gray-400 cursor-pointer" />
              <Bell className="text-gray-400 cursor-pointer" />
              <User className="text-gray-400 cursor-pointer" />
            </div>
          </div>


          {/* BATTERY SELECTOR */}
          <div className="mb-6">
            <select className="bg-[#111827] border border-cyan-500/30 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500">
              <option>Select Battery ID</option>
              <option>Battery-001</option>
              <option>Battery-002</option>
            </select>
          </div>

           {/* ========== KPI CARDS ========== */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          {/* SOC */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <h4 className="text-gray-400 text-sm">State of Charge (SOC)</h4>
            <p className="text-3xl font-bold text-green-400 mt-2">82%</p>
            <p className="text-xs text-gray-500 mt-2">Updated 2 mins ago</p>
          </div>

          {/* SOH */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <h4 className="text-gray-400 text-sm">State of Health (SOH)</h4>
            <p className="text-3xl font-bold text-green-400 mt-2">92%</p>
            <p className="text-xs text-gray-500 mt-2">+4% from last month</p>
          </div>

          {/* RUL */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <h4 className="text-gray-400 text-sm">Remaining Useful Life</h4>
            <p className="text-3xl font-bold text-yellow-400 mt-2">520 cycles</p>
            <p className="text-xs text-gray-500 mt-2">Moderate Risk</p>
          </div>

          {/* Estimated Range */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <h4 className="text-gray-400 text-sm">Estimated Driving Range</h4>
            <p className="text-3xl font-bold text-cyan-400 mt-2">420 km</p>
            <p className="text-xs text-gray-500 mt-2">Based on SOH</p>
          </div>
        </div>

        {/* ========== MAIN ANALYTICS SECTION ========== */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* Trend Chart Placeholder */}
          <div className="lg:col-span-2 bg-[#111827] rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">
              Battery Health Trend (SOC / SOH / RUL)
            </h3>

            <div className="h-64 bg-gradient-to-r from-cyan-500/10 to-green-500/10 rounded-lg flex items-center justify-center text-gray-500">
              Chart Placeholder (Use Recharts / Chart.js)
            </div>
          </div>

          {/* Forecast */}
          <div className="bg-[#111827] rounded-xl p-6 border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">
              30-Day Forecast
            </h3>

            <div className="h-48 bg-gradient-to-r from-yellow-500/10 to-green-500/10 rounded-lg flex items-center justify-center text-gray-500">
              Forecast Chart
            </div>

            <div className="mt-4 text-green-400 font-semibold">
              🟢 Healthy
            </div>
          </div>
        </div>

        {/* ========== HEALTH SCORE + ALERTS ========== */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">

          {/* Gauge */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">Battery Health Score</h3>

            <div className="flex flex-col items-center justify-center">
              <div className="w-40 h-40 rounded-full border-8 border-green-400 flex items-center justify-center text-3xl font-bold">
                92%
              </div>
              <p className="text-gray-400 mt-4">Healthy</p>
              <p className="text-xs text-gray-500 mt-2">
                Last updated 2 minutes ago
              </p>
            </div>
          </div>

          {/* Alerts */}
          <div className="lg:col-span-2 bg-[#111827] p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">Alerts & Warnings</h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-red-500/10 p-3 rounded-lg">
                <AlertTriangle className="text-red-400" />
                <span>Low SOH detected</span>
              </div>

              <div className="flex items-center gap-3 bg-yellow-500/10 p-3 rounded-lg">
                <AlertTriangle className="text-yellow-400" />
                <span>High Temperature Alert</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========== RECENT ACTIVITY + EXPORT ========== */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Activity */}
          <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li>✔ Dataset uploaded</li>
              <li>✔ Model retrained</li>
              <li>✔ Prediction generated</li>
              <li>✔ Report exported</li>
            </ul>
          </div>

         

            <div className="bg-[#111827] p-6 rounded-xl border border-cyan-500/20">
              <h3 className="text-lg font-semibold mb-4">Export Options</h3>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition">
                  <FileText size={16} /> Download PDF
                </button>
                <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg transition">
                  <Download size={16} /> Export CSV
                </button>
              </div>
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