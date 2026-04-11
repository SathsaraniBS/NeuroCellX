import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, DollarSign, ShieldCheck } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

const Home_Charging_Benefits = [
    {
        id: 1,
        title: "Easy and convenient",
        image: "/src/assets/ev8.png", // Note: For best results, use .png or .jpg for web images instead of .ico
        description: "Just like your phones and computers, you can charge your EVs at home with an AC Fast Charger. These smart chargers are easy to operate through mobile apps.",
        color: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]" // Cyan glow
    },
    {
        id: 2,
        title: "Less expensive",
        image: "/src/assets/ev9.png",
        description: "With global energy prices fluctuating, switching to electric mobility has become the smartest financial move. Reduce your daily commute costs by up to 70%.",
        color: "group-hover:shadow-[0_0_30px_rgba(163,230,53,0.2)]" // Lime glow
    },
    {
        id: 3,
        title: "Safe and Secure",
        image: "/src/assets/ev10.png",
        description: "By charging your EV at home/offices, you can charge in a familiar, safe and secure environment with built-in surge protection and battery health monitoring.",
        color: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]" // Blue glow
    }
];

function Homecharging() {
    // State to handle bookmarking/saving specific charging benefits or guides
    const [savedGuides, setSavedGuides] = useState([]);

    const handleSaveGuide = (e, id) => {
        e.preventDefault(); // Stops the <Link> from redirecting when clicking the heart button
        if (savedGuides.includes(id)) {
            setSavedGuides(savedGuides.filter(itemId => itemId !== id));
        } else {
            setSavedGuides([...savedGuides, id]);
        }
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans overflow-x-hidden">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/evhome.png"
                        alt="EV Charging at Home"
                        className="w-full h-full object-cover opacity-60 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-transparent to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mt-20">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                        POWER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">JOURNEY</span> FROM HOME
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                        Turn your garage into a personal refueling station. Smart, efficient, and always ready for the road.
                    </p>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-24 relative overflow-hidden">
                {/* Background ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
                            Charge your EV while you recharge
                        </h2>
                        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                            Make your home your very own personal EV charging station. You’re just a plug away from a convenient and hassle-free charging experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 py-15 mb-16 bg-blue-900/5">
                        {Home_Charging_Benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:shadow-md transition"
                            >
                                <div className="flex items-center justify-between mb-4">
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="h-full w-full object-cover mb-4 rounded-lg"
                                />
                                </div>
                                <h3 className="text-2xl font-bold text-[#38a1c5] mb-4">{benefit.title}</h3>
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-4">{benefit.description}</p>
                                

                                
                                
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Ensure your EVCalculator component is styled to match the dark theme internally */}
            <EVCalculator />

            <Footer />

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