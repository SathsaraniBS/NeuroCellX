import React from "react";
import { Search, Clock, Eye } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const guides = [
  {
    title: "An Introduction to Electric Vehicles",
    category: "EV Basics",
    time: "60 min read",
    image: "/images/ev-basics.jpg",
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

export default function LearningHub() {
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-[#02030f] text-white ">
      {/* Navigation */}
      <Navbar />
      {/* Header */}
      <div className="mt-20 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Learning Hub
        </h1>
        <p className="text-gray-400 mb-6">
          Explore EV Guides & Resources
        </p>

        {/* Search */}
        <div className="relative max-w-xl">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search for guides, tips, or resources..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 backdrop-blur-lg focus:outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Featured Guides */}
      <section className="mb-16">
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

      {/* Latest News */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Latest News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item, index) => (
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
                <h3 className="font-semibold text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm mt-2">
                  {item.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg">
        <h2 className="text-2xl font-semibold mb-2">
          Stay Updated
        </h2>
        <p className="text-gray-400 mb-6">
          Subscribe for the latest EV news, guides, and tips.
        </p>

        <div className="flex flex-col md:flex-row gap-4 max-w-xl">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-400"
          />
          <button className="bg-gradient-to-r from-cyan-400 to-lime-400 text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
       <Footer />

    </div>
    
    
  );
}
