import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Download, Zap, ShieldCheck, Banknote, Map, 
    ChevronLeft, ChevronRight, ChevronDown, Settings, ThermometerSnowflake, 
    BatteryCharging, BatteryMedium, BatteryWarning 
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock Data
const leftColumnTips = [
    {
        id: 1,
        title: "Replace Damaged Components",
        description: "Certified professionals will advise replacing failing cells to prevent degradation across the entire battery pack.",
        icon: <ShieldCheck className="text-cyan-400" size={24} />
    },
    {
        id: 2,
        title: "Ensure Regular Checks",
        description: "Scheduled health assessments ensure your SOH (State of Health) remains within optimal manufacturer parameters.",
        icon: <Zap className="text-cyan-400" size={24} />
    },
    {
        id: 3,
        title: "Thermal Management",
        description: "Modern cooling systems actively manage pack temperatures to prevent degradation from extreme heat or cold.",
        icon: <ThermometerSnowflake className="text-cyan-400" size={24} />
    },
    {
        id: 4,
        title: "Equalization Charging",
        description: "The BMS balances the charge across all individual cells to maximize the usable capacity of the pack.",
        icon: <BatteryCharging className="text-cyan-400" size={24} />
    }
];

const rightColumnTips = [
    {
        id: 5,
        title: "Optimal Charge Range",
        description: "Maintaining a 20% to 80% charge level significantly reduces cyclic stress on lithium-ion chemistry.",
        icon: <BatteryMedium className="text-cyan-400" size={24} />
    },
    {
        id: 6,
        title: "Minimize Fast Charging",
        description: "DC fast charging generates high internal heat. Frequent use can accelerate internal resistance growth.",
        icon: <BatteryWarning className="text-cyan-400" size={24} />
    }
];

const TipCard = ({ tip }) => (
    <div className="group relative bg-[#0a1122]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 flex gap-5 mb-6 overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
        <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-cyan-500 transition-colors duration-300" />
        
        <div className="relative flex-shrink-0">
            <div className="w-14 h-14 bg-slate-800/50 rounded-xl flex items-center justify-center border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                {tip.icon}
            </div>
        </div>
        
        <div className="relative">
            <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm font-bold text-cyan-500/50">0{tip.id}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{tip.title}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">{tip.description}</p>
        </div>
    </div>
);

