import React, { useState } from "react"; 
import { Search, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 👇 ADDED: Import the EVChatbot component (Adjust the path if your component is in a different folder)
import EVChatbot from "../components/EVChatbot/EVChatbot"; 
// 👆 ADDED

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

const LearningHub = () => {
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
          <div className="relative max-w-xl z-10">
            <Search className="absolute left-4 top-3.5 text-gray-300 z-20" size={20} />
            <input
              type="text"
              placeholder="Search for guides, tips, or resources..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 backdrop-blur-lg focus:outline-none focus:border-cyan-400 transition"
              // --- ADDED: Input එකේ value එකයි onChange event එකයි ---
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* EV Types */}
      {filteredEvTypes.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 px-10 mt-10">
            <h3 className="text-2xl font-bold">Types of Electric Vehicles</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 py-10 mb-16 bg-blue-900/5">
            {filteredEvTypes.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-48 w-full object-cover mb-4 rounded-lg"
                />
                <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                <p className="text-xl font-medium text-slate-400 mb-2">
                  {item.subtitle}
                </p>
                <p className="mt-4 text-slate-500 leading-7 mb-4">{item.desc}</p>
                <div className="rounded-xl text-slate-500 bg-slate-900/20 flex items-center gap-3 text-sm p-3 text-white">
                  <span className="font-bold text-slate-500">Examples:</span> {item.examples}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EV Battery Types */}
      {filteredBatteries.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-4 px-10">
            <h3 className="text-2xl font-bold">EV Battery Types</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-10 py-10 mb-16 bg-blue-900/5">
            {filteredBatteries.map((item) => (
              <Link 
                to="/battery-types"
                key={item.title}
                className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-48 w-full object-cover mb-4 rounded-lg"
                  />
                )}
                <h4 className="text-2xl font-bold mb-2">{item.title}</h4>
                <div className="text-xl font-medium text-slate-400 mb-2">
                  {item.points.map((point, index) => (
                    <span key={index} className="block text-sm mb-1">
                      • {point}
                    </span>
                  ))}
                </div>
                
                {item.desc && <p className="mt-4 text-slate-500 leading-7 mb-4">{item.desc}</p>}
                
                {item.examples && (
                  <div className="rounded-xl text-slate-500 bg-slate-900/20 flex items-center gap-3 p-3 text-sm text-white mt-4">
                    <span className="font-bold text-slate-500">Examples:</span> {item.examples}
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Guides */}
      {filteredGuides.length > 0 && (
        <section className="px-10 mb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center py-10">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Featured Guides</h2>

              <div className="flex gap-4 mr-4">
                <Link to="#" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition ">
                  EV Basics
                </Link>
                <Link to="#" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition ">
                  Charging Tips
                </Link>
              </div>
            </div>

            <div className="relative h-64 md:h-80">
              <img
                src="src/assets/Lithiumbattery.jpg"
                alt="Featured Guides"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {filteredGuides.map((item, index) => (
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
        </section>
      )}

      {/* Trending Reads */}
      {filteredTrending.length > 0 && (
        <section className="mb-16 px-10">
          <h2 className="text-2xl font-semibold mb-6">Trending Reads</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {filteredTrending.map((item, index) => (
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
      )}

      {/* 👇 ADDED: The EVChatbot Component */}
      {/* We place it here so it renders on top of the page content, right before the footer.
          Ensure your EVChatbot component has CSS like "position: fixed" so it floats correctly. */}
      <EVChatbot />
      {/* 👆 ADDED */}

      
      
      <Footer />
    </div>
  );
}

export default LearningHub;