import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard, LineChart, History,
  FileText, Settings, LogOut, ExternalLink, Cpu
} from "lucide-react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  // ─────────────────────────────────────────────────────────
  //  ✅ FIXED: Menu items — correct paths, icons, labels
  // ─────────────────────────────────────────────────────────
  const menuItems = [
    { path: '/dashboard',  name: 'Dashboard',         icon: <LayoutDashboard size={20} /> },
    { path: '/prediction', name: 'Predictions',       icon: <LineChart size={20} />       },
    { path: '/models',     name: 'ModelsPredictions', icon: <Cpu size={20} />             },
    { path: '/history',    name: 'History',           icon: <History size={20} />         },
    { path: '/reports',    name: 'Reports',           icon: <FileText size={20} />        },
    { path: '/settings',   name: 'Settings',          icon: <Settings size={20} />        },
  ];

  // ─────────────────────────────────────────────────────────
  //  ✅ FIXED: isActive() — works for all routes
  //  Dashboard exact match, others startsWith
  // ─────────────────────────────────────────────────────────
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
    <div className="h-screen w-64 bg-[#050816] text-white flex flex-col justify-between border-r border-cyan-500/20 relative overflow-hidden shrink-0">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] pointer-events-none" />

      {/* ── Top Section ── */}
      <div className="relative z-10 p-6 flex-1 overflow-y-auto">

        {/* Logo Row */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            VoltIQ
          </h1>
          <Link
            to="/"
            className="p-1.5 rounded-full transition-all duration-300 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/40 group text-cyan-400"
            title="View Website"
          >
            <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* User Info */}
        {user && (
          <div className="mb-6 px-2 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-black font-bold text-sm shrink-0">
                {(user.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-white font-semibold text-sm truncate">
                  {user.name || user.email?.split('@')[0] || 'User'}
                </p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium
                  ${user.role === 'admin'    ? 'bg-red-500/20    text-red-400'    :
                    user.role === 'engineer' ? 'bg-blue-500/20   text-blue-400'   :
                    user.role === 'analyst'  ? 'bg-purple-500/20 text-purple-400' :
                                              'bg-cyan-500/20   text-cyan-400'}`}>
                  {user.role
                    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                    : 'User'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 text-left
                  ${active
                    ? 'bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/30 shadow-md shadow-cyan-500/10 text-cyan-300'
                    : 'hover:bg-white/5 text-gray-400 hover:text-gray-200 border border-transparent'
                  }`}
              >
                <span className={`shrink-0 transition-colors ${active ? 'text-cyan-400' : 'text-gray-500'}`}>
                  {item.icon}
                </span>
                <span className={`text-sm font-medium transition-colors ${active ? 'text-cyan-300' : ''}`}>
                  {item.name}
                </span>

                {/* Active indicator dot */}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Bottom Section ── */}
      <div className="relative z-10 p-5 border-t border-white/10 shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-bold text-sm hover:brightness-110 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200"
        >
          <LogOut size={17} />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;