// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Download, } from "lucide-react";
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// function Batterysafety() {
//     const navigate = useNavigate(); // Added for navigation
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const [openFaqId, setOpenFaqId] = useState(null);
//     const [articleIndex, setArticleIndex] = useState(0);
//     const [activeEV, setActiveEV] = useState(null);

//     // FastAPI Backend Fetch
//     useEffect(() => {
//         const fetchBatteries = async () => {
//             try {
//                 const response = await fetch('http://localhost:8000/api/batteries');
//                 if (response.ok) {
//                     const data = await response.json();
//                     setBatteries(data);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch batteries from FastAPI, using fallback data.", error);
//             }
//         };
//         // fetchBatteries();
//     }, []);

//     const toggleFaq = (id) => {
//         setOpenFaqId(openFaqId === id ? null : id);
//     };

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev === BatteryTypes.length - 1 ? 0 : prev + 1));
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev === 0 ? BatteryTypes.length - 1 : prev - 1));
//     };

//     const nextArticle = () => {
//         setArticleIndex((prev) => (prev + 1) % articles.length);
//     };

//     const prevArticle = () => {
//         setArticleIndex((prev) => (prev - 1 + articles.length) % articles.length);
//     };

//     const getVisibleArticles = () => {
//         const visible = [];
//         for (let i = 0; i < 3; i++) {
//             visible.push(articles[(articleIndex + i) % articles.length]);
//         }
//         return visible;
//     };

//     // Added function to handle article clicks
//     const handleArticleClick = (path) => {
//         if (path && path !== "#") {
//             navigate(path);
//         }
//     };

//     return (
//         // <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
//         <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">

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

//                         <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">Battery Safety:<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Maintenance & Ownership Guide</span></h1>
//                         <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Learn how to keep your electric vehicle battery healthy,<br />
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

//             {/* --- INTRO SECTION --- */}
//             <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans bg-transparent">
//                 {/* Top Header Section */}
//                 <div className="text-center mb-16">
//                     <p className="text-gray-400 text-lg md:text-xl text-sm md:text-base max-w-5xl mx-auto mb-8">
//                         Learn about the robust safety measures in place to ensure your electric vehicle's battery is not just a power source but a secure one. We've got your back on the road to a safer, cleaner tomorrow.
//                     </p>
//                     <h2 className="text-3xl md:text-4xl lg:text-6xl font-black leading-tight uppercase tracking-tight">
//                     {/* <h2 className="text-2xl md:text-4xl font-bold text-[#3B82F6] uppercase tracking-wide mb-6"> */}
//                         DISCOVER WHAT MAKES 
//                          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"> YOUR EV BATTERIES SAFE </span>
//                     </h2>
//                     <p className="text-gray-400 text-lg  text-base md:text-lg">
//                         Learn all about the robust safety measures that ensure EV's battery is not just powerful, but also secure.
//                     </p>
//                 </div>

//                 {/* Two Column Layout */}
//                 <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
//                     {/* Left Column: Image */}
//                     <div className="w-full lg:w-1/2">
//                         {/* Note: Replace the src with the actual image path in your public folder or asset imports */}
//                         <img
//                             src="/src/assets/ssb.png"
//                             alt="Cylindrical EV battery cells in a pack on an assembly line"
//                             className="w-full h-auto object-cover rounded shadow-sm"
//                         />
//                     </div>

//                     {/* Right Column: Content */}
//                     <div className="w-full lg:w-1/2">
//                         <h3 className="text-xl md:text-2xl font-bold text-[#3B82F6] uppercase mb-6 text-center lg:text-left">
//                             THE “SAFETY FIRST” DESIGN APPROACH
//                         </h3>
//                         <p className="text-gray-400 text-lg  mb-6 leading-relaxed">
//                             Electric vehicle batteries are designed meticulously to endure the test of time and work under varied weather conditions. To achieve this, EV batteries undergo rigorous safety testing.
//                         </p>

