import React from 'react';
import { Bell, User, Search, ChartLine, History, Settings, LayoutDashboard, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";
import Footer from '../components/Footer';
import Sidebar from '../components/User/UserSidebar';

function Predictions() {

  const { pathname } = useLocation();

  const links = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/dashboard/predictions', icon: ChartLine, label: 'Predictions' },
    { path: '/dashboard/history', icon: History, label: 'History' },
    { path: '/dashboard/reports', icon: FileText, label: 'Reports' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">

      <div className="flex flex-1">
        <Sidebar links={links} />

        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold">Reports</h2>
              <p className="text-gray-400 text-sm">
                View and manage your reports.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <Search className="text-gray-400 cursor-pointer" />
              <Bell className="text-gray-400 cursor-pointer" />
              <User className="text-gray-400 cursor-pointer" />
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </div>
  );
}

export default Predictions;