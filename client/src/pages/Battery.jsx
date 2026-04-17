import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, ShieldCheck, Banknote, LayoutGrid, ChevronLeft, ChevronRight, ChevronDown, ArrowRight, BatteryCharging } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BatteryTypes = [
    {
        id: 1,
        title: "Lithium-ion batteries",
        image: "/src/assets/battery1.png",
        description: "These are the most widely used type of EV batteries, possessing a high energy density. This means they can store more energy per unit mass than other batteries. The two widely used variants are LFP (Lithium Ferrous Phosphate) and NMC (Nickel Manganese Cobalt).",
        sub_title: "Did you know?",
        sub_description: "LFP batteries have excellent thermal stability, making them highly tolerant to high temperatures and a safer choice for EVs.",
        icon: <Zap className="text-cyan-400" size={24} />,
        glowColor: "group-hover:shadow-cyan-500/20"
    },
    {
        id: 2,
        title: "Nickel-metal hydride batteries",
        image: "/src/assets/battery2.png",
        description: "Often used in hybrid vehicles, these batteries combine an electric motor with a gasoline engine, acting as a reliable bridge between traditional and future mobility.",
        sub_title: "Did you know?",
        sub_description: "These were used in some of the earliest electric vehicles in the 90s. However, due to high costs and memory effect, most manufacturers shifted to Lithium-ion.",
        icon: <Banknote className="text-lime-400" size={24} />,
        glowColor: "group-hover:shadow-lime-500/20"
    },
    {
        id: 3,
        title: "Lead-acid batteries",
        image: "/src/assets/ev10.png",
        description: "The oldest type of EV batteries, still heavily utilized in low-cost or low-performance EVs such as three-wheelers and two-wheelers.",
        sub_title: "Did you know?",
        sub_description: "Lead-acid batteries are the traditional power source used in almost all gasoline vehicles to crank the internal combustion engine.",
        icon: <ShieldCheck className="text-blue-400" size={24} />,
        glowColor: "group-hover:shadow-blue-500/20"
    },
    {
        id: 4,
        title: "Sodium-ion battery",
        image: "/src/assets/ev11.png",
        description: "An emerging alternative to lithium-ion. These batteries are currently in intensive development to deliver low-cost, sustainable electric vehicles.",
        sub_title: "Did you know?",
        sub_description: "Solid-state sodium-ion batteries eliminate liquid electrolytes entirely, opting for solid electrolytes which drastically improves safety!",
        icon: <LayoutGrid className="text-yellow-400" size={24} />,
        glowColor: "group-hover:shadow-yellow-500/20"
    }
];