function RepairandMaintenance() {
    const navigate = useNavigate();
    
    // State Management
    const [openFaqId, setOpenFaqId] = useState(null);
    const [articleIndex, setArticleIndex] = useState(0);

    const [faqs] = useState([
        { 
            id: 1, 
            question: "Can I change the battery in the EV post 8 years? What will be the cost of it?", 
            answer: (
            <div className="space-y-4">
                <p>A battery’s state of health (SOH) report is required to demonstrate its potential usefulness in an EV. It describes the overall condition of a battery and shows how much longer it can last before it needs replacement.</p>
                <p>After the battery SOH has dropped below 70-80% capacity, it can be refurbished into a battery with better health {'>'}80%. However, it is also possible that a battery can be repaired by replacing weak or defective cells or components hence, 100% SOH cannot be achieved. Improving the SOH from say 60% to 80% by replacing few modules will definitely help in increasing the range.</p>
            </div>
        )
        },
        { 
            id: 2,
            question: "How to get the battery repaired?", 
            answer: (
            <div className="space-y-4">
                <p>When there is a defect in a battery, meaning the battery is not functioning properly or discharging faster than usual, it is advisable to take it to a battery repair center.</p>
                <p>When a lithium-ion battery arrives at the battery repair center, it usually goes through three important phases:</p>
                <ul className="list-disc pl-5 space-y-2 text-slate-400">
                    <li><strong className="text-white">Test and diagnosis:</strong> The battery is tested and checked for damages. The diagnosis will help the repair center understand what needs to be done to fix it.</li>
                    <li><strong className="text-white">Repair:</strong> A team of high-voltage specialists will repair the battery, replace certain parts of the pack, and restore it to its original condition.</li>
                    <li><strong className="text-white">Return:</strong> The repaired battery will find its way back to the customer, ready to be used in their electric car.</li>
                </ul>
            </div>
        )
        },
        { 
            id: 3, 
            question: "What will be estimated cost of repair if SOH % drop from 80% to 70%?", 
            answer: (
            <div className="space-y-4">
                <p>A battery consists of several modules. The cost for replacing an individual module can come up to approximately Rs. 1.2 Lacs. The total cost will depend on the number of modules to be replaced. For example, a ZS EV has a total of 120 cells in 6 modules present in a battery.</p>
            </div>
        )
         },
        { 
            id: 4, 
            question: "How can the battery life of a car be increased?", 
            answer: (
            <div className="space-y-4">
                <p>The battery can have a very long life if the following factors are kept under control:</p>
                <ol className="list-decimal pl-5 space-y-2 text-slate-400">
                    <li><strong className="text-white">Keep the battery cool:</strong> Batteries that deal with extreme temperatures can be damaged. Park under a shade as and when possible.</li>
                    <li><strong className="text-white">Avoid rapid charging frequently:</strong> While convenient, it puts a strain on the battery. Charge slowly and steadily when possible.</li>
                    <li><strong className="text-white">Do not drain completely:</strong> Try to keep the battery above 20% to avoid putting strain on the chemistry.</li>
                    <li><strong className="text-white">Keep an eye on the Battery:</strong> Be aware of any changes and visit an authorized workshop if anything is unusual.</li>
                    <li><strong className="text-white">Avoid frequent 100% charging:</strong> If driving within city limits, keep the SOC between 30% to 80%. Save 100% charges for outstation trips.</li>
                </ol>
            </div>
        )
        }
    ]);

    const [articles] = useState([
        { id: 1, title: "Electric Vehicle Design: The Anatomy of an Electric Car", image: "/src/assets/evanatomy.png", tag: "Design", path: "/ev-architecture" },
        { id: 2, title: "Inside an Electric Vehicle Battery: What You Need to Know", image: "/src/assets/libattery-img.png", tag: "Technology", path: "/inside-battery" },
        { id: 3, title: "Breathe New Life: Repurposing Used Lithium-Ion Batteries", image: "/src/assets/article3.png", tag: "Sustainability", path: "#" },
        { id: 4, title: "History of EV's", image: "/src/assets/ev12.png", tag: "History", path: "#" }
    ]);

    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);
    const nextArticle = () => setArticleIndex((prev) => (prev + 1) % articles.length);
    const prevArticle = () => setArticleIndex((prev) => (prev - 1 + articles.length) % articles.length);
    const handleArticleClick = (path) => { if (path && path !== "#") navigate(path); };

    const getVisibleArticles = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(articles[(articleIndex + i) % articles.length]);
        }
        return visible;
    };

    return (
        // Added bg-cover bg-fixed bg-center to keep the background locked while scrolling
        <div className="min-h-screen bg-[url('/src/assets/bg.png')] bg-cover bg-fixed bg-center text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/ev3.png"
                        alt="EV Background"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <div className="max-w-3xl space-y-6 pt-20">

                        <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">Battery care:<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Maintenance & Ownership Guide</span></h1>
                        <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Unlock the secrets to maintaining your electric vehicle's performance and preserving your battery's longevity.<br />
                        
                        From predictive analytics to routine check-ups, our maintenance tips keep your EV humming like a finely tuned machine.</p>
                    </div>
                </div>
                <div className="flex gap-4 pt-6 pl-6 absolute left-30 bottom-10"> 
                    {/* Fixed: removed undefined activeEV variable from the link path */}
                    <a
                        href="/ev-manual.pdf" 
                        download="EV_Maintenance_Manual.pdf"
                        className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    >
                        Download Manual
                        <Download  className="w-5 h-5" />
                    </a>
                    
                </div>
            </section>

            {/* HERO / INTRO SECTION - Fixed top padding so it clears the Navbar */}
            <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Advanced <span className="text-cyan-400">EV Care</span>
                    </h1>
                    <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        Unlock the secrets to maintaining your electric vehicle's performance and preserving your battery's longevity. From predictive analytics to routine check-ups, our maintenance tips keep your EV humming like a finely tuned machine.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16  p-8 md:p-10 ">
                    <div className="w-full lg:w-1/2 relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 to-blue-600/40 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-700"></div>
                        <img
                            src="/src/assets/evrepair-img2.png"
                            alt="EV Battery Cells"
                            className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0a1122/ffffff?text=EV+Battery+Cells" }}
                        />
                    </div>

                    <div className="w-full lg:w-1/2">
                       
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Keeping batteries healthy
                        </h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            At the heart of every EV lies its battery—the definitive source of its power. Ensuring the battery pack is well-maintained and continuously monitored helps you extract maximum range and power over the vehicle's lifespan.
                        </p>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050816] font-bold rounded-lg transition-colors group">
                            Learn about Analytics 
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* WHY LONGEVITY MATTERS - Matched to Screenshot UI */}
            <section className="py-20 w-full">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                        {/* Summary Header */}
                        <div className="lg:col-span-1 flex flex-col justify-center">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase mb-8 tracking-wide">
                                Why <span className="text-cyan-400">Longevity</span><br /> Matters
                            </h2>
                            <div className="border-l-2 border-cyan-500 pl-6 py-2">
                                <p className="text-slate-300 text-lg leading-relaxed">
                                    Proactive management of the high-voltage system ensures peak efficiency and protects your vehicle's residual value.
                                </p>
                            </div>
                        </div>
            
                        {/* Feature Grid - Styled to match screenshot dark cards */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Maximize Lifespan", desc: "Reduce chemical degradation through intelligent cycle management.", icon: <Zap className="text-cyan-400" size={24} /> },
                                { title: "Enhance Range", desc: "Proper cell balancing ensures every kWh is usable.", icon: <BatteryCharging className="text-cyan-400" size={24} /> },
                                { title: "Warranty Safety", desc: "Maintain digital logs required for manufacturer battery guarantees.", icon: <ShieldCheck className="text-cyan-400" size={24} /> },
                                { title: "Thermal Stability", desc: "Prevent capacity loss by managing temperature extremes.", icon: <ThermometerSnowflake className="text-cyan-400" size={24} /> }
                            ].map((item, index) => (
                                <div key={index} className="p-8 rounded-2xl bg-[#0e172a]/80 backdrop-blur-md border border-slate-700/50 hover:border-cyan-500/50 transition-all shadow-xl group">
                                    <div className="mb-6 w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-all">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* TIPS SECTION */}
            <section className="py-20 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Maintenance <span className="text-cyan-400">Protocols</span>
                        </h2>
                    </div>
    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column Tips */}
                        <div className="flex flex-col">
                            {leftColumnTips.map(tip => (
                                <TipCard key={tip.id} tip={tip} />
                            ))}
                        </div>
    
                        {/* Right Column Tips + Image */}
                        <div className="flex flex-col">
                            <div className="relative overflow-hidden rounded-2xl mb-6 h-64 md:h-80 border border-white/10 shadow-lg group">
                                <img 
                                    src="/src/assets/maintenance-img2.png" 
                                    alt="EV Maintenance" 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0a1122/ffffff?text=Maintenance" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
                            </div>
                            
                            {rightColumnTips.map(tip => (
                                <TipCard key={tip.id} tip={tip} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* KNOWLEDGE BASE (FAQ & Articles) */}
            <section className="py-20 relative border-t border-white/5 bg-[#050816]/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">

                    {/* FAQ Area */}
                    <div className="max-w-3xl mx-auto mb-32">
                        <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-12 tracking-wide uppercase">
                            Frequently Asked <span className="text-cyan-400">Questions</span>
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className={`rounded-xl border transition-all duration-300 ${openFaqId === faq.id ? 'bg-[#0e172a] border-cyan-500/50 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                                >
                                    <button
                                        onClick={() => toggleFaq(faq.id)}
                                        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                        aria-expanded={openFaqId === faq.id}
                                    >
                                        <span className="font-semibold text-white text-lg pr-4">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`text-cyan-400 flex-shrink-0 transform transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                                            size={20}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Articles Area */}
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-10 gap-4">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white">
                                Latest <span className="text-cyan-400">Insights</span>
                            </h2>
                            <div className="flex gap-3">
                                <button onClick={prevArticle} className="bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 p-3 rounded-xl text-white transition-all">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={nextArticle} className="bg-cyan-500 hover:bg-cyan-400 p-3 rounded-xl text-[#050816] transition-all font-bold">
                                    <ChevronRight size={20} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        {/* Articles Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {getVisibleArticles().map((article, idx) => (
                                <div 
                                    key={`${article.id}-${idx}`} 
                                    onClick={() => handleArticleClick(article.path)}
                                    className="group cursor-pointer flex flex-col bg-[#0e172a] rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <div className="w-full h-56 overflow-hidden relative">
                                        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-lime-400 uppercase tracking-wider">
                                            {article.tag}
                                        </div>
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/400x300/0a1122/ffffff?text=Article+Image" }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e172a] via-transparent to-transparent opacity-90" />
                                    </div>
                                    <div className="p-6 flex-1 flex items-center">
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                                            {article.title}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default RepairandMaintenance;