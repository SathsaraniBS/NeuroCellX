import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    Wrench,
    ShieldCheck,
    Download,
    CalendarCheck,
    Zap
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// NOTE: In a real project, import images at the top:
// import MaintenanceImg from '../assets/evmaintenance.png';

const MAINTENANCE_TOPICS = [
    {
        id: "01",
        title: "Battery care & charging habits",
        // Using placeholders for reliability in this demo
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=200",
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Keep daily charge between 20% – 80% for optimal battery health.</li>
                <li>Avoid deep-discharge (0%) and frequent 100% DC fast charging.</li>
                <li>Don't park at 0% or 100% for long periods.</li>
                <li>Use preconditioning (heating/cooling) while plugged in for better range.</li>
            </ul>
        )
    },
    {
        id: "02",
        title: "Routine maintenance checklist",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200",
        content: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Tyre pressure & tread</span> <span className="text-cyan-400">Every 10,000 km</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Brake pads & rotors</span> <span className="text-cyan-400">Every 15,000 km</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>Air & cabin filters</span> <span className="text-cyan-400">Every 15,000 km</span></div>
                <div className="flex justify-between border-b border-white/5 pb-2"><span>High-voltage inspection</span> <span className="text-cyan-400">Yearly</span></div>
            </div>
        )
    },
    {
        id: "03",
        title: "Software updates & features",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200",
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>OTA (Over-the-Air) updates bring bug fixes and performance improvements.</li>
                <li>Check for updates on your car's screen or companion app.</li>
                <li>Ensure a stable Wi-Fi connection for large updates.</li>
            </ul>
        )
    },
    {
        id: "04",
        title: "Winter / weather range tips",
        image: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?auto=format&fit=crop&q=80&w=200",
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Precondition the cabin while charging in cold weather.</li>
                <li>Avoid aggressive acceleration in extreme cold conditions.</li>
                <li>Park in the shade and pre-cool the cabin in hot weather.</li>
            </ul>
        )
    },
    {
        id: "05",
        title: "Service schedule & warranty info",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=200",
        content: (
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-slate-300">
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Battery:</strong> 8 years / 160,000 km</li>
                    <li><strong>Vehicle:</strong> 3 years / 100,000 km</li>
                    <li><strong>Not covered:</strong> Misuse or unauthorized mods.</li>
                </ul>
            </div>
        )
    },
    {
        id: "06",
        title: "Roadside assistance",
        image: "https://images.unsplash.com/photo-1449960232330-3029a9757736?auto=format&fit=crop&q=80&w=200",
        content: (
            <div className="flex flex-col md:flex-row gap-6 items-center bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex-1 space-y-2 text-slate-300">
                    <p>• Call 24/7 roadside assistance via the app.</p>
                    <p>• Leave HV repairs to authorized technicians.</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-center min-w-[200px]">
                    <p className="text-xs text-cyan-400 uppercase mb-1">VoltIQ Assistance</p>
                    <p className="text-xl font-bold text-white">1800-123-4567</p>
                </div>
            </div>
        )
    },
    {
        id: "07",
        title: "Insurance & ownership costs",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=200",
        content: (
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                <li>Insure with policies covering high-voltage components.</li>
                <li>Protect against theft of mobile chargers and cables.</li>
                <li>Enjoy ~40% lower maintenance costs vs ICE vehicles.</li>
            </ul>
        )
    }
];

const FAQS = [
    { id: 1, question: "How long does an EV battery last?", answer: "Most modern EV batteries are designed to last 10-20 years. Warranties typically cover 8 years or 100,000 miles, guaranteeing at least 70% retention." },
    { id: 2, question: "How often should I service my EV?", answer: "A general inspection is recommended every 15,000 km or 12 months, focusing on tires, brakes, and cabin filters." },
    { id: 3, question: "Can I charge my EV in the rain?", answer: "Yes. EV chargers and ports are weather-proofed and safe for rain or snow usage." },
    { id: 4, question: "Are EVs more expensive to insure?", answer: "Often slightly higher due to battery costs, but gaps are closing as parts become more available." },
    { id: 5, question: "Will fast charging damage my battery?", answer: "Occasional use is fine. Relying exclusively on DC fast charging daily can accelerate degradation over several years." }
];

