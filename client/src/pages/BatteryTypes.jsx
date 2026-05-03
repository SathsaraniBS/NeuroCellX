// import React from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { Download, Zap, ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, Cpu, Gauge, ThermometerSnowflake 
// } from "lucide-react";

// const BatteryTypes = () => {
//   return (

//     <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
//             <Navbar />

//             {/* HERO SECTION */}
//             <section className="relative h-screen w-full overflow-hidden">
//                 <div className="absolute inset-0">
//                     <img
//                         src="/src/assets/ev3.png"
//                         alt="EV Background"
//                         className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
//                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
//                 </div>

//                 <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
//                     <div className="max-w-3xl space-y-6 pt-20">

//                         <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">EV Care:<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Maintenance & Ownership Guide</span></h1>
//                         <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Learn how to keep your electric vehicle healthy,<br />
//                             save money, and extend its life.</p>
//                     </div>
//                 </div>
//                 <div className="flex gap-4 pt-6 pl-6 absolute left-30 bottom-10"> 
//                     {/* Fixed: removed undefined activeEV variable from the link path */}
//                     <a
//                         href="/ev-manual.pdf" 
//                         download="EV_Maintenance_Manual.pdf"
//                         className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
//                     >
//                         Download Manual
//                         <Download  className="w-5 h-5" />
//                     </a>
                    
//                 </div>
//             </section>
   


//       <main className="flex-grow relative z-10 px-6 md:px-10 py-16 max-w-7xl mx-auto w-full">
        
//         {/* Hero Section */}
//         <section className="mb-20 text-center md:text-left">
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
//             <Zap size={14} /> Energy Intelligence
//           </div>
//           <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
//             EV Battery <br /> Technologies
//           </h1>
          
//           <div className="max-w-3xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
//             <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
//             <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
//               <Cpu size={20} /> The Heart of the Machine
//             </h2>
//             <blockquote className="text-lg text-gray-300 italic leading-relaxed">
//               “The battery remains the single most expensive component in an EV, and it’s the key determinant of both performance and price.”
//             </blockquote>
//             <p className="mt-4 text-sm text-gray-500 font-bold uppercase tracking-wider">— Sam Abuelsamid, Guidehouse Insights</p>
//           </div>
//         </section>

//         {/* Market Overview */}
//         <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
//               <TrendingUp className="text-green-400" /> Market Landscape
//             </h2>
//             <p className="text-gray-400 text-xl leading-relaxed">
//               The EV industry is currently dominated by three core chemistries: 
//               <span className="text-white font-semibold"> LFP, NMC, and NCA</span>. 
//               Together, these power over 90% of all electric vehicles on the road today, balancing the trade-offs between range, safety, and cost.
//             </p>
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
//               <div className="text-3xl font-black text-cyan-400 mb-1">90%+</div>
//               <div className="text-xs text-gray-500 uppercase tracking-widest">Market Share</div>
//             </div>
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
//               <div className="text-3xl font-black text-green-400 mb-1">$53-85</div>
//               <div className="text-xs text-gray-500 uppercase tracking-widest">Cost per kWh</div>
//             </div>
//           </div>
//         </section>

//         {/* NMC SECTION */}
//         <section className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-16 transition-all hover:border-cyan-500/30">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//             <div>
//               <h2 className="text-4xl font-black text-white mb-2">Lithium NMC</h2>
//               <p className="text-cyan-400 font-mono tracking-tighter">Nickel Manganese Cobalt</p>
//             </div>
//             <div className="px-6 py-2 bg-cyan-500 text-black font-black rounded-full text-sm">Long Range Standard</div>
//           </div>

//           <p className="text-gray-300 mb-10 text-lg max-w-4xl leading-relaxed">
//             NMC batteries are the industry workhorse for premium performance. They offer the highest energy density for passenger vehicles, making them the default choice for long-range Tesla models and European luxury EVs.
//           </p>

