import React, { useState } from "react";
import {
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
  Download,
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
  { id: 1, question: "How long does an EV battery last ?", answer: "Most EV batteries are designed to last 8–15 years or 160,000–300,000 km. Battery degradation is gradual, typically losing 1–2% capacity per year under normal use. Manufacturers usually provide an 8-year / 160,000 km warranty on battery packs." },
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

      {/* Main Content Sections */}
      <div className="py-5 max-w-1xl mx-auto px-12 space-y-10 bg-transparent pb-24">

        <SectionBlock
          title="Battery care & charging habits"
          imageSrc="src/assets/battery-care.png"
          reverse={false}
        >
          <ul className="space-y-4">
            <ListItem>Keep daily charge between <strong>20% – 80%</strong> for optimal battery health.</ListItem>
            <ListItem>Avoid deep-discharge (0%) and frequent 100% DC fast charging.</ListItem>
            <ListItem>Don't park at 0% or 100% for long periods.</ListItem>
            <ListItem>Use preconditioning (heating/cooling) while plugged in for better range and battery efficiency.</ListItem>
          </ul>
        </SectionBlock>

        <SectionBlock
          title="Routine maintenance checklist"
          imageSrc="src/assets/ev-checklist.png"
          reverse={true}
        >
          <div className="bg-black/20 rounded-2xl border border-white/5 p-2">
            <div className="grid grid-cols-1 gap-1 text-base">
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">Tyre pressure & tread</span>
                <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">10k km</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">Brake pads & rotors</span>
                <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">15k km</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">Air & cabin filters</span>
                <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">15k km / 12 mo</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">Lights, horn, seat belts</span>
                <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">15k km / 12 mo</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">Coolant & brake fluid</span>
                <span className="text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">15k km / 12 mo</span>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors">
                <span className="font-medium text-white">High-voltage inspection</span>
                <span className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-sm font-bold tracking-wide">Yearly</span>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Software updates & features"
          imageSrc="src/assets/ev4.png"
          reverse={false}
        >
          <ul className="space-y-4">
            <ListItem>OTA (Over-the-Air) updates bring bug fixes and performance improvements directly to your vehicle.</ListItem>
            <ListItem>Check for updates regularly on your car's main display screen or via the companion mobile app.</ListItem>
            <ListItem>Ensure your vehicle is connected to a stable Wi-Fi connection for faster downloads of large updates.</ListItem>
          </ul>
        </SectionBlock>

        <SectionBlock
          title="Winter / weather range tips"
          imageSrc="src/assets/ev4.png"
          reverse={true}
        >
          <ul className="space-y-4">
            <ListItem>Cold weather increases battery resistance and reduces range. Always precondition the cabin while still connected to the charger.</ListItem>
            <ListItem>Avoid aggressive acceleration in extreme cold conditions to protect battery chemistry.</ListItem>
            <ListItem>In extreme heat, try to park in the shade and pre-cool the cabin to reduce the load on the A/C system while driving.</ListItem>
          </ul>
        </SectionBlock>

        <SectionBlock
          title="Service schedule & warranty"
          imageSrc="src/assets/ev4.png"
          reverse={false}
        >
          <p className="text-slate-400 mb-4">Most modern EVs come with highly competitive and comprehensive warranty coverage to give you peace of mind.</p>

          <div className="bg-cyan-950/30 p-5 rounded-xl border border-cyan-500/20 mb-6">
            <ul className="space-y-3">
              <li className="flex justify-between items-center border-b border-cyan-500/10 pb-2">
                <strong className="text-white flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-400" /> Battery & Drive-unit:</strong>
                <span className="text-cyan-300">8 years / 160,000 km</span>
              </li>
              <li className="flex justify-between items-center border-b border-cyan-500/10 pb-2">
                <strong className="text-white flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-400" /> Vehicle warranty:</strong>
                <span className="text-cyan-300">3 years / 100,000 km</span>
              </li>
              <li className="flex flex-col gap-1 pt-1">
                <strong className="text-white flex items-center gap-2"><AlertTriangle size={18} className="text-yellow-400" /> Not covered:</strong>
                <span className="text-slate-400 text-sm">Accidents, misuse, unauthorized modifications, or physical tampering.</span>
              </li>
            </ul>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Roadside assistance"
          imageSrc="src/assets/battery-care.png"
          reverse={true}
        >
          <ul className="space-y-4 mb-6">
            <ListItem>Call our 24/7 roadside assistance or request emergency help directly through the VoltIQ app.</ListItem>
            <ListItem>In case of a critically low battery, use the app to locate the nearest emergency charger or request a flatbed tow.</ListItem>
            <ListItem><strong>WARNING:</strong> High-voltage components (orange cables) are highly dangerous. Leave all electrical repairs to certified technicians.</ListItem>
          </ul>

          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-[1px] rounded-2xl">
            <div className="bg-[#050816] rounded-2xl p-6 flex items-center gap-6">
              <div className="bg-cyan-500/20 p-4 rounded-full">
                <PhoneCall className="text-cyan-400" size={32} />
              </div>
              <div>
                <p className="text-sm text-cyan-400 font-bold uppercase tracking-widest mb-1">Emergency Hotline</p>
                <p className="text-2xl font-black text-white tracking-wider">1800-123-4567</p>
                <p className="text-sm text-slate-400 mt-1">Available 24/7 • Nationwide Support</p>
              </div>
            </div>
          </div>
        </SectionBlock>

        <SectionBlock
          title="Insurance & ownership costs"
          imageSrc="src/assets/battery-care.png"
          reverse={false}
        >
          <ul className="space-y-4 mb-8">
            <ListItem>Insure your EV with a comprehensive policy specifically designed to cover high-voltage battery packs and electrical components.</ListItem>
            <ListItem>Ensure your policy includes protection against the theft of mobile chargers and external charging cables.</ListItem>
            <ListItem>Enjoy the financial benefits: EVs generally have significantly lower running costs compared to ICE vehicles due to cheaper electricity vs fuel, and drastically fewer moving parts.</ListItem>
          </ul>

          <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-full">
            <p className="text-sm text-emerald-400 font-bold uppercase tracking-widest">
              Lower running costs • Higher savings • Better for the planet
            </p>
          </div>
        </SectionBlock>

      </div>

      {/* --- FAQ --- */}
      <section className="py-24 bg-[#070b1e]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-3xl font-black mb-12 uppercase">Ownership <span className="text-cyan-400">FAQ</span></h2>
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