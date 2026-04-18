import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Kept for future mobile menu
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isChargingOpen, setIsChargingOpen] = useState(false); 
  const [isBatteryOpen, setIsBatteryOpen] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 py-4 h-20 text-white flex justify-between items-center shadow-md transition duration-300 ${
        isScrolled ? 'bg-[#0f172a]/80 backdrop-blur-md border-b border-white/10' : ' bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full px-4 text-white">

        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide">
          <Link to="/">
            <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
                VoltIQ
            </span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10 text-gray-300 font-medium">
          <Link to="/" className="hover:text-cyan-400 transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]">
            Home
          </Link>
          
          {/* Battery Dropdown (Fixed State) */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsBatteryOpen(true)}
            onMouseLeave={() => setIsBatteryOpen(false)}
          >
            <Link to="/battery"
              className="flex items-center gap-1 hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] focus:outline-none"
            >
              Battery  <span className={`transition-transform duration-200 ${isBatteryOpen ? 'rotate-180' : ''}`}>▾</span>
            </Link>

            {isBatteryOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                <Link 
                  to="/battery/batttery-types" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  Types of EV Battery
                </Link>
                <Link 
                  to="/battery/battery-life" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  Battery Life
                </Link>
                <Link 
                  to="/battery-safety" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  Battery Safety
                </Link>
                <Link 
                  to="/battery/repurposing" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  Repair & Maintenance
                </Link>
              </div>
            )}
          </div>

          <Link to="/landingpage"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            Landing Page
          </Link>

          {/* About Link (Fixed to use Link component) */}
          <Link
            to="/about"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            About
          </Link>

          {/* Charging Dropdown */}
          <div 
            className="relative group"
            onMouseEnter={() => setIsChargingOpen(true)}
            onMouseLeave={() => setIsChargingOpen(false)}
          >
            <Link to="/charging"
              className="flex items-center gap-1 hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] focus:outline-none"
            >
              Charging <span className={`transition-transform duration-200 ${isChargingOpen ? 'rotate-180' : ''}`}>▾</span>
            </Link>

            {isChargingOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                <Link 
                  to="/charging/stations" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  Find Stations
                </Link>
                <Link 
                  to="/homecharging" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  HOME CHARGING
                </Link>
                <Link 
                  to="/publiccharging" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  PUBLIC CHARGING
                </Link>
                <Link 
                  to="/charging/compare" 
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                >
                  TRIP PLANNER
                </Link>
              </div>
            )}
          </div>

          <Link to="/learning"
            className="hover:text-white transition duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
          >
            Learning Hub ▾
          </Link>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-4 mr-4">
          
          {!isLoggedIn ? (
            <>
              {/* Sign Up Button */}
              <Link to="/register"
                className="relative px-6 py-2 rounded-lg font-semibold text-white
                bg-gradient-to-r from-cyan-500 to-lime-400
                hover:from-cyan-400 hover:to-lime-300
                transition-all duration-300
                shadow-[0_0_20px_rgba(0,255,255,0.6)]
                hover:shadow-[0_0_30px_rgba(0,255,255,0.9)]
                border border-white/20"
              >
                Sign Up
              </Link>
              {/* Login Button */}
              <Link to="/login" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition">
                Login
              </Link>
            </>
          ) : (
            /* User Profile Dropdown */
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border-2 border-cyan-400 p-0.5 overflow-hidden hover:shadow-[0_0_15px_rgba(0,255,255,0.5)] transition-all">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                    alt="User" 
                    className="w-full h-full rounded-full bg-gray-800"
                  />
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-[#0f172a] border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/settings" 
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-white/5" />
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;