//                         <ul className="space-y-4">
//                             <li className="flex items-start">
//                                 <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
//                                 <p className="text-gray-400 text-lg  leading-relaxed">
//                                     <strong className="font-bold text-black">Temperature management-</strong> EV batteries excel in temperature regulation. They employ advanced thermal management systems to prevent overheating and enhance safety.
//                                 </p>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
//                                 <p className="text-gray-400 text-lg  leading-relaxed">
//                                     <strong className="font-bold text-black">Stringent testing-</strong> Before they find a place in your vehicle, EV batteries are subjected to some of the most rigorous safety tests. These include extreme weather simulations and physical impact tests and testing performance with local road and weather conditions.
//                                 </p>
//                             </li>
//                             <li className="flex items-start">
//                                 <span className="mr-3 mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-800"></span>
//                                 <p className="text-gray-400 text-lg  leading-relaxed">
//                                     <strong className="font-bold text-black">Safety Enhancements-</strong> EV batteries also come with multiple layers of safety features such as protective casings, fail-safe circuits, and advanced software algorithms that monitor battery health in real-time.
//                                 </p>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </section>

//             <section className="py-24 max-w-7xl mx-auto px-6 relative">
//                 <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
//                             Thoroughly tested for a <span className="text-cyan-400">reliable drive</span>
//                         </h2>
//                         <p className="text-gray-400 text-lg mb-8">
//                             Batteries used in electric cars undergo rigorous testing for almost every imaginable road condition, including those rare ones you'd likely never encounter. Before becoming the heart of your vehicle, your EV battery faces many extreme situations.

//                         </p>
//                         <p className="text-gray-400 text-lg mb-8">
//                             Sophisticated computer simulations further assess its behaviour across a myriad of conditions. So, as you drive down the road, know that your EV's battery isn't just efficient—it's exceptionally reliable.

//                         </p>

//                     </div>
//                     <div className="relative group">
//                         {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
//                         <img
//                             src="src/assets/evsafety1.png"
//                             alt="EV Battery"
//                             className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
//                         />
//                         <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
//                     </div>
//                 </div>
//             </section>

//             <section className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 font-sans bg-transparent">

//                 {/* DID YOU KNOW Section */}
//                 <div className="mb-16">
//                     <h2 className="text-2xl text-left md:text-3xl font-bold uppercase tracking-wide text-center mb-8">
//                         DID YOU <span className="text-cyan-400">KNOW ?</span>
//                     </h2>
//                     <p className="text-slate-300 text-lg  text-base md:text-lg mb-6 leading-relaxed">
//                         MG ZS EV battery conforms to the most advanced safety tests and its battery safety management meets stringent requirements to enhance overall durability, maintain stable battery operation and ensures a longer lifespan in Indian environmental conditions.
//                     </p>
//                     <ul className="list-disc pl-8 space-y-2 text-gray-400 text-lg  text-base md:text-lg">
//                         <li>ASIL – D: Enhanced Safety Integrity Level</li>
//                         <li>IP69K: Better Dust & Water Resistance Rating</li>
//                         <li>UL2580: Safety Management System</li>
//                     </ul>
//                 </div>

//                 {/* YOUR BIT IN ENSURING BATTERY SAFETY Section */}
//                 <div className="mb-16">
//                     <h2 className="text-2xl md:text-3xl font-bold  uppercase tracking-wide text-left mb-8">
//                         YOUR BIT IN ENSURING <span className="text-cyan-400"> BATTERY SAFETY </span>
//                     </h2>
//                     <p className="text-slate-300 text-lg  text-base md:text-lg mb-6 leading-relaxed">
//                         Safety isn't just about the initial design; it's also about maintenance. Here's how you can ensure the longevity and safety of your EV battery
//                     </p>
//                     <ul className="list-disc pl-8 space-y-2 text-slate-300 text-lg  text-base md:text-lg">
//                         <li>Maintain proper charging habits.</li>
//                         <li>Regular software and firmware updates.</li>
//                         <li>Scheduled maintenance checks.</li>
//                     </ul>
//                 </div>

