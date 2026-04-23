import React, { useState, useEffect } from 'react';
import { 
    ChevronDown, 
    BatteryCharging, 
    Wrench, 
    CloudDownload, 
    ThermometerSnowflake, 
    ShieldCheck, 
    AlertTriangle, 
    FileText, 
    Download, 
    CalendarCheck, 
    Zap 
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data extracted from your provided image layout
const MAINTENANCE_TOPICS = [
    {
        id: "01",
        title: "Battery care & charging habits",
        icon: <BatteryCharging className="text-cyan-400" size={24} />,
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Keep daily charge between 20% – 80% for optimal battery health.</li>
                <li>Avoid deep-discharge (0%) and frequent 100% DC fast charging.</li>
                <li>Don't park at 0% or 100% for long periods.</li>
                <li>Use preconditioning (heating/cooling) while plugged in for better range and efficiency.</li>
            </ul>
        )
    },
    {
        id: "02",
        title: "Routine maintenance checklist",
        icon: <Wrench className="text-slate-400" size={24} />,
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Tyre pressure & tread</span> <span className="text-cyan-400">Every 10,000 km</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Brake pads & rotors</span> <span className="text-cyan-400">Every 15,000 km</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Air & cabin filters</span> <span className="text-cyan-400">Every 15,000 km / 12 mo</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Lights, horn, seat belts</span> <span className="text-cyan-400">Every 15,000 km / 12 mo</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Coolant & brake fluid</span> <span className="text-cyan-400">Every 15,000 km / 12 mo</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>High-voltage inspection</span> <span className="text-cyan-400">Yearly</span></div>
            </div>
        )
    },
    {
        id: "03",
        title: "Software updates & features",
        icon: <CloudDownload className="text-emerald-400" size={24} />,
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>OTA (Over-the-Air) updates bring bug fixes, performance improvements, and safety enhancements.</li>
                <li>Check for updates on your car's screen or in the companion app.</li>
                <li>Always keep your software up to date for the best experience.</li>
            </ul>
        )
    },
    {
        id: "04",
        title: "Winter / weather-related range tips",
        icon: <ThermometerSnowflake className="text-blue-400" size={24} />,
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Cold weather can drastically reduce range. Precondition the cabin while charging.</li>
                <li>Avoid aggressive acceleration in extreme cold conditions.</li>
                <li>In hot weather, park in the shade and pre-cool the cabin when possible.</li>
            </ul>
        )
    },
    {
        id: "05",
        title: "Service schedule & warranty info",
        icon: <ShieldCheck className="text-lime-400" size={24} />,
        content: (
            <div className="space-y-4 text-slate-300">
                <p>Most EVs come with comprehensive warranty coverage:</p>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Battery & Drive-unit:</strong> 8 years / 160,000 km</li>
                        <li><strong>Vehicle warranty:</strong> 3 years / 100,000 km</li>
                        <li><strong>Not covered:</strong> Accidents, misuse, unauthorized modifications.</li>
                    </ul>
                </div>
            </div>
        )
    },
    {
        id: "06",
        title: "Roadside assistance & emergencies",
        icon: <AlertTriangle className="text-yellow-400" size={24} />,
        content: (
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex-1 space-y-2 text-slate-300">
                    <p>• Call our 24/7 roadside assistance or request help in the app.</p>
                    <p>• In case of low battery, use nearest charger or request tow.</p>
                    <p>• High-voltage components are dangerous. Leave repairs to authorized technicians.</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-center min-w-[200px]">
                    <p className="text-xs text-cyan-400 uppercase tracking-widest mb-1">VoltIQ Assistance</p>
                    <p className="text-xl font-bold text-white">1800-123-4567</p>
                    <p className="text-xs text-slate-400 mt-1">Available 24/7</p>
                </div>
            </div>
        )
    },
    {
        id: "07",
        title: "Insurance & ownership costs",
        icon: <FileText className="text-purple-400" size={24} />,
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Insure your EV with a comprehensive policy that covers battery and high-voltage components.</li>
                <li>Protect against theft of mobile charger and charging cable.</li>
                <li>Enjoy lower running costs compared to ICE vehicles (electricity vs fuel, fewer parts).</li>
            </ul>
        )
    }
];

const FAQS = [
    { id: 1, question: "How long does an EV battery last?", answer: "Most modern EV batteries are designed to last 10-20 years. Warranties typically cover 8 years or 100,000 miles, guaranteeing at least 70% retention of original capacity." },
    { id: 2, question: "How often should I service my EV?", answer: "EVs require less frequent servicing than gas cars. A general inspection is recommended every 15,000 km or 12 months, focusing on tires, brakes, and cabin filters." },
    { id: 3, question: "Can I charge my EV in the rain?", answer: "Yes. EV chargers and vehicle charge ports are highly weather-proofed and designed to be completely safe to use in rain or snow." },
    { id: 4, question: "Are EVs more expensive to insure?", answer: "Historically, yes, due to the high cost of specialized parts and battery packs. However, as EVs become more mainstream, premium gaps are rapidly closing." },
    { id: 5, question: "Will fast charging damage my battery?", answer: "Occasional fast charging is perfectly fine. However, relying exclusively on DC fast charging daily can accelerate battery degradation over years." }
];

