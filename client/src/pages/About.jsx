import React from 'react';
import { 
  Zap, ShieldCheck, ThermometerSnowflake, 
  BatteryCharging, BatteryMedium, BatteryWarning 
} from "lucide-react";

const leftColumnTips = [
    {
        id: 1,
        title: "Replace Damaged Components",
        description: "Certified professionals will advise replacing failing cells to prevent degradation across the entire battery pack.",
        icon: <ShieldCheck className="text-cyan-400" size={20} />
    },
    {
        id: 2,
        title: "Ensure Regular Checks",
        description: "Scheduled health assessments ensure your SOH (State of Health) remains within optimal manufacturer parameters.",
        icon: <Zap className="text-cyan-400" size={20} />
    },
    {
        id: 3,
        title: "Thermal Management",
        description: "Modern cooling systems actively manage pack temperatures to prevent degradation from extreme heat or cold.",
        icon: <ThermometerSnowflake className="text-cyan-400" size={20} />
    },
    {
        id: 4,
        title: "Equalization Charging",
        description: "The BMS balances the charge across all individual cells to maximize the usable capacity of the pack.",
        icon: <BatteryCharging className="text-cyan-400" size={20} />
    }
];

const rightColumnTips = [
    {
        id: 5,
        title: "Optimal Charge Range",
        description: "Maintaining a 20% to 80% charge level significantly reduces cyclic stress on lithium-ion chemistry.",
        icon: <BatteryMedium className="text-cyan-400" size={20} />
    },
    {
        id: 6,
        title: "Minimize Fast Charging",
        description: "DC fast charging generates high internal heat. Frequent use can accelerate internal resistance growth.",
        icon: <BatteryWarning className="text-cyan-400" size={20} />
    }
];

const TipCard = ({ tip }) => (
    <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/10 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-500 flex gap-5 mb-6 group">
        <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform">
                <span className="font-bold text-white text-lg">{tip.id}</span>
            </div>
        </div>
        <div>
            <div className="flex items-center gap-2 mb-2">
                {tip.icon}
                <h3 className="text-xl font-bold text-white">{tip.title}</h3>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">{tip.description}</p>
        </div>
    </div>
);

const BatteryMaintenanceTips = () => {
    return (
        <section className="bg-[#050816] py-20 px-4 md:px-8 font-sans min-h-screen">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs">
                        <Zap size={14} className="fill-cyan-400" />
                        <span>VoltIQ Technical Guide</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Battery <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Maintenance</span> Tips
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column */}
                    <div className="flex flex-col">
                        {leftColumnTips.map(tip => (
                            <TipCard key={tip.id} tip={tip} />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col">
                        {/* Featured Image - Now Clear and Full */}
                        <div className="relative overflow-hidden rounded-3xl mb-8 h-72 md:h-[400px] border border-white/10 shadow-2xl">
                            <img 
                                src="/src/assets/maintenance-img2.png" 
                                alt="EV Maintenance" 
                                className="w-full h-full object-cover opacity-100" 
                            />
                        </div>
                        
                        {/* Remaining Tips - Properly nested inside the right column div */}
                        {rightColumnTips.map(tip => (
                            <TipCard key={tip.id} tip={tip} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BatteryMaintenanceTips;