//                 {/* FACTORS AFFECTING THE PERFORMANCE Section */}
//                 <div>
//                     <h2 className="text-2xl md:text-3xl font-bold  uppercase tracking-wide text-left mb-8">
//                         FACTORS AFFECTING  <br /><span className="text-cyan-400">THE PERFORMANCE OF EV BATTERIES </span>
//                     </h2>
//                     <p className="text-gray-400 text-lg text-base md:text-lg leading-relaxed">
//                         EV batteries can be affected due to various reasons, some of them are:
//                     </p>
//                 </div>

//             </section>

//             <section className="py-24 max-w-7xl mx-auto px-6 relative">
//                 <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">

//                     <div className="relative group">
//                         {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
//                         <img
//                             src="src/assets/evsafety2.png"
//                             alt="EV Battery"
//                             className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
//                         />
//                         <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
//                     </div>

//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
//                             Thermal
//                              <span className="text-cyan-400"> runaway </span>
//                         </h2>
//                         <p className="text-gray-400 text-lg mb-8">
//                             A rapid increase in temperature and pressure within the battery cell leading to destabilising and degradation of battery content. Though lithium-ion batteries are a part of the BMS (battery management system) which regulates the current flow and battery temperature while charging the batteries, one can still follow the simplest ways to ensure extra safety,


//                         </p>
//                         <p className="text-gray-400 text-lg mb-8">
//                             EVs should be charged in well-ventilated open spaces to maintain the temperature of the batteries.

//                         </p>

//                         <p className="text-gray-400 text-lg mb-8">
//                             Avoid charging beyond the standard and recommended charging time.

//                         </p>

//                         <p className="text-gray-400 text-lg mb-8">
//                             Ensure Regular vehicle service and checkups.

//                         </p>

//                     </div>

//                 </div>
//             </section>

//             <section className="py-24 max-w-7xl mx-auto px-6 relative">
//                 <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
//                             Overcharging or <span className="text-cyan-400">undercharging </span>
//                         </h2>
//                         <p className="text-gray-400 text-lg mb-8">
//                             A condition where the battery is charged beyond its capacity which can lead to early deterioration of battery's state of health and performance. Timely and mindful charging can protect the battery from early-stage damage.

//                         </p>


//                     </div>
//                     <div className="relative group">
//                         {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
//                         <img
//                             src="src/assets/evsafety3.png"
//                             alt="EV Battery"
//                             className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
//                         />
//                         <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
//                     </div>
//                 </div>
//             </section>

//             <section className="py-24 max-w-7xl mx-auto px-6 relative">
//                 <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">

//                     <div className="relative group">
//                         {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
//                         <img
//                             src="src/assets/ev4.png"
//                             alt="EV Battery"
//                             className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
//                         />
//                         <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
//                     </div>

//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
//                             Mechanical    <span className="text-cyan-400"> Damage </span>

//                         </h2>
//                         <p className="text-gray-400 text-lg mb-8">
//                             A physical impact or deformation of the battery due to a physical impact might to lead internal damages in certain cases which can affect the battery performance hence, an immediate follow-up checkup with the vendor will ensure battery health and safety to the customer. The authorised vendor will check for any damage caused to the battery and take necessary actions to safeguard the vehicle.


//                         </p>


//                     </div>

//                 </div>
//             </section>

//             <section className="py-24 max-w-7xl mx-auto px-6 relative">
//                 <div className="grid md:grid-cols-2 gap-12 items-center  p-10 bg-transparent overflow-hidden relative">
//                     <div>
//                         <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
//                             Cell imbalance

//                         </h2>
//                         <p className="text-gray-400 text-lg mb-8">
//                             A mismatch in the state of charge or state of health of the individual cells in a battery pack, resulting in reduced performance, accelerated degradation. Imbalanced cells lock away otherwise usable energy and increase battery degradation. Batteries that are out of balance cannot be fully charged or fully discharged, hence keeping an eye on the discharge pattern of the battery and immediately reporting in case of anomaly.

//                         </p>


//                     </div>
//                     <div className="relative group">
//                         {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
//                         <img
//                             src="src/assets/evsafety3.png"
//                             alt="EV Battery"
//                             className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
//                         />
//                         <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
//                     </div>
//                 </div>
//             </section>


//             <Footer />

