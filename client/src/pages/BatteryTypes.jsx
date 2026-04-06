import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  Gauge, 
  ThermometerSnowflake 
} from "lucide-react";

const BatteryTypes = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Background Decorative Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <Navbar />

      <main className="flex-grow relative z-10 px-6 md:px-10 py-16 max-w-7xl mx-auto w-full">
        
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6">
            <Zap size={14} /> Energy Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent">
            EV Battery <br /> Technologies
          </h1>
          
          <div className="max-w-3xl backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-400">
              <Cpu size={20} /> The Heart of the Machine
            </h2>
            <blockquote className="text-lg text-gray-300 italic leading-relaxed">
              “The battery remains the single most expensive component in an EV, and it’s the key determinant of both performance and price.”
            </blockquote>
            <p className="mt-4 text-sm text-gray-500 font-bold uppercase tracking-wider">— Sam Abuelsamid, Guidehouse Insights</p>
          </div>
        </section>

        {/* Market Overview */}
        <section className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <TrendingUp className="text-green-400" /> Market Landscape
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              The EV industry is currently dominated by three core chemistries: 
              <span className="text-white font-semibold"> LFP, NMC, and NCA</span>. 
              Together, these power over 90% of all electric vehicles on the road today, balancing the trade-offs between range, safety, and cost.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-3xl font-black text-cyan-400 mb-1">90%+</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Market Share</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-3xl font-black text-green-400 mb-1">$53-85</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">Cost per kWh</div>
            </div>
          </div>
        </section>

        {/* NMC SECTION */}
        <section className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-16 transition-all hover:border-cyan-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Lithium NMC</h2>
              <p className="text-cyan-400 font-mono tracking-tighter">Nickel Manganese Cobalt</p>
            </div>
            <div className="px-6 py-2 bg-cyan-500 text-black font-black rounded-full text-sm">Long Range Standard</div>
          </div>

          <p className="text-gray-300 mb-10 text-lg max-w-4xl leading-relaxed">
            NMC batteries are the industry workhorse for premium performance. They offer the highest energy density for passenger vehicles, making them the default choice for long-range Tesla models and European luxury EVs.
          </p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Specifications</h3>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <Gauge className="text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Energy Density</p>
                  <p className="font-bold">200-350 Wh/kg</p>
                </div>
              </div>
              <div className="bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <Zap className="text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Operating Voltage</p>
                  <p className="font-bold">3.6V - 3.7V</p>
                </div>
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="bg-green-500/5 border border-green-500/20 p-8 rounded-3xl">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} /> Performance Pros
              </h3>
              <ul className="text-sm text-gray-300 space-y-3">
                <li className="flex gap-2"><span>•</span> Superior fast-charging capabilities</li>
                <li className="flex gap-2"><span>•</span> 30-40% lighter than LFP for same range</li>
                <li className="flex gap-2"><span>•</span> Excellent cold-weather discharge</li>
              </ul>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <AlertTriangle size={18} /> Critical Risks
              </h3>
              <ul className="text-sm text-gray-300 space-y-3">
                <li className="flex gap-2"><span>•</span> Geopolitical cobalt supply issues</li>
                <li className="flex gap-2"><span>•</span> Higher risk of thermal runaway</li>
                <li className="flex gap-2"><span>•</span> More expensive raw materials</li>
              </ul>
            </div>
          </div>
        </section>

        {/* LFP SECTION */}
        <section className="group relative bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-16 transition-all hover:border-green-500/30">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-4xl font-black text-white mb-2">Lithium LFP</h2>
              <p className="text-green-400 font-mono tracking-tighter">Lithium Iron Phosphate</p>
            </div>
            <div className="px-6 py-2 bg-green-500 text-black font-black rounded-full text-sm">Economy & Safety King</div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
               <p className="text-gray-300 text-lg leading-relaxed mb-6">
                LFP is rapidly becoming the standard for entry-level EVs and commercial fleets. By removing Cobalt and Nickel, manufacturers can slash costs while providing a battery that can last over 10 years of daily use.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Lifespan</p>
                  <p className="font-bold text-green-400">3000+ Cycles</p>
                </div>
                <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Avg. Cost</p>
                  <p className="font-bold text-green-400">~$53 /kWh</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                <div className="text-green-400"><ShieldCheck /></div>
                <div>
                  <p className="font-bold">Thermal Stability</p>
                  <p className="text-sm text-gray-400">Virtually impossible to ignite under normal crash conditions.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl">
                <div className="text-blue-400"><ThermometerSnowflake /></div>
                <div>
                  <p className="font-bold">Cold Performance</p>
                  <p className="text-sm text-gray-400">Main weakness: 20-30% range loss in sub-zero temps.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NCA SECTION */}
        <section className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16 shadow-lg">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 flex items-center gap-3">
            <Zap /> Nickel NCA (Premium Performance)
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <p className="text-gray-300 text-lg mb-6">
                Commonly associated with Panasonic and Tesla, NCA batteries offer high specific energy and power. They are designed for vehicles where weight is the primary enemy of performance.
              </p>
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">High energy density: 250 Wh/kg</li>
                <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">High Power delivery</li>
                <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">3.2V - 3.6V Range</li>
                <li className="bg-white/5 p-3 rounded-lg border-l-2 border-blue-400">Fast acceleration support</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
              <h4 className="font-bold mb-2">Usage Case:</h4>
              <p className="text-sm text-gray-400 italic">"Used primarily in Tesla Model S/X to achieve 0-60 in under 3 seconds while maintaining a lightweight chassis."</p>
            </div>
          </div>
        </section>

        {/* SOLID STATE SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-900/20 to-cyan-900/20 border border-purple-500/30 rounded-[3rem] p-8 md:p-16 mb-20 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-6 italic tracking-tighter">
              SOLID-STATE: <span className="text-purple-400">The Holy Grail</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Replacing liquid electrolytes with solid ceramics. Imagine a car that charges in 10 minutes and drives 1,000km on a single charge.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Non-Flammable', '500+ Wh/kg', '10 Min Charge', 'Ultra-Light'].map((feature) => (
                <div key={feature} className="px-4 py-2 rounded-full border border-purple-400/30 bg-purple-400/10 text-xs font-bold text-purple-300">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 blur-[100px] pointer-events-none"></div>
        </section>

        {/* Expert Insight Footer */}
        <section className="flex flex-col md:flex-row items-center gap-8 p-10 rounded-3xl bg-cyan-500 text-black shadow-2xl">
          <div className="p-4 bg-black rounded-2xl text-cyan-500">
            <Zap size={40} fill="currentColor" />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">The LMFP Frontier</h3>
            <p className="font-medium text-black/80 text-lg">
              Next-generation technologies like LMFP (Lithium Manganese Iron Phosphate) are bridge chemistries that aim to increase EV range by up to 20% while keeping LFP's safety and low price point.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default BatteryTypes;