import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const BatteryTypes = () => {
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

          

      
    
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BatteryTypes;

