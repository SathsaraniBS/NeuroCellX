import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';
import { Users, Database, Activity, Plus, Wrench, BarChart3 ,BrainCircuit, Bell,MessageSquare,Settings} from 'lucide-react';
import { TbLogs } from 'react-icons/tb';
import AdminUsers from '../../components/admin/AdminUsers'; 
import AdminContacts from '../../components/admin/AdminContacts';
import AdminSettings from '../../components/admin/AdminSettings';

const AdminDashboard = () => {
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const navigate          = useNavigate();

  // State
  const [stats, setStats]         = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch stats 
  const fetchStats = async () => {
    try {
      const res = await api.get('/api/admin/stats');
      setStats(res.data);
    } catch (err) {
      addToast('Failed to load stats', 'error');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Logout 
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex">

      {/* ADMIN SIDEBAR */}
      <aside className="w-64 bg-[#0b1220]/80 border-r border-cyan-500/20 flex flex-col p-6">
        {/* Logo */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent mb-2">
          VoltIQ
        </h1>
        <p className="text-xs text-gray-500 mb-8">Admin Panel</p>

        {/* Admin info */}
        <div className="mb-6 p-3 bg-white/5 rounded-xl border border-white/10">
          <p className="text-sm font-medium text-white truncate">
            {user?.name || user?.email}
          </p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
            Admin
          </span>
        </div>

        {/* Nav */}
        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'Overview',        icon: <Activity size={18} /> },
            { id: 'users',    label: 'User Management', icon: <Users size={18} /> },
            { id: 'dataset', label: 'Dataset Management',icon: <Database size={18} /> },
            { id: 'model', label: 'Model Management',icon: <BrainCircuit size={18} /> },
            { id: 'logs',label:'System Logs',          icon: <TbLogs size={18} /> },
            { id:  'alerts', label: 'Alerts & Notifications', icon: <Bell size={18} /> },
            { id: "contacts", label: "Queries", icon:  <MessageSquare size={18} /> },
            { id: 'settings', label: 'Settings',        icon: <Settings size={18} /> },
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

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        {/* <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Admin Dashboard <span className="text-cyan-400">⚡</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage users, monitor system stats and control VoltIQ.
          </p>
        </div>  *

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Users */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500/20 rounded-lg">
                    <Users size={20} className="text-cyan-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                </div>
                <p className="text-4xl font-bold text-cyan-400">
                  {stats?.total_users ?? '—'}
                </p>
              </div>

              {/* Engineers */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Wrench size={20} className="text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Engineers</p>
                </div>
                <p className="text-4xl font-bold text-blue-400">
                  {stats?.engineer_count ?? '—'}
                </p>
              </div>

              {/* Analysts */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <BarChart3 size={20} className="text-purple-400" />
                  </div>
                  <p className="text-gray-400 text-sm">Analysts</p>
                </div>
                <p className="text-4xl font-bold text-purple-400">
                  {stats?.analyst_count ?? '—'}
                </p>
              </div>

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

            {/* Quick actions */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => { setActiveTab('users'); setShowAddModal(true); }}
                  className="flex items-center gap-2 px-5 py-3 bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 rounded-xl hover:bg-cyan-500/30 transition text-sm"
                >
                  <Plus size={16} /> Add New User
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition text-sm"
                >
                  <Users size={16} /> Manage Users
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <AdminUsers 
            showAddModal={showAddModal} 
            setShowAddModal={setShowAddModal} 
            onUserChange={fetchStats} 
          />
        )}

        {activeTab === 'contacts' && (
          <AdminContacts
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            onMessageChange={fetchStats} />
        )}

        {activeTab === 'settings' && (
          <AdminSettings
            showAddModal={showAddModal}
            setShowAddModal={setShowAddModal}
            onMessageChange={fetchStats} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;