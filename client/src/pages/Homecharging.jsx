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
    Info,
    Home,
    Smartphone,
    CreditCard
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FALLBACK_CHARGING_DATA = [
    {
        id: 1,
        level_name: "Level 1",
        voltage: "120V",
        image: "/src/assets/level1.png", 
        description: "Standard home outlet. Best for overnight charging at home.",
        color: "from-blue-400 to-cyan-500"
    },
    {
        id: 2,
        level_name: "Level 2",
        voltage: "240V",
        image: "/src/assets/level2.png", 
        description: "Fast home and public charging. Ideal for daily drivers.",
        color: "from-cyan-400 to-teal-500"
    },
    {
        id: 3,
        level_name: "DC Fast",
        voltage: "480V+",
        image: "/src/assets/level3.png", 
        description: "Rapid commercial charging for long-distance travel.",
        color: "from-teal-400 to-lime-500"
    }
];

function Homecharging() {
    const [chargingLevels, setChargingLevels] = useState(FALLBACK_CHARGING_DATA);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans overflow-x-hidden">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/src/assets/evhome.png" 
                        alt="EV Charging at Home" 
                        className="w-full h-full object-cover opacity-100 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/60 via-transparent to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        POWER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">JOURNEY</span> FROM HOME
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                        Turn your garage into a personal refueling station. Smart, efficient, and always ready for the road.
                    </p>
                </div>
            </section>

            

           

            <Footer />

            {/* Custom Styles */}
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