//             <style>{`
//                 @keyframes slow-zoom {
//                     0% { transform: scale(1.05); }
//                     100% { transform: scale(1.15); }
//                 }
//                 .animate-slow-zoom {
//                     animation: slow-zoom 25s infinite alternate ease-in-out;
//                 }
//             `}</style>
//         </div>
//     );
// }

// export default Batterysafety;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download,
  ShieldCheck,
  Thermometer,
  Zap,
  Wrench,
  BarChart2,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  BatteryCharging,
  AlertTriangle,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   Static Data
───────────────────────────────────────────── */
const SAFETY_FEATURES = [
  {
    icon: Thermometer,
    title: 'Temperature Management',
    desc: 'Advanced thermal management systems prevent overheating and regulate operating temperature across all conditions.',
    color: 'text-cyan-300',
    border: 'border-cyan-400/20',
    bg: 'bg-cyan-400/10',
    glow: 'shadow-[0_0_35px_rgba(34,211,238,0.18)]',
  },
  {
    icon: ShieldCheck,
    title: 'Stringent Testing',
    desc: 'EV batteries undergo extreme weather simulations, physical impact tests, and local road condition performance evaluations before installation.',
    color: 'text-emerald-300',
    border: 'border-emerald-400/20',
    bg: 'bg-emerald-400/10',
    glow: 'shadow-[0_0_35px_rgba(52,211,153,0.18)]',
  },
  {
    icon: Zap,
    title: 'Safety Enhancements',
    desc: 'Protective casings, fail-safe circuits, and real-time software algorithms monitor battery health continuously.',
    color: 'text-violet-300',
    border: 'border-violet-400/20',
    bg: 'bg-violet-400/10',
    glow: 'shadow-[0_0_35px_rgba(167,139,250,0.18)]',
  },
];

const PERFORMANCE_FACTORS = [
  {
    icon: Thermometer,
    title: 'Thermal Runaway',
    desc: 'A rapid increase in temperature and pressure within the battery cell leads to destabilisation and degradation. Charge in well-ventilated areas, avoid exceeding recommended charging time, and schedule regular vehicle service.',
    image: 'src/assets/evsafety1.png',
    accent: 'cyan',
  },
  {
    icon: BatteryCharging,
    title: 'Overcharging or Undercharging',
    desc: 'Charging beyond capacity causes early deterioration of battery health and performance. Timely and mindful charging habits protect the battery from early-stage damage.',
    image: 'src/assets/evsafety3.png',
    accent: 'emerald',
  },
  {
    icon: Wrench,
    title: 'Mechanical Damage',
    desc: 'Physical impact or deformation can cause internal damage affecting performance. Immediate follow-up with an authorised vendor ensures battery health and safety.',
    image: 'src/assets/ev4.png',
    accent: 'violet',
  },
  {
    icon: BarChart2,
    title: 'Cell Imbalance',
    desc: 'A mismatch in state-of-charge or health across individual cells results in reduced performance and accelerated degradation. Monitor discharge patterns and report anomalies immediately.',
    image: 'src/assets/evsafety2.png',
    accent: 'orange',
  },
];

const SAFETY_STANDARDS = [
  { label: 'ASIL – D', desc: 'Enhanced Safety Integrity Level' },
  { label: 'IP69K', desc: 'Better Dust & Water Resistance Rating' },
  { label: 'UL2580', desc: 'Safety Management System' },
];

const OWNER_TIPS = [
  'Maintain proper charging habits — keep battery between 20% and 80% for daily driving.',
  'Apply regular software and firmware updates to benefit from the latest safety optimisations.',
  'Schedule periodic maintenance checks with an authorised service centre.',
];

