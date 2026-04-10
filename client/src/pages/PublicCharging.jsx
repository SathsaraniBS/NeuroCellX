import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Battery, 
  Gauge, 
  ChevronRight, 
  ShieldCheck, 
  Globe, 
  Leaf, 
  Wind,
  Navigation,
  Info
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


  

function PublicCharging() {
  


  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      <Navbar />
      <section className="min-h-screen relative bg-[url('/src/assets/evstation.png')] animate-slow-zoom bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
            
            
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

export default PublicCharging;