import React from "react";
import { Search, Clock, Eye } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function About() {
  return (
    
    // <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-[#02030f] text-white ">
      <div className="relative bg-gradient-to-b from-[#050816] via-[#0a0f2c] to-black text-white pt-16 pb-10 border-t border-white/10">
      {/* Navigation */}
      <Navbar />
      {/* Header */}
      <div className="mt-20 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          About VoltIQ
        </h1>
        <p className="text-gray-400 mb-6">
          Empowering EV Owners with Smart Battery Insights
        </p>
        

      </div>

      

      
      
      
      {/* Footer */}
       <Footer />

    </div>
    
    
  );
}
