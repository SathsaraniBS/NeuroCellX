import React, { useState, useEffect } from 'react';
import { Zap, Battery, Gauge, ChevronRight, ShieldCheck, Globe, Leaf, Wind, Navigation, Info } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function PublicCharging() {



  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      <Navbar />
      <section className="min-h-screen relative bg-[url('/src/assets/evstation.png')] animate-slow-zoom bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">


          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
              Charge up anytime, anywhere.
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore the world of Public EV charging and the vast network of charging points near you.
            </p>

            <p>From bustling cities to remote highways, we've got the lowdown on where and how to charge your electric vehicle on the go. Charge up and hit the road with confidence!</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              The current 
              <span className="text-cyan-400">Landscape</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              The global public EV charging network is expanding rapidly, with strong adoption across major cities and growing availability in emerging markets and along key transportation corridors. Currently, there are hundreds of thousands of charging stations worldwide, and this number is expected to grow significantly in the coming years as electric vehicle adoption accelerates.
            </p>
            <p className="text-gray-400 text-lg mb-8">
              To support the transition to electric mobility and maintain an optimal ratio of approximately 1 charger for every 40 electric vehicles, millions of new charging stations will need to be installed annually. By 2030, the global charging infrastructure is projected to reach several million units, ensuring convenient, reliable, and widespread access for EV users everywhere.
            </p>
          </div>
          <div className="relative group">
            {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
            <img
              src="src/assets/ev11.png"
              alt="EV Battery"
              className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
            />
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
          </div>
        </div>
      </section>


      <Footer />

      {/* Added some custom keyframes for the zoom effect */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </div>
  );
}

export default PublicCharging;