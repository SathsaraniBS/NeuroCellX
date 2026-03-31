import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Camera, ShieldCheck, Mail, Smartphone, Bell, Trash2, Monitor } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { addToast } = useToast(); // මෙතන addToast හෝ showToast ඔයාගේ Context එක අනුව පාවිච්චි කරන්න

  // Security Toggles සඳහා States
  const [twoFA, setTwoFA] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [systemNotif, setSystemNotif] = useState(true);

  // Form Inputs සඳහා States
  const [fullName, setFullName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [email, setEmail] = useState(user?.email || "");

  // Profile Update Function
  const handleProfileUpdate = async () => {
    try {
      // FIX: ඔයාගේ AuthContext එකේ updateUser function එකට data යවනවා
      await updateUser({
        name: fullName,
        email: email,
        phone: phoneNumber,
      });

      if (addToast) addToast('Profile updated successfully!', 'success');
      
    } catch (err) {
      if (addToast) addToast('Failed to update profile', 'error');
      console.error(err);
    }
  };

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
              src={user?.profilePic || "https://i.pravatar.cc/150?img=32"}
              alt="profile"
              className="w-28 h-28 rounded-full border-2 border-cyan-400 object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full hover:bg-cyan-400 transition">
              <Camera size={16} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "User Name"}</h2>
            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
              {user?.role || "Member"}
            </span>
          </div>
        </div>
        <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold hover:opacity-90 transition">
          Edit Profile
        </button>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Personal Info */}
        <div className="md:col-span-2 bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-6">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-400 text-sm">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 p-3 bg-black/40 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
          <button
            onClick={handleProfileUpdate}
            className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-green-400 text-black font-semibold hover:opacity-90 transition"
          >
            Save Changes
          </button>
        </div>

        {/* Account Actions */}
        <div className="bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-semibold mb-6">Account Actions</h3>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition mb-4">
            <Monitor size={18} /> Manage Devices
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition">
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      </div>

      {/* Security Section */}
      <div className="relative z-10 mt-10 bg-white/5 border border-cyan-400/20 rounded-2xl p-6 backdrop-blur-xl">
        <h3 className="text-xl font-semibold mb-6">Security & Notifications</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><ShieldCheck size={20} /> Two-Factor Authentication</div>
            <Toggle enabled={twoFA} setEnabled={setTwoFA} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Mail size={20} /> Email Notifications</div>
            <Toggle enabled={emailNotif} setEnabled={setEmailNotif} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Smartphone size={20} /> SMS Notifications</div>
            <Toggle enabled={smsNotif} setEnabled={setSmsNotif} />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Bell size={20} /> System Alerts</div>
            <Toggle enabled={systemNotif} setEnabled={setSystemNotif} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;