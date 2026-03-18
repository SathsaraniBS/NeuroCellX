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
            EV <span className="text-cyan-400">A Complete Guide For EV Battery Types</span>
          </h2>

          <p className="text-gray-400 mb-8 text-lg">
            Explore the different types of EV batteries, their advantages, disadvantages, and how they impact your driving experience.
          </p>

          <h3>Introduction</h3>
          <h4>“The battery remains the single most expensive component in an EV,” notes Sam Abuelsamid, principal analyst at Guidehouse Insights, “and it’s the key determinant of both performance and price.”</h4>

          <h3>What are the different types of EV batteries?</h3>

          <h4>Three main types of batteries dominate today’s EV market: Lithium Iron Phosphate (LFP), Nickel Manganese Cobalt (NMC), and Nickel Cobalt Aluminum (NCA) batteries. According to the IEA’s 2024 report, LFP and NMC batteries together account for over 90% of the global EV battery market.
        </h4>

          <h3>Lithium Iron Phosphate (LFP) Batteries</h3>

          <h4>Lithium Iron Phosphate (LFP) batteries are revolutionizing the global EV battery market. According to SNE Research’s latest data, CATL, the world’s largest battery manufacturer, has reached a 37.1% market share as of July 2024, up 1.6 percentage points year-over-year, with LFP batteries being their primary product.</h4>

          <h3>Key Characteristics</h3>

          <h4>LFP batteries utilize lithium iron phosphate cathode material and graphite anode material. According to Bloomberg NEF’s latest report, this chemistry offers the following specifications:</h4>

      
    
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BatteryTypes;

