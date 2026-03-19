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
       {/* LEFT TEXT */}
        <div>
          <h2 className="text-5xl font-bold leading-tight mb-6">
                    EV Battery Types
          </h2>
        

      <h2>Introduction</h2>
      
      <h3>“The battery remains the single most expensive component in an EV,” notes Sam Abuelsamid, principal analyst at Guidehouse Insights, “and it’s the key determinant of both performance and price.”
      </h3>

      </div>

      {/* TYPES OVERVIEW */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-3">
          What are the different types of EV batteries?
        </h2>
         <p className="text-gray-400">
          The EV industry is dominated by Lithium Iron Phosphate (LFP),
          Nickel Manganese Cobalt (NMC), and Nickel Cobalt Aluminum (NCA)
          batteries, which together account for over 90% of the market.
        </p>
      </div>

      {/* LFP SECTION */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 shadow-lg">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          Lithium Iron Phosphate (LFP)
        </h2>

        <p className="text-gray-400 mb-4">
          LFP batteries are widely used due to their safety, long lifespan,
          and cost efficiency.
        </p>

        {/* Key Characteristics */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-black/40 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">
              Key Characteristics
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Operating voltage: 3.2V</li>
              <li>• Energy density: 90–160 Wh/kg</li>
              <li>• Cycle life: 3,000–6,000 cycles</li>
              <li>• Cost: ~$53/kWh (2024)</li>
            </ul>
          </div>

          <div className="bg-black/40 p-4 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-green-400">
              Advantages
            </h3>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>✔ High safety (thermal stability)</li>
              <li>✔ Long lifespan (8–10 years)</li>
              <li>✔ Low cost</li>
              <li>✔ Eco-friendly (no cobalt)</li>
            </ul>
          </div>
        </div>

        {/* Disadvantages */}
        <div className="bg-black/40 p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-400">
            Disadvantages
          </h3>

            <ul className="text-gray-300 text-sm space-y-1">
            <li>• Lower energy density</li>
            <li>• Heavier weight</li>
            <li>• Poor performance in cold temperatures</li>
          </ul>
        </div>

        {/* Applications */}
        <div className="bg-black/40 p-4 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-2 text-yellow-400">
            Applications & Success
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Tesla Model 3/Y (Standard Range)</li>
            <li>• BYD Blade Battery</li>
            <li>• Commercial EVs (fast growth)</li>
          </ul>
        </div>

         {/* Market Trends */}
        <div className="bg-black/40 p-4 rounded-xl">
          <h3 className="text-lg font-semibold mb-2 text-purple-400">
            Market Trends
          </h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Market size: $141B (2024)</li>
            <li>• Rapid global adoption</li>
            <li>• Expected 300GWh installations by 2025</li>
          </ul>
        </div>
      </div>

      {/* OTHER BATTERY TYPES */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        
        {/* NMC */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 className="text-lg font-semibold text-cyan-400 mb-2">
            NMC Battery
          </h3>
          <p className="text-gray-400 text-sm">
            High energy density and balanced performance. Common in long-range EVs.
          </p>
        </div>

        {/* NCA */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            NCA Battery
          </h3>
          <p className="text-gray-400 text-sm">
            High performance and energy density, used in premium EVs like Tesla.
          </p>
        </div>


        {/* Solid */}
        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
          <h3 className="text-lg font-semibold text-purple-400 mb-2">
            Solid-State
          </h3>
          <p className="text-gray-400 text-sm">
            Future technology offering higher safety and energy density.
          </p>
        </div>

      </div>

      {/* EXPERT INSIGHT */}
      <div className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-white/10 p-6 rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2 text-green-400">
          Expert Insight
        </h3>
         <p className="text-gray-300 text-sm">
          Next-generation battery technologies such as LMFP are expected to
          increase EV range by up to 20%, making EVs more efficient and affordable.
        </p>
      </div>
 
        

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BatteryTypes;

