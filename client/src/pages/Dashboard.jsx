import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { Bell, User, Search } from "lucide-react"; 
import Footer from '../components/Footer';
import Sidebar from '../components/User/UserSidebar';
import api from '../services/api'; 

function Dashboard() {
  const [batteryLogs, setBatteryLogs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchBatteryLogs = async () => {
      try {
        const res = await api.get('/api/dashboard/battery-logs');
        const logs = res.data?.logs;
        
        if (Array.isArray(logs)) {
          setBatteryLogs(logs);
        } else {
          setBatteryLogs([]); 
        }
      } catch (err) {
        const message = err.response?.data?.detail || "Failed to load dashboard data";
        setError(message);
        addToast(message, "error");
        setBatteryLogs([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchBatteryLogs();
  }, [addToast]); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">
      <div className="flex flex-1 overflow-hidden"> 
        <Sidebar />

        {/* RIGHT SIDE WRAPPER */}
        <div className="flex-1 flex flex-col min-w-0"> 
          
          {/* HEADER / TOP NAVIGATION */}
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <div className="flex items-center gap-4 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
              <Search className="text-gray-400 w-5 h-5 cursor-pointer" />
              <input type="text" placeholder="Search logs..." className="bg-transparent border-none focus:outline-none text-sm" />
            </div>
            <div className="flex items-center gap-6">
              <Bell className="text-gray-400 cursor-pointer hover:text-cyan-400 transition" />
              <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                <p className="text-sm hidden md:block">{user?.name || "User"}</p>
                
                <Link 
                  to="/profile" 
                  className="text-gray-400 cursor-pointer bg-white/10 p-1.5 rounded-full w-8 h-8 flex items-center justify-center hover:text-cyan-400 transition"
                >
                  <User size={18} />
                </Link>

              </div>
            </div>
          </div>

          {/* MAIN SCROLLABLE CONTENT */}
          <div className="flex-1 p-6 lg:p-10 overflow-auto">

            {/* TOP WELCOME */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold">
                Hello, {user?.name || user?.email?.split('@')[0] || "User"}!
                <span className="text-cyan-400"> 👋</span>
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Here's your EV battery health overview.
              </p>

              {user?.role && (
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                  ${user.role === 'admin'    ? 'bg-red-500/20    text-red-400'    :
                    user.role === 'engineer' ? 'bg-blue-500/20   text-blue-400'   :
                    user.role === 'analyst'  ? 'bg-purple-500/20 text-purple-400' :
                                               'bg-cyan-500/20   text-cyan-400'}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;