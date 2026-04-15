import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, ShieldCheck, Banknote, LayoutGrid } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

const Home_Charging_Benefits = [
    {
        id: 1,
        title: "Lithium-ion batteries",
        image: "/src/assets/anatomy.png",
        description: "Lithium-ion batteries are the backbone of modern electric vehicles, offering high energy density and long lifespan.",
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

function Battery() {
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
                        src="/src/assets/anatomy.png"
                        alt="EV Battery Anatomy"
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
                            EV Battery Anatomy
                        </h1>



                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-32 relative">
                {/* Visual accents */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />
                     <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                                Explore the heart of electric vehicles with a deep dive into EV batteries. From Lithium-ion to Solid-State, we'll unravel the science behind these energy powerhouses. Get ready to supercharge your knowledge and learn how different batteries drive the electric future!
                            </p>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                           
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                                How do they run?
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                                Imagine driving a car that runs on electricity instead of gas. A car that emits zero pollution and saves you money on fuel. A car that is quiet, smooth, and smart. That’s what electric vehicles (EVs) offer.
                            </p>

                            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                                But EVs are not all the same. They use different kinds of batteries to store and deliver electricity. Each battery has its own pros and cons, depending on how you use your car.
                            </p>

                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                                There’s more than one type? Yes.

                            </h1>
                        </div>

                    </div>

                </div>
            </section>

            <section className="py-32 relative">
            </section>


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

export default Battery;