//           <div className="grid lg:grid-cols-3 gap-8">
//             {/* Stats */}
//             <div className="space-y-4">
//               <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Specifications</h3>
//               <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
//                 <Gauge className="text-cyan-400" />
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase">Energy Density</p>
//                   <p className="font-bold">200-350 Wh/kg</p>
//                 </div>
//               </div>
//               <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
//                 <Zap className="text-cyan-400" />
//                 <div>
//                   <p className="text-xs text-gray-500 uppercase">Operating Voltage</p>
//                   <p className="font-bold">3.6V - 3.7V</p>
//                 </div>
//               </div>
//             </div>

//             {/* Pros & Cons */}
//             <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-3xl">
//               <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
//                 <CheckCircle2 size={18} /> Performance Pros
//               </h3>
//               <ul className="text-sm text-gray-300 space-y-3">
//                 <li className="flex gap-2"><span>•</span> Superior fast-charging capabilities</li>
//                 <li className="flex gap-2"><span>•</span> 30-40% lighter than LFP for same range</li>
//                 <li className="flex gap-2"><span>•</span> Excellent cold-weather discharge</li>
//               </ul>
//             </div>

//             <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
//               <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
//                 <AlertTriangle size={18} /> Critical Risks
//               </h3>
//               <ul className="text-sm text-gray-300 space-y-3">
//                 <li className="flex gap-2"><span>•</span> Geopolitical cobalt supply issues</li>
//                 <li className="flex gap-2"><span>•</span> Higher risk of thermal runaway</li>
//                 <li className="flex gap-2"><span>•</span> More expensive raw materials</li>
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* LFP SECTION */}
//         <section className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-16 transition-all hover:border-green-500/30">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
//             <div>
//               <h2 className="text-4xl font-black text-white mb-2">Lithium LFP</h2>
//               <p className="text-green-400 font-mono tracking-tighter">Lithium Iron Phosphate</p>
//             </div>
//             <div className="px-6 py-2 bg-green-500 text-black font-black rounded-full text-sm">Economy & Safety King</div>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 mb-12">
//             <div>
//                <p className="text-gray-300 text-lg leading-relaxed mb-6">
//                 LFP is rapidly becoming the standard for entry-level EVs and commercial fleets. By removing Cobalt and Nickel, manufacturers can slash costs while providing a battery that can last over 10 years of daily use.
//               </p>
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
//                   <p className="text-xs text-gray-500 mb-1">Lifespan</p>
//                   <p className="font-bold text-green-400">3000+ Cycles</p>
//                 </div>
//                 <div className="bg-black/40 p-4 rounded-xl border border-white/5">
//                   <p className="text-xs text-gray-500 mb-1">Avg. Cost</p>
//                   <p className="font-bold text-green-400">~$53 /kWh</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="space-y-4">
//               <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
//                 <div className="text-green-400"><ShieldCheck /></div>
//                 <div>
//                   <p className="font-bold">Thermal Stability</p>
//                   <p className="text-sm text-gray-400">Virtually impossible to ignite under normal crash conditions.</p>
//                 </div>
//               </div>
//               <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
//                 <div className="text-blue-400"><ThermometerSnowflake /></div>
//                 <div>
//                   <p className="font-bold">Cold Performance</p>
//                   <p className="text-sm text-gray-400">Main weakness: 20-30% range loss in sub-zero temps.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* NCA SECTION */}
//         <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 shadow-lg">
//           <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-3">
//             <Zap /> Nickel NCA (Premium Performance)
//           </h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             <div className="md:col-span-2">
//               <p className="text-gray-300 text-lg mb-6">
//                 Commonly associated with Panasonic and Tesla, NCA batteries offer high specific energy and power. They are designed for vehicles where weight is the primary enemy of performance.
//               </p>
//               <ul className="grid grid-cols-2 gap-4 text-sm">
//                 <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">High energy density: 250 Wh/kg</li>
//                 <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">High Power delivery</li>
//                 <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">3.2V - 3.6V Range</li>
//                 <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">Fast acceleration support</li>
//               </ul>
//             </div>
//             <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
//               <h4 className="font-bold mb-2">Usage Case:</h4>
//               <p className="text-sm text-gray-400 italic">"Used primarily in Tesla Model S/X to achieve 0-60 in under 3 seconds while maintaining a lightweight chassis."</p>
//             </div>
//           </div>
//         </section>

