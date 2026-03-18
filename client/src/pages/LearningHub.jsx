import React from "react";
import { Search, Clock, Eye } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import images from src/assets
import bev from "../assets/bev.jpg";  // Adjust path if in subfolder like assets/images/bev.jpg
import phev from "../assets/phev.jpg";
import hev from "../assets/hev.jpg";
import nmc from "../assets/nmc.png";
import ssb from "../assets/ssb.png";

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
    image: bev,  // Use imported image
  },
  {
    title: "PHEV",
    subtitle: "Plug-in Hybrid Electric Vehicle",
    desc: "Uses both a battery and fuel engine. Can drive short distances using battery power alone.",
    examples: "Toyota Prius Prime, Mitsubishi Outlander PHEV",
    image: phev,  // Use imported image
  },
  {
    title: "HEV",
    subtitle: "Hybrid Electric Vehicle",
    desc: "Combines an electric motor with a fuel engine. Battery is charged through regenerative braking.",
    examples: "Toyota Prius, Honda Insight",
    image: hev,  // Use imported image
  },
];

const evbatteyries = [
  {
    title: "Lithium-ion (NMC)",
    name: "Lithium-ion (NMC)",
    points: [
      "High energy density",
      "Widely used in EVs",
      "Good performance and range",
    ],
    accent: "text-blue-600",
    image: nmc,
  },
  {
    name: "Lithium Iron Phosphate (LFP)",
    points: [
      "Safer and longer cycle life",
      "Lower energy density than NMC",
      "Popular in cost-efficient EVs",
    ],
    accent: "text-green-600",
  },
  {
    title: "Solid-State Batteries",
    name: "Solid-State Batteries",
    points: [
      "Emerging technology",
      "Potentially higher safety",
      "Higher energy density potential",
    ],
    accent: "text-purple-600",
    image:ssb
  },
];

const metrics = [
  {
    title: "SOH",
    full: "State of Health",
    desc: "Shows how much battery capacity remains compared to its original condition.",
    color: "border-green-200 bg-green-50",
  },
  {
    title: "SOC",
    full: "State of Charge",
    desc: "Indicates the current battery charge level as a percentage of full capacity.",
    color: "border-cyan-200 bg-cyan-50",
  },
  {
    title: "RUL",
    full: "Remaining Useful Life",
    desc: "Estimates how long the battery can continue working before replacement is needed.",
    color: "border-red-200 bg-red-50",
  },
];

const degradationFactors = [
  "High operating temperatures",
  "Frequent fast charging",
  "Deep discharge cycles",
  "High cycle count",
  "Improper charging habits",
];

const maintenanceTips = [
  "Avoid extreme charging levels for daily use.",
  "Keep the battery within safe temperature ranges.",
  "Prefer moderate charging speeds when possible.",
  "Avoid frequent full discharges.",
  "Follow manufacturer maintenance recommendations.",
];

const faqs = [
  "What is battery SOH?",
  "Why does battery capacity decrease over time?",
  "How is RUL estimated?",
  "How accurate are AI-based battery predictions?",
];

const LearningHub = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-10 py-20">
        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            EV <span className="text-cyan-400">Learning Hub</span>
          </h2>

          <p className="text-gray-400 mb-8 text-lg">
            Explore EV Guides & Resources
          </p>

          {/* Search */}
          <div className="relative max-w-xl z-10">  {/* ← NEW: z-index 10 එකතු කළා (icon එක මතුවෙන්න) */}
            <Search className="absolute left-4 top-3.5 text-gray-300 z-20" size={20} />  {/* ← NEW: size 20 ට වැඩි කළා, color gray-300 ට වෙනස් කළා, z-index 20 එකතු කළා */}
            <input
              type="text"
              placeholder="Search for guides, tips, or resources..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 backdrop-blur-lg focus:outline-none focus:border-cyan-400 transition"
            />
          </div>
        </div>
      </section>

      {/* EV Types */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-2xl font-bold">Types of Electric Vehicles</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 py-20 mb-16 bg-blue-900/5">
          {evTypes.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover mb-4"
              />
              <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
              <p className="text-xl font-medium text-slate-400 mb-2">
                {item.subtitle}
              </p>
              <p className="mt-4 text-slate-500 leading-7 mb-4">{item.desc}</p>
              <div className="rounded-xl text-slate-500 bg-slate-900/20 flex items-center gap-3 text-sm text-white">
                <span className="font-bold text-slate-500">Examples:</span> {item.examples}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* EV Battery Types */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-2xl font-bold">Ev Battery Types</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 py-20 mb-16 bg-blue-900/5">
          {evbatteyries.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover mb-4"
              />
              <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
              <p className="text-xl font-medium text-slate-400 mb-2">
                {item.points.map((point, index) => (
                  <span key={index} className="block">
                    {point}
                  </span>
                ))}
              </p>
              <p className="mt-4 text-slate-500 leading-7 mb-4">{item.desc}</p>
              <div className="rounded-xl text-slate-500 bg-slate-900/20 flex items-center gap-3 text-sm text-white">
                <span className="font-bold text-slate-500">Examples:</span> {item.examples}
              </div>
            </div>
          ))}
        </div>
      </section>




      {/* Featured Guides */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-10 py-20 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Featured Guides</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {guides.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 backdrop-blur-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5">
                  <span className="text-sm text-cyan-400">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-semibold text-lg">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-3">
                    <Clock size={14} />
                    {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Reads */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Trending Reads</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {trending.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:scale-105 transition duration-300 backdrop-blur-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-5">
                <span className="text-sm text-cyan-400">
                  {item.category}
                </span>
                <h3 className="mt-2 font-semibold text-lg">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-gray-400 text-sm mt-3">
                  <div className="flex items-center gap-2">
                    <Clock size={14} />
                    {item.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={14} />
                    {item.views}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default LearningHub;