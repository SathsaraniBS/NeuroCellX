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

function Batterysafety() {
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
                        Discover what makes your EV batteries safe <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">CHARGING THE FUTURE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                       Learn all about the robust safety measures that ensure EV’s battery is not just powerful, but also secure.
                    </p>
                </div>
            </section>

            {/* --- INTRO SECTION --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        
                           
                       
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="absolute right-0 top-1/2 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />

                <div className="flex justify-between items-end mb-12">
                    

                
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

export default Batterysafety;