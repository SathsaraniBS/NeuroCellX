import React from "react";
import { 
  ShieldCheck, Thermometer, BatteryCharging, 
  AlertTriangle, Cpu, Wrench, Zap 
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// IMPORT YOUR IMAGES HERE
import bgImageMain from "../assets/bg.png";
import ev4 from "../assets/ev4.png";
import evsafety3 from "../assets/evsafety3.png";
import evsafety4 from "../assets/evsafety4.png";
// ADDED THE MISSING ev11 IMPORT:
import ev11 from "../assets/ev11.png"; 

const SafetyCard = ({ icon: Icon, title, desc, theme = "cyan", bgImage }) => {
  const themes = {
    cyan: {
      text: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      hover: "hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
    },
    green: {
      text: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      hover: "hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
    },
    red: {
      text: "text-rose-400",
      iconBg: "bg-rose-500/10",
      border: "border-rose-500/20",
      hover: "hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]"
    },
    blue: {
      text: "text-blue-400",
      iconBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      hover: "hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
    }
  };

  const current = themes[theme];

  return (
    <div className={`relative bg-white/5 backdrop-blur-md border rounded-2xl p-6 transition-all duration-500 group cursor-default overflow-hidden ${current.border} ${current.hover}`}>
      
      {/* Background Image Layer: Opacity increased to 20% so it's visible */}
      {bgImage && (
        <div 
          className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 bg-cover bg-center bg-[url('/src/assets/bg.png')]"
           
        />
      )}

      {/* Content Layer */}
      <div className="relative z-10">
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300 ${current.iconBg}`}>
          <Icon className={`w-7 h-7 ${current.text}`} />
        </div>
        <h3 className="text-white text-xl font-bold mb-3">{title}</h3>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

const EVBatterySafetyPage = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed text-slate-300 flex flex-col font-sans selection:bg-cyan-500/30 bg-[url('/src/assets/bg.png')] "
      
    >
      <Navbar />

      <div className="flex-grow relative overflow-hidden py-12 md:py-16">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
       
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          
          {/* Hero Section */}
          <div className="grid md:grid-cols-2 gap-8 bg-transparent md:gap-12 items-center p-8 md:p-12 mb-20 overflow-hidden relative">
            <div className="relative z-10 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                EV Battery <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Safety</span>
              </h1>
              <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto md:mx-0 leading-relaxed">
                Learn about the robust safety measures that ensure your EV battery is not just powerful, but secure. Designed for durability, tested for absolute reliability.
              </p>
            </div>

            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.15)] group h-64 md:h-[350px] lg:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent z-10"></div>
              <img
                src="/src/assets/ev4.png"
                alt="VoltIQ EV Safety Architecture"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Safety Features */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <ShieldCheck className="text-cyan-400" size={32} />
              Safety First Design
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SafetyCard
                theme="cyan"
                icon={Thermometer}
                title="Temperature Management"
                desc="Advanced thermal systems actively regulate pack temperatures to prevent overheating and thermal degradation."
                image="a"
              />
              <SafetyCard
                theme="cyan"
                icon={BatteryCharging}
                title="Stringent Testing"
                desc="Subjected to extreme weather simulations, vibration analysis, and impact tests to guarantee structural integrity."
                bgImage={ev4}
              />
              <SafetyCard
                theme="cyan"
                icon={ShieldCheck}
                title="Safety Enhancements"
                desc="Features titanium protective casing, fail-safe disconnect circuits, and real-time BMS monitoring."
                bgImage={evsafety3}
              />
            </div>
          </div>

          {/* Reliability Section */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <Cpu className="text-emerald-400" size={32} />
              Tested for Reliability
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SafetyCard
                theme="green"
                icon={Cpu}
                title="Advanced Simulations"
                desc="AI-powered digital twin simulations predict battery behavior across millions of virtual miles."
                bgImage={evsafety3}
              />
              <SafetyCard
                theme="green"
                icon={ShieldCheck}
                title="Extreme Conditions"
                desc="Verified operations in environments ranging from arctic freezes to desert heatwaves."
                bgImage={evsafety4}
              />
              <SafetyCard
                theme="green"
                icon={BatteryCharging}
                title="Performance Stability"
                desc="Engineered chemistries ensure consistent voltage output and minimal degradation over thousands of cycles."
                bgImage={ev4}
              />
            </div>
          </div>

          {/* Did You Know Section */}
          <div className="mb-24 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 backdrop-blur-md border border-cyan-500/30 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Did You <span className="text-cyan-400">Know?</span>
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-3xl">
                  Modern EV batteries must meet strict global safety standards before they ever hit the road, ensuring high durability across diverse environmental conditions.
                </p>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-cyan-100 font-medium">
                  <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Zap size={20} className="text-cyan-400 flex-shrink-0" /> 
                    <span className="text-sm">ASIL-D Automotive Safety Integrity</span>
                  </li>
                  <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Zap size={20} className="text-cyan-400 flex-shrink-0" /> 
                    <span className="text-sm">IP69K Dust & Water Protection</span>
                  </li>
                  <li className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
                    <Zap size={20} className="text-cyan-400 flex-shrink-0" /> 
                    <span className="text-sm">UL2580 Certified Protocols</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Responsibility */}
          <div className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <Wrench className="text-blue-400" size={32} />
              Your Role in Battery Safety
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SafetyCard
                theme="blue"
                icon={BatteryCharging}
                title="Proper Charging"
                desc="Avoid consistent 100% charges for daily driving. Utilize the 20-80% rule to minimize cell stress."
                bgImage={ev11}
              />
              <SafetyCard
                theme="blue"
                icon={Cpu}
                title="Software Updates"
                desc="Always install OTA (Over-The-Air) updates to ensure your BMS has the latest safety algorithms."
                bgImage={evsafety3}
              />
              <SafetyCard
                theme="blue"
                icon={Wrench}
                title="Routine Inspections"
                desc="Schedule annual undercarriage and coolant level inspections with certified VoltIQ technicians."
                bgImage={evsafety4}
              />
            </div>
          </div>

          {/* Risk Factors */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <AlertTriangle className="text-rose-400" size={32} />
              Known Risk Factors
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <SafetyCard
                theme="red"
                icon={AlertTriangle}
                title="Thermal Runaway"
                desc="A rare cascade event where a damaged cell overheating triggers adjacent cells. Modern packs use firewalls to isolate this."
              />
              <SafetyCard
                theme="red"
                icon={BatteryCharging}
                title="Chronic Overcharging"
                desc="Leaving the vehicle plugged in at 100% in extreme heat can lead to accelerated internal resistance and swelling."
              />
              <SafetyCard
                theme="red"
                icon={Wrench}
                title="Mechanical Damage"
                desc="Severe undercarriage impacts from road debris can pierce the armor plating, compromising the hermetic seal."
              />
              <SafetyCard
                theme="red"
                icon={Zap}
                title="Severe Cell Imbalance"
                desc="When cells drift too far apart in voltage, the BMS may restrict power output to prevent localized over-discharging."
              />
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-12">
            <button className="px-10 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:-translate-y-1 transition-all duration-300">
              Access VoltIQ Dashboard
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EVBatterySafetyPage;