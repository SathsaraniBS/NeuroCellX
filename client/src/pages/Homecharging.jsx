import React, { useState, useEffect } from 'react';
import {
    Zap,
    Battery,
    Gauge,
    ChevronRight,
    ShieldCheck,
    Globe,
    Leaf,
    Wind,
    Navigation,
    Info
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


function Homecharging() {

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
            <Navbar />
            <section className="min-h-screen relative bg-[url('/src/assets/evhome.png')] bg-black/10 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
                <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
                    <div className="title mb-6 font-bold">


                    </div>
                </div>
            </section>

            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
                            Charge your EV while you recharge

                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                            Make your home your very own personal EV charging station by transforming your garage or driveway into a power source for your electric vehicle. With easy options available to charge at home, you’re just a plug away from a convenient and hassle-free charging experience.


                        </p>

                         <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
                            From the comfort of your home

                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Cards Grid */}
                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                            {loading ? (
                                <div className="col-span-3 text-center py-20"><div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto" /></div>
                            ) : (
                                chargingData.map((level) => (
                                    <div key={level.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all group">
                                        <img src={level.image} alt={level.level_name} className="w-25 h-25mb-6 object-contain" />
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{level.level_name}</h3>
                                        <h4 className="text-3xl font-black text-white/90 mb-4">{level.voltage}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{level.description}</p>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Text Area */}
                        <div className="lg:w-1/3">
                            <div className="bg-cyan-500/10 border border-cyan-500/20 p-8 rounded-3xl relative">
                                <h3 className="text-2xl font-black mb-4 uppercase text-white">What are charging levels?</h3>
                                <p className="text-gray-400 text-base leading-relaxed mb-6">
                                    Charging speed is determined by the "Level" of the charger. From standard wall outlets to high-speed DC stations, we help you pick the right power for your journey.
                                </p>
                                <div className="h-1.5 w-16 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-full" />
                            </div>
                        </div>
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

export default Homecharging;