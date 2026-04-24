import React, { useState } from "react";
import {
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  Download,
  Leaf ,Wallet, Gauge, Wifi, Settings, ShoppingCart, Map, ArrowRight,  ChevronRight, Zap, Compass, Fuel, MapPin, PlayCircle, Activity
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 👇 ADDED: Import the EVChatbot component (Adjust the path if your component is in a different folder)
import EVChatbot from "../components/EVChatbot/EVChatbot";
// 👆 ADDED
const SectionBlock = ({ title, imageSrc, reverse, children }) => (
  <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center bg-transparent p-8 lg:p-12 rounded-3xl relative transition-all duration-500 hover:border-cyan-500/30 hover:bg-white/[0.07] overflow-hidden`}>

    {/* Ambient Glow behind the card */}
    <div className="absolute -inset-4 bg-cyan-500/5 blur-[100px] -z-10" />

    {/* Image Container */}
    <div className="w-full lg:w-1/2 relative group rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(34,211,238,0.1)]">
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-[300px] lg:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=2072&auto=format&fit=crop"; }}
      />
      {/* Interactive Image Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />
      <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
    </div>

    {/* Content Container */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center z-10">
      <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 leading-tight mb-6 uppercase tracking-tight">
        {title}
      </h2>
      <div className="text-lg text-slate-300 space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="text-cyan-400 mt-1 flex-shrink-0" size={20} />
    <span className="leading-relaxed">{children}</span>
  </li>
);

const guides = [
  {
    title: "An Introduction to Electric Vehicles",
    category: "EV Basics",
    time: "60 min read",
    image: "/bg1.webp",
  },
  {
    title: "Maximizing Your EV's Battery Life",
    category: "Battery Health",
    time: "10 min read",
    image: "/images/battery.jpg",
  },
  {
    title: "Top 5 EV Charging Tips",
    category: "Charging Tips",
    time: "10 min read",
    image: "/images/charging.jpg",
  },
];

const trending = [
  {
    title: "How to Choose Your First Electric Vehicle",
    category: "EV Basics",
    time: "8 min read",
    views: "12.4k views",
    image: "/images/choose-ev.jpg",
  },
  {
    title: "The Future of Solid-State Batteries",
    category: "EV Updates",
    time: "10 min read",
    views: "9.7k views",
    image: "/images/solid-state.jpg",
  },
  {
    title: "EV Charging Etiquette: Dos and Don'ts",
    category: "EV Updates",
    time: "5 min read",
    views: "5.6k views",
    image: "/images/etiquette.jpg",
  },
];

const news = [
  {
    title: "Tesla Opens More Supercharging Stations",
    date: "April 22, 2024",
    image: "/images/news1.jpg",
  },
  {
    title: "New Breakthrough in EV Battery Efficiency",
    date: "April 12, 2024",
    image: "/images/news2.jpg",
  },
  {
    title: "Global EV Sales Skyrocket in Q1 2024",
    date: "April 12, 2024",
    image: "/images/news3.jpg",
  },
];

const evTypes = [
  {
    title: "BEV",
    subtitle: "Battery Electric Vehicle",
    desc: "Fully electric vehicles powered only by batteries. They produce zero tailpipe emissions.",
    examples: "Tesla Model 3, Nissan Leaf, BYD Seal",
    image: "src/assets/bev.jpg",
  },
  {
    title: "PHEV",
    subtitle: "Plug-in Hybrid Electric Vehicle",
    desc: "Uses both a battery and fuel engine. Can drive short distances using battery power alone.",
    examples: "Toyota Prius Prime, Mitsubishi Outlander PHEV",
    image: "src/assets/phev.jpg",
  },
  {
    title: "HEV",
    subtitle: "Hybrid Electric Vehicle",
    desc: "Combines an electric motor with a fuel engine. Battery is charged through regenerative braking.",
    examples: "Toyota Prius, Honda Insight",
    image: "src/assets/hev.jpg",
  },
];

const evbatteyries = [
  {
    title: "Lithium-ion (NMC)",
    points: [
      "High energy density",
      "Widely used in EVs",
      "Good performance and range",
    ],
    accent: "text-blue-600",
    image: "src/assets/nmc.png"
  },
  {
    title: "Lithium Iron Phosphate (LFP)",
    points: [
      "Safer and longer cycle life",
      "Lower energy density than NMC",
      "Popular in cost-efficient EVs",
    ],
    accent: "text-green-600",
    image: "src/assets/libattery.png"
  },
  {
    title: "Nickel Cobalt Aluminum (NCA)",
    points: [
      "Lower energy density than NMC",
      "Good performance and range",
      "Popular in cost-efficient EVs",
    ],
    accent: "text-yellow-600",
    image: "src/assets/nca.png"
  },
  {
    title: "Solid-State Batteries",
    points: [
      "Emerging technology",
      "Potentially higher safety",
      "Higher energy density potential",
    ],
    accent: "text-purple-600",
    image: "src/assets/ssb.png"
  },
];

const FAQS = [
  { id: 1, question: "How far can an EV go on a single charge ?", answer: "On average, a modern electric vehicle (EV) can go about 250 to 300 miles (400 to 480 km) on a single charge." },
  { id: 2, question: "How often should I service my EV ?", answer: "Most EVs require a service check every 15,000 km or 12 months, whichever comes first. Unlike ICE vehicles, EVs skip oil changes. Key service items include tyre rotation, brake inspection, cabin filter replacement, and software updates." },
  { id: 3, question: "Can I charge my EV in the rain ?", answer: "Yes — EV charging systems are designed to be weatherproof. Both the charging port and plug meet IP ratings for water resistance. However, always inspect cables for damage before charging and avoid submerged charging equipment." },
  { id: 4, question: "What happens if my battery degrades ?", answer: "Battery degradation reduces your maximum range over time but rarely causes sudden failure. If capacity drops below the warranty threshold (usually 70%), the manufacturer may replace or refurbish the pack under warranty." },
  { id: 5, question: "Are EVs more expensive to insure ?", answer: "EV insurance can be 5–15% higher than comparable ICE vehicles, mainly because of higher repair and replacement costs for batteries and high-voltage components. However, lower maintenance costs often offset the difference." },
  { id: 6, question: "Will fast charging damage my battery ?", answer: "Occasional DC fast charging is fine, but regular daily use of fast chargers can accelerate battery degradation over time. For everyday charging, prefer AC home charging at a moderate rate (7–11 kW) and keep charge between 20–80%." },
  { id: 7, question: "How can I maximise my EV's driving range ?", answer: "Drive smoothly, use regenerative braking, precondition the cabin while plugged in, keep tyres properly inflated, reduce highway speeds, limit use of heating/AC when possible, and maintain a 20–80% charge level." },
  { id: 8, question: "What should I do if my EV won't start ?", answer: "Check the 12V auxiliary battery (a common culprit), ensure the high-voltage battery has sufficient charge, check for any dashboard warnings, try locking/unlocking the vehicle to reset the system. If the issue persists, contact roadside assistance." }
];
function EV() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvTypes = evTypes.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBatteries = evbatteyries.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuides = guides.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTrending = trending.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

  return (
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

            <h1 className="text-6xl md:text-7xl  font-black leading-tight tracking-tighter">Electric <br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Vehicles (EVs) </span></h1>

            <h3 className="text-3xl md:text-4xl  font-black leading-tight tracking-tighter bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">The future of mobility is electric.</h3>

            <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Cleaner, quieter, and cheaper to run - EVs are <br />
              driving us toward a smarter and sustainable tomorrow.
            </p>

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
            <Download className="w-5 h-5" />
          </a>

        </div>
      </section>

      {/* --- WHY IT MATTERS (INTRO) --- */}
      <section className="py-20 relative">
        <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-transparent p-8 md:p-12 rounded-[2rem]  flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl  font-black uppercase tracking-tight mb-4">
                Why EV <br /> <span className="text-cyan-400">
                  Maintenance <span className="inline-block ml-1">Matters</span>
                </span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-lg mb-4">
                Cleaner, quieter, and cheaper to run - EVs are
                driving us toward a smarter and sustainable tomorrow.
              </p>
              <p className="text-slate-400 leading-relaxed text-lg">
                Good care ensures better performance, longer battery life, safety on the road, and lower overall ownership costs.
              </p>
            </div>
            <div className="bg-[url('src/assets/ev12.png')] bg-cover bg-no-repeat bg-center rounded-2xl border border-emerald-500/30 text-center max-w-sm px-55 py-35 relative overflow-hidden">
              {/* Adding an overlay to make text more readable against the image */}
              <div className="absolute inset-0 bg-black/40 z-0"></div>

              <div className="relative z-10">
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-24 space-y-32 flex-grow z-10">

        {/* --- WHY CHOOSE EV --- */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
                Why Choose <span className="text-cyan-400">Electric?</span>
              </h2>
              <p className="text-slate-400">The systemic advantages of transitioning to battery-electric power.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Leaf className="text-lime-400" size={32} />, title: "Zero Emissions", desc: "Eliminate tailpipe pollutants and reduce your carbon footprint drastically.", glow: "group-hover:border-lime-500/50 group-hover:shadow-[0_0_30px_rgba(163,230,53,0.1)]" },
              { icon: <Wallet className="text-cyan-400" size={32} />, title: "Cost Efficiency", desc: "Lower operational costs with cheaper electricity vs. volatile fuel prices.", glow: "group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]" },
              { icon: <Gauge className="text-blue-400" size={32} />, title: "Instant Torque", desc: "Experience immediate power delivery and a whisper-quiet, smooth ride.", glow: "group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(96,165,250,0.1)]" },
              { icon: <Wifi className="text-purple-400" size={32} />, title: "Smart Platform", desc: "Over-the-air (OTA) updates ensure your vehicle improves over time.", glow: "group-hover:border-purple-500/50 group-hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]" }
            ].map((feature, idx) => (
              <div key={idx} className={`group bg-white/[0.02] p-8 rounded-3xl border border-white/5 flex flex-col items-start backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 ${feature.glow}`}>
                <div className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 leading-relaxed text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- EXPLORE CORE TOPICS --- */}
        <section className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10 pointer-events-none" />

          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-2">
              Knowledge <span className="text-emerald-400">Hub</span>
            </h2>
            <p className="text-slate-400">Master every aspect of the electric vehicle ecosystem.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "EV Architectures", desc: "Analyze BEV, PHEV, and HEV systemic differences.", icon: <Fuel size={24} />, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
              { title: "Battery Tech", desc: "Deep dive into cell chemistry and BMS intelligence.", icon: <Zap size={24} />, color: "text-cyan-400", bg: "bg-cyan-400/10 border-cyan-400/20" },
              { title: "Charging Networks", desc: "Understand AC vs DC charging protocols.", icon: <Settings size={24} />, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
              { title: "Maintenance", desc: "Protocols to maximize vehicle lifespan.", icon: <Compass size={24} />, color: "text-lime-400", bg: "bg-lime-400/10 border-lime-400/20" },
              { title: "Purchasing Metrics", desc: "Data-driven approach to selecting your EV.", icon: <ShoppingCart size={24} />, color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
              { title: "Range Simulation", desc: "Calculate trip feasibility and routing.", icon: <Map size={24} />, color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20" }
            ].map((topic, idx) => (
              <div key={idx} className="group bg-[#0a0f25] p-6 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 cursor-pointer flex items-center gap-6 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]">
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center border ${topic.bg} ${topic.color} group-hover:scale-110 transition-transform duration-300`}>
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{topic.title}</h4>
                  <p className="text-sm text-slate-400 mt-1">{topic.desc}</p>
                </div>
                <ChevronRight size={20} className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </section>

        {/* --- SYSTEM ARCHITECTURE --- */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
              System <span className="text-cyan-400">Architecture</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">The streamlined mechanical flow of an electric vehicle converts chemical energy to kinetic motion with minimal efficiency loss.</p>
          </div>

          <div className="bg-[#0a0f25]/80 p-8 md:p-12 rounded-[2.5rem] border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 opacity-10" />

            <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">

              <div className="flex flex-col items-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-cyan-900/50 to-transparent border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,211,238,0.2)] group-hover:border-cyan-400 transition-colors">
                  <Zap className="text-cyan-400" size={40} />
                </div>
                <span className="font-bold tracking-wider uppercase text-white">Battery Pack</span>
                <span className="text-xs text-cyan-400 font-mono mt-1">DC Energy Storage</span>
              </div>

              <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-cyan-500/50 to-emerald-500/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
              </div>

              <div className="flex flex-col items-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-emerald-900/50 to-transparent border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(52,211,153,0.2)] group-hover:border-emerald-400 transition-colors">
                  <Settings className="text-emerald-400" size={40} />
                </div>
                <span className="font-bold tracking-wider uppercase text-white">Inverter</span>
                <span className="text-xs text-emerald-400 font-mono mt-1">DC to AC Conversion</span>
              </div>

              <div className="hidden lg:block h-px w-16 bg-gradient-to-r from-emerald-500/50 to-blue-500/50 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa]" />
              </div>

              <div className="flex flex-col items-center group">
                <div className="h-24 w-24 bg-gradient-to-br from-blue-900/50 to-transparent border border-blue-500/30 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(96,165,250,0.2)] group-hover:border-blue-400 transition-colors">
                  <Gauge className="text-blue-400" size={40} />
                </div>
                <span className="font-bold tracking-wider uppercase text-white">Drive Motor</span>
                <span className="text-xs text-blue-400 font-mono mt-1">Kinetic Generation</span>
              </div>

            </div>
          </div>
        </section>

        {/* --- FAQ --- */}
        <section className="py-24 bg-[#070b1e]">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-center text-3xl font-black mb-12 uppercase">EV <span className="text-cyan-400">FAQ</span></h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.id} className="border-b border-white/10">
                  <button onClick={() => toggleFaq(faq.id)} className="w-full py-6 flex justify-between items-center text-left">
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <ChevronDown className={`text-cyan-400 transition-transform ${openFaqId === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaqId === faq.id ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-400">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </main>
        <Footer />

        <style dangerouslySetInnerHTML={{
          __html: `
                @keyframes slow-zoom {
                    0% { transform: scale(1); }
                    100% { transform: scale(1.1); }
                }
                .animate-slow-zoom {
                    animation: slow-zoom 20s infinite alternate ease-in-out;
                }
            ` }} />
    </div>
  );


}

export default EV;