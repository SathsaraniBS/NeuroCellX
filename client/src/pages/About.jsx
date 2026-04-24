import React, { useState } from 'react';
import {
    ChevronDown,
    Wrench,
    ShieldCheck,
    Download,
    CalendarCheck,
    Zap,
    AlertTriangle,
    PhoneCall,
    CheckCircle2,
    Clock,
    Activity
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Optimized Section Component with enhanced Glassmorphism
const SectionBlock = ({ title, imageSrc, reverse, children }) => (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl p-6 lg:p-10 rounded-[2.5rem] relative transition-all duration-700 hover:border-cyan-500/40 hover:bg-white/[0.04] group overflow-hidden`}>
        
        {/* Animated Background Accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Image Container with Cinematic Styling */}
        <div className="w-full lg:w-1/2 relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
            <img
                src={imageSrc}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=2072&auto=format&fit=crop"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
        </div>

        {/* Content Container */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 w-fit">
                <Activity size={14} className="text-cyan-400" />
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Ownership Guide</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                {title.split(' & ').map((part, i) => (
                    <span key={i} className={i === 1 ? "text-cyan-400" : ""}>
                        {part} {i === 0 && "& "}
                    </span>
                ))}
            </h2>
            <div className="text-lg text-slate-400 space-y-5 leading-relaxed">
                {children}
            </div>
        </div>
    </div>
);

const ListItem = ({ children }) => (
    <li className="flex items-start gap-4 group/item">
        <div className="mt-1 bg-cyan-400/20 p-1 rounded-md transition-colors group-hover/item:bg-cyan-400/40">
            <CheckCircle2 className="text-cyan-400" size={18} />
        </div>
        <span className="text-slate-300 transition-colors group-hover/item:text-white">{children}</span>
    </li>
);

const FAQS = [
    { id: 1, question: "How long does an EV battery last?", answer: "Most modern EV batteries are designed to last 10-20 years. Warranties typically cover 8 years or 100,000 miles, guaranteeing at least 70% retention." },
    { id: 2, question: "How often should I service my EV?", answer: "A general inspection is recommended every 15,000 km or 12 months, focusing on tires, brakes, and cabin filters." },
    { id: 3, question: "Can I charge my EV in the rain?", answer: "Yes. EV chargers and ports are weather-proofed and safe for rain or snow usage." },
    { id: 4, question: "Are EVs more expensive to insure?", answer: "Often slightly higher due to battery costs, but gaps are closing as parts become more available." },
    { id: 5, question: "Will fast charging damage my battery?", answer: "Occasional use is fine. Relying exclusively on DC fast charging daily can accelerate degradation over several years." }
];

function EVCare() {
    const [openFaqId, setOpenFaqId] = useState(null);

    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[90vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/ev3.png"
                        alt="EV Background"
                        className="w-full h-full object-cover animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050816]/60 to-[#050816]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-transparent" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <div className="max-w-4xl space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-7xl md:text-8xl font-black leading-none tracking-tighter uppercase">
                                Precision <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                                    Care Systems
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light leading-relaxed">
                                Advanced maintenance protocols and ownership optimization for the next generation of electric mobility.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button className="bg-cyan-500 hover:bg-cyan-400 text-[#050816] font-bold py-4 px-8 rounded-full transition-all hover:scale-105 active:scale-95">
                                Download Manual
                            </button>
                            <button className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md py-4 px-8 rounded-full font-bold transition-all">
                                View Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Sections */}
            <main className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 space-y-24 pb-32">

                {/* Battery Care Section */}
                <SectionBlock 
                    title="Battery intelligence & charging" 
                    imageSrc="src/assets/battery-care.png"
                    reverse={false}
                >
                    <ul className="grid gap-4">
                        <ListItem>Maintain optimal charge state between <strong>20% – 80%</strong>.</ListItem>
                        <ListItem>Prioritize AC Level 2 charging for daily commutes.</ListItem>
                        <ListItem>Activate battery pre-conditioning via the mobile app before long trips.</ListItem>
                        <ListItem>Integrated BMS monitoring for real-time health diagnostics.</ListItem>
                    </ul>
                </SectionBlock>

                {/* Maintenance Checklist - Technical UI */}
                <SectionBlock 
                    title="Routine service & maintenance" 
                    imageSrc="src/assets/ev-checklist.png"
                    reverse={true}
                >
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: "Tyre Pressure & Alignment", val: "10,000 km", icon: <Activity size={16}/> },
                            { label: "Brake System Analysis", val: "15,000 km", icon: <Wrench size={16}/> },
                            { label: "HVAC Filtration System", val: "Every 12 Months", icon: <Zap size={16}/> },
                            { label: "Coolant Chemistry Check", val: "Every 24 Months", icon: <ShieldCheck size={16}/> }
                        ].map((item, index) => (
                            <div key={index} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/[0.08] transition-colors group/row">
                                <div className="flex items-center gap-3">
                                    <span className="text-cyan-400">{item.icon}</span>
                                    <span className="font-semibold text-white group-hover/row:text-cyan-400 transition-colors">{item.label}</span>
                                </div>
                                <span className="text-xs font-mono font-bold bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/20">
                                    {item.val}
                                </span>
                            </div>
                        ))}
                    </div>
                </SectionBlock>

                {/* Roadside Assistance with improved layout */}
                <SectionBlock 
                    title="Roadside assistance & Support" 
                    imageSrc="src/assets/battery-care.png"
                    reverse={false}
                >
                    <p className="text-slate-400">Global support network available 24/7 for emergency towing and battery recovery.</p>
                    
                    <div className="relative p-[1px] bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 rounded-3xl group">
                        <div className="bg-[#0b1224] rounded-[23px] p-6 flex items-center gap-6 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <PhoneCall size={80} />
                            </div>
                            <div className="bg-cyan-500/20 p-4 rounded-2xl">
                                <PhoneCall className="text-cyan-400" size={32} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-1">24/7 Global Hotline</p>
                                <p className="text-3xl font-black text-white tracking-tight">1800-VOLT-CARE</p>
                            </div>
                        </div>
                    </div>
                </SectionBlock>
            </main>
    
            {/* --- FAQ SECTION --- */}
            <section className="py-32 bg-[#070b1e] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
                
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Ownership <span className="text-cyan-400">FAQ</span></h2>
                        <p className="text-slate-400">Common questions regarding the EV ecosystem</p>
                    </div>

                    <div className="space-y-4">
                        {FAQS.map((faq) => (
                            <div key={faq.id} className="group">
                                <button 
                                    onClick={() => toggleFaq(faq.id)} 
                                    className={`w-full p-6 flex justify-between items-center text-left rounded-2xl transition-all duration-300 border ${openFaqId === faq.id ? 'bg-white/5 border-cyan-500/30' : 'bg-transparent border-white/5 hover:bg-white/[0.02]'}`}
                                >
                                    <span className="font-bold text-lg pr-8">{faq.question}</span>
                                    <div className={`p-2 rounded-full transition-all duration-500 ${openFaqId === faq.id ? 'bg-cyan-500 text-[#050816] rotate-180' : 'bg-white/5 text-cyan-400'}`}>
                                        <ChevronDown size={20} />
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaqId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-8 text-slate-400 leading-relaxed text-lg italic border-x border-b border-white/5 rounded-b-2xl -mt-2">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1.0); }
                    100% { transform: scale(1.15); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 25s infinite alternate ease-in-out;
                }
            ` }} />
        </div>
    );
}

export default EVCare;