function EVCare() {
    const [openTopicId, setOpenTopicId] = useState(null);
    const [openFaqId, setOpenFaqId] = useState(null);

    const toggleTopic = (id) => setOpenTopicId(openTopicId === id ? null : id);
    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1664360645604-03d3bc01b1df?q=80&w=2070&auto=format&fit=crop"
                        alt="EV Maintenance"
                        className="w-full h-full object-cover opacity-30 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/50 via-[#050816]/80 to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 text-lime-400 text-sm font-bold mb-6 uppercase">
                        <Wrench size={14} /> Ownership Guide
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-tight">
                        EV CARE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">MAINTENANCE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                        Keep your electric car healthy and extend its life through intelligent care.
                    </p>
                </div>
            </section>

            {/* --- WHY IT MATTERS --- */}
            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <h2 className="text-3xl font-black uppercase mb-4">Why EV Maintenance <span className="text-cyan-400">Matters</span></h2>
                        <p className="text-slate-400 text-lg mb-4">Electric vehicles have fewer moving parts, but thermal systems, tires, and software still require expert attention.</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-500/20 to-transparent p-6 rounded-2xl border border-emerald-500/30 text-center shrink-0">
                        <ShieldCheck className="text-emerald-400 mx-auto mb-3" size={40} />
                        <p className="text-emerald-100 font-medium">Safe. Efficient. Reliable.</p>
                    </div>
                </div>
            </section>

            {/* --- TOPICS ACCORDION --- */}
            <section className="py-12 max-w-5xl mx-auto px-6 w-full">
                <div className="space-y-4">
                    {MAINTENANCE_TOPICS.map((topic) => (
                        <div
                            key={topic.id}
                            className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                                openTopicId === topic.id ? 'bg-white/10 border-cyan-500/50' : 'bg-white/5 border-white/10'
                            }`}
                        >
                            <button
                                onClick={() => toggleTopic(topic.id)}
                                className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/10 shrink-0">
                                        <img src={topic.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <span className={`font-bold md:text-xl ${openTopicId === topic.id ? 'text-cyan-400' : 'text-white'}`}>
                                        {topic.title}
                                    </span>
                                </div>
                                <ChevronDown className={`transition-transform duration-300 ${openTopicId === topic.id ? 'rotate-180 text-cyan-400' : ''}`} />
                            </button>
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${openTopicId === topic.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="p-6 pt-0 md:ml-20 border-t border-white/5 mt-2">
                                    {topic.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- RESOURCES --- */}
            <section className="py-16 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all">
                    <Download className="text-cyan-400" />
                    <div className="text-left">
                        <p className="text-xs text-slate-400 uppercase font-bold">PDF Guide</p>
                        <p className="text-white font-medium">Checklist</p>
                    </div>
                </button>
                <button className="flex items-center justify-center gap-3 p-6 bg-cyan-600 rounded-2xl hover:bg-cyan-500 transition-all font-bold uppercase shadow-lg shadow-cyan-900/20">
                    <CalendarCheck size={20} /> Book Service
                </button>
                <button className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-lime-500/50 transition-all">
                    <Zap className="text-lime-400" />
                    <div className="text-left">
                        <p className="text-xs text-slate-400 uppercase font-bold">Visit</p>
                        <p className="text-white font-medium">Charging Hub</p>
                    </div>
                </button>
            </section>

            {/* --- FAQ --- */}
            <section className="py-24 bg-[#070b1e]">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-center text-3xl font-black mb-12 uppercase">Ownership <span className="text-cyan-400">FAQ</span></h2>
                    <div className="space-y-4">
                        {FAQS.map((faq) => (
                            <div key={faq.id} className="border-b border-white/10">
                                <button onClick={() => toggleFaq(faq.id)} className="w-full py-6 flex justify-between items-center text-left">
                                    <span className="font-semibold text-lg">{faq.question}</span>
                                    <ChevronDown className={`text-cyan-400 transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaqId === faq.id ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-slate-400">{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite alternate ease-in-out;
                }
            ` }} />
        </div>
    );
}

export default EVCare;