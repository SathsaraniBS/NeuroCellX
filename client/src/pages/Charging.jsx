import React, { useState, useEffect } from 'react';
import {
    Zap,
    ChevronRight,
    ChevronLeft,
    PlugZap,
    BatteryCharging,
    Timer,
    PlayCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DUMMY_VEHICLES = [
    {
        _id: "ev1",
        title: "Model Zenith S",
        poster: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop",
        range: "420 miles",
        topSpeed: "155 mph",
        acceleration: "3.1s",
        tagline: "The Future of Sustainable Performance",
        description: "Experience the pinnacle of electric engineering. The Zenith S combines industry-leading range with breathtaking acceleration, all wrapped in a zero-emission package."
    },
    {
        _id: "ev2",
        title: "EcoRunner SUV",
        poster: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&auto=format&fit=crop",
        range: "310 miles",
        topSpeed: "130 mph",
        acceleration: "5.4s",
        tagline: "Adventure without Compromise",
        description: "Built for the rugged outdoors, the EcoRunner SUV features dual-motor all-wheel drive and a reinforced battery chassis designed for any terrain."
    },
    {
        _id: "ev3",
        title: "Volt City Compact",
        poster: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop",
        range: "250 miles",
        topSpeed: "95 mph",
        acceleration: "7.2s",
        tagline: "Master the Modern Urban Jungle",
        description: "Agile, smart, and fully connected. The Volt City is the perfect companion for urban commuters looking to slash their carbon footprint."
    }
];

const FALLBACK_CHARGING_DATA = [
    { id: 1, level_name: "Level 1", voltage: "120V", description: "Standard home outlet. Best for overnight charging at home.", iconType: "level1" },
    { id: 2, level_name: "Level 2", voltage: "240V", description: "Fast home and public charging. Ideal for daily drivers.", iconType: "level2" },
    { id: 3, level_name: "DC Fast", voltage: "480V+", description: "Rapid commercial charging for long-distance travel.", iconType: "dcfast" }
];

const STATION_TYPES = [
    {
        id: 1,
        title: "Private / Home",
        image: "src/assets/ev5.png", // Updated fallback image
        bullets: [
            "Installed in private residences or apartment complexes.",
            "Usually Level 1 or Level 2 chargers for overnight use."
        ]
    },
    {
        id: 2,
        title: "Public Stations",
        image: "src/assets/evstation.png", // Updated fallback image
        bullets: [
            "Mostly available at public or commercial locations on a chargeable basis.",
            "Installed on the ground as per technical and electrical specifications.",
            "Often feature DC Fast Charging for rapid top-ups."
        ]
    }
];

function Charging() {
    const [vehicles] = useState(DUMMY_VEHICLES);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [chargingData, setChargingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // New state to control video playback
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    const activeEV = vehicles[currentHeroIndex];

    // Hero Section Rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroIndex((prev) => (prev + 1) % vehicles.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [vehicles.length]);

    // Fetch FastAPI Data
    useEffect(() => {
        const fetchChargingLevels = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/charging-levels');
                if (!response.ok) throw new Error("API Offline");
                const data = await response.json();
                setChargingData(data);
            } catch (error) {
                setChargingData(FALLBACK_CHARGING_DATA);
            } finally {
                setLoading(false);
            }
        };
        fetchChargingLevels();
    }, []);

    // Carousel Handlers
    const handlePrevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? STATION_TYPES.length - 1 : prev - 1));
    };

    const handleNextSlide = () => {
        setCurrentSlide((prev) => (prev === STATION_TYPES.length - 1 ? 0 : prev + 1));
    };

    const renderChargingIcon = (type) => {
        const base = "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110";
        if (type === 'level1') return <div className={`${base} bg-blue-500/20 text-blue-400`}><PlugZap size={32} /></div>;
        if (type === 'level2') return <div className={`${base} bg-green-500/20 text-green-400`}><BatteryCharging size={32} /></div>;
        return <div className={`${base} bg-purple-500/20 text-purple-400`}><Timer size={32} /></div>;
    };

    return (
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
            <Navbar />

            <main className="-mt-20 flex-grow">

                {/* HERO SECTION */}
                <section className="relative h-screen w-full overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src={activeEV?.poster}
                            alt={activeEV?.title}
                            className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                    </div>

                    <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
                        <div className="max-w-3xl space-y-6 pt-20">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-bold tracking-widest uppercase text-xs animate-fade-in">
                                <Zap size={14} className="fill-cyan-400" />
                                <span>Next-Gen Mobility</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">{activeEV?.title}</h1>
                            <p className="text-xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">"{activeEV?.tagline}"</p>

                            <div className="flex flex-wrap gap-4">
                                <Link to={`/inventory/${activeEV?._id}`} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl font-black uppercase tracking-wide flex items-center gap-2 transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]">
                                    Configure Now <ChevronRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CHARGING INFO SECTION */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-20 space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
                                Getting You Started
                            </h2>
                            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                                Whether you're new to EVs or a veteran, our guide helps you navigate the fundamentals of charging speeds and battery health.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            {/* Cards Grid */}
                            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                                {loading ? (
                                    <div className="col-span-3 text-center py-20"><div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto" /></div>
                                ) : (
                                    chargingData.map((level) => (
                                        <div key={level.id} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md hover:bg-white/10 transition-all group">
                                            {renderChargingIcon(level.iconType)}
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{level.level_name}</h3>
                                            <h4 className="text-3xl font-black text-white/90 mb-4">{level.voltage}</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">{level.description}</p>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Text Area */}
                            <div className="lg:w-1/3">
                                <div className="bg-cyan-500/10 border border-cyan-500/20 p-8 rounded-3xl relative">
                                    <h3 className="text-2xl font-black mb-4 uppercase text-white">What are charging levels?</h3>
                                    <p className="text-gray-400 text-base leading-relaxed mb-6">
                                        Charging speed is determined by the "Level" of the charger. From standard wall outlets to high-speed DC stations, we help you pick the right power for your journey.
                                    </p>
                                    <div className="h-1.5 w-16 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* COMPARISON SECTION */}
                <section className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                                It’s just like charging <span className="text-cyan-400">your phone</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-8">
                                Plug it in when you get home, and wake up to a full battery. VoltIQ provides real-time health insights and AI-driven predictions to ensure your "phone on wheels" stays healthy for years.
                            </p>
                            <button className="flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all">
                                Learn more about RUL Predictions <ChevronRight size={20} />
                            </button>
                        </div>
                        <div className="relative group">
                            {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                            <img
                                src="src/assets/ev4.png"
                                alt="EV Battery"
                                className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                            />
                            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                        </div>
                    </div>
                </section>

                {/* CLOSER LOOK CAROUSEL */}
                <section className="max-w-7xl mx-auto px-6 py-24 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase tracking-wide">
                            A Closer Look At Stations
                        </h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Main Image */}
                        <div className="relative w-full md:w-[85%] h-[400px] md:h-[500px] rounded-[30px] overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10">
                            <img
                                src={STATION_TYPES[currentSlide].image}
                                alt={STATION_TYPES[currentSlide].title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />

                            {/* Pagination Arrows */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-1/4 md:translate-x-0 flex gap-2 overflow-hidden z-20">
                                <button
                                    onClick={handlePrevSlide}
                                    className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={handleNextSlide}
                                    className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>

                        {/* Overlapping Info Card */}
                        <div className="md:absolute right-0 bottom-[-40px] md:translate-y-0 w-full md:w-[45%] bg-[#0a0f25]/90 backdrop-blur-xl rounded-[30px] shadow-2xl p-8 border border-cyan-500/30 z-10 mt-6 md:mt-0">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="text-lime-400" size={24} />
                                <h3 className="text-3xl font-black text-white">
                                    {STATION_TYPES[currentSlide].title}
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {STATION_TYPES[currentSlide].bullets.map((bullet, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Step Counter (02/02) */}
                        <div className="hidden md:block absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-30 select-none pointer-events-none">
                            <div className="text-7xl font-black text-white flex items-baseline">
                                {String(currentSlide + 1).padStart(2, '0')}
                                <span className="text-4xl text-gray-500 font-medium ml-2">
                                    /{String(STATION_TYPES.length).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VIDEO SECTION - Fully integrated into the dark EV theme */}
                <section className="max-w-7xl mx-auto px-6 py-24 mb-10">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12">

                        {/* Left: Interactive Video Player */}
                        <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black aspect-video group">
                            {!isVideoPlaying ? (
                                /* Custom Thumbnail Overlay that disappears on click */
                                <div 
                                    className="absolute inset-0 z-10 cursor-pointer"
                                    onClick={() => setIsVideoPlaying(true)}
                                >
                                    <img 
                                        src="https://img.youtube.com/vi/NWWW-bh_P_Q/maxresdefault.jpg" 
                                        alt="Video Thumbnail" 
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                    
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-cyan-500 text-[#050816] rounded-full p-4 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300">
                                            <PlayCircle size={40} className="fill-current" />
                                        </div>
                                    </div>
                                    
                                    {/* Mock Video Info Overlay */}
                                    <div className="absolute top-4 left-4 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs shadow-lg">MG</div>
                                        <div className="text-white drop-shadow-md bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                                            <p className="font-bold text-sm">Episode 6 | Types of chargers</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                /* Actual playing iframe (Notice the /embed/ format and ?autoplay=1) */
                                <iframe
                                    className="absolute inset-0 w-full h-full border-none"
                                    src="https://www.youtube.com/embed/NWWW-bh_P_Q?autoplay=1"
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                        {/* Right: Text Content (Updated to match dark EV theme) */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-lime-500/30 bg-lime-500/10 text-lime-400 font-bold tracking-widest uppercase text-xs">
                                <span>Educational Guide</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase leading-snug">
                                What Are The Different Types Of Chargers?
                            </h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Understanding how your EV draws power is crucial for maximizing battery lifespan and planning long trips effectively.
                            </p>
                            <ul className="space-y-4 pt-4">
                                <li className="flex items-start gap-3 text-gray-300">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] shrink-0" />
                                    <span>India supports 5 standard types of charging connectors.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-300">
                                    <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] shrink-0" />
                                    <span>They provide slow, moderate, and ultra-fast charging depending on infrastructure specifications.</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </section>

            </main>

            <Footer />

            <style>{`
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom { animation: slow-zoom 20s infinite alternate linear; }
                
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 1s ease-out forwards; }
            `}</style>
        </div>
    );
}

export default Charging;