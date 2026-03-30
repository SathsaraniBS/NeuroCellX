import React, { useState, useEffect } from 'react';
import { 
  Settings, User, Globe, Save, Mail, Key, Camera, 
  Facebook, Twitter, Instagram, Youtube, Map, 
  Clock, Trophy, Eye, EyeOff, ShieldCheck, 
  Smartphone, BellRing, Laptop
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { useSettings } from '../../contexts/SettingsContext';
import api from '../../services/api';

const AdminSettings = () => {
  const { user, login } = useAuth();
  const { settings, updateSettings: saveSettings } = useSettings();
  const { addToast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Profile Form
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    profilePicture: ''
  });

  // Global Settings Form
  const [globalSettings, setGlobalSettings] = useState({
    contactEmail: '',
    contactPhone: '',
    address: '',
    mapUrl: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: ''
    },
    operationalHours: '',
    maintenanceMode: false,
    loyaltyPointsPerDollar: 10,
    pointsValueInCents: 10,
    tierThresholds: {
      silver: 1000,
      gold: 5000
    }
  });

  useEffect(() => {
    if (user) {
      setProfileForm(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        profilePicture: user.profilePicture || ''
      }));
    }
  }, [user]);

  useEffect(() => {
    if (settings) {
      setGlobalSettings({
        contactEmail: settings.contactEmail || '',
        contactPhone: settings.contactPhone || '',
        address: settings.address || '',
        mapUrl: settings.mapUrl || '',
        socialLinks: {
          facebook: settings.socialLinks?.facebook || '',
          twitter: settings.socialLinks?.twitter || '',
          instagram: settings.socialLinks?.instagram || '',
          youtube: settings.socialLinks?.youtube || ''
        },
        operationalHours: settings.operationalHours || '',
        maintenanceMode: settings.maintenanceMode || false,
        loyaltyPointsPerDollar: settings.loyaltyPointsPerDollar || 10,
        pointsValueInCents: settings.pointsValueInCents || 10,
        tierThresholds: {
          silver: settings.tierThresholds?.silver || 1000,
          gold: settings.tierThresholds?.gold || 5000
        }
      });
    }
  }, [settings]);

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('folder', 'users');
    uploadFormData.append('image', file);

    setUploading(true);
    try {
      const { data } = await api.post('/upload?folder=users', uploadFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfileForm(prev => ({ ...prev, profilePicture: data }));
      addToast('Profile picture updated', 'success');
    } catch (error) {
      addToast('Error uploading image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        name: profileForm.name,
        email: profileForm.email,
        profilePicture: profileForm.profilePicture
      };
      if (profileForm.newPassword) updateData.password = profileForm.newPassword;

      const { data } = await api.put('/users/profile', updateData);
      const updatedUser = { ...user, ...data };
      login(data.token || localStorage.getItem('token'), updatedUser);

      addToast('Profile updated successfully', 'success');
      setProfileForm(prev => ({ ...prev, currentPassword: '', newPassword: '', confirmPassword: '' }));
    } catch (error) {
      addToast('Error updating profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleGlobalSettingsSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const result = await saveSettings(globalSettings);
    if (result.success) {
      addToast('Settings updated successfully!', 'success');
    } else {
      addToast('Error updating settings', 'error');
    }
    setSaving(false);
  };

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'global', label: 'Site Config', icon: Globe },
    { id: 'loyalty', label: 'Loyalty Tier', icon: Trophy },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
            <Settings className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">System Settings</h2>
            <p className="text-gray-400 text-sm">Control application behavior and security</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 sm:gap-4 border border-white/10 rounded-2xl overflow-x-auto scrollbar-hide ">
        {/* Sidebar Tabs */}
        {/* <div className="lg:col-span-1 space-y-2"> */}
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 border ${
                activeTab === tab.id 
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div> 
        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-8 space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/30 bg-black/40">
                      {profileForm.profilePicture ? (
                        <img src={profileForm.profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><User size={40} className="text-gray-600" /></div>
                      )}
                    </div>
                    <label className="absolute inset-0 bg-cyan-500/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl">
                      <Camera className="text-white" />
                      <input type="file" className="hidden" accept="image/*" onChange={handleProfilePictureUpload} />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Personal Information</h3>
                    <p className="text-gray-400 text-sm">Update your account identity and access</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Display Name</label>
                    <input 
                      type="text" 
                      value={profileForm.name}
                      onChange={e => setProfileForm({...profileForm, name: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      value={profileForm.email}
                      onChange={e => setProfileForm({...profileForm, email: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">New Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={profileForm.newPassword}
                      onChange={e => setProfileForm({...profileForm, newPassword: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Confirm Password</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={profileForm.confirmPassword}
                      onChange={e => setProfileForm({...profileForm, confirmPassword: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                <button 
                  disabled={saving}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Save size={18} /> {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'global' && (
            <form onSubmit={handleGlobalSettingsSubmit} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ShieldCheck size={20} className="text-cyan-400" /> Site Configuration
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Manage global contacts and operational status</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Support Email</label>
                    <input 
                      type="email" 
                      value={globalSettings.contactEmail}
                      onChange={e => setGlobalSettings({...globalSettings, contactEmail: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-gray-400 ml-1">Operational Hours</label>
                    <input 
                      type="text" 
                      value={globalSettings.operationalHours}
                      onChange={e => setGlobalSettings({...globalSettings, operationalHours: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none transition-all"
                      placeholder="Mon - Fri: 9AM - 6PM"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Maintenance Mode</h4>
                    <p className="text-sm text-gray-400">Lock the platform for all non-admin users</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGlobalSettings({...globalSettings, maintenanceMode: !globalSettings.maintenanceMode})}
                    className={`w-14 h-8 rounded-full transition-all relative ${globalSettings.maintenanceMode ? 'bg-cyan-500' : 'bg-white/10'}`}
                  >
                    <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${globalSettings.maintenanceMode ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>

                <div className="space-y-4">
                   <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Social Channels</h4>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {['facebook', 'twitter', 'instagram', 'youtube'].map((platform) => (
                        <div key={platform} className="space-y-1">
                          <label className="capitalize text-xs text-gray-400">{platform}</label>
                          <input 
                            type="text"
                            value={globalSettings.socialLinks[platform]}
                            onChange={e => setGlobalSettings({
                              ...globalSettings, 
                              socialLinks: {...globalSettings.socialLinks, [platform]: e.target.value}
                            })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                          />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                <button 
                  disabled={saving}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all flex items-center gap-2"
                >
                  <Save size={18} /> Update Config
                </button>
              </div>
            </form>
          )}

          {activeTab === 'loyalty' && (
            <form onSubmit={handleGlobalSettingsSubmit} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-8 space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Trophy size={20} className="text-cyan-400" /> Loyalty & Rewards
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">Configure point multipliers and tier benefits</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Points per $1.00</label>
                      <input 
                        type="number" 
                        value={globalSettings.loyaltyPointsPerDollar}
                        onChange={e => setGlobalSettings({...globalSettings, loyaltyPointsPerDollar: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Point Value (Cents)</label>
                      <input 
                        type="number" 
                        value={globalSettings.pointsValueInCents}
                        onChange={e => setGlobalSettings({...globalSettings, pointsValueInCents: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="bg-black/20 border border-white/5 p-6 rounded-2xl space-y-4">
                    <h4 className="font-bold text-white flex items-center gap-2"><ShieldCheck size={16} /> Tier Thresholds</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Silver Tier</span>
                        <input 
                          type="number" 
                          value={globalSettings.tierThresholds.silver}
                          onChange={e => setGlobalSettings({
                            ...globalSettings, 
                            tierThresholds: {...globalSettings.tierThresholds, silver: e.target.value}
                          })}
                          className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-right text-cyan-400" 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">Gold Tier</span>
                        <input 
                          type="number" 
                          value={globalSettings.tierThresholds.gold}
                          onChange={e => setGlobalSettings({
                            ...globalSettings, 
                            tierThresholds: {...globalSettings.tierThresholds, gold: e.target.value}
                          })}
                          className="w-24 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-right text-cyan-400" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end">
                <button 
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all"
                >
                  Save Loyalty Rules
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
  );
};

export default AdminSettings;