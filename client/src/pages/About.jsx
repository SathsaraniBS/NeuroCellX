import React, { useState } from 'react';
import { 
    Zap, ShieldCheck, ThermometerSnowflake, 
    BatteryCharging, BatteryMedium, BatteryWarning 
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const leftColumnTips = [
    { id: 1, title: "Replace Damaged Components", description: "Certified professionals will advise replacing failing cells to prevent degradation.", icon: <ShieldCheck className="text-cyan-400" size={20} /> },
    { id: 2, title: "Ensure Regular Checks", description: "Scheduled health assessments ensure your SOH remains within optimal parameters.", icon: <Zap className="text-cyan-400" size={20} /> },
    { id: 3, title: "Thermal Management", description: "Modern cooling systems actively manage pack temperatures to prevent extreme heat/cold degradation.", icon: <ThermometerSnowflake className="text-cyan-400" size={20} /> }
];

const rightColumnTips = [
    { id: 4, title: "Equalization Charging", description: "The BMS balances the charge across all individual cells to maximize usable capacity.", icon: <BatteryCharging className="text-cyan-400" size={20} /> },
    { id: 5, title: "Optimal Charge Range", description: "Maintaining a 20% to 80% charge level significantly reduces cyclic stress.", icon: <BatteryMedium className="text-cyan-400" size={20} /> },
    { id: 6, title: "Minimize Fast Charging", description: "DC fast charging generates high internal heat. Frequent use can accelerate resistance.", icon: <BatteryWarning className="text-cyan-400" size={20} /> }
];

const TipCard = ({ tip }) => (
    <div className="group relative bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all duration-500 flex gap-5 mb-6 overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
                <span className="font-mono font-bold text-cyan-400 text-lg">{tip.id}</span>
            </div>
        </div>
        
        <div className="relative">
            <div className="flex items-center gap-2 mb-2">
                {tip.icon}
                <h3 className="text-xl font-bold text-white tracking-tight">{tip.title}</h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">{tip.description}</p>
        </div>
    </div>
);

function RepairandMaintenance() {
    const [activeEV] = useState({ 
        title: "Advanced EV Care", 
        tagline: "Precision maintenance for the electric era." 
    });

    return (
        <div className="min-h-screen bg-[#02040a] text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
            {/* FIXED: Increased height to min-h-[80vh] or full screen so the image isn't aggressively cropped */}
            <section className="relative min-h-[80vh] lg:min-h-screen w-full overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img 
                        src="/src/assets/evrepair-img.png" 
                        alt="Hero" 
                        /* FIXED: Removed opacity-90 to make image clear, added object-center */
                        className="w-full h-full object-cover object-center"
                    />
                    {/* FIXED: Changed overlay to a left-to-right gradient. Dark on the left for text, clear on the right for the image */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#02040a] via-[#02040a]/60 to-transparent" />
                    {/* Added a subtle bottom gradient just so it blends smoothly into the next dark section */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-3xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 font-mono text-xs tracking-widest uppercase">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            System Health Protocols
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter">
                            {activeEV.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-cyan-100/60 font-light max-w-xl">
                            {activeEV.tagline}
                        </p>
                    </div>
                </div>
            </section>

            {/* WHY MAINTENANCE MATTERS */}
            {/* FIXED: Added missing closing bracket ] and background sizing classes to the bg-[url(...)] property */}
            <section className="relative py-24 w-full overflow-hidden flex items-center bg-[url('/src/assets/evrepair-img2.png')] bg-cover bg-center">
                {/* Added a dark overlay to this section so the text remains readable over the background image */}
                <div className="absolute inset-0 bg-[#02040a]/80" />
                
                <div className="max-w-7xl mx-auto relative z-10 px-6 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Header */}
                        <div className="lg:col-span-1 flex flex-col justify-center pr-8">
                            <h2 className="text-4xl font-black text-white leading-tight uppercase mb-6">
                                Why <span className="text-cyan-500">Longevity</span> Matters
                            </h2>
                            <p className="text-slate-400 border-l-2 border-cyan-900 pl-6 py-2">
                                Proactive management of the high-voltage system ensures peak efficiency and protects your vehicle's residual value.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { title: "Maximize Lifespan", desc: "Reduce chemical degradation through intelligent cycle management.", icon: <Zap className="text-cyan-400" /> },
                                { title: "Enhance Range", desc: "Proper cell balancing ensures every kWh is usable.", icon: <BatteryCharging className="text-blue-400" /> },
                                { title: "Warranty Safety", desc: "Maintain digital logs required for manufacturer battery guarantees.", icon: <ShieldCheck className="text-emerald-400" /> }
                            ].map((item, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 transition-colors">
                                    <div className="mb-4">{item.icon}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TIPS SECTION */}
            <section className="py-24 px-6 relative">
                {/* Background Decoration */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            BMS OPTIMIZATION <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 italic">TIPS</span>
                        </h2>
                        <div className="h-1 w-24 bg-cyan-500 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                        <div className="flex flex-col">
                            {leftColumnTips.map(tip => <TipCard key={tip.id} tip={tip} />)}
                        </div>
                        <div className="flex flex-col">
                            {rightColumnTips.map(tip => <TipCard key={tip.id} tip={tip} />)}
                        </div>
                    </div>
                </div>
            </section>

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

export default RepairandMaintenance;