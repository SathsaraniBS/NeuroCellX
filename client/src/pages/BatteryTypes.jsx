import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BatteryTypes = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0b1120] to-[#0f172a] text-white flex flex-col">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Wrapper - FIXED: Changed to <main> to organize page structure properly */}
      <main className="flex-grow px-10 py-16 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <section className="mb-16">
          <h2 className="text-5xl font-bold leading-tight mb-8">
            EV Battery Types
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Introduction</h2>
            {/* FIXED: Formatted the quote so it stands out nicely */}
            <blockquote className="text-lg text-gray-300 italic border-l-4 border-cyan-400 pl-4 py-1 bg-black/20 rounded-r-lg">
              “The battery remains the single most expensive component in an EV,” notes Sam Abuelsamid, principal analyst at Guidehouse Insights, “and it’s the key determinant of both performance and price.”
            </blockquote>
          </div>
        </section>

        {/* TYPES OVERVIEW */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">
            What are the different types of EV batteries?
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-4xl">
            The EV industry is dominated by Lithium Iron Phosphate (LFP),
            Nickel Manganese Cobalt (NMC), and Nickel Cobalt Aluminum (NCA)
            batteries, which together account for over 90% of the market.
          </p>
        </section>

        {/* LFP SECTION */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12 shadow-lg">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            Lithium Iron Phosphate (LFP)
          </h2>

          <p className="text-gray-300 mb-8 text-lg">
            LFP batteries are widely used due to their safety, long lifespan,
            and cost efficiency.
          </p>

          {/* Key Characteristics & Advantages */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">
                Key Characteristics
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>• Operating voltage: 3.2V</li>
                <li>• Energy density: 90–160 Wh/kg</li>
                <li>• Cycle life: 3,000–6,000 cycles</li>
                <li>• Cost: ~$53/kWh (2024)</li>
              </ul>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                Advantages
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li>✔ High safety (thermal stability)</li>
                <li>✔ Long lifespan (8–10 years)</li>
                <li>✔ Low cost</li>
                <li>✔ Eco-friendly (no cobalt)</li>
              </ul>
            </div>
          </div>

          {/* Disadvantages, Applications & Market Trends - FIXED: Put these in a 3-column grid */}
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold mb-3 text-red-400">
                Disadvantages
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Lower energy density</li>
                <li>• Heavier weight</li>
                <li>• Poor performance in cold temperatures</li>
              </ul>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold mb-3 text-yellow-400">
                Applications & Success
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Tesla Model 3/Y (Standard Range)</li>
                <li>• BYD Blade Battery</li>
                <li>• Commercial EVs (fast growth)</li>
              </ul>
            </div>

            <div className="bg-black/40 p-6 rounded-xl border border-white/5">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">
                Market Trends
              </h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Market size: $141B (2024)</li>
                <li>• Rapid global adoption</li>
                <li>• Expected 300GWh installations by 2025</li>
              </ul>
            </div>
          </div>
        </section>

        {/* OTHER BATTERY TYPES */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* NMC */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
            <h3 className="text-xl font-semibold text-cyan-400 mb-3">
              NMC Battery
            </h3>
            <p className="text-gray-400 leading-relaxed">
              High energy density and balanced performance. Common in long-range EVs.
            </p>
          </div>

          {/* NCA */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
            <h3 className="text-xl font-semibold text-green-400 mb-3">
              NCA Battery
            </h3>
            <p className="text-gray-400 leading-relaxed">
              High performance and energy density, used in premium EVs like Tesla.
            </p>
          </div>

          {/* Solid */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition duration-300">
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Solid-State
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Future technology offering higher safety and energy density.
            </p>
          </div>

        </section>

        {/* EXPERT INSIGHT */}
        <section className="bg-gradient-to-r from-cyan-500/10 to-green-500/10 border border-cyan-500/20 p-8 rounded-2xl shadow-lg mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl font-semibold text-cyan-400">
              Expert Insight
            </h3>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">
            Next-generation battery technologies such as LMFP are expected to
            increase EV range by up to 20%, making EVs more efficient and affordable.
          </p>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default BatteryTypes;