import React from 'react';
import { Bell, User, Search, ChartLine, History, Settings, LayoutDashboard, FileText } from "lucide-react";
import { useLocation } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

function About() {

  const { pathname } = useLocation();

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">

        <Navbar />

        <div className="flex-1 p-6 lg:p-10 overflow-auto">

          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-semibold">About Us</h2>
              <p className="text-gray-400 text-sm">
                Learn more about our company and our mission.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Bell className="w-6 h-6 mr-2 text-white" />
                <h3 className="font-semibold text-lg">Our Mission</h3>
              </div>
              <p className="text-gray-400">
                Our mission is to provide a platform for EV owners to monitor their battery health and make informed decisions about their vehicle's performance and longevity.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <User className="w-6 h-6 mr-2 text-white" />
                <h3 className="font-semibold text-lg">Our Team</h3>
              </div>
              <p className="text-gray-400">
                Our team is made up of experienced professionals who are passionate about EV technology and battery health monitoring.
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center mb-4">
                <Search className="w-6 h-6 mr-2 text-white" />
                <h3 className="font-semibold text-lg">Contact Us</h3>
              </div>
              <p className="text-gray-400">
                If you have any questions or feedback, please don't hesitate to contact us.
              </p>
            </div>
          </div>

        </div>

        <Footer />

    </div>
  );
}

export default About;
            