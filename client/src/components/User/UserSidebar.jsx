import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom"; 
import { useAuth } from "../../contexts/AuthContext";            
import { LayoutDashboard, LineChart, History, FileText, Settings, Moon, LogOut, ExternalLink } from "lucide-react";
const Sidebar = () => {
  // const [active, setActive] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(true);
  
  const { user, logout } = useAuth();  
  const navigate         = useNavigate(); 
  const location         = useLocation(); 

  const menuItems = [
    { path: '/dashboard',name: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/predictions",name: "Predictions", icon: <LineChart size={20} /> },
    { path: "/dashboard/history",name: "History", icon: <History size={20} /> },
    { path: "/dashboard/reports", name: "Reports", icon: <FileText size={20} /> },
    { path: "/dashboard/settings",name: "Settings", icon: <Settings size={20} /> },
  ];

   const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  
  const handleLogout = () => {
    logout();                    
    navigate('/login', { replace: true }); 
  };

  return (
    <div className="h-screen w-72 bg-[#050816] text-white flex flex-col justify-between border-r border-cyan-500/20 relative overflow-hidden">

      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] pointer-events-none"></div>

      {/* Top Section */}
      <div className="relative z-10 p-6">
        {/* Logo and View Site Button Row */}
        <div className="flex justify-between items-center mb-10">
            {/* Logo */}
            <h1 className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              VoltIQ
            </h1>

            {/* View Site Button */}
            <Link
                to="/"
                className="p-2 rounded-full transition-all duration-300 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 group text-cyan-400"
                title="View Website"
            >
                <ExternalLink className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </Link>
        </div>

         {/* User Info Section */}
        {user && (
          <div className="mb-6 px-2">
            <p className="text-white font-medium text-sm truncate">
              {user.name || user.email || "User"}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${user.role === 'admin'    ? 'bg-red-500/20    text-red-400'    :
                user.role === 'engineer' ? 'bg-blue-500/20   text-blue-400'   :
                user.role === 'analyst'  ? 'bg-purple-500/20 text-purple-400' :
                                          'bg-cyan-500/20   text-cyan-400'}`}>
              {user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : "User"}
            </span>
          </div>
        )}


        {/* Navigation */}
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path) }
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 
              ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/40 shadow-lg shadow-cyan-500/20 text-cyan-300"
                  : "hover:bg-white/5 text-gray-300"
              }`}
            >
              <span className={`${isActive(item.path) ? "text-cyan-300" : "text-gray-400"}`}>
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
         {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold hover:opacity-90 transition">
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;