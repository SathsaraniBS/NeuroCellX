import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';
import {Users, Database, Activity,Plus, Pencil, Trash2,ShieldCheck, Wrench, BarChart3,X, Check} from 'lucide-react';

const EngineerDashboard = () => {
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const navigate          = useNavigate();

  //  State 
  const [stats, setStats]         = useState(null);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('overview');


  // Fetch stats 
  const fetchStats = async () => {
    try {
      const res = await api.get('/api/admin/stats');
      setStats(res.data);
    } catch (err) {
      addToast('Failed to load stats', 'error');
    }
  };

  //  Fetch users 
  const fetchUsers = async () => {
    try {
      const res = await api.get('/api/admin/users');
      setUsers(res.data.users || []);
    } catch (err) {
      addToast('Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  
  // Logout 
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Role badge color
  const roleBadge = (role) => {
    const styles = {
      admin:    'bg-red-500/20    text-red-400',
      engineer: 'bg-blue-500/20   text-blue-400',
      analyst:  'bg-purple-500/20 text-purple-400',
      user:     'bg-cyan-500/20   text-cyan-400',
    };
    return styles[role] || styles.user;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">

      {/*   SIDEBAR  */}
      <aside className="w-64 bg-[#0b1220]/80 border-r border-cyan-500/20 flex flex-col p-6">

        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
          VoltIQ
        </h1>
        <p className="text-xs text-gray-500 mb-8"> Engineer Dashboard</p>

        {/* Engineer info */}
        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || user?.email}
          </p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
            Engineer
          </span>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'Overview',        icon: <Activity size={18} /> },
            { id: 'users',    label: 'User Management', icon: <Users size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-green-400/20 border border-cyan-400/40 text-cyan-300'
                  : 'hover:bg-white/5 text-gray-400'}`}
            >
              {tab.icon}
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-green-400 text-black font-semibold text-sm hover:opacity-90 transition"
        >
          Log Out
        </button>
      </aside>

      {/*  MAIN CONTENT  */}
      <main className="flex-1 p-8 overflow-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Engineer Dashboard <span className="text-cyan-400">⚡</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Monitor battery health, analyze data, and optimize performance with real-time insights.
          </p>
        </div>

        {/*  OVERVIEW TAB  */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">


              {/* Battery Logs */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Database size={20} className="text-green-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Battery Logs</p>
                </div>
                <p className="text-4xl font-bold text-green-400">
                  {stats?.total_logs ?? '—'}
                </p>
              </div>
            </div>
            </div>
        )}
      </main>
    </div>
  );
};
export default EngineerDashboard;