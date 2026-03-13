import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../services/api';
import {Users, Database, Activity,Plus, Pencil, Trash2,ShieldCheck, Wrench, BarChart3,X, Check} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout }  = useAuth();
  const { addToast }      = useToast();
  const navigate          = useNavigate();

  //  State 
  const [stats, setStats]         = useState(null);
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Add user modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser]           = useState({
    name: '', email: '', password: '', role: 'user'
  });

  // Edit user modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser]           = useState(null);

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

  // Add user 
  const handleAddUser = async () => {
    try {
      await api.post('/api/admin/users', newUser);
      addToast('User created successfully!', 'success');
      setShowAddModal(false);
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
      fetchStats();
    } catch (err) {
      addToast(err.response?.data?.detail || 'Failed to create user', 'error');
    }
  };

  // Edit user 
  const handleEditUser = async () => {
    try {
      await api.put(`/api/admin/users/${editUser.id}`, {
        name: editUser.name,
        role: editUser.role
      });
      addToast('User updated successfully!', 'success');
      setShowEditModal(false);
      fetchUsers();
    } catch (err) {
      addToast('Failed to update user', 'error');
    }
  };

  // Delete user
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Delete user "${userName}"?`)) return;
    try {
      await api.delete(`/api/admin/users/${userId}`);
      addToast('User deleted!', 'success');
      fetchUsers();
      fetchStats();
    } catch (err) {
      addToast('Failed to delete user', 'error');
    }
  };

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

      {/*  ADMIN SIDEBAR  */}
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
            Admin Dashboard <span className="text-cyan-400">⚡</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage users, monitor system stats and control VoltIQ.
          </p>
        </div>

        {/*  OVERVIEW TAB  */}
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

        {/*  USERS TAB  */}
        {activeTab === 'users' && (
          <div>
            {/* Header + Add button */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">User Management</h3>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold rounded-xl hover:brightness-110 transition text-sm"
              >
                <Plus size={16} /> Add User
              </button>
            </div>

            {/* Users Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                  <p className="ml-3 text-gray-400">Loading users...</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 text-gray-400 text-sm">
                      <th className="p-4 text-left">ID</th>
                      <th className="p-4 text-left">Name</th>
                      <th className="p-4 text-left">Email</th>
                      <th className="p-4 text-left">Role</th>
                      <th className="p-4 text-left">Joined</th>
                      <th className="p-4 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr
                        key={u.id}
                        className="border-t border-white/10 hover:bg-white/5 transition text-sm"
                      >
                        <td className="p-4 text-gray-400">#{u.id}</td>
                        <td className="p-4 font-medium">{u.name}</td>
                        <td className="p-4 text-gray-400">{u.email}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleBadge(u.role)}`}>
                            {u.role?.charAt(0).toUpperCase() + u.role?.slice(1)}
                          </span>
                        </td>
                        <td className="p-4 text-gray-400">
                          {u.created_at
                            ? new Date(u.created_at).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {/* Edit */}
                            <button
                              onClick={() => { setEditUser(u); setShowEditModal(true); }}
                              className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition"
                              title="Edit user"
                            >
                              <Pencil size={14} />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => handleDeleteUser(u.id, u.name)}
                              className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                              title="Delete user"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {/* Empty state */}
              {!loading && users.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400">No users found.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/*  ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 w-full max-w-md">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Add New User</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
              />
              <input
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="w-full px-4 py-3 bg-[#0b1220] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
              >
                <option value="user">User</option>
                <option value="engineer">Engineer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}

      {/*  EDIT USER MODAL  */}
      {showEditModal && editUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0b1220] border border-white/10 rounded-2xl p-8 w-full max-w-md">

            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Edit User</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X size={20} className="text-gray-400 hover:text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60"
              />
              <input
                type="email"
                value={editUser.email}
                disabled
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 cursor-not-allowed"
              />
              <select
                value={editUser.role}
                onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                className="w-full px-4 py-3 bg-[#0b1220] border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-400/60"
              >
                <option value="user">User</option>
                <option value="engineer">Engineer</option>
                <option value="analyst">Analyst</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-semibold hover:brightness-110 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;