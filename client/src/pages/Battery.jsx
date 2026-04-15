import React, { useState, useEffect } from 'react';
import { Heart, Zap, ShieldCheck, Banknote, LayoutGrid, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BatteryTypes = [
    {
        id: 1,
        title: "Lithium-ion batteries",
        image: "/src/assets/battery1.png",
        description: "These are the most widely used type of EV batteries, as they have a high energy density, meaning they can store more energy per unit mass than other batteries. There are 2 types of Lithium ion batteries that are widely used in electric vehicles – LFP (Lithium Ferrous Phosphate) and NMC (Nickel Manganese Cobalt).",
        sub_title: "Did you know?",
        sub_description: "LFP batteries have excellent thermal stability and safety due to which they are more tolerant of high temperatures making them a safer choice for EV batteries.",
        icon: <Zap className="text-cyan-400" size={20} />,
        glowColor: "group-hover:shadow-cyan-500/20"
    },
    {
        id: 2,
        title: "Nickel-metal hydride batteries",
        image: "/src/assets/battery2.png",
        description: "These are another type of EV batteries that are often used in hybrid vehicles, which combine an electric motor with a gasoline engine.",
        sub_title: "Did you know?",
        sub_description: "These batteries were used in some of the earliest electric vehicles in the 90s, but due to its disadvantages like extremely high cost most manufacturers stopped using it.",
        icon: <Banknote className="text-lime-400" size={20} />,
        glowColor: "group-hover:shadow-lime-500/20"
    },
    {
        id: 3,
        title: "Lead-acid batteries",
        image: "/src/assets/ev10.png",
        description: "These are the oldest type of EV batteries, and they are still used in some low-cost or low-performance EVs such as three wheelers and two wheelers.",
        sub_title: "Did you know?",
        sub_description: "Lead-acid batteries are the traditional type of battery used in most gasoline vehicles to crank the engine.",
        icon: <ShieldCheck className="text-blue-400" size={20} />,
        glowColor: "group-hover:shadow-blue-500/20"
    },
    {
        id: 4,
        title: "Sodium-ion battery",
        image: "/src/assets/ev11.png",
        description: "Acting as an alternative due to increased demand of lithium ion batteries, these batteries are still in development for their usage in EVs and delivery low cost vehicles!",
        sub_title: "Did you know?",
        sub_description: "Solid state sodium ion batteries don’t use liquid electrolyte like other batteries, they use solid electrolytes!",
        icon: <LayoutGrid className="text-yellow-400" size={20} />,
        glowColor: "group-hover:shadow-yellow-500/20"
    }
];

function Battery() {
    const [savedGuides, setSavedGuides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Moved from the incorrectly formatted BatteryTable component
    const [batteries, setBatteries] = useState([
        {
            id: 1,
            name: "Lithium-ion",
            benefits: "High energy density, high power-to-weight ratio, efficient, durable, safe",
            drawbacks: "Expensive, sensitive to temperature, need careful management"
        },
        {
            id: 2,
            name: "Nickel-metal hydride",
            benefits: "Cheaper, more reliable, longer lifespan, more life cycles than lithium-ion",
            drawbacks: "Lower energy density, lower power-to-weight ratio, heavier, bulkier, memory effect"
        },
        {
            id: 3,
            name: "Lead-acid",
            benefits: "Cheap, easy to recycle",
            drawbacks: "Low energy density, low power-to-weight ratio, inefficient, less durable, less safe"
        },
        {
            id: 4,
            name: "Sodium-ion Batteries",
            benefits: "Cheaper as compared to lithium-ion batteries",
            drawbacks: "Low energy density and power-to-weight ratio. Still in the development phase, can be used for low range electric vehicles"
        }
    ]);

    // Fetch from FastAPI backend
    useEffect(() => {
        const fetchBatteries = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/batteries');
                if (response.ok) {
                    const data = await response.json();
                    setBatteries(data);
                }
            } catch (error) {
                console.error("Failed to fetch batteries, using fallback data.", error);
            }
        };
        // Uncomment to fetch from API
        // fetchBatteries();
    }, []);

    const toggleSave = (id) => {
        setSavedGuides(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === BatteryTypes.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? BatteryTypes.length - 1 : prev - 1));
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
                        className="w-full h-full object-cover opacity-70 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/80 via-transparent to-[#050816]" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mt-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-6 animate-pulse">
                        <Zap size={14} />
                        Next-Gen Home Infrastructure
                    </div>

                    <div className="relative z-10 text-center px-6 max-w-4xl mt-20">
                        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                            EV Battery Anatomy
                        </h1>
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-32 relative">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />
                
                <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto text-center mb-16">
                    Explore the heart of electric vehicles with a deep dive into EV batteries. From Lithium-ion to Solid-State, we'll unravel the science behind these energy powerhouses. Get ready to supercharge your knowledge and learn how different batteries drive the electric future!
                </p>

                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                                How do they run?
                            </h1>

                            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-4">
                                Imagine driving a car that runs on electricity instead of fuel. A car that emits zero pollution and saves you money on fuel. A car that is quiet, smooth, and smart. That’s what electric vehicles (EVs) offer.
                            </p>

                            <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto mb-10">
                                But EVs are not all the same. They use different kinds of batteries to store and deliver electricity. Each battery has its own pros and cons, depending on how you use your car.
                            </p>

                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight uppercase">
                                There’s more than one type? Yes.
                            </h1>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- TRENDS SLIDER --- */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div className="flex gap-3">
                        <button onClick={prevSlide} className="p-4 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full transition-all group">
                            <ChevronLeft className="group-hover:scale-110" />
                        </button>
                        <button onClick={nextSlide} className="p-4 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full transition-all group">
                            <ChevronRight className="group-hover:scale-110" />
                        </button>
                    </div>
                </div>

                <div className="relative grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[500px]">
                        <img 
                            src={BatteryTypes[currentSlide].image} 
                            alt={BatteryTypes[currentSlide].title} 
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                    
                    <div className="md:col-span-5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md p-10 rounded-[40px] border border-white/10 relative">
                        <span className="absolute -top-10 right-10 text-8xl font-black text-white/5">
                            0{BatteryTypes[currentSlide].id}
                        </span>
                        <Zap className="text-cyan-400 mb-6" size={40} />
                        <h3 className="text-3xl font-bold mb-4">{BatteryTypes[currentSlide].title}</h3>
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            {BatteryTypes[currentSlide].description}
                        </p>
                        
                        <h4 className="text-2xl font-bold text-cyan-300 mt-6 mb-2">
                            {BatteryTypes[currentSlide].sub_title}
                        </h4>
                        
                        <p className="text-gray-400 text-base leading-relaxed italic border-l-4 border-cyan-500/50 pl-4">
                            {BatteryTypes[currentSlide].sub_description}
                        </p>
                    </div>
                </div>
            </section>

            {/* --- TABLE SECTION --- */}
            <section className="py-12 max-w-6xl mx-auto px-6">
                <h3 className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto text-center mb-16">
                    Types of batteries used in an electric vehicle
                </h3>

                <div className="flex flex-col space-y-4">
                    {/* Table Headers */}
                    <div className="grid grid-cols-3 gap-4 mb-2 text-center font-semibold text-white">
                        <div className="border-4 border-teal-200 rounded-2xl py-4 flex items-center justify-center">
                            Types of EV Battery
                        </div>
                        <div className="border-4 border-blue-300 rounded-2xl py-4 flex items-center justify-center">
                            Benefits
                        </div>
                        <div className="border-4 border-blue-400 rounded-2xl py-4 flex items-center justify-center">
                            Drawbacks
                        </div>
                    </div>

                    {/* Table Rows */}
                    <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg border border-white/10">
                        {batteries.map((battery, index) => (
                            <div 
                                key={battery.id} 
                                // Added text-gray-900 so the text is visible against the light background
                                className={`grid grid-cols-3 gap-4 p-6 items-center text-gray-900 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                            >
                                <div className="text-center font-bold">
                                    {battery.name}
                                </div>
                                <div className="text-sm px-4">
                                    {battery.benefits}
                                </div>
                                <div className="text-sm px-4">
                                    {battery.drawbacks}
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

export default Battery;