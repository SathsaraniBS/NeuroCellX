import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, BatteryCharging, Zap, ShieldCheck } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const leftColumnTips = [
  {
    id: 1,
    description: "Lithium-ion batteries (LiB) use different types of cells according to different types of usage (e.g., cylindrical, prismatic, and pouch).",
  },
  {
    id: 2,
    description: "A cylindrical cell is enclosed in a rigid cylinder can. They are small and round, making it possible to stack them in devices of all sizes. Often used in EVs due to their lower manufacturing cost.",
  },
  {
    id: 3,
    description: "A prismatic cell is enclosed in a rigid, rectangular casing, allowing for efficient stacking within a battery module. They use steel or aluminum casings, making them highly stable.",
  },
  {
    id: 4,
    description: "For the same volume, stacked prismatic cells can release more energy at once, offering better performance and theoretically higher energy density than cylindrical cells.",
  }
];

const rightColumnTips = [
  {
    id: 5,
    description: "A pouch cell is characterized by its lightweight design and flexibility. Made of multiple layers of electrode materials enclosed in a flexible, heat-sealed pouch, they offer efficient space utilization within an EV's battery pack.",
  },
  {
    id: 6,
    description: "Currently, Prismatic cells are the most widely used worldwide in EVs and Energy Storage Solutions (ESS). The internal electrode sheet is either stacked or rolled and flattened.",
  }
];

const VIDEO_DATA = [
  { id: 1, title: "Battery Crush Test", youtube_id: "1W0w2lEwOPY" },
  { id: 2, title: "Thermal Runaway Prevention", youtube_id: "8svJ02q4Oeo" },
  { id: 3, title: "Water Ingress Testing (IP67)", youtube_id: "8svJ02q4Oeo" },
  { id: 4, title: "Nail Penetration Safety Test", youtube_id: "7_2ZTIQH1eQ" },
];

const TipCard = ({ tip }) => (
  <div className="group relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/40 transition-all duration-500 flex gap-5 mb-6 overflow-hidden hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:-translate-y-1">
    <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/20 group-hover:bg-cyan-400 transition-colors duration-500" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-sm font-bold bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full">
          Cell Fact 0{tip.id}
        </span>
      </div>
      <p className="text-slate-300 text-sm md:text-base leading-relaxed">{tip.description}</p>
    </div>
  </div>
);