const FAQS = [
  {
    id: 1,
    question: 'How safe are EV batteries compared to traditional fuel tanks?',
    answer:
      'EV batteries are designed with multiple redundant safety systems including thermal management, BMS monitoring, and protective casings. They undergo far stricter testing than conventional fuel tanks.',
  },
  {
    id: 2,
    question: 'What should I do if my EV battery overheats?',
    answer:
      'Pull over safely, turn off the vehicle, and keep a safe distance. Contact your EV manufacturer s emergency line. Modern EVs will alert you before reaching dangerous temperatures.',
  },
  {
    id: 3,
    question: 'Can I charge my EV overnight every night?',
    answer:
      'Yes, but its best to charge to 80% for daily use. Most EVs allow you to set a charging limit in the app. Full charges are fine occasionally for long trips.',
  },
  {
    id: 4,
    question: 'How long do EV batteries last before needing replacement?',
    answer:
      'Most modern EV batteries are warrantied for 8–10 years or 100,000+ miles. Real-world data shows many retain over 80% capacity well beyond that period.',
  },
  {
    id: 5,
    question: 'Does fast charging damage the battery?',
    answer:
      'Frequent DC fast charging can accelerate minor degradation over time. For everyday use, AC Level 2 charging is gentler. Occasional DC fast charging is perfectly safe.',
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */
const FAQItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onToggle}
      className="w-full py-6 flex justify-between items-center text-left gap-4"
    >
      <span className="font-semibold text-lg text-white">{faq.question}</span>
      <ChevronDown
        className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <p className="text-slate-400 text-base leading-relaxed">{faq.answer}</p>
    </div>
  </div>
);

