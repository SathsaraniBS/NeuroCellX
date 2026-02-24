import React from 'react';
import {Bell,User,Search,Download,FileText,AlertTriangle,TrendingUp,Moon,Sun} from "lucide-react";
import Footer from '../components/Footer';

function Dashboard() {
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

          {/* KPI CARDS, MAIN ANALYTICS, HEALTH SCORE, ALERTS, RECENT ACTIVITY, EXPORT */}

          <div className="grid lg:grid-cols-2 gap-8">
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