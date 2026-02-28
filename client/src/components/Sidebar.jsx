import React, { useState } from "react";
import {
  LayoutDashboard,
  LineChart,
  History,
  FileText,
  Settings,
  Moon,
  ChevronRight,
} from "lucide-react";

const DashboardSidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Predictions", icon: <LineChart size={20} /> },
    { name: "History", icon: <History size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen w-72 bg-[#050816] text-white flex flex-col justify-between border-r border-cyan-500/20 relative overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] pointer-events-none"></div>

      {/* Top Section */}
      <div className="relative z-10 p-6">
        
        {/* Logo */}
        <h1 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-10">
          VoltIQ
        </h1>

        {/* Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 
              ${
                active === item.name
                  ? "bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/40 shadow-lg shadow-cyan-500/20 text-cyan-300"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <span className={`${active === item.name ? "text-cyan-300" : "text-gray-400"}`}>
                {item.icon}
              </span>
              <span className="text-base">{item.name}</span>
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3 text-gray-300">
            <Moon size={20} />
            <span>Dark Mode</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 
            ${darkMode ? "bg-cyan-400" : "bg-gray-600"}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 
              ${darkMode ? "translate-x-7" : "translate-x-0"}`}
            ></div>
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 p-6 border-t border-white/10">
        <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all text-gray-300">
          <div className="flex items-center gap-3">
            <Github size={20} />
            <span>GitHub</span>
          </div>
          <ChevronRight size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;