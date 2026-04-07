import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  Gauge, 
  ChevronRight, 
  Wind, 
  Info, 
  PlugZap, 
  BatteryCharging, 
  Timer 
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// EV Specific Sample Data
const DUMMY_VEHICLES = [
  {
    _id: "ev1",
    title: "Model Zenith S",
    poster: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
    range: "420 miles",
    topSpeed: "155 mph",
    acceleration: "3.1s",
    tagline: "The Future of Sustainable Performance",
    description: "Experience the pinnacle of electric engineering. The Zenith S combines industry-leading range with breathtaking acceleration, all wrapped in a zero-emission package."
  },
  {
    _id: "ev2",
    title: "EcoRunner SUV",
    poster: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
    range: "310 miles",
    topSpeed: "130 mph",
    acceleration: "5.4s",
    tagline: "Adventure without Compromise",
    description: "Built for the rugged outdoors, the EcoRunner SUV features dual-motor all-wheel drive and a reinforced battery chassis designed for any terrain."
  },
  {
    _id: "ev3",
    title: "Volt City Compact",
    poster: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop",
    range: "250 miles",
    topSpeed: "95 mph",
    acceleration: "7.2s",
    tagline: "Master the Modern Urban Jungle",
    description: "Agile, smart, and fully connected. The Volt City is the perfect companion for urban commuters looking to slash their carbon footprint."
  }
];

function Charging() {
  const { pathname } = useLocation();
  
  // State management for the Hero Carousel
  const [vehicles] = useState(DUMMY_VEHICLES);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const activeEV = vehicles[currentHeroIndex];

  // Auto-rotate hero section every 6 seconds
  useEffect(() => {
    if (vehicles.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % vehicles.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [vehicles.length]);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <Navbar />
      
      <div className="-mt-20 flex-grow">
        {/* Hero Section */}
        {activeEV && (
          <div className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
              <img
                key={activeEV._id}
                src={activeEV?.poster}
                alt={activeEV?.title}
                className="w-full h-full object-cover scale-105 animate-slow-zoom"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-3xl space-y-6 pt-20">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs animate-fade-in">
                  <Zap size={14} className="fill-cyan-400" />
                  <span>Next-Gen Mobility</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter drop-shadow-lg">
                  {activeEV?.title}
                </h1>
                
                <p className="text-xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
                  "{activeEV?.tagline}"
                </p>

                {/* Specs Bar - Glassmorphism */}
                <div className="flex flex-wrap items-center gap-6 py-4">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[140px]">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest block mb-1">Range</span>
                    <span className="text-2xl font-mono font-bold flex items-center gap-2 text-white">
                      <Battery className="text-green-400" size={24} /> {activeEV?.range}
                    </span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[140px]">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest block mb-1">0-60 MPH</span>
                    <span className="text-2xl font-mono font-bold flex items-center gap-2 text-white">
                      <Wind className="text-cyan-400" size={24} /> {activeEV?.acceleration}
                    </span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl min-w-[140px]">
                    <span className="text-xs uppercase text-gray-400 font-bold tracking-widest block mb-1">Top Speed</span>
                    <span className="text-2xl font-mono font-bold flex items-center gap-2 text-white">
                      <Gauge className="text-purple-400" size={24} /> {activeEV?.topSpeed}
                    </span>
                  </div>
                </div>

                <p className="text-lg text-gray-300 leading-relaxed max-w-xl bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  {activeEV?.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Link
                    to={`/inventory/${activeEV?._id}`}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-black uppercase tracking-wide flex items-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                  >
                    Configure Now
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                  <button
                    className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-bold flex items-center gap-2 transition-all backdrop-blur-md"
                  >
                    <Info className="w-5 h-5" />
                    Technical Specs
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Indicators */}
            <div className="absolute bottom-12 right-12 flex flex-col gap-4 z-20">
               {vehicles.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroIndex(idx)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    idx === currentHeroIndex ? 'bg-cyan-400 w-16 shadow-[0_0_10px_rgba(34,211,238,1)]' : 'bg-white/30 w-8 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* EV Charging Info Section */}
        <div className="bg-[#050816] py-24 relative z-10 border-t border-white/5">
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            {/* Header Area */}
            <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight">
                GETTING YOU <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">STARTED</span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                Get charged up with the fundamentals of EV charging! Our easy-to-understand guide will take you from zero to 'fully charged' in no time. Unravel the mysteries of voltage, current, and charging speeds.
              </p>
              <p className="text-gray-500 text-lg">
                Charging your EV is easier than you thought. Whether you're new to the scene or an experienced EV user, these charging essentials will help you keep your EV always rolling. Let's get charging!
              </p>
            </div>

            {/* Structured Grid Area */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Level 1 Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-cyan-500/30 transition-all group hover:bg-white/10 backdrop-blur-sm">
                <div className="w-14 h-14 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <PlugZap size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Level 1 (120V)</h3>
                <p className="text-gray-400 leading-relaxed">
                  The standard home outlet. Perfect for overnight top-ups and plug-in hybrids. Delivers roughly 3-5 miles of range per hour of charging.
                </p>
              </div>

              {/* Level 2 Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-green-500/30 transition-all group hover:bg-white/10 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-bl-xl border-b border-l border-green-500/30">
                  Most Popular
                </div>
                <div className="w-14 h-14 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BatteryCharging size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">Level 2 (240V)</h3>
                <p className="text-gray-400 leading-relaxed">
                  Installed at homes and public stations. Requires a dedicated circuit. Adds about 12-80 miles of range per hour. Ideal for daily drivers.
                </p>
              </div>

              {/* DC Fast Card */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-purple-500/30 transition-all group hover:bg-white/10 backdrop-blur-sm">
                <div className="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Timer size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3">DC Fast Charge</h3>
                <p className="text-gray-400 leading-relaxed">
                  Commercial charging stations for road trips. Bypasses the car's onboard charger to deliver direct current. Can charge 80% in 20-30 minutes.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />

      {/* Global Styles for Component */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Charging;