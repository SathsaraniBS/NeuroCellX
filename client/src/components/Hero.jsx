import React, { useState } from "react";
import PredictForm from "./PredictForm";
import { Link } from "react-router-dom";
import { Play, X } from "lucide-react"; // Imported X for the close button

const features = [
  {
    image: "src/assets/b2.png",
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
  // State to manage whether the video modal is open or closed
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white font-sans relative">
      
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

            {/* Added onClick handler to open the video modal */}
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="px-8 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <img
            src="src/assets/img2.jpeg"
            alt="EV Battery Visualization"
            className="w-full drop-shadow-[0_0_40px_rgba(0,255,255,0.3)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-lime-400/20 blur-3xl -z-10"></div>
        </div>
      </section>

      {/* ================= VIDEO MODAL ================= */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl shadow-cyan-500/20">
            
            {/* Close Button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Container */}
            <div className="aspect-video w-full bg-black">
              {/* If using a local video file: */}
              <video 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                src="src/assets/evVideo.mp4" /* <-- Change this to your actual video path */
              >
                Your browser does not support the video tag.
              </video>

              {/* OR, if using a YouTube embed, comment the video tag above and uncomment this iframe: */}
              {/* <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1"
                title="Product Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe> 
              */}
            </div>
          </div>
        </div>
      )}

      {/* FEATURES */}
      <section className="px-10 pb-20">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Smart Battery Management for EVs
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {/* Added a conditional check so it renders the image if it exists, or the emoji icon if it doesn't */}
                {f.image ? (
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-32 h-32 object-cover bg-transparent rounded-xl mx-auto"
                  />
                ) : (
                  <span className="text-6xl inline-block mb-4">{f.icon}</span>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Hero;