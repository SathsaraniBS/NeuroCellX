import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';



function Batterysafety() {
    const navigate = useNavigate(); // Added for navigation
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaqId, setOpenFaqId] = useState(null);
    const [articleIndex, setArticleIndex] = useState(0);
    const [activeEV, setActiveEV] = useState(null);

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
        // <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
        <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">

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

                        <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">Battery Safety:<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Maintenance & Ownership Guide</span></h1>
                        <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Learn how to keep your electric vehicle battery healthy,<br />
                            save money, and extend its life.</p>
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

            {/* --- INTRO SECTION --- */}
            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans bg-transparent">
                {/* Top Header Section */}
                <div className="text-center mb-16">
                    <p className="text-gray-400 text-lg md:text-xl text-sm md:text-base max-w-5xl mx-auto mb-8">
                        Learn about the robust safety measures in place to ensure your electric vehicle's battery is not just a power source but a secure one. We've got your back on the road to a safer, cleaner tomorrow.
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-black leading-tight uppercase tracking-tight">
                    {/* <h2 className="text-2xl md:text-4xl font-bold text-[#3B82F6] uppercase tracking-wide mb-6"> */}
                        DISCOVER WHAT MAKES 
                         <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"> YOUR EV BATTERIES SAFE </span>
                    </h2>
                    <p className="text-gray-400 text-lg  text-base md:text-lg">
                        Learn all about the robust safety measures that ensure EV's battery is not just powerful, but also secure.
                    </p>
                </div>

                {/* Two Column Layout */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Column: Image */}
                    <div className="w-full lg:w-1/2">
                        {/* Note: Replace the src with the actual image path in your public folder or asset imports */}
                        <img
                            src="/src/assets/ssb.png"
                            alt="Cylindrical EV battery cells in a pack on an assembly line"
                            className="w-full h-auto object-cover rounded shadow-sm"
                        />
                    </div>

                    {/* Right Column: Content */}
                    <div className="w-full lg:w-1/2">
                        <h3 className="text-xl md:text-2xl font-bold text-[#3B82F6] uppercase mb-6 text-center lg:text-left">
                            THE “SAFETY FIRST” DESIGN APPROACH
                        </h3>
                        <p className="text-gray-400 text-lg  mb-6 leading-relaxed">
                            Electric vehicle batteries are designed meticulously to endure the test of time and work under varied weather conditions. To achieve this, EV batteries undergo rigorous safety testing.
                        </p>

                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
                                <p className="text-gray-400 text-lg  leading-relaxed">
                                    <strong className="font-bold text-black">Temperature management-</strong> EV batteries excel in temperature regulation. They employ advanced thermal management systems to prevent overheating and enhance safety.
                                </p>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
                                <p className="text-gray-400 text-lg  leading-relaxed">
                                    <strong className="font-bold text-black">Stringent testing-</strong> Before they find a place in your vehicle, EV batteries are subjected to some of the most rigorous safety tests. These include extreme weather simulations and physical impact tests and testing performance with local road and weather conditions.
                                </p>
                            </li>
                            <li className="flex items-start">
                                <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
                                <p className="text-gray-400 text-lg  leading-relaxed">
                                    <strong className="font-bold text-black">Safety Enhancements-</strong> EV batteries also come with multiple layers of safety features such as protective casings, fail-safe circuits, and advanced software algorithms that monitor battery health in real-time.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                            Thoroughly tested for a <span className="text-cyan-400">reliable drive</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Batteries used in electric cars undergo rigorous testing for almost every imaginable road condition, including those rare ones you'd likely never encounter. Before becoming the heart of your vehicle, your EV battery faces many extreme situations.

                        </p>
                        <p className="text-gray-400 text-lg mb-8">
                            Sophisticated computer simulations further assess its behaviour across a myriad of conditions. So, as you drive down the road, know that your EV's battery isn't just efficient—it's exceptionally reliable.

                        </p>

                    </div>
                    <div className="relative group">
                        {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                        <img
                            src="src/assets/evsafety1.png"
                            alt="EV Battery"
                            className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                        />
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                    </div>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans bg-transparent">

                {/* DID YOU KNOW Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3B82F6] uppercase tracking-wide text-center mb-8">
                        DID YOU <span className="text-cyan-400">KNOW ?</span>
                    </h2>
                    <p className="text-gray-400 text-lg  text-base md:text-lg mb-6 leading-relaxed">
                        MG ZS EV battery conforms to the most advanced safety tests and its battery safety management meets stringent requirements to enhance overall durability, maintain stable battery operation and ensures a longer lifespan in Indian environmental conditions.
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-gray-400 text-lg  text-base md:text-lg">
                        <li>ASIL – D: Enhanced Safety Integrity Level</li>
                        <li>IP69K: Better Dust & Water Resistance Rating</li>
                        <li>UL2580: Safety Management System</li>
                    </ul>
                </div>

                {/* YOUR BIT IN ENSURING BATTERY SAFETY Section */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-400 text-lg  uppercase tracking-wide text-center mb-8">
                        YOUR BIT IN ENSURING <span className="text-cyan-400"> BATTERY SAFETY </span>
                    </h2>
                    <p className="text-gray-400 text-lg  text-base md:text-lg mb-6 leading-relaxed">
                        Safety isn't just about the initial design; it's also about maintenance. Here's how you can ensure the longevity and safety of your EV battery
                    </p>
                    <ul className="list-disc pl-8 space-y-2 text-gray-400 text-lg  text-base md:text-lg">
                        <li>Maintain proper charging habits.</li>
                        <li>Regular software and firmware updates.</li>
                        <li>Scheduled maintenance checks.</li>
                    </ul>
                </div>

                {/* FACTORS AFFECTING THE PERFORMANCE Section */}
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3B82F6] uppercase tracking-wide text-center mb-8">
                        FACTORS AFFECTING THE PERFORMANCE <span className="text-cyan-400">OF EV BATTERIES </span>
                    </h2>
                    <p className="text-gray-400 text-lg text-base md:text-lg leading-relaxed">
                        EV batteries can be affected due to various reasons, some of them are:
                    </p>
                </div>

            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">

                    <div className="relative group">
                        {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                        <img
                            src="src/assets/evsafety2.png"
                            alt="EV Battery"
                            className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                        />
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                    </div>

                    <div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                            Thermal
                             <span className="text-cyan-400"> runaway </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            A rapid increase in temperature and pressure within the battery cell leading to destabilising and degradation of battery content. Though lithium-ion batteries are a part of the BMS (battery management system) which regulates the current flow and battery temperature while charging the batteries, one can still follow the simplest ways to ensure extra safety,


                        </p>
                        <p className="text-gray-400 text-lg mb-8">
                            EVs should be charged in well-ventilated open spaces to maintain the temperature of the batteries.

                        </p>

                        <p className="text-gray-400 text-lg mb-8">
                            Avoid charging beyond the standard and recommended charging time.

                        </p>

                        <p className="text-gray-400 text-lg mb-8">
                            Ensure Regular vehicle service and checkups.

                        </p>

                    </div>

                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                            Overcharging or <span className="text-cyan-400">undercharging </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            A condition where the battery is charged beyond its capacity which can lead to early deterioration of battery's state of health and performance. Timely and mindful charging can protect the battery from early-stage damage.

                        </p>


                    </div>
                    <div className="relative group">
                        {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                        <img
                            src="src/assets/evsafety3.png"
                            alt="EV Battery"
                            className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                        />
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                    </div>
                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">

                    <div className="relative group">
                        {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                        <img
                            src="src/assets/ev4.png"
                            alt="EV Battery"
                            className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                        />
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                    </div>

                    <div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                            Mechanical    <span className="text-cyan-400"> Damage </span>

                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            A physical impact or deformation of the battery due to a physical impact might to lead internal damages in certain cases which can affect the battery performance hence, an immediate follow-up checkup with the vendor will ensure battery health and safety to the customer. The authorised vendor will check for any damage caused to the battery and take necessary actions to safeguard the vehicle.


                        </p>


                    </div>

                </div>
            </section>

            <section className="py-24 max-w-7xl mx-auto px-6 relative">
                <div className="grid md:grid-cols-2 gap-12 items-center  p-10 bg-transparent overflow-hidden relative">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                            Cell imbalance

                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            A mismatch in the state of charge or state of health of the individual cells in a battery pack, resulting in reduced performance, accelerated degradation. Imbalanced cells lock away otherwise usable energy and increase battery degradation. Batteries that are out of balance cannot be fully charged or fully discharged, hence keeping an eye on the discharge pattern of the battery and immediately reporting in case of anomaly.

                        </p>


                    </div>
                    <div className="relative group">
                        {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                        <img
                            src="src/assets/evsafety3.png"
                            alt="EV Battery"
                            className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                        />
                        <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
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

export default Batterysafety;