//         {/* SOLID STATE SECTION */}
//         <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-[3rem] p-8 md:p-16 mb-20 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
//           <div className="relative z-10 text-center max-w-3xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter">
//               SOLID-STATE: <span className="text-purple-400">The Holy Grail</span>
//             </h2>
//             <p className="text-xl text-gray-300 mb-10">
//               Replacing liquid electrolytes with solid ceramics. Imagine a car that charges in 10 minutes and drives 1,000km on a single charge.
//             </p>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {['Non-Flammable', '500+ Wh/kg', '10 Min Charge', 'Ultra-Light'].map((feature) => (
//                 <div key={feature} className="px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/10 text-xs font-bold text-purple-300">
//                   {feature}
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* Decorative element */}
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 blur-[100px] pointer-events-none"></div>
//         </section>

//         {/* Expert Insight Footer */}
//         <section className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-3xl bg-cyan-500 text-black shadow-2xl">
//           <div className="p-4 bg-black rounded-2xl text-cyan-500">
//             <Zap size={40} fill="currentColor" />
//           </div>
//           <div>
//             <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">The LMFP Frontier</h3>
//             <p className="font-medium text-black/80 text-lg">
//               Next-generation technologies like LMFP (Lithium Manganese Iron Phosphate) are bridge chemistries that aim to increase EV range by up to 20% while keeping LFP's safety and low price point.
//             </p>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default BatteryTypes;

