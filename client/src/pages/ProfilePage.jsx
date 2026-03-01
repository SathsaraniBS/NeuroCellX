import React, { useState } from "react";
import {Camera,ShieldCheck,Mail,Smartphone,Bell,Trash2,Monitor,} from "lucide-react";

const ProfilePage = () => {
  const [twoFA, setTwoFA] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [systemNotif, setSystemNotif] = useState(true);

  const Toggle = ({ enabled, setEnabled }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-all duration-300 ${
        enabled ? "bg-cyan-400" : "bg-gray-600"
      }`}
    >
      <div
        className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
          enabled ? "translate-x-7" : "translate-x-0"
        }`}
      ></div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white px-10 py-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 mb-10">
        <h1 className="text-4xl font-semibold mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your account information</p>
      </div>

      {/* Profile Card */}
      <div className="relative z-10 bg-white/5 border border-cyan-400/20 rounded-2xl p-6 flex items-center justify-between mb-10 backdrop-blur-xl">
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="profile"
              className="w-28 h-28 rounded-full border-2 border-cyan-400"
            />
            <button className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full hover:bg-cyan-400 transition">
              <Camera size={16} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
               BSS
            </h2>
            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
              Analyst
            </span>
          </div>
        </div>

        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold hover:opacity-90 transition">
          Edit Profile
        </button>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-3 gap-8">

        {/* Personal Info */}
        <div className="col-span-2 bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Full Name</label>
              <input
                type="text"
                defaultValue="Sathsarani Perera"
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Phone Number</label>
              <input
                type="text"
                defaultValue="+1 (555) 123-4567"
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                defaultValue="sathsarani@example.com"
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-gray-400 text-sm">Role</label>
              <select className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400">
                <option>Analyst</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>
          </div>

          <button className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold hover:opacity-90 transition">
            Update
          </button>
        </div>

        {/* Account Actions */}
        <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-6">Account Actions</h3>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition mb-4">
            <div className="flex items-center gap-3">
              <Monitor size={18} />
              Manage Devices
            </div>
          </button>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
            <div className="flex items-center gap-3">
              <Trash2 size={18} />
              Delete Account
            </div>
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="relative z-10 mt-10 bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
        <h3 className="text-xl font-semibold mb-6">Security Settings</h3>

        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} />
              Two-Factor Authentication
            </div>
            <Toggle enabled={twoFA} setEnabled={setTwoFA} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail size={20} />
              Email Notifications
            </div>
            <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={20} />
              SMS Notifications
            </div>
            <Toggle enabled={smsNotif} setEnabled={setSmsNotif} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={20} />
              System Alerts
            </div>
            <Toggle enabled={systemNotif} setEnabled={setSystemNotif} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;