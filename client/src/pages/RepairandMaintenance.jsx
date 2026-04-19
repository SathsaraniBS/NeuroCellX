import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Zap, ShieldCheck, Banknote, Map, 
    ChevronLeft, ChevronRight, Settings, BatteryCharging 
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock Data to prevent crashes (Replace with your actual data/FastAPI endpoints)
const mockArticles = [
    { id: 1, title: "Understanding SOC & SOH", path: "/articles/soc-soh" },
    { id: 2, title: "Maximizing Range", path: "/articles/range" },
    { id: 3, title: "Winter Battery Care", path: "/articles/winter" }
];

const mockBatteryTypes = [
    { id: 1, name: "Lithium-Ion" },
    { id: 2, name: "Solid State" }
];

function RepairandMaintenance() {
    const navigate = useNavigate();
    
    // State Management
    const [batteries, setBatteries] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [articleIndex, setArticleIndex] = useState(0);
    
    // Set a default EV so the hero section populates
    const [activeEV, setActiveEV] = useState({
        title: "Advanced EV Care",
        tagline: "Preserving battery health for the long haul."
    });

    // FastAPI Backend Fetch
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
        // fetchBatteries(); // Uncomment when FastAPI server is running
    }, []);

    // Slider & Navigation Handlers
    const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);
    const nextSlide = () => setCurrentSlide((prev) => (prev === mockBatteryTypes.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? mockBatteryTypes.length - 1 : prev - 1));
    const nextArticle = () => setArticleIndex((prev) => (prev + 1) % mockArticles.length);
    const prevArticle = () => setArticleIndex((prev) => (prev - 1 + mockArticles.length) % mockArticles.length);
    const handleArticleClick = (path) => { if (path && path !== "#") navigate(path); };

    return (
        <div className="min-h-screen bg-[#050816] text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/evrepair-img.png"
                        alt="EV Repair Hero"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <div className="max-w-3xl space-y-6 pt-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs backdrop-blur-md">
                            <Zap size={14} className="fill-cyan-400" />
                            <span>Next-Gen Mobility Maintenance</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                            {activeEV?.title}
                        </h1>
                        <p className="text-xl text-cyan-100/80 font-medium italic border-l-4 border-cyan-500 pl-4">
                            "{activeEV?.tagline}"
                        </p>
                    </div>
                </div>
            </section>

            {/* INTRO SECTION */}
            <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative z-10 -mt-20">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    <div className="text-center mb-16">
                        <p className="text-slate-300 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">
                            Unlock the secrets to maintaining your electric vehicle's performance and preserving your battery's longevity. From predictive analytics to routine check-ups, our maintenance tips keep your EV humming like a finely tuned machine.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
                            <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                                Learn about Battery Health Analytics <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY MAINTENANCE MATTERS - GRID LAYOUT */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="mb-16 md:text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight uppercase tracking-tight">
                        Why does battery <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">maintenance matter?</span>
                    </h2>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
                    {/* Card 1 */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                        <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-cyan-500/30">
                            <Zap className="text-cyan-400" size={24} />
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Maximizes Lifespan</h4>
                        <p className="text-slate-400 leading-relaxed">
                            The battery is the core of an electric vehicle. Consistent maintenance not only amplifies its longevity but also bolsters overall vehicle performance.
                        </p>

                        <h4 className="text-xl font-bold text-white mb-3">Enhances Range</h4>
                        <p className="text-slate-400 leading-relaxed">
                            A well-maintained battery directly impacts the vehicle's driving range. Keep cells balanced to travel further and maximize charging efficiency.
                        </p>

                        <h4 className="text-xl font-bold text-white mb-3">Enhances Range</h4>
                        <p className="text-slate-400 leading-relaxed">
                            A well-maintained battery directly impacts the vehicle's driving range. Keep cells balanced to travel further and maximize charging efficiency.
                        </p>

                        <h4 className="text-xl font-bold text-white mb-3">Preserves Warranty</h4>
                        <p className="text-slate-400 leading-relaxed">
                            Regular battery assessment enhances performance and safeguards warranty coverage. Track your charging cycles to maintain manufacturer guarantees.
                        </p>

                    </div>

                    
                    
                    
                </div>
            </section>

            {/* TIPS SECTION */}
            <section className="py-24 bg-[#0a0f1c] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <h2 className="text-sm font-bold text-cyan-500 tracking-widest uppercase mb-2">Best Practices</h2>
                        <h3 className="text-3xl md:text-4xl font-bold text-white">
                            TIPS TO MAINTAIN YOUR BATTERIES
                        </h3>
                    </div>

                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="w-full lg:w-1/2 space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Settings className="text-cyan-500" size={28} />
                                    Get the damaged components replaced

                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="mr-4 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                                        <p className="text-slate-300 leading-relaxed text-base">
                                            During routine checks by authorized personnel, you will be advised to replace any damaged components or failing cells immediately.
                                        </p>
                                    </li>
                                    <li className="flex items-start bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="mr-4 mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                                        <p className="text-slate-300 leading-relaxed text-base">
                                            This mitigates the risk of thermal runaway and prevents further degradation within the pack, enhancing its overall state of health (SOH).
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-2xl mix-blend-overlay"></div>
                            <img
                                src="/src/assets/evrepair-img2.png"
                                alt="Technician working on EV battery"
                                className="w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 relative z-10 -mt-20">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        <div className="w-full lg:w-1/2 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img
                                src="/src/assets/evrepair-img2.png"
                                alt="EV Battery Cells"
                                className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10"
                            />
                        </div>

                        <div className="w-full lg:w-1/2">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                
                                Ensure regular checks

                            </h3>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                It is imperative to conduct routine health and performance assessments of the battery via scheduled maintenance inspections.
                            </p>
                            <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                Only certified service professionals are authorised to examine and disassemble the battery for inspection.

                            </p>
                            <button className="flex items-center gap-2 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                                Learn about Battery Health Analytics <ChevronRight size={20} />
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
            `}</style>
        </div>
    );
}

export default RepairandMaintenance;