import React from "react";
import PredictForm from "./PredictForm";
import { Link } from "react-router-dom";
const features = [
  {
    icon: "📈",
    title: "Predictive Intelligence",
    desc: "Predict remaining battery life with AI-powered analytics.",
  },
  {
    icon: "🔋",
    title: "Real-time Monitoring",
    desc: "Monitor your EV’s battery status and health in real-time.",
  },
  {
    icon: "🌐",
    title: "Fleet Management",
    desc: "Optimize and manage your electric vehicle fleet with ease.",
  },
];

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white font-sans">
      {/* ================= NAVBAR ================= */}
      <nav className="flex justify-between items-center px-10 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide text-cyan-400">
          Volt<span className="text-lime-400">IQ</span>
        </h1>

        <div className="flex gap-8 text-gray-300">
          <a href="#" className="hover:text-cyan-400">Features</a>
          <a href="#" className="hover:text-cyan-400">Learning Hub</a>
          <a href="#" className="hover:text-cyan-400">About</a>
        </div>
        
        <div className="flex gap-4 mr-4">
          <Link to="/register" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition">
            Sign In
          </Link>
          <Link to="/login" className="px-5 py-2 border border-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-black transition ">
            Login
        </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="grid md:grid-cols-2 gap-10 items-center px-10 py-20">
        {/* LEFT TEXT */}
        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
            Unlock the Future of Your <span className="text-cyan-400">EV Battery</span>
          </h2>

          <p className="text-gray-400 mb-8 text-lg">
            Real-time health insights, AI-driven RUL predictions, and smarter driving recommendations.
          </p>

          <div className="flex gap-5">
            <button className="px-7 py-3 bg-gradient-to-r from-cyan-500 to-lime-400 text-black font-semibold rounded-xl shadow-lg hover:scale-105 transition">
              Connect Your Vehicle
            </button>

            <button className="px-7 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition">
              Explore Learning Hub
            </button>
          </div>

          {/* This block was broken — either remove or fix */}
          {/* If you want to show the form here: */}
          <div className="mt-10">
            <h3 className="text-2xl mb-4">EV Battery Health Prediction</h3>
            <PredictForm />   
            <p className="text-gray-500">(Prediction form placeholder)</p>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="bg1.webp"           // ← assuming it's in /public/
            alt="EV Battery Visualization"
            className="w-full drop-shadow-[0_0_40px_rgba(0,255,255,0.3)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-lime-400/20 blur-3xl -z-10"></div>
        </div>
      </section>

      {/* ... rest of your sections remain almost the same ... */}

      {/* FEATURES */}
      <section className="px-10 pb-20">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Smart Battery Management for EVs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-6 px-10 flex justify-between text-gray-500 text-sm">
        <span>
          Volt<span className="text-lime-400">IQ</span> © 2026
        </span>
        <span className="text-cyan-400">Powered by AI</span>
      </footer>
    </div>
  );
};

export default Hero;