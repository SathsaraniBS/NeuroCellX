import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Zap, ShieldCheck, Banknote, Map, 
    ChevronLeft, ChevronRight, ChevronDown, Settings, ThermometerSnowflake, 
    BatteryCharging, BatteryMedium, BatteryWarning 
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock Data
const mockArticles = [
    { id: 1, title: "Understanding SOC & SOH", path: "/articles/soc-soh" },
    { id: 2, title: "Maximizing Range", path: "/articles/range" },
    { id: 3, title: "Winter Battery Care", path: "/articles/winter" }
];

const mockBatteryTypes = [
    { id: 1, name: "Lithium-Ion" },
    { id: 2, name: "Solid State" }
];

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
    <div className="group relative bg-slate-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all duration-500 flex gap-5 mb-6 overflow-hidden shadow-lg hover:shadow-cyan-500/10">
        {/* Animated Background Glow */}
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all shadow-inner">
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
    const navigate = useNavigate();
    
    // State Management
    const [batteries, setBatteries] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [articleIndex, setArticleIndex] = useState(0);
    
    const [activeEV] = useState({
        title: "Advanced EV Care",
        tagline: "Preserving battery health for the long haul."
    });

    const [faqs] = useState([
        { 
            id: 1, 
            question: "Can I change the battery in the EV post 8 years? What will be the cost of it ?", 
            answer: (
            <div className="space-y-4">
                <p>
                    A battery’s state of health (SOH) report is required to demonstrate its potential usefulness in an EV. It describes the overall condition of a battery and shows how much longer it can last before it needs replacement.
                </p>
                <p>
                   After the battery SOH has dropped below 70-80% capacity, it can be refurbished, into a battery with better health {'>'}80%. However, it is also possible that a battery can be repaired by replacing weak or defective cells or components hence, 100% SOH cannot be achieved. Improving the SOH from say 60% to 80% by replacing few modules will definitely help in increasing the range. 
                </p>
            </div>
        )
        },
        { 
            id: 2,
            question: "How to get the battery repaired ?", 
            answer: (
            <div className="space-y-4">
                <p>
                    When there is a defect in a battery, meaning the battery is not functioning properly or discharging faster than usual, it is advisable to take it to a battery repair center.

                </p>
                <p>
                   When a lithium-ion battery arrives at the battery repair center, it usually goes through three important phases:

                </p>

                 <p>
                   <b>1. Test and diagnosis: </b>the battery is tested and checked for damages. The diagnosis will help the repair center understand what needs to be done to fix it and determine the next possible steps.

                </p>

                 <p>
                   <b>2. Repair: </b>A team of high-voltage specialists will repair the battery, replace certain parts of the pack, and restore it to its original condition (defective module which have degraded/ lost power are replaced) Leak test will be performed after the repair activity.

                </p>

                <p>
                   <b>3. Return: </b>the repaired battery will find its way back to the customer, ready to be used in their electric car. The authorized person at the dealer end will reinstall the battery in the car and perform a final check to ensure that everything is functioning well.

                </p>
            </div>
        )
        },
        { 
            id: 3, 
            question: "What will be estimated cost of repair if SOH % drop from 80% to 70% ?", 
            answer: (
            <div className="space-y-4">
                <p>
                    A battery consists of several modules. The cost for replacing an individual module can come up to approximately Rs. 1.2 Lacs. The total cost will depend on the number of modules to be replaced, for example ZS EV has total of 120 cells in 6 modules present in a battery.

                </p>
                
            </div>
        )
         },
        { 
            id: 4, 
            question: "How can the battery life of a car be increased ?", 
            answer: (
            <div className="space-y-4">
                <p>
                  The battery can have a very long life if the following factors are kept under control:

                </p>

                <p>
                   <b>1. Keep the battery cool and be careful in extreme temperatures: </b>Batteries that deal with extreme temperatures can be damaged, so it is important to keep the battery cool, especially in hot climates. Extreme cold can also have a negative effect on the battery. Try to Park under a shade as and when possible.

                </p>

                 <p>
                   <b>2. Avoid rapid charging frequently: </b>While rapid charging is a convenient way to charge your battery,  it  can put a strain on the battery and impact  its lifespan. If you can, charge your battery slowly and steadily and only use rapid charging when necessary.

                </p>

                <p>
                   <b>3. Do not drain the battery completely: </b>It’s important to avoid draining the battery completely as this can also damage it. Try to keep the battery above 20% to avoid putting strain on the battery.

                </p>

                <p>
                   <b>4. Keep an eye on the Battery: </b> It’s important to keep an eye on the battery and be aware of any changes. If you notice anything unusual, take the car to an authorized workshop to have it checked out.

                </p>

                <p>
                   <b>5. Avoid frequent charging to keep SOC at 100% always.  </b> (If one is driving within the city limits, keep the SOC between 30 to 80%, it will improve Battery health, 100% charge may be planned for outstation Trips)

                </p>
                
            </div>
        )
        }
    ]);

    const [articles] = useState([
        { 
            id: 1, 
            title: "Electric Vehicle Design: The Anatomy of an Electric Car", 
            image: "/src/assets/evanatomy.png", 
            tag: "Design", 
            path: "/ev-architecture"
        },
        { 
            id: 2, 
            title: "Inside an Electric Vehicle Battery: What You Need to Know", image: "/src/assets/libattery-img.png", 
            tag: "Technology", 
            path: "/inside-battery" 
        },
        { 
            id: 3, 
            title: "Breathe New Life: Repurposing Used Lithium-Ion Batteries", image: "/src/assets/article3.png", 
            tag: "Sustainability", 
            path: "#" 
        },
        { 
            id: 4, 
            title: "History of EV's", 
            image: "/src/assets/ev12.png", 
            tag: "History", 
            path: "#" 
        }
    ]);

    // FastAPI Backend Fetch (Commented out until ready)
    useEffect(() => {
        const fetchBatteries = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/batteries');
                if (response.ok) {
                    const data = await response.json();
                    setBatteries(data);
                }
            } catch (error) {
                console.error("Failed to fetch batteries from FastAPI, using fallback data.", error);
            }
        };
        // fetchBatteries();
    }, []);

    // Slider & Navigation Handlers
    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);
    const nextArticle = () => setArticleIndex((prev) => (prev + 1) % articles.length);
    const prevArticle = () => setArticleIndex((prev) => (prev - 1 + articles.length) % articles.length);
    const handleArticleClick = (path) => { if (path && path !== "#") navigate(path); };

    // Helper function to get 3 visible articles for the carousel
    const getVisibleArticles = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(articles[(articleIndex + i) % articles.length]);
        }
        return visible;
    };

    return (
        <div className="min-h-screen bg-[#02040a] text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
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

            {/* INTRO SECTION */}
            <section className="max-w-7xl mx-auto px-4 py-20 mt-10 sm:px-6 lg:px-8 relative z-10 -mt-32">
                <div className="bg-[#0a0f25]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
                    <div className="text-center mb-16">
                        <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                            Unlock the secrets to maintaining your electric vehicle's performance and preserving your battery's longevity. From predictive analytics to routine check-ups, our maintenance tips keep your EV humming like a finely tuned machine.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
                            <img
                                src="/src/assets/evrepair-img2.png"
                                alt="EV Battery Cells"
                                className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <BatteryCharging className="text-cyan-400" size={32} />
                                Keeping batteries healthy
                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                At the heart of every EV lies its battery—the definitive source of its power. Ensuring the battery pack is well-maintained and continuously monitored helps you extract maximum range and power.
                            </p>
                            <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors group">
                                Learn about Battery Health Analytics 
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY MAINTENANCE MATTERS */}
            <section className="relative py-24 w-full overflow-hidden flex items-center bg-[url('/src/assets/evrepair-img2.png')] bg-cover bg-center bg-no-repeat bg-fixed">
                <div className="absolute inset-0 bg-[#050816]/90 backdrop-blur-sm z-0" />
                
                <div className="max-w-7xl mx-auto relative z-10 px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Summary Header */}
                        <div className="lg:col-span-1 flex flex-col justify-center pr-8">
                            <h2 className="text-4xl font-black text-white leading-tight uppercase mb-6">
                                Why <span className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Longevity</span> Matters
                            </h2>
                            <p className="text-slate-300 border-l-2 border-cyan-500 pl-6 py-2 bg-gradient-to-r from-cyan-500/10 to-transparent">
                                Proactive management of the high-voltage system ensures peak efficiency and protects your vehicle's residual value.
                            </p>
                        </div>
            
                        {/* Feature Grid */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: "Maximize Lifespan", desc: "Reduce chemical degradation through intelligent cycle management.", icon: <Zap className="text-cyan-400" size={28} /> },
                                { title: "Enhance Range", desc: "Proper cell balancing ensures every kWh is usable.", icon: <BatteryCharging className="text-blue-400" size={28} /> },
                                { title: "Warranty Safety", desc: "Maintain digital logs required for manufacturer battery guarantees.", icon: <ShieldCheck className="text-emerald-400" size={28} /> },
                                { title: "Thermal Stability", desc: "Prevent capacity loss by managing temperature extremes.", icon: <ThermometerSnowflake className="text-cyan-200" size={28} /> }
                            ].map((item, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-slate-900/60 backdrop-blur-md border border-white/10 hover:border-cyan-500/30 hover:bg-slate-800/80 transition-all shadow-xl hover:-translate-y-1">
                                    <div className="mb-5 bg-white/5 w-14 h-14 rounded-lg flex items-center justify-center border border-white/10">{item.icon}</div>
                                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            
            {/* TIPS SECTION */}
            <section className="bg-[#050816] py-24 px-4 md:px-8 font-sans">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs">
                            <Settings size={14} className="animate-spin-slow" />
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
                            <div className="relative overflow-hidden rounded-3xl mb-8 h-72 md:h-[400px] border border-white/10 shadow-[0_0_30px_rgba(6,182,212,0.15)] group">
                                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-cyan-500/0 transition-colors z-10" />
                                <img 
                                    src="/src/assets/maintenance-img2.png" 
                                    alt="EV Maintenance" 
                                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
                                />
                            </div>
                            
                            {rightColumnTips.map(tip => (
                                <TipCard key={tip.id} tip={tip} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* --- KNOWLEDGE BASE (FAQ & Articles) --- */}
            <section className="py-24 relative border-t border-white/5 bg-gradient-to-b from-[#050816] to-[#070b1e]">
                <div className="max-w-7xl mx-auto px-6">

                    {/* FAQ Area */}
                    <div className="max-w-3xl mx-auto mb-32">
                        <h2 className="text-center text-3xl font-black text-white mb-12 tracking-wide uppercase">
                            Frequently Asked <span className="text-cyan-400">Questions</span>
                        </h2>

                        <div className="space-y-4">
                            {faqs.map((faq) => (
                                <div
                                    key={faq.id}
                                    className={`rounded-xl border transition-all duration-300 ${openFaqId === faq.id ? 'bg-white/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
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
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        {/* Changed from <p> to <div> to prevent invalid HTML nesting */}
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
                        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Latest <span className="text-lime-400">Insights</span></h2>
                        </div>

                        {/* Articles Carousel Section */}
                        <div className="flex items-center justify-between gap-6">
                            {/* Left Arrow */}
                            <button onClick={prevArticle} className="bg-white/10 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/50 p-3 flex-shrink-0 transition-all rounded-xl text-white hover:text-cyan-400">
                                <ChevronLeft size={24} />
                            </button>

                            {/* Cards Container */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                                {getVisibleArticles().map((article, idx) => (
                                    <div 
                                        key={`${article.id}-${idx}`} 
                                        onClick={() => handleArticleClick(article.path)}
                                        className="group cursor-pointer flex flex-col bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]"
                                    >
                                        <div className="w-full h-56 overflow-hidden relative">
                                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-lime-400 uppercase tracking-wider shadow-lg">
                                                {article.tag}
                                            </div>
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                                onError={(e) => { e.target.onerror = null; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b1e] via-transparent to-transparent opacity-90" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                                                {article.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Arrow */}
                            <button onClick={nextArticle} className="bg-cyan-500 hover:bg-cyan-400 p-3 flex-shrink-0 transition-all rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] text-[#050816]">
                                <ChevronRight size={24} className="stroke-[3px]" />
                            </button>
                        </div>
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
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default RepairandMaintenance;