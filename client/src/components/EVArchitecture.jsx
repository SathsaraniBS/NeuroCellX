import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 1. Move static data outside the component to prevent unnecessary re-renders
const batterySafety = [
  "ASIL-D that promises enhanced safety integrity level",
  "IP69K for better dust and water resistance rating",
  "UL2580 for an enhanced safety management system"
];

const passengerSafety = [
  "ISOFIX child seat anchor",
  "PM2.5 filter",
  "Geofencing",
  "Hill descent control",
  "Hill start assist",
  "Electronic stability control",
  "Onboard diagnostics",
  "Tyre pressure monitoring system"
];

// 2. Extracted CheckIcon for cleaner JSX
const CheckIcon = () => (
  <svg
    className="w-6 h-6 text-cyan-400 mr-4 flex-shrink-0 mt-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
  </svg>
);

// 3. Main Component correctly structured
const EVArchitecture = () => {
  const location = useLocation(); // Ready to be used for route logic

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative z-0">
      <Navbar />

      {/* Main Content Wrapper */}
      <main className="flex-grow flex flex-col relative overflow-hidden">

        {/* Ambient Background Glows for EV Tech Feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="relative flex-grow flex items-center justify-center pt-32 pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center z-10">
            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 tracking-tight leading-tight uppercase">
              <span className="block text-white pb-2">Electric Vehicle Design</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
                The Anatomy of an EV
              </span>
            </h1>

            {/* Glassmorphism Content Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl text-left transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                Introduction
              </h2>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  In a world battling the climate change crisis at an unprecedented level, electric vehicles (EVs) have emerged as a great alternative to make transportation as clean and green as possible.
                </p>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                  Often tagged as the <span className="text-cyan-300 font-medium">“car of the future”</span>, electric cars imbibe cutting-edge technology, transforming driving experiences. In this article, we will understand the fundamental architecture and components of electric vehicles to understand how they work and what makes them promising for the future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Architecture Section */}
        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full relative">
          <div className="space-y-16">
            
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                As the name suggests, an electric vehicle is powered by electricity instead of fuel. The architecture of an EV comprises the following components:
              </p>
            </div>

            {/* 1. Traction Battery Pack */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm border border-cyan-500/30">1</span>
                Traction battery pack
              </h3>
              <div className="space-y-4">
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  Considered the heart of an EV, the battery is a rechargeable energy storage system that provides power to the electric motor. The energy is stored in cells connected in series or parallel to form different battery modules, and multiple modules are then linked in series to create the battery pack, commonly known as High Voltage battery or HV battery in vehicle.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  EV batteries comprises of lithium-ion cells in various shapes tailored for specific applications. They include Prismatic cells, Cylindrical and Pouch cells. An EV’s range, performance, and weight depend on the size, capacity, and chemistry of the battery pack to a large extent.
                </p>
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  EVs can use different types of batteries like lead acid, lithium-ion, nickel metal hydride, and nickel cadmium. Lithium-ion batteries are the most popularly used batteries in all electric and plug-in hybrid electric vehicles (PHEVs).
                </p>
              </div>
            </div>

            {/* 2. Electric Motor */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/30">2</span>
                Electric motor
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                Electric vehicles comprise an electric motor, usually an alternating current (AC) induction motor or a permanent magnet motor, to convert electrical energy into mechanical power. The motor moves the vehicle and sets its wheels in motion. EV motors deliver instant torque for a seamless and responsive driving experience.
              </p>
            </div>

            {/* 3. Power Electronics */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm border border-emerald-500/30">3</span>
                Power Electronics and Control (PCU) systems
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  The power electronics and control systems manage the flow of electricity between the battery, motor, and other vehicle components. The PCU manages and controls braking, acceleration, and regenerative braking. Electric cars that have advanced power control systems have an optimal energy usage and have enhanced safety and operational features.
                </p>
                <ul className="space-y-4 ml-4">
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">Charging port:</strong> A charging port allows electric cars to connect to external power sources for recharging the battery. Primarily, there are six types of connectors used in EVs worldwide - Type 1, Type 2, CHAdeMo, CCS, GB/T, and IEC 60309.</span>
                  </li>
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">Onboard charger:</strong> Though the battery present in the vehicle gets charged by using DC or direct current, the current output from the charging station or a charger is in form of AC or alternating current. The function of onboard charger is to convert AC into DC to charge the battery. The charging speed depends on the source charger's capacity and BMS.</span>
                  </li>
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">High-Voltage DC-DC converter:</strong> This module converts high-voltage DC power from the battery into lower-voltage DC power, which is necessary for various vehicle systems, including lighting, entertainment, and air conditioning.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 4. Regenerative Braking */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm border border-cyan-500/30">4</span>
                Regenerative Braking System
              </h3>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                A unique technique used in hybrid and fully electric cars, regenerative braking allows the electric motor to capture kinetic energy and convert it back into electrical energy, which is then used to recharge the high-voltage battery.
              </p>
            </div>

            {/* 5. Vehicle Control Unit */}
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm border border-blue-500/30">5</span>
                Vehicle Control Unit
              </h3>
              <div className="space-y-6">
                <p className="text-lg text-slate-300 leading-relaxed font-light">
                  The vehicle controller or electronic control unit (ECU) is an integrated circuit/chip which is regarded as the brain of the vehicle. In addition to essential functions like engine performance and power steering, it controls safety and comfort features, such as parking assistance, memory seats and airbag deployment. The vehicle control unit is responsible for all internal communications between various systems deployed in the vehicle and enabling them whenever required.
                </p>
                <ul className="space-y-4 ml-4">
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">Battery Management System (BMS):</strong> The BMS monitors the state of charge (SoC), state of health (SoH), and overall health of the battery pack. The BMS ensures that the battery performs within safe limits. To protect the battery from thermal runaway and overcharging, BMS stops the input current to the battery and disconnects it from charger or load.</span>
                  </li>
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">User interface and display:</strong> Electric cars have user interfaces and displays that provide information to the driver and passengers, including battery status, range estimation, and charging information.</span>
                  </li>
                  <li className="flex gap-3 text-lg text-slate-300 font-light">
                    <span className="text-blue-400 mt-1">•</span>
                    <span><strong className="text-white font-medium">Safety systems:</strong> Like traditional ICE vehicles, EVs incorporate safety features like airbags, anti-lock brakes, stability control, and collision avoidance systems.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Safety Features Cards Section */}
        <section className="py-16 px-6 sm:px-12 lg:px-24 mb-20 relative">
          <div className="max-w-6xl mx-auto">
            
            <p className="text-xl text-slate-300 text-center mb-12 font-light max-w-3xl mx-auto">
              For instance, modern EVs host a range of specialized safety features that improve security and comfort for drivers. These include:
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Battery Safety Card */}
              <div className="bg-gradient-to-br from-white/10 to-transparent border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-cyan-500/20 rounded-xl">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">Battery Safety</h2>
                </div>
                <ul className="space-y-6">
                  {batterySafety.map((feature, index) => (
                    <li key={index} className="flex items-start text-slate-300 text-lg group">
                      <CheckIcon />
                      <span className="leading-snug group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Passenger Safety Card */}
              <div className="bg-gradient-to-br from-white/10 to-transparent border border-emerald-500/20 rounded-3xl p-8 backdrop-blur-sm shadow-xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-wide">Passenger Safety</h2>
                </div>
                <ul className="space-y-6">
                  {passengerSafety.map((feature, index) => (
                    <li key={index} className="flex items-start text-slate-300 text-lg group">
                      <CheckIcon />
                      <span className="leading-snug group-hover:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default EVArchitecture;