import React, { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  FlaskConical,
  Rocket,
  ShieldCheck,
  Wrench,
  XCircle,
  Zap,
  Snowflake,
  Cpu,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BatteryTypes = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const chemistries = [
    {
      no: "1.",
      title: "Lead-acid",
      sub: "Older Battery Tech",
      desc: "Heavy, low-energy-density technology, widely used in older cars and 12V systems.",
      icon: BatteryCharging,
      color: "text-slate-300",
      glow: "shadow-[0_0_35px_rgba(148,163,184,0.25)]",
      bg: "from-slate-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "bad", "Very Low"],
        ["Cost", "good", "Very Low"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "bad", "Short"],
      ],
    },
    {
      no: "2.",
      title: "NiMH",
      sub: "Nickel-metal Hydride",
      desc: "Used mainly in hybrids. More energy than lead-acid but heavier than Li-ion.",
      icon: BatteryCharging,
      color: "text-emerald-300",
      glow: "shadow-[0_0_35px_rgba(16,185,129,0.25)]",
      bg: "from-emerald-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "bad", "Low"],
        ["Cost", "warn", "Medium"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "warn", "Medium"],
      ],
    },
    {
      no: "3.",
      title: "Lithium-ion",
      sub: "General EV Standard",
      desc: "Today’s dominant EV battery family. Includes NMC, NCA, LFP, LMFP and more.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(34,211,238,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "High"],
        ["Cost", "warn", "Medium"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "good", "Long"],
      ],
    },
    {
      no: "4.",
      title: "LFP",
      sub: "Lithium Iron Phosphate",
      desc: "Cobalt-free lithium-ion chemistry known for safety, durability and lower cost.",
      icon: ShieldCheck,
      color: "text-teal-300",
      glow: "shadow-[0_0_35px_rgba(45,212,191,0.25)]",
      bg: "from-teal-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "warn", "Medium"],
        ["Cost", "good", "Low"],
        ["Safety", "good", "Excellent"],
        ["Life / Longevity", "good", "Very Long"],
      ],
    },
    {
      no: "5.",
      title: "NMC / NCA",
      sub: "High Performance Chemistry",
      desc: "High energy density chemistry offering long range and strong performance.",
      icon: Zap,
      color: "text-violet-300",
      glow: "shadow-[0_0_35px_rgba(139,92,246,0.25)]",
      bg: "from-violet-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "Very High"],
        ["Cost", "bad", "High"],
        ["Safety", "warn", "Good"],
        ["Life / Longevity", "warn", "Medium – Long"],
      ],
    },
    {
      no: "6.",
      title: "Solid-State",
      sub: "Next Generation",
      desc: "Uses solid electrolyte instead of liquid. Very high energy density and superior safety.",
      icon: Sparkles,
      color: "text-blue-300",
      glow: "shadow-[0_0_35px_rgba(96,165,250,0.25)]",
      bg: "from-blue-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "Very High"],
        ["Cost", "bad", "Very High"],
        ["Safety", "good", "Excellent"],
        ["Life / Longevity", "good", "Very Long Potential"],
      ],
    },
    {
      no: "7.",
      title: "Sodium-ion",
      sub: "Low Cost Future Tech",
      desc: "Uses sodium instead of lithium. Low cost, safe, and good for cold climates.",
      icon: Snowflake,
      color: "text-orange-300",
      glow: "shadow-[0_0_35px_rgba(251,146,60,0.25)]",
      bg: "from-orange-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "warn", "Low – Medium"],
        ["Cost", "good", "Low"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "warn", "Medium – Long Potential"],
      ],
    },
  ];

  const compareRows = [
    ["Energy Density (Wh/kg)", "30 – 50", "60 – 120", "90 – 160", "150 – 250", "300 – 500+*", "100 – 160"],
    ["EV Range Friendliness", "Very Low", "Low", "Good", "Excellent", "Excellent", "Medium"],
    ["Relative Cost", "Very Low", "Low – Medium", "Low – Medium", "High", "Very High", "Low"],
    ["Safety", "Good", "Good", "Excellent", "Good", "Excellent", "Good"],
    ["Cycle Life / Longevity", "200 – 500", "500 – 1,000", "2,000 – 5,000+", "1,000 – 2,000+", "5,000+ Potential", "1,000 – 3,000 Potential"],
    ["Maturity Level", "Mature Old Tech", "Mature Older", "Mature Widely Used", "Mature Widely Used", "Emerging Pilot", "Emerging Ramp-up"],
  ];

  const fitCards = [
    {
      title: "Want maximum range and performance?",
      text: "Choose NMC/NCA for highest energy density and long-range performance.",
      link: "See EV Buying Guide",
      icon: Rocket,
      color: "text-cyan-300",
    },
    {
      title: "Want low-cost, safe, long-life everyday EV?",
      text: "LFP is the best balance of safety, life, and total cost of ownership.",
      link: "See Battery Care Guide",
      icon: ShieldCheck,
      color: "text-emerald-300",
    },
    {
      title: "Curious about future-tech and high-end cars?",
      text: "Solid-state offers very high potential in range and safety.",
      link: "See EV Technologies",
      icon: Sparkles,
      color: "text-violet-300",
    },
    {
      title: "Cost-sensitive or city-use focused?",
      text: "LFP or Sodium-ion are ideal for daily city use where available.",
      link: "See Trip Planner",
      icon: BatteryCharging,
      color: "text-orange-300",
    },
  ];

  const faqs = [
    "What is the best battery for an EV today?",
    "How long do EV batteries last?",
    "Is LFP better than NMC?",
    "Are solid-state batteries available now?",
    "Do cold temperatures affect EV batteries?",
    "Can I replace my EV battery?",
  ];

  return (
    <div className="min-h-screen bg-[#050816] font-sans text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative min-h-[92vh] pt-28">
          <div className="absolute inset-0">
            <img
              src="/src/assets/evstation.png"
              alt="EV battery chemistry hero"
              className="h-full w-full object-cover opacity-40"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/90 to-[#050816]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/80" />
            <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
                <BatteryCharging className="h-4 w-4" />
                EV Battery Learning
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
                EV Battery Types
                <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
                  & Chemistry
                </span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-4 border-cyan-400 pl-5 text-lg leading-8 text-cyan-50/80 md:text-2xl">
                Compare lead-acid, NiMH, lithium-ion, NMC, LFP, solid-state, and
                sodium-ion batteries for EV range, cost, safety, and lifespan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#chemistry"
                  className="group inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-black uppercase text-[#050816] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                >
                  Explore Chemistry
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="#comparison"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-8 py-4 font-bold uppercase text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-300"
                >
                  Compare Batteries
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-[90px]" />

              <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-white/[0.06] p-6 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
                <div className="rounded-[2rem] border border-white/10 bg-[#07111f]/90 p-6">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                        Chemistry Stack
                      </p>
                      <h3 className="mt-2 text-2xl font-black">
                        Battery Evolution
                      </h3>
                    </div>
                    <FlaskConical className="h-10 w-10 text-cyan-300" />
                  </div>

                  <div className="flex min-h-[280px] items-end justify-center gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                    <BatteryPillar label="LEAD ACID" height="h-36" color="bg-slate-500" />
                    <BatteryPillar label="NiMH" height="h-48" color="bg-emerald-500" />
                    <BatteryPillar label="LFP" height="h-56" color="bg-blue-500" />
                    <BatteryPillar label="NMC" height="h-60" color="bg-violet-500" />
                    <BatteryPillar label="SOLID STATE" height="h-64" color="bg-cyan-500" />
                    <BatteryPillar label="Na-ION" height="h-52" color="bg-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-white/[0.04] to-emerald-500/10 p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl md:grid-cols-3">
              <InfoPanel
                icon={BatteryCharging}
                title="Why Chemistry Matters"
                text="Battery chemistry directly affects range, weight, cost, safety, charging behavior, and long-term battery life."
              />
              <InfoPanel
                icon={Cpu}
                title="Modern EV Standard"
                text="Most modern EVs use lithium-ion batteries such as NMC, NCA, and LFP because they balance power, range, and reliability."
              />
              <InfoPanel
                icon={Sparkles}
                title="Future Innovation"
                text="Solid-state and sodium-ion batteries are shaping the next stage of safer, cheaper, and more efficient EV technology."
              />
            </div>
          </div>
        </section>

        <section id="chemistry" className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Battery Chemistry"
            title="Battery Chemistry Explained"
            text="Each chemistry has different strengths. Some are cheaper, some are safer, and some are better for long range."
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {chemistries.slice(0, 4).map((item) => (
              <ChemistryCard key={item.title} item={item} />
            ))}
          </div>

          <div className="mx-auto mt-6 grid max-w-7xl gap-6 md:grid-cols-3">
            {chemistries.slice(4).map((item) => (
              <ChemistryCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section id="comparison" className="relative px-6 py-24">
          <SectionTitle
            eyebrow="EV Use Focus"
            title="Quick Battery Comparison"
            text="Use this table to compare battery chemistry by energy density, cost, safety, cycle life, and maturity."
          />

          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["Chemistry", "Lead-acid", "NiMH", "LFP", "NMC / NCA", "Solid-State", "Sodium-ion"].map((head) => (
                      <th
                        key={head}
                        className="border border-white/10 bg-cyan-400/10 px-5 py-4 text-left font-black uppercase tracking-wide text-cyan-200"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="transition hover:bg-white/[0.04]">
                      <td className="border border-white/10 px-5 py-4 font-bold text-white">
                        <span className="inline-flex items-center gap-2">
                          <CircleDot className="h-4 w-4 text-cyan-300" />
                          {row[0]}
                        </span>
                      </td>

                      {row.slice(1).map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className="border border-white/10 px-5 py-4 leading-6 text-slate-300"
                        >
                          <StatusDot value={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mx-auto mt-4 max-w-7xl text-sm font-semibold text-slate-500">
            * Solid-state values are estimated potential values because the technology is still emerging.
          </p>
        </section>

        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Choose Smart"
            title="Which Chemistry Fits Your EV?"
            text="The best battery depends on whether you need maximum range, lower cost, safety, or future-ready technology."
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
            {fitCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.title}
                  className="group rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
                >
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${card.color}`}>
                    <Icon className="h-9 w-9" />
                  </div>

                  <h3 className="mb-3 text-lg font-black text-white">
                    {card.title}
                  </h3>

                  <p className="mb-6 text-sm leading-7 text-slate-400">
                    {card.text}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition group-hover:gap-3"
                  >
                    {card.link}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Questions"
            title="Frequently Asked Questions"
            text="Quick answers for EV battery chemistry, safety, lifetime, replacement, and performance."
          />

          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div
                key={faq}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition hover:border-cyan-400/30"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-white md:text-base">
                    {faq}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-5 text-sm leading-7 text-slate-400">
                    Battery performance depends on chemistry, thermal management,
                    charging habits, climate, driving style, and battery management
                    software.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <NextCard
              icon={Wrench}
              title="Next: Battery Maintenance & Care"
              text="Keep your battery healthy with better charging and ownership habits."
              color="text-emerald-300"
            />

            <NextCard
              icon={BarChart3}
              title="Next: Battery Longevity & Degradation"
              text="Understand how EV batteries age and how to extend battery life."
              color="text-cyan-300"
            />

            <NextCard
              icon={ShieldCheck}
              title="Next: Battery Safety & Warranty"
              text="Know your warranty, safety protections, and battery coverage."
              color="text-violet-300"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const BatteryPillar = ({ label, height, color }) => (
  <div
    className={`flex w-16 items-start justify-center rounded-t-2xl rounded-b-lg px-2 pt-5 text-center text-xs font-black text-white shadow-xl ${height} ${color}`}
  >
    {label}
  </div>
);

const InfoPanel = ({ icon: Icon, title, text }) => (
  <div className="flex gap-5">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Icon className="h-9 w-9" />
    </div>

    <div>
      <h3 className="mb-3 text-xl font-black text-white">{title}</h3>
      <p className="text-sm leading-7 text-slate-400">{text}</p>
    </div>
  </div>
);

const ChemistryCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div
      className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${item.bg} p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]`}
    >
      <div
        className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${item.color} ${item.glow}`}
      >
        <Icon className="h-9 w-9" />
      </div>

      <h3 className={`text-2xl font-black ${item.color}`}>
        {item.no} {item.title}
      </h3>

      <p className={`mt-1 text-sm font-bold ${item.color}`}>{item.sub}</p>

      <p className="mt-5 text-sm leading-7 text-slate-400">{item.desc}</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        {item.rows.map(([label, type, value]) => (
          <div
            key={label}
            className="grid grid-cols-[1fr_1fr] border-b border-white/10 last:border-b-0"
          >
            <div className="bg-white/[0.04] px-4 py-3 text-xs font-black uppercase text-slate-300">
              {label}
            </div>

            <div className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-slate-300">
              {type === "good" && <CheckCircle2 className="h-4 w-4 text-emerald-300" />}
              {type === "bad" && <XCircle className="h-4 w-4 text-red-300" />}
              {type === "warn" && <CircleDot className="h-4 w-4 text-orange-300" />}
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusDot = ({ value }) => {
  const lower = String(value).toLowerCase();

  let color = "bg-slate-400";
  if (lower.includes("excellent") || lower.includes("good") || lower.includes("very low") || lower === "low") {
    color = "bg-emerald-400";
  }
  if (lower.includes("medium")) color = "bg-orange-400";
  if (lower.includes("high") || lower.includes("very high")) color = "bg-red-400";

  if (lower.match(/\d/)) {
    return <span>{value}</span>;
  }

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {value}
    </span>
  );
};

const NextCard = ({ icon: Icon, title, text, color }) => (
  <a
    href="#"
    className="group flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
  >
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${color}`}>
      <Icon className="h-9 w-9" />
    </div>

    <div className="flex-1">
      <h3 className="mb-2 text-lg font-black text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>

    <ArrowRight className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${color}`} />
  </a>
);

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-14 max-w-3xl text-center">
    <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
      {eyebrow}
    </p>

    <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-6xl">
      {title}
    </h2>

    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />

    <p className="mt-6 text-base leading-8 text-slate-400 md:text-lg">
      {text}
    </p>
  </div>
);

export default BatteryTypes;