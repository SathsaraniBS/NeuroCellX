import React from 'react';
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

const Home_Charging_Benefits = [
    {
        id: 1,
        Icon: Zap, // Capitalized for easier component rendering
        title: "Easy and convenient",
        description: "Just like your phones and computers, you can charge your EVs at home with an AC Fast Charger. These smart chargers are easy to operate through mobile apps and you can remotely start or stop your charging sessions.",
        color: "from-blue-400 to-cyan-500"
    },
    {
        id: 2,
        Icon: Battery,
        title: "Less expensive",
        description: "With global energy prices fluctuating, switching to electric mobility has become the smartest financial move. By charging at home, you can reduce your daily commute costs by up to 70% compared to traditional internal combustion engines. Most modern EVs support universal smart-charging integration, allowing you to power up using standard home outlets or dedicated high-speed AC units while optimizing for the lowest off-peak electricity tariffs.",
        color: "from-cyan-400 to-teal-500"
    },
    {
        id: 3,
        Icon: Gauge,
        title: "Safe and Secure",
        description: "By charging your EV at home/offices, you can charge in a familiar, safe and secure environment.",
        color: "from-teal-400 to-lime-500"
    }
];

function Homecharging() {
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
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase mt-8">
                            From the comfort of your home
                        </h2>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                        {/* Cards Grid */}
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                            {Home_Charging_Benefits.map((level) => {
                                const IconComponent = level.Icon; // Extract the icon component

                                return (
                                    <div key={level.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all group">
                                        {/* Render the Lucide icon properly */}
                                        <IconComponent className="w-16 h-16 mb-6 text-white group-hover:text-cyan-400 transition-colors" />
                                        
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                                            {level.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {level.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
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