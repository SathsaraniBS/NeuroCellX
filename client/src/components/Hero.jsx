import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Zap, 
  Battery, 
  Wind, 
  Gauge, 
  ChevronRight, 
  Info, 
  ShieldCheck, 
  Leaf, 
  Globe 
} from "lucide-react";

const DUMMY_VEHICLES = [
  {
    _id: "ev1",
    title: "Model Zenith S",
    image: "src/assets/img2.jpeg", // Updated fallback image
    range: "420 miles",
    topSpeed: "155 mph",
    acceleration: "3.1s",
    tagline: "The Future of Sustainable Performance",
    description: "Experience the pinnacle of electric engineering. The Zenith S combines industry-leading range with breathtaking acceleration, all wrapped in a zero-emission package."
  },
  {
    _id: "ev2",
    title: "EcoRunner SUV",
    image: "src/assets/ev3.png", // Updated fallback image
    range: "310 miles",
    topSpeed: "130 mph",
    acceleration: "5.4s",
    tagline: "Adventure without Compromise",
    description: "Built for the rugged outdoors, the EcoRunner SUV features dual-motor all-wheel drive and a reinforced battery chassis designed for any terrain."
  },
  {
    _id: "ev3",
    title: "Volt City Compact",
    image: "src/assets/evstation.png", // Updated fallback image
    range: "250 miles",
    topSpeed: "95 mph",
    acceleration: "7.2s",
    tagline: "Master the Modern Urban Jungle",
    description: "Agile, smart, and fully connected. The Volt City is the perfect companion for urban commuters looking to slash their carbon footprint."
  }
];

const Hero = () => {
  // eslint-disable-next-line no-unused-vars
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
    <>
      {/* Hero Section */}
      {activeEV && (
        <div className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
            <img
              key={activeEV._id}
              src={activeEV?.image}
              alt={activeEV?.title}
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-3xl space-y-6 pt-20">
              <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-widest uppercase text-sm animate-fade-in">
                <Zap size={18} className="fill-cyan-400" />
                <span>Next-Gen Mobility</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black text-white leading-tight tracking-tight">
                {activeEV?.title}
              </h1>
              
              <p className="text-xl text-cyan-100/80 font-medium italic">
                "{activeEV?.tagline}"
              </p>

              {/* Specs Bar */}
              <div className="flex flex-wrap items-center gap-8 text-white py-4">
                <div className="flex flex-col border-l-2 border-cyan-500 pl-4">
                  <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">Range</span>
                  <span className="text-2xl font-mono font-bold flex items-center gap-2">
                    <Battery className="text-green-400" /> {activeEV?.range}
                  </span>
                </div>
                <div className="flex flex-col border-l-2 border-cyan-500 pl-4">
                  <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">0-60 MPH</span>
                  <span className="text-2xl font-mono font-bold flex items-center gap-2">
                    <Wind className="text-blue-400" /> {activeEV?.acceleration}
                  </span>
                </div>
                <div className="flex flex-col border-l-2 border-cyan-500 pl-4">
                  <span className="text-xs uppercase text-gray-400 font-bold tracking-widest">Top Speed</span>
                  <span className="text-2xl font-mono font-bold flex items-center gap-2">
                    <Gauge className="text-purple-400" /> {activeEV?.topSpeed}
                  </span>
                </div>
              </div>

              <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                {activeEV?.description}
              </p>

              <div className="flex gap-4 pt-6">
                <Link
                  to={`/inventory/${activeEV?._id}`}
                  className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  Configure Now
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <button
                  className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-lg font-bold flex items-center gap-2 transition-all backdrop-blur-md"
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
                className={`h-1 transition-all duration-500 ${
                  idx === currentHeroIndex ? 'bg-cyan-400 w-16' : 'bg-white/30 w-8 hover:bg-white/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Feature Grid Section */}
      <div className="bg-[#050816] py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="text-cyan-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Safe & Secure</h3>
              <p className="text-gray-400">5-Star safety ratings across our entire fleet with advanced autopilot features.</p>
            </div>
            <div className="space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Leaf className="text-green-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">100% Sustainable</h3>
              <p className="text-gray-400">Responsibly sourced battery materials and carbon-neutral manufacturing processes.</p>
            </div>
            <div className="space-y-4 p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Globe className="text-blue-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Global Charging</h3>
              <p className="text-gray-400">Access to over 50,000+ Superchargers worldwide for seamless long-distance travel.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;