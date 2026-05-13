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

import React, { useState } from "react";
import {ShieldCheck,Zap,AlertTriangle,Phone,CheckCircle2,ChevronDown,
  ArrowRight,BatteryCharging,Thermometer,Truck,Users,Recycle,ClipboardList,Package,BookOpen,Download,Calendar,Wrench,Flame,
  Droplets,PlugZap,Clock,Eye,WifiOff,} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const QUICK_RULES = [
  {
    icon: Zap,
    text: "Don't touch damaged high-voltage parts; stay back.",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Droplets,
    text: "Never pour water directly on a battery fire.",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
  },
  {
    icon: PlugZap,
    text: "Use certified chargers and grounded outlets only.",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Phone,
    text: "Call emergency services + roadside assistance for serious events.",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
  },
];

const SAFETY_CATEGORIES = [
  {
    icon: PlugZap,
    title: "Charging Safety",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(34,211,238,0.10)]",
    link: "#charging-safety",
    linkLabel: "Read more",
    points: [
      "Use manufacturer-recommended chargers and cables.",
      "Avoid damaged or frayed cables; don't use extension cords.",
      "Charge in a well-ventilated, dry area.",
      "Don't leave charging unattended for long periods.",
      "Use grounded outlets and RCD/GFCI for home chargers.",
    ],
  },
  {
    icon: ClipboardList,
    title: "Daily Inspection Checklist",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(52,211,153,0.10)]",
    link: "#checklist",
    linkLabel: "Open checklist",
    points: [
      "Cable: no cuts or damage.",
      "Connector pins clean and undamaged.",
      "Charging port flap closes properly; seals intact.",
      "No swelling, leaks, or burn marks under the car.",
      "Warning lights on dash — follow owner manual.",
    ],
  },
  {
    icon: Package,
    title: "Storage & Transport",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(167,139,250,0.10)]",
    link: "#storage",
    linkLabel: "Read more",
    points: [
      "For long storage: keep SOC around 40–60%.",
      "Park in a ventilated, covered place.",
      "Avoid extreme heat (direct sun) and deep cold.",
      "Transport high-voltage batteries only by trained professionals.",
      "Follow local laws and shipping regulations.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Emergency Steps",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(251,146,60,0.10)]",
    link: "#emergency",
    linkLabel: "See details",
    numbered: true,
    points: [
      "Move people away (10–15 m).",
      "If safe, isolate power (unplug at wall only if safe).",
      "Call emergency services & roadside assistance.",
      "Do NOT use water on battery fires.",
      "Inform responders it's an EV and if it was charging.",
    ],
  },
  {
    icon: Flame,
    title: "Fire & Thermal Runaway Basics",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(252,165,165,0.10)]",
    link: "#fire",
    linkLabel: "Read more",
    points: [
      "Signs: smoke, crackling, popping, hissing, strong chemical smell.",
      "Water alone can spread fire or cause shock — not recommended.",
      "Firefighters may use large volumes of water for cooling. Leave it to them.",
    ],
  },
  {
    icon: Truck,
    title: "Towing & Service Guidance",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(147,197,253,0.10)]",
    link: "#towing",
    linkLabel: "Read more",
    points: [
      "Do not tow on all four wheels unless manufacturer allows.",
      "Flatbed towing is preferred.",
      "Do not attempt high-voltage repairs.",
      "HV and 12V systems should be disconnected only by trained technicians.",
    ],
  },
  {
    icon: Users,
    title: "First Responder Tips",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(52,211,153,0.10)]",
    link: "#responder",
    linkLabel: "Responder guides",
    points: [
      "Look for HV warnings (orange cables/labels).",
      "Use proper PPE and follow isolation procedures.",
      "Keep scene secure, ventilated, and away from bystanders.",
      "Check official responder guides for your region.",
    ],
  },
  {
    icon: Recycle,
    title: "Recycling & End-of-Life Safety",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "shadow-[0_0_35px_rgba(34,211,238,0.10)]",
    link: "#recycling",
    linkLabel: "Read more",
    points: [
      "Do not attempt DIY battery dismantling.",
      "Use authorized recycling or disposal centers.",
      "Store used packs at partial SOC in a cool, dry place until transfer.",
    ],
  },
];