const accentClasses = {
  cyan: {
    border: 'border-cyan-400/25',
    iconBg: 'bg-cyan-400/10 border-cyan-400/20',
    iconColor: 'text-cyan-300',
    tag: 'text-cyan-300/70',
    glow: 'shadow-[0_0_40px_rgba(34,211,238,0.10)]',
  },
  emerald: {
    border: 'border-emerald-400/25',
    iconBg: 'bg-emerald-400/10 border-emerald-400/20',
    iconColor: 'text-emerald-300',
    tag: 'text-emerald-300/70',
    glow: 'shadow-[0_0_40px_rgba(52,211,153,0.10)]',
  },
  violet: {
    border: 'border-violet-400/25',
    iconBg: 'bg-violet-400/10 border-violet-400/20',
    iconColor: 'text-violet-300',
    tag: 'text-violet-300/70',
    glow: 'shadow-[0_0_40px_rgba(167,139,250,0.10)]',
  },
  orange: {
    border: 'border-orange-400/25',
    iconBg: 'bg-orange-400/10 border-orange-400/20',
    iconColor: 'text-orange-300',
    tag: 'text-orange-300/70',
    glow: 'shadow-[0_0_40px_rgba(251,146,60,0.10)]',
  },
};

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
function Batterysafety() {
  const navigate = useNavigate();
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/src/assets/ev3.png"
            alt="EV Battery Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=2072&auto=format&fit=crop';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-3xl space-y-6 pt-20">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">
              EV Battery Safety
            </p>

            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">
              Battery Safety:
              <br />
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Maintenance & Ownership Guide
              </span>
            </h1>

            <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
              Learn how to keep your electric vehicle battery healthy,
              <br />
              save money, and extend its life.
            </p>

            {/* CTA */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/ev-manual.pdf"
                download="EV_Maintenance_Manual.pdf"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-base hover:bg-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_0_28px_rgba(34,211,238,0.30)] transition-all duration-300 backdrop-blur-sm"
              >
                <Download className="w-5 h-5" />
                Download Manual
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400" />
          <ChevronDown className="w-5 h-5 text-cyan-400 animate-bounce" />
        </div>
      </section>

      <main className="overflow-hidden">

        {/* ── INTRO SECTION ── */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-cyan-500/8 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 bottom-10 h-80 w-80 rounded-full bg-emerald-400/8 blur-[120px]" />

          {/* Section header */}
          <div className="text-center mb-16 relative">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-4">
              What We Do
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tight mb-6">
              Discover What Makes{' '}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Your EV Batteries Safe
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Learn about the robust safety measures in place to ensure your electric vehicle's battery
              is not just a power source, but a secure one. We've got your back on the road to a
              safer, cleaner tomorrow.
            </p>
          </div>

          {/* Two-col: image + text */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Image */}
            <div className="w-full lg:w-1/2 relative group">
              <div className="rounded-[2rem] overflow-hidden border border-cyan-400/20 shadow-[0_0_50px_rgba(34,211,238,0.10)]">
                <img
                  src="/src/assets/ssb.png"
                  alt="EV Battery Pack"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -inset-4 bg-cyan-500/5 blur-[80px] -z-10" />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                The{' '}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  "Safety First"
                </span>{' '}
                Design Approach
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed">
                Electric vehicle batteries are designed meticulously to endure the test of time and
                work under varied weather conditions. To achieve this, EV batteries undergo rigorous
                safety testing at every stage of production.
              </p>

              {/* Feature cards */}
              <div className="flex flex-col gap-4 mt-2">
                {SAFETY_FEATURES.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      className={`flex items-start gap-4 p-5 rounded-2xl border ${feat.border} bg-white/[0.04] backdrop-blur-sm ${feat.glow} transition-all duration-300 hover:bg-white/[0.07]`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${feat.border} ${feat.bg} ${feat.color}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className={`font-bold text-base mb-1 ${feat.color}`}>{feat.title}</h4>
                        <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── THOROUGHLY TESTED ── */}
        <section className="py-20 relative">
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-400/8 blur-[130px]" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-300/20 bg-[#071124]/80 backdrop-blur-xl shadow-[0_0_60px_rgba(34,211,238,0.12)] ring-1 ring-white/10">
              {/* Top & bottom accent lines */}
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
              <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(52,211,153,0.06),transparent_40%)]" />

              <div className="relative grid md:grid-cols-2 gap-12 items-center p-10 md:p-14">
                {/* Text */}
                <div className="flex flex-col gap-6">
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80">
                    Reliability
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight uppercase tracking-tight">
                    Thoroughly Tested for a{' '}
                    <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                      Reliable Drive
                    </span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Batteries used in electric cars undergo rigorous testing for almost every
                    imaginable road condition, including those rare ones you'd likely never encounter.
                    Before becoming the heart of your vehicle, your EV battery faces many extreme
                    situations.
                  </p>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Sophisticated computer simulations further assess its behaviour across a myriad of
                    conditions. So as you drive down the road, know that your EV's battery isn't just
                    efficient — it's exceptionally reliable.
                  </p>
                </div>

                {/* Image */}
                <div className="relative group">
                  <div className="rounded-2xl overflow-hidden border border-white/10">
                    <img
                      src="src/assets/evsafety1.png"
                      alt="EV Battery Testing"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=800&auto=format&fit=crop';
                      }}
                    />
                  </div>
                  <div className="absolute -inset-4 bg-cyan-500/8 blur-[60px] -z-10 group-hover:bg-cyan-500/12 transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DID YOU KNOW + OWNER TIPS ── */}
        <section className="py-20 max-w-7xl mx-auto px-6 relative">
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/8 blur-[120px]" />

          <div className="grid md:grid-cols-2 gap-8">

            {/* Did You Know */}
            <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/60 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <AlertTriangle className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/70">
                    Industry Standard
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Did You <span className="text-cyan-400">Know?</span>
                  </h3>
                </div>
              </div>

              <p className="text-slate-400 text-base leading-relaxed mb-6">
                MG ZS EV battery conforms to the most advanced safety tests and its battery safety
                management meets stringent requirements to enhance overall durability and ensure a
                longer lifespan in Indian environmental conditions.
              </p>

              <div className="flex flex-col gap-3">
                {SAFETY_STANDARDS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.04] hover:border-cyan-400/30 hover:bg-white/[0.07] transition-all duration-300"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10">
                      <ShieldCheck className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-black text-white text-sm">{s.label}</p>
                      <p className="text-slate-400 text-xs">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Your Bit */}
            <div className="relative overflow-hidden rounded-[2rem] border border-emerald-300/20 bg-[#071124]/60 backdrop-blur-xl p-8 shadow-[0_0_40px_rgba(52,211,153,0.08)]">
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/70">
                    Owner Responsibility
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-white">
                    Your Bit in{' '}
                    <span className="text-emerald-400">Battery Safety</span>
                  </h3>
                </div>
              </div>

              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Safety isn't just about the initial design — it's also about maintenance. Here's how
                you can ensure the longevity and safety of your EV battery.
              </p>

              <div className="flex flex-col gap-4">
                {OWNER_TIPS.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-400 mt-1 flex-shrink-0 h-5 w-5" />
                    <p className="text-slate-300 text-base leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PERFORMANCE FACTORS ── */}
        <section className="py-20 max-w-7xl mx-auto px-6 relative">
          <div className="pointer-events-none absolute right-0 top-1/2 h-96 w-96 rounded-full bg-violet-500/8 blur-[130px]" />

          {/* Header */}
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-4">
              Risk Factors
            </p>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
              Factors Affecting{' '}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Battery Performance
              </span>
            </h2>
          </div>

          {/* Alternating rows */}
          <div className="flex flex-col gap-10">
            {PERFORMANCE_FACTORS.map((factor, idx) => {
              const Icon = factor.icon;
              const ac = accentClasses[factor.accent];
              const reverse = idx % 2 !== 0;
              return (
                <div
                  key={factor.title}
                  className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-14 items-center relative overflow-hidden rounded-[2rem] border ${ac.border} bg-[#071124]/60 backdrop-blur-xl p-8 md:p-12 ${ac.glow} transition-all duration-500 hover:bg-white/[0.05]`}
                >
                  {/* Radial glow inside card */}
                  <div className={`absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_${reverse ? '80%' : '20%'}_50%,rgba(34,211,238,0.05),transparent_50%)]`} />

                  {/* Image */}
                  <div className="w-full lg:w-1/2 relative group">
                    <div className={`rounded-2xl overflow-hidden border ${ac.border}`}>
                      <img
                        src={factor.image}
                        alt={factor.title}
                        className="w-full h-[280px] lg:h-[340px] object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src =
                            'https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=800&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/60 via-transparent to-transparent" />
                    </div>
                    <div className={`absolute -inset-4 blur-[70px] -z-10`} />
                  </div>

                  {/* Text */}
                  <div className="w-full lg:w-1/2 flex flex-col gap-5 relative z-10">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${ac.iconBg} ${ac.iconColor}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight`}>
                      {factor.title.split(' ').map((word, wi) =>
                        wi === factor.title.split(' ').length - 1 ? (
                          <span key={wi} className={ac.iconColor}> {word}</span>
                        ) : (
                          <span key={wi}>{word} </span>
                        )
                      )}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed">{factor.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-24 bg-transparent">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-4">
                Got Questions?
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                Battery Safety{' '}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  FAQ
                </span>
              </h2>
            </div>
            <div className="space-y-0">
              {FAQS.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openFaqId === faq.id}
                  onToggle={() => toggleFaq(faq.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPLORE MORE ── */}
        <section className="relative mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-3">
          {[
            {
              icon: BatteryCharging,
              title: 'Charging Guide',
              text: 'Learn about home, public, AC, and DC fast charging.',
              path: '/charging',
              color: 'text-cyan-300',
              border: 'border-cyan-400/20',
              bg: 'bg-cyan-400/10',
            },
            {
              icon: ShieldCheck,
              title: 'EV Overview',
              text: 'Understand how electric vehicles work and their benefits.',
              path: '/ev',
              color: 'text-emerald-300',
              border: 'border-emerald-400/20',
              bg: 'bg-emerald-400/10',
            },
            {
              icon: Zap,
              title: 'EV History',
              text: 'Explore the journey and future of electric mobility.',
              path: '/ev-history',
              color: 'text-violet-300',
              border: 'border-violet-400/20',
              bg: 'bg-violet-400/10',
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <a
                key={card.title}
                href={card.path}
                className={`group flex items-center gap-5 rounded-[2rem] border ${card.border} bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-cyan-500/10`}
              >
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border ${card.border} ${card.bg} ${card.color}`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-black uppercase text-white text-base">{card.title}</h3>
                  <p className="text-sm leading-6 text-slate-400">{card.text}</p>
                </div>
                <ArrowRight className={`h-6 w-6 ${card.color} transition-transform group-hover:translate-x-1`} />
              </a>
            );
          })}
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes slow-zoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Batterysafety;