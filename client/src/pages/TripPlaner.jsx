import React, { useState, useEffect } from 'react';
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


  

function TripPlanner() {
  


  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 py-10">
                          <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
                              <div>
                                  <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                                      EV Trip Planner 
                                  </h2>
                                  
                                  
                              </div>
                              <div className="relative group">
                                  {/* Replaced broken local image path with a high-quality EV battery/tech stock image */}
                                  <img
                                      src="src/assets/ev3.png"
                                      alt="EV Battery"
                                      className="w-full h-full object-cover  shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
                                  />
                                  <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
                              </div>
                          </div>
                      </section>
      
      
            
            
        
            
       <Footer />

      {/* Added some custom keyframes for the zoom effect */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </div>
  );
}

export default TripPlanner;