const WARNING_LABELS = [
  { icon: Zap, label: "High Voltage", color: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  { icon: Flame, label: "Fire Risk", color: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  { icon: BookOpen, label: "Read Manual", color: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
  { icon: Droplets, label: "Do Not Use Water", color: "text-cyan-300", border: "border-cyan-400/30", bg: "bg-cyan-400/10" },
];

const FAQS = [
  {
    id: 1,
    question: "Can I charge my EV in the rain?",
    answer:
      "Yes. EV charging systems are designed and certified to be weatherproof. Connectors and ports meet IP ratings for water resistance. However, always use manufacturer-approved equipment and avoid visibly damaged cables.",
  },
  {
    id: 2,
    question: "What if my car shows a battery fault light?",
    answer:
      "Stop driving when safe and contact your EV manufacturer's support line immediately. Do not attempt to diagnose or repair battery issues yourself. Fault lights can indicate anything from a minor sensor issue to a serious cell problem.",
  },
  {
    id: 3,
    question: "Is it safe to leave my EV charging overnight?",
    answer:
      "Yes, most modern EVs are designed for overnight charging and will stop automatically at the set limit. Use a certified Level 2 home charger with a dedicated circuit and set a charge limit of 80% for daily use.",
  },
  {
    id: 4,
    question: "What should I do if I see smoke coming from the battery area?",
    answer:
      "Immediately move everyone at least 10–15 metres away. Do not open the bonnet. Call emergency services (112/911) and inform them it is an EV. Do NOT use water — call trained firefighters.",
  },
  {
    id: 5,
    question: "How often should I inspect my charging cable and port?",
    answer:
      "Inspect the charging cable and port before every session. Look for cuts, burns, bent pins, moisture, or unusual smells. Replace damaged cables immediately and have the port inspected by a certified technician annually.",
  },
];

const HELP_CONTACTS = [
  { icon: Phone, label: "Roadside Assistance", number: "+94 77 123 4567", color: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/10" },
  { icon: Wrench, label: "Service Support", number: "+94 11 987 6543", color: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/10" },
];

const BOTTOM_LINKS = [
  { icon: Download, label: "Download Safety Checklist (PDF)", sub: "One-page checklist for quick reference.", href: "/safety-checklist.pdf", color: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/10" },
  { icon: Calendar, label: "Book Service / Report Damage", sub: "Get professional help and support.", href: "/book-service", color: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/10" },
  { icon: BatteryCharging, label: "Visit Battery Maintenance", sub: "Tips to keep your battery healthy.", href: "/battery-safety", color: "text-cyan-300", border: "border-cyan-400/25", bg: "bg-cyan-400/10" },
];

/* ─────────────────────────────────────────
   Sub-Components
───────────────────────────────────────── */
const FAQItem = ({ faq, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left gap-4 group"
      >
        <div className="flex items-center gap-4">
          
          <span className="font-semibold text-base md:text-lg text-white group-hover:text-cyan-100 transition-colors">
            {faq.question}
          </span>
        </div>
        <ChevronDown
          className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-400 text-base leading-relaxed pl-[52px]">{faq.answer}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
function EVBatterySafetyPage() {
  const [openFaqId, setOpenFaqId] = useState(null);

  const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">

              {/* ── HERO ── */}
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
                          <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Practical safety tips, emergency steps,
                              ,<br />
                              and when to call professionals.

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
        
        {/* ── QUICK RULES STRIP ── */}
        <section className="relative py-10 ">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_RULES.map((rule, i) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-5 rounded-2xl border ${rule.border} bg-white/[0.04] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:-translate-y-1`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${rule.border} ${rule.bg} ${rule.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-slate-300 text-sm font-bold leading-relaxed">{rule.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── EMERGENCY BANNER ── */}
        <section className="py-6 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_45px_rgba(34,211,238,0.10)]">
            {/* accent line */}
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent " />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.07),transparent_40%)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/15">
                  <AlertTriangle className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white mb-2">
                    Emergency:{" "}
                    <span className="text-cyan-300">
                      If there's smoke or fire
                    </span>
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed">
                    Move people away (10–15 m), call emergency services.{" "}
                    <span className="font-bold text-cyan-300">
                      Do NOT use water on battery fires.
                    </span>
                  </p>
                </div>
              </div>

              <a
                href="tel:112"
                className="flex-shrink-0 inline-flex items-center gap-3 px-7 py-4 rounded-xl border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 font-black text-base hover:bg-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(239,68,68,0.30)] transition-all duration-300"
              >
                <Phone className="h-5 w-5" />
                Emergency 112 / 911
              </a>
            </div>
          </div>
        </section>

        {/* ── 8 SAFETY CATEGORIES GRID ── */}
        <section className="py-16 max-w-7xl mx-auto px-6 relative">
          <div className="pointer-events-none absolute left-0 top-10 h-96 w-96 rounded-full bg-cyan-500/6 blur-[130px]" />
          <div className="pointer-events-none absolute right-0 bottom-10 h-96 w-96 rounded-full bg-emerald-400/6 blur-[130px]" />

          <div className="mb-12">
            
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Safety{" "}
              <span className="text-cyan-400 ">
                Categories
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SAFETY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className={`group flex flex-col justify-between rounded-[1.75rem] border ${cat.border} bg-[#071124]/60 backdrop-blur-xl p-6 ${cat.glow} transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.06]`}
                >
                  {/* Top accent line */}
                  <div className={`h-px w-full bg-gradient-to-r from-transparent via-current to-transparent mb-5 opacity-30 ${cat.color}`} />

                  <div>
                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${cat.border} ${cat.bg} ${cat.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className={`font-black text-base uppercase leading-tight ${cat.color}`}>
                        {cat.title}
                      </h3>
                    </div>

                    {/* Points */}
                    <ul className="flex flex-col gap-3">
                      {cat.points.map((point, pi) => (
                        <li key={pi} className="flex items-start gap-2">
                          {cat.numbered ? (
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${cat.border} ${cat.bg} text-[10px] font-black mt-0.5 ${cat.color}`}>
                              {pi + 1}
                            </span>
                          ) : (
                            <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${cat.color}`} />
                          )}
                          <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Link */}
                  <a
                    href={cat.link}
                    className={`mt-6 inline-flex items-center gap-2 text-lg font-bold ${cat.color} hover:opacity-80 transition-opacity`}
                  >
                    {cat.linkLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── OFFICIAL WARNINGS & LABELS ── */}
        <section className="py-14 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_45px_rgba(34,211,238,0.10)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent " />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.07),transparent_40%)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-10">
              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                    <AlertTriangle className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div>
                   
                    <h3 className="text-3xl font-black uppercase text-white">
                      Official {" "}
                      <span className="text-cyan-300">Warnings & Labels</span>
                    </h3>
                  </div>
                </div>
                <p className="text-slate-300 text-lg font-bold leading-relaxed max-w-xl">
                  Always follow the warning labels on your vehicle and charger. High voltage inside.
                  Risk of electric shock or fire.
                </p>
              </div>

              {/* Warning icons */}
              <div className="flex flex-wrap gap-4">
                {WARNING_LABELS.map((w) => {
                  const Icon = w.icon;
                  return (
                    <div
                      key={w.label}
                      className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border ${w.border} ${w.bg} backdrop-blur-sm transition-all duration-300 hover:-translate-y-1`}
                    >
                      <Icon className={`h-9 w-9 ${w.color}`} />
                      <span className={`text-xs font-bold text-center ${w.color} leading-tight`}>
                        {w.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 bg-transparent">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-12">
             
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                 Safety {" "}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  FAQ
                </span>
              </h2>
              
            </div>

            <div className="">
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

        {/* ── NEED HELP ── */}
        <section className="py-10 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_45px_rgba(34,211,238,0.10)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(34,211,238,0.07),transparent_40%)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
              <div>
                
                <h3 className="text-3xl font-black uppercase text-white mb-2">
                  Need{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                    Help?
                  </span>
                </h3>
                <p className="text-slate-300 text-lg font-bold leading-relaxed max-w-md">
                  For roadside assistance, service, <br />or reporting a damaged charger or station.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {HELP_CONTACTS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.label}
                      href={`tel:${c.number.replace(/\s/g, "")}`}
                      className={`flex items-center gap-4 px-6 py-4 rounded-2xl border ${c.border} ${c.bg} backdrop-blur-sm hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${c.border} bg-white/[0.08] ${c.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className={`text-lg font-bold uppercase tracking-wider ${c.color} mb-0.5`}>
                          {c.label}
                        </p>
                        <p className="text-white font-black text-lg">{c.number}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM QUICK LINKS ── */}
        <section className="py-10 max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BOTTOM_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`group flex items-center gap-5 rounded-[2rem] border ${link.border} bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-cyan-500/10`}
                >
                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${link.border} ${link.bg} ${link.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-black text-lg font-bold uppercase mb-1 ${link.color}`}>
                      {link.label}
                    </h3>
                    <p className="text-slate-300 text-lg font-bold leading-relaxed">{link.sub}</p>
                  </div>
                  <ArrowRight className={`h-5 w-5 ${link.color} transition-transform group-hover:translate-x-1`} />
                </a>
              );
            })}
          </div>
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

export default EVBatterySafetyPage;