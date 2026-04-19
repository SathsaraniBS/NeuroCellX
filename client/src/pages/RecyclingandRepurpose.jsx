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

function RecyclingandRepurpose() {
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
            answer: "Yes, up to 95% of the rare earth metals and materials in an EV battery can be recovered and recycled for use in next-generation batteries."
        },
        { 
            id: 3, 
            question: "What will be estimated cost of repair if SOH % drop from 80% to 70% ?", 
            answer: "Extreme cold or hot temperatures can temporarily reduce driving range by altering battery chemistry efficiency and requiring extra energy for thermal management."
         },
        { 
            id: 4, 
            question: "How can the battery life of a car be increased ?", 
            answer: "Most EV batteries are engineered to last 10-20 years. Manufacturers typically provide warranties guaranteeing performance for 8 years or 100,000 miles." 
        }
    ]);

    const [articles] = useState([
        { id: 1, title: "Electric Vehicle Design: The Anatomy of an Electric Car", image: "/src/assets/evanatomy.png", tag: "Design", path: "/ev-architecture" },
        { id: 2, title: "Inside an Electric Vehicle Battery: What You Need to Know", image: "/src/assets/ev2.png", tag: "Technology", path: "/inside-battery" },
        { id: 3, title: "Breathe New Life: Repurposing Used Lithium-Ion Batteries", image: "/src/assets/article3.png", tag: "Sustainability", path: "#" },
        { id: 4, title: "History of EV's", image: "/src/assets/ev12.png", tag: "History", path: "#" }
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
        <div className="min-h-screen bg-[#050816] text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/src/assets/evrepair-img.png"
                        alt="EV Repair Hero"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000 opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-transparent" />
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                    <div className="max-w-3xl space-y-6 pt-20">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Zap size={14} className="fill-cyan-400" />
                            <span>Next-Gen Mobility Maintenance</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter drop-shadow-lg">
                            {activeEV.title}
                        </h1>
                        <p className="text-xl text-cyan-100/80 font-medium italic border-l-4 border-cyan-500 pl-4 bg-gradient-to-r from-cyan-500/10 to-transparent py-2">
                            "{activeEV.tagline}"
                        </p>
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

export default RecyclingandRepurpose;