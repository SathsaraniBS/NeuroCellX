import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Zap, ShieldCheck, Banknote, LayoutGrid, ChevronLeft, ChevronRight, ChevronDown, ArrowRight, BatteryCharging } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

const Home_Charging_Benefits = [
    {
        id: 1,
        title: "Easy and Convenient",
        image: "/src/assets/ev8.png",
        description: "Just like your phones and computers, you can charge your EVs at home with an AC Fast Charger. These smart chargers are easy to operate through mobile apps.",
        icon: <Zap className="text-cyan-400" size={20} />,
        glowColor: "group-hover:shadow-cyan-500/40"
    },
    {
        id: 2,
        title: "Cost Efficient",
        image: "/src/assets/ev9.png",
        description: "With global energy prices slashing, switching to electric mobility is a smart financial move. Reduce your daily commute costs by up to 70%.",
        icon: <Banknote className="text-lime-400" size={20} />,
        glowColor: "group-hover:shadow-lime-500/40"
    },
    {
        id: 3,
        title: "Safe and Secure",
        image: "/src/assets/ev10.png",
        description: "Charge in a familiar, secure environment with built-in surge protection and battery health monitoring tailored for your home infrastructure.",
        icon: <ShieldCheck className="text-blue-400" size={20} />,
        glowColor: "group-hover:shadow-blue-500/40"
    }
];

const VIDEO_DATA = [
    { id: 1, title: "Strengthening the EV ecosystem", youtube_id: "T2Ewt-SbCkU" },
    { id: 2, title: " Strengthening the EV ecosystem", youtube_id: "fisLKXDrYv0" },
    { id: 3, title: " Strengthening the EV ecosystem", youtube_id: "mTm7Kz8bzC0" }
];

function Homecharging() {
    const [page, setPage] = useState(0);

    // Pagination Logic
    const videosPerPage = 2;
    const totalPages = Math.ceil(VIDEO_DATA.length / videosPerPage);
    const displayedVideos = VIDEO_DATA.slice(
        page * videosPerPage,
        (page + 1) * videosPerPage
    );

    const [articles] = useState([
            {
                id: 1,
                title: "Identify the right service partner",
                image: "/src/assets/evanatomy.png",
                tag: "Design",
                path: "/ev-architecture" // Added route path here
            },
            {
                id: 2,
                title: "Pick the right location in your home",
                image: "/src/assets/libattery-img.png", 
                tag: "Technology",
                path: "/inside-battery"
            },
            {
                id: 3,
                title: "Assess the availability of electrical load",
                image: "/src/assets/article3.png",
                tag: "Sustainability",
                path: "#"
    
            },
            {
                id: 4,
                title: "Get requisite approvals from respective stakeholders including Resident Welfare Associations, location owners or electricity companies",
                image: "/src/assets/ev12.png",
                tag: "History",
                path: "#"
            }
        ]);

    const [articleIndex, setArticleIndex] = useState(0);

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
                        src="/src/assets/evhome.png"
                        alt="EV Home Charging"
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
                            POWER YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">JOURNEY</span> FROM HOME
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
                            Turn your garage into a personal refueling station. Smart, efficient, and always ready for the road.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- BENEFITS SECTION --- */}
            <section className="py-32 relative">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-600/10 blur-[150px] -z-10" />

                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4 tracking-tight">
                                Charge while <br />
                                <span className="text-cyan-400">you recharge</span>
                            </h2>
                            <p className="text-slate-400 text-lg">
                                Experience the freedom of a full tank every morning. Our home solutions
                                are designed to integrate seamlessly with your lifestyle.
                            </p>
                        </div>

                    </div>

                    {/* UPDATED CARDS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {Home_Charging_Benefits.map((benefit) => (
                            <div
                                key={benefit.id}
                                className={`group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-2 ${benefit.glowColor} hover:shadow-2xl`}
                            >
                                {/* Background Image */}
                                <img
                                    src={benefit.image}
                                    alt={benefit.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient Overlay for text readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:bg-black/70" />

                                {/* Card Content */}
                                <div className="relative h-full flex flex-col justify-end p-8 z-10">
                                    <div className="flex items-center gap-3 mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                                            {benefit.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-white">{benefit.title}</h3>
                                    </div>

                                    {/* Description - Hidden by default, fades in on hover */}
                                    <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                                        <p className="text-slate-200 leading-relaxed text-[15px] border-t border-white/10 pt-4">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Calculator Component Wrapper */}
            <div className="relative py-20 bg-gradient-to-b from-transparent to-black/40">
                <EVCalculator />
            </div>

            <section className="py-24 relative mt-12 border-t border-white/10 bg-[#070b1e]">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Articles Area */}
                    <div>
                        <div className="flex justify-between items-end border-b border-white/10 pb-6 mb-10">
                            <h2 className="text-3xl font-black uppercase tracking-tight">Things to consider while  
                                <br />
                                <span className="text-cyan-400">installing an ev charger at home</span></h2>
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

            {/* Video Section */}
            <section className="py-24 px-6 relative">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase mb-4">
                            Want to see how <span className="text-cyan-400">is it done?</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayedVideos.map((video) => (
                            <div key={video.id} className="flex flex-col group">
                                <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-colors relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                    ></iframe>
                                </div>
                                <div className="mt-6 flex items-center justify-between px-2">
                                    <p className="text-white text-lg font-semibold tracking-wide">
                                        {video.title}
                                    </p>
                                    <span className="text-cyan-400 text-sm font-mono bg-cyan-500/10 px-3 py-1 rounded-full">TEST 0{video.id}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center space-x-4 mt-16">
                        <button
                            onClick={() => setPage(Math.max(0, page - 1))}
                            disabled={page === 0}
                            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${page === 0
                                ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:scale-110'
                                }`}
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex space-x-2">
                            {[...Array(totalPages)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-2 rounded-full transition-all duration-500 ${page === i ? 'w-8 bg-cyan-400' : 'w-2 bg-white/20'}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages - 1}
                            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${page >= totalPages - 1
                                ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                                : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:scale-110'
                                }`}
                        >
                            <ChevronRight size={24} />
                        </button>
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

export default Homecharging;