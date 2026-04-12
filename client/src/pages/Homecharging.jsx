import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, ShieldCheck, Banknote, LayoutGrid } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

const Home_Charging_Benefits = [
    {
        id: 1,
        title: "Easy and Convenient",
        image: "/src/assets/ev8.png",
        description: "Just like your phones and computers, you can charge your EVs at home with an AC Fast Charger. These smart chargers are easy to operate through mobile apps.",
        icon: <Zap className="text-cyan-400" size={20} />,
        glowColor: "group-hover:shadow-cyan-500/20"
    },
    {
        id: 2,
        title: "Cost Efficient",
        image: "/src/assets/ev9.png",
        description: "With global energy prices fluctuating, switching to electric mobility is a smart financial move. Reduce your daily commute costs by up to 70%.",
        icon: <Banknote className="text-lime-400" size={20} />,
        glowColor: "group-hover:shadow-lime-500/20"
    },
    {
        id: 3,
        title: "Safe and Secure",
        image: "/src/assets/ev10.png",
        description: "Charge in a familiar, secure environment with built-in surge protection and battery health monitoring tailored for your home infrastructure.",
        icon: <ShieldCheck className="text-blue-400" size={20} />,
        glowColor: "group-hover:shadow-blue-500/20"
    }
];

function Homecharging() {
    const [savedGuides, setSavedGuides] = useState([]);

    const toggleSave = (id) => {
        setSavedGuides(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/evhome.png"
                        alt="EV Home Charging"
                        className="w-full h-full object-cover opacity-70 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-transparent to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mt-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 animate-pulse">
                        <Zap size={14} />
                        Next-Gen Home Infrastructure
                    </div>
                    
                     <div className="relative z-10 text-center px-6 max-w-4xl mt-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                        POWER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">JOURNEY</span> FROM HOME
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                        Turn your garage into a personal refueling station. Smart, efficient, and always ready for the road.
                    </p>
                </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-32 relative">
                {/* Visual accents */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                                Charge while <br /> 
                                <span className="text-cyan-400">you recharge</span>
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Experience the freedom of a full tank every morning. Our home solutions 
                                are designed to integrate seamlessly with your lifestyle.
                            </p>
                        </div>
                        <div className="hidden md:block text-right">
                            <LayoutGrid className="text-white/20 ml-auto mb-2" size={40} />
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-500 font-bold">Smart Ecosystem</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Home_Charging_Benefits.map((benefit) => (
                            <div
                                key={benefit.id}
                                className={`group relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-2 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.05] ${benefit.glowColor} hover:shadow-2xl`}
                            >
                                {/* Card Header Image */}
                                <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={benefit.image}
                                        alt={benefit.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    
                                </div>

                                {/* Content */}
                                <div className="px-6 pb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight">{benefit.title}</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed text-[15px]">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Calculator Component Wrapper */}
            <div className="relative py-20 bg-gradient-to-b from-transparent to-black/40">
                <EVCalculator />
            </div>

            <Footer />

            <style>{`
                @keyframes slow-zoom {
                    0% { transform: scale(1.05); }
                    100% { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 25s infinite alternate ease-in-out;
                }
            `}</style>
        </div>
    );
}

export default Homecharging;