function Batterylife() {
  const [page, setPage] = useState(0);
  const [openFaqId, setOpenFaqId] = useState(null);

  // Pagination Logic
  const videosPerPage = 2;
  const totalPages = Math.ceil(VIDEO_DATA.length / videosPerPage);
  const displayedVideos = VIDEO_DATA.slice(
    page * videosPerPage,
    (page + 1) * videosPerPage
  );

  const faqs = [
    {
      id: 1,
      question: "What is the expected lifespan of an EV battery?",
      answer: "Li-Ion batteries typically endure 10 to 15 years before needing replacement or refurbishment. Modern LFP type batteries have a capacity of 2000-2500 full charge cycles. If charged twice a week, this translates to roughly 20 years of usability. However, lifespan heavily depends on thermal management, depth of discharge, and operating conditions."
    },
    {
      id: 2,
      question: "How can battery degradation be minimized?",
      answer: "Keep the battery cool by parking in the shade, avoid relying exclusively on DC rapid charging, and follow the 20-80% charging rule. Do not drain the battery to 0% frequently, and avoid leaving the car plugged in at 100% for extended periods unless preparing for a long outstation trip."
    },
    {
      id: 3,
      question: "What happens when State of Health (SOH) drops to 80%?",
      answer: "A drop in SOH directly correlates to a drop in maximum range. If a vehicle can travel 300 miles at 100% SOH, it will travel approximately 240 miles when the SOH degrades to 80%. The vehicle will still drive normally, but the total energy capacity is reduced."
    },
    {
      id: 4,
      question: "How fast does SOH degrade year over year?",
      answer: "On average, you can expect a maximum SOH drop of about 10-15% over the first 5-8 years, leveling off after that. Modern thermal management systems have drastically reduced degradation rates compared to early generation EVs."
    }
  ];

  const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30 flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-b border-cyan-500/20">
          <div className="absolute inset-0 bg-[url('/src/assets/evstation.png')] bg-cover bg-center scale-105 animate-slow-zoom opacity-80" />
          <div className="absolute inset-0 " />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-emerald-900/30 mix-blend-overlay" />
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
           
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 tracking-tight">
              THE SCIENCE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                ENDURANCE
              </span>
            </h1>
            
          </div>
        </section>

        {/* Hero Header Section */}
      <section className="pt-32 pb-16 px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Abstract Glow */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none -z-10" />
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tight">
              HOW LONG DO <br />
              <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">EV BATTERIES</span> LAST?
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
              As electric vehicles race ahead in the innovation lane, one component stands at the center of this revolution: the battery. Discover the remarkable technology and impressive longevity powering the future.
            </p>
          </div>
          
          <div className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-transparent rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
            <img
              src="/src/assets/evbattery-cells.png"
              alt="EV Battery Architecture"
              className="relative w-full h-auto object-cover rounded-2xl shadow-2xl border border-white/10 transform transition-transform duration-700 group-hover:scale-[1.02]"
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop"; }}
            />
          </div>
        </div>
      </section>

      {/* Building Blocks Intro */}
      <section className="py-12 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#0a1122]/40 border border-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-6">
            The Building Blocks of <span className="text-cyan-400">Endurance</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-300 text-lg leading-relaxed">
            <p>
              In the world of EVs, the lifespan and stability of batteries form the cornerstone of a superior driving experience. The evolution of battery technology has drastically enhanced endurance, ensuring dependable performance and a sustainable driving future.
            </p>
            <p>
              The two main components that contribute to battery longevity are the <strong>Battery Cells</strong> and the <strong>Battery Management System (BMS)</strong> — acting as the heart and the brain of your Electric Vehicle.
            </p>
          </div>
        </div>
      </section>

        {/* Cells Section */}
        <section className="py-24 px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 md:w-2/3">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
                CELLS: THE HEARTBEAT OF <br />
                <span className="text-cyan-400">ENERGY STORAGE</span>
              </h2>
              <p className="text-slate-400 text-lg">
                The foundation of EV longevity lies in the physical cells. Understanding the geometry and chemistry of these units reveals how power is effectively stored and deployed.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="flex flex-col">
                {leftColumnTips.map(tip => <TipCard key={tip.id} tip={tip} />)}
              </div>
              <div className="flex flex-col">
                <div className="relative overflow-hidden rounded-3xl mb-8 h-64 md:h-[340px] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.1)] group">
                  <img
                    src="/src/assets/maintenance-img2.png"
                    alt="EV Cell Architecture"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/0a1122/06b6d4?text=Cell+Architecture"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/20 to-transparent" />
                </div>
                {rightColumnTips.map(tip => <TipCard key={tip.id} tip={tip} />)}
              </div>
            </div>
          </div>
        </section>

        {/* BMS Section */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-cyan-950/10 border-t border-white/5">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/5 blur-[150px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
                    BMS: The Brains <br />
                    <span className="text-emerald-400">Behind The Power</span>
                  </h2>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <ShieldCheck className="text-emerald-400" size={28} />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">What is BMS?</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8">
                    The Battery Management System (BMS) is an intelligent electronic control unit. It acts as the central nervous system, ensuring optimal conditions for every single cell within the battery modules.
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <BatteryCharging className="text-emerald-400" size={28} />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">Core Functions</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-8">
                    It continuously monitors charge levels, voltage, and thermal thresholds. By balancing the load across cells, it prevents overheating, deep discharging, and localized thermal runaway.
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="text-emerald-400" size={28} />
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">The Impact</h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    A highly optimized BMS drastically reduces degradation curves, ensuring your battery delivers consistent range and performance over hundreds of thousands of miles.
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-3xl blur-[20px] opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-[#0a0f25] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img 
                    src="/src/assets/bms.png" 
                    alt="BMS Architecture" 
                    className="w-full aspect-square md:aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-105" 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/0a1122/10b981?text=BMS+Architecture"; }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Testing Section */}
        <section className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase mb-4">
                Quality Assurance <span className="text-cyan-400">&</span> Testing
              </h2>
              <p className="text-slate-400 text-lg">Rigorous safety validations ensure extreme reliability under all conditions.</p>
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

            {/* Modern Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-16">
              <button
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  page === 0
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
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 ${
                  page >= totalPages - 1
                    ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                    : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:scale-110'
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 relative border-t border-white/5 bg-[#050816]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-center text-3xl md:text-5xl font-black text-white mb-16 tracking-wide uppercase">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openFaqId === faq.id 
                      ? 'bg-gradient-to-r from-cyan-900/20 to-[#050816] border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' 
                      : 'bg-white/5 border-white/10 hover:border-cyan-500/20 hover:bg-white/10'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center p-6 md:p-8 text-left focus:outline-none"
                  >
                    <span className={`font-bold text-lg md:text-xl transition-colors ${openFaqId === faq.id ? 'text-cyan-400' : 'text-white'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${openFaqId === faq.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-white'}`}>
                      <ChevronDown
                        className={`transform transition-transform duration-500 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                        size={20}
                      />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openFaqId === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-6 md:p-8 pt-0 text-slate-300 text-base md:text-lg leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 25s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Batterylife;