function EVCare() {
    const [openTopicId, setOpenTopicId] = useState(null);
    const [openFaqId, setOpenFaqId] = useState(null);

    // Optional: FastAPI integration for user-specific maintenance schedules
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await fetch('http://localhost:8000/api/maintenance/schedule');
                // const data = await response.json();
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };
        fetchUserData();
    }, []);

    const toggleTopic = (id) => setOpenTopicId(openTopicId === id ? null : id);
    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/src/assets/ev12.png" // Replace with your maintenance hero image
                        alt="EV Maintenance Hero"
                        className="w-full h-full object-cover opacity-30 animate-slow-zoom"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1664360645604-03d3bc01b1df?q=80&w=2070&auto=format&fit=crop"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-[#050816]/80 to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 text-lime-400 text-sm font-bold mb-6 uppercase tracking-wider">
                        <Wrench size={14} />
                        Ownership Guide
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-tight">
                        EV CARE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">MAINTENANCE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                        Learn how to keep your electric car healthy, save money, and extend its operational life through intelligent care.
                    </p>
                </div>
            </section>

            {/* --- WHY IT MATTERS (INTRO) --- */}
            <section className="py-20 relative">
                <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none -z-10" />
                
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-10 items-center justify-between">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
                                Why EV Maintenance <span className="text-cyan-400">Matters</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed text-lg mb-4">
                                Electric vehicles have significantly fewer moving parts than traditional combustion cars, meaning no oil changes or spark plug replacements. However, key areas like the battery thermal systems, tyres, brakes, and software still require attention.
                            </p>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Good care ensures better performance, longer battery life, safety on the road, and lower overall ownership costs.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500/20 to-transparent p-6 rounded-2xl border border-emerald-500/30 text-center max-w-sm">
                            <ShieldCheck className="text-emerald-400 mx-auto mb-3" size={40} />
                            <p className="text-emerald-100 font-medium text-lg">A little care today drives a better tomorrow.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- INTERACTIVE MAINTENANCE TOPICS --- */}
            <section className="py-12 relative max-w-5xl mx-auto px-6">
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-lime-600/10 blur-[120px] pointer-events-none -z-10" />

                <div className="space-y-4">
                    {MAINTENANCE_TOPICS.map((topic) => (
                        <div
                            key={topic.id}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                openTopicId === topic.id 
                                    ? 'bg-gradient-to-r from-cyan-950/40 to-[#050816] border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                                    : 'bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/[0.07]'
                            }`}
                        >
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="hidden md:flex w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center font-mono text-slate-400 font-bold">
                                        {topic.id}
                                    </div>
                                    <div className="p-3 bg-[#0a0f25] rounded-xl border border-white/5 shadow-inner">
                                        {topic.icon}
                                    </div>
                                    <span className={`font-bold text-lg md:text-xl transition-colors tracking-wide ${openTopicId === topic.id ? 'text-cyan-400' : 'text-white'}`}>
                                        {topic.title}
                                    </span>
                                </div>
                                
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openTopicId === topic.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white'}`}>
                                    <ChevronDown
                                        className={`transform transition-transform duration-500 ${openTopicId === topic.id ? 'rotate-180' : ''}`}
                                        size={20}
                                    />
                                </div>
                            </button>
                            
                            <div className={`grid transition-all duration-500 ease-in-out ${openTopicId === topic.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    <div className="p-6 md:p-8 md:pl-[120px] pt-0 border-t border-white/5 mt-2">
                                        {topic.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA / RESOURCES SECTION --- */}
            <section className="py-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-500/50 hover:bg-cyan-950/30 transition-all">
                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                        <Download size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-bold">Download PDF</p>
                        <p className="text-white font-medium">Maintenance Checklist</p>
                    </div>
                </button>

                <button className="group relative overflow-hidden bg-cyan-600 border border-cyan-400 rounded-2xl p-6 flex items-center justify-center gap-3 hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                    <CalendarCheck size={24} className="text-white" />
                    <span className="text-white font-bold uppercase tracking-wide">Book a Service</span>
                </button>

                <button className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-lime-500/50 hover:bg-lime-950/30 transition-all">
                    <div className="p-3 bg-lime-500/10 rounded-lg text-lime-400 group-hover:scale-110 transition-transform">
                        <Zap size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-sm text-slate-400 uppercase tracking-wider font-bold">Visit</p>
                        <p className="text-white font-medium">Charging Guide</p>
                    </div>
                </button>
            </section>

            {/* --- FAQ SECTION --- */}
            <section className="py-24 relative border-t border-white/5 bg-[#070b1e]">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-center text-3xl md:text-5xl font-black text-white mb-16 tracking-wide uppercase">
                        Ownership <span className="text-cyan-400">FAQ</span>
                    </h2>

                    <div className="space-y-4">
                        {FAQS.map((faq) => (
                            <div
                                key={faq.id}
                                className={`rounded-xl border transition-all duration-300 ${openFaqId === faq.id ? 'bg-white/10 border-cyan-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                            >
                                <button
                                    onClick={() => toggleFaq(faq.id)}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                >
                                    <span className="font-semibold text-white text-lg">
                                        {faq.question}
                                    </span>
                                    <ChevronDown
                                        className={`text-cyan-400 transform transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                                        size={20}
                                    />
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <p className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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

export default EVCare;