function Battery() {
    const navigate = useNavigate(); // Added for navigation
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [articleIndex, setArticleIndex] = useState(0); 

    const [faqs] = useState([
        { id: 1, question: "How long do EV batteries last?", answer: "Most EV batteries are engineered to last 10-20 years. Manufacturers typically provide warranties guaranteeing performance for 8 years or 100,000 miles." },
        { id: 2, question: "Can EV batteries be recycled?", answer: "Yes, up to 95% of the rare earth metals and materials in an EV battery can be recovered and recycled for use in next-generation batteries." },
        { id: 3, question: "Does weather affect battery range?", answer: "Extreme cold or hot temperatures can temporarily reduce driving range by altering battery chemistry efficiency and requiring extra energy for thermal management." }
    ]);

    // Added paths to the articles
    const [articles] = useState([
        {
            id: 1,
            title: "Electric Vehicle Design: The Anatomy of an Electric Car",
            image: "/src/assets/evanatomy.png",
            tag: "Design",
            path: "/ev-architecture" // Added route path here
        },
        {
            id: 2,
            title: "Inside an Electric Vehicle Battery: What You Need to Know",
            image: "/src/assets/ev2.png",
            tag: "Technology",
            path: "/inside-battery"
        },
        {
            id: 3,
            title: "Breathe New Life: Repurposing Used Lithium-Ion Batteries (LIBs)",
            image: "/src/assets/article3.png",
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

    const [batteries, setBatteries] = useState([
        {
            id: 1,
            name: "Lithium-ion",
            benefits: "High energy density, superior power-to-weight ratio, efficient, durable, safe.",
            drawbacks: "Expensive, sensitive to extreme temperatures, requires complex thermal management."
        },
        {
            id: 2,
            name: "Nickel-metal hydride",
            benefits: "Highly reliable, longer overall lifespan, more life cycles than standard lithium-ion.",
            drawbacks: "Lower energy density, heavier, bulkier, susceptible to memory effect."
        },
        {
            id: 3,
            name: "Lead-acid",
            benefits: "Extremely cost-effective, easily and widely recycled.",
            drawbacks: "Low energy density, heavy, inefficient, shorter lifecycle, environmentally toxic if mishandled."
        },
        {
            id: 4,
            name: "Sodium-ion",
            benefits: "Significantly cheaper materials compared to lithium, abundant resources.",
            drawbacks: "Lower power-to-weight ratio. Still in developmental phases for long-range applications."
        }
    ]);

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
        // fetchBatteries();
    }, []);

    const toggleFaq = (id) => {
        setOpenFaqId(openFaqId === id ? null : id);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === BatteryTypes.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? BatteryTypes.length - 1 : prev - 1));
    };

    const nextArticle = () => {
        setArticleIndex((prev) => (prev + 1) % articles.length);
    };

    const prevArticle = () => {
        setArticleIndex((prev) => (prev - 1 + articles.length) % articles.length);
    };

    const getVisibleArticles = () => {
        const visible = [];
        for (let i = 0; i < 3; i++) {
            visible.push(articles[(articleIndex + i) % articles.length]);
        }
        return visible;
    };

    // Added function to handle article clicks
    const handleArticleClick = (path) => {
        if (path && path !== "#") {
            navigate(path);
        }
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
                        className="w-full h-full object-cover opacity-40 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-transparent to-[#050816]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-transparent to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mt-10">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase leading-tight">
                        BATTERIES THAT ARE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">CHARGING THE FUTURE</span>
                    </h1>
                </div>
            </section>

            {/* --- INTRO SECTION --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
                                    How do they <span className="text-cyan-400">run?</span>
                                </h2>
                                <p className="text-lg text-slate-400 leading-relaxed">
                                    Imagine driving a vehicle that runs purely on electrons instead of combustible fuel. Zero emissions, drastically reduced daily costs, and a ride that is whisper-quiet, incredibly smooth, and highly intelligent.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-lime-400 mb-3 uppercase tracking-wider">There’s more than one type?</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Absolutely. EVs utilize different chemical architectures to store and distribute electricity. Every battery chemistry offers a unique balance of energy density, lifecycle, and thermal stability tailored to specific mobility needs.
                                </p>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-[#0a0f25] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img src="/src/assets/evanatomy.png" alt="EV Anatomy Architecture" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                    <p className="text-sm text-cyan-400 font-mono tracking-widest uppercase">Platform Architecture</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TRENDS SLIDER --- */}
            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="absolute right-0 top-1/2 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />

                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Battery <span className="text-cyan-400">Technologies</span></h2>
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="p-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-full transition-all text-white hover:text-cyan-400">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={nextSlide} className="p-3 bg-white/5 hover:bg-cyan-500/20 border border-white/10 rounded-full transition-all text-white hover:text-cyan-400">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl h-[450px] bg-[#0a0f25]">
                        <img
                            src={BatteryTypes[currentSlide].image}
                            alt={BatteryTypes[currentSlide].title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>

                    <div className="lg:col-span-5 bg-white/[0.03] backdrop-blur-xl p-10 rounded-[2rem] border border-white/10 relative shadow-2xl">
                        <span className="absolute -top-8 right-8 text-8xl font-black text-white/[0.03] select-none pointer-events-none">
                            0{BatteryTypes[currentSlide].id}
                        </span>

                        <div className="inline-flex p-3 rounded-xl bg-white/5 border border-white/10 mb-6">
                            {BatteryTypes[currentSlide].icon}
                        </div>

                        <h3 className="text-3xl font-bold mb-4">{BatteryTypes[currentSlide].title}</h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">
                            {BatteryTypes[currentSlide].description}
                        </p>

                        <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/40 to-transparent border border-cyan-500/20">
                            <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <Zap size={14} />
                                {BatteryTypes[currentSlide].sub_title}
                            </h4>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                {BatteryTypes[currentSlide].sub_description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- COMPARISON TABLE SECTION --- */}
            <section className="py-24 max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">Chemical <span className="text-lime-400">Comparison</span></h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">Analyze the operational benefits and systemic drawbacks of different power units.</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0a0f25]/50 backdrop-blur-md overflow-hidden shadow-2xl">
                    {/* Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 bg-white/5 border-b border-white/10 text-sm uppercase tracking-wider font-bold text-cyan-400">
                        <div className="p-6">Chemistry Type</div>
                        <div className="p-6 md:border-l border-white/10">Key Benefits</div>
                        <div className="p-6 md:border-l border-white/10 text-lime-400">Drawbacks</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-white/5">
                        {batteries.map((battery) => (
                            <div key={battery.id} className="grid grid-cols-1 md:grid-cols-3 transition-colors hover:bg-white/[0.02]">
                                <div className="p-6 font-bold text-lg flex items-center">
                                    {battery.name}
                                </div>
                                <div className="p-6 md:border-l border-white/5 text-slate-300 text-sm leading-relaxed">
                                    {battery.benefits}
                                </div>
                                <div className="p-6 md:border-l border-white/5 text-slate-400 text-sm leading-relaxed">
                                    {battery.drawbacks}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- KNOWLEDGE BASE (FAQ & Articles) --- */}
            <section className="py-24 relative mt-12 border-t border-white/10 bg-[#070b1e]">
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
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Articles Area */}
                    <div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">
                            <h2 className="text-3xl font-black uppercase tracking-tight">Latest <span className="text-lime-400">Insights</span></h2>
                        </div>

                        {/* Articles Carousel Section */}
                        <div className="flex items-center justify-between gap-4">
                            {/* Left Arrow */}
                            <button onClick={prevArticle} className="bg-gray-200 hover:bg-gray-300 p-2 flex-shrink-0 transition-colors rounded-md">
                                <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Cards Container - Using dynamically sliced array */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                                {getVisibleArticles().map((article, idx) => (
                                    <div 
                                        key={`${article.id}-${idx}`} 
                                        onClick={() => handleArticleClick(article.path)} // Added click event here
                                        className="group cursor-pointer flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-cyan-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10"
                                    >
                                        <div className="w-full h-56 overflow-hidden relative">
                                            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-xs font-bold text-lime-400 uppercase tracking-wider">
                                                {article.tag}
                                            </div>
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f25] to-transparent opacity-80" />
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
                            <button onClick={nextArticle} className="bg-[#2a7ba8] hover:bg-[#1f6288] p-2 flex-shrink-0 transition-colors rounded-md">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
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

export default Battery;