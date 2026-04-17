import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


// 3. Main Component correctly structured
const InsideBattery = () => {
  const location = useLocation(); // Ready to be used for route logic

  return (
    <div className="min-h-screen bg-[#050816] text-slate-200 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative z-0">
      <Navbar />

      <div className="flex-grow flex flex-col relative overflow-hidden">

        {/* Ambient Background Glows for EV Tech Feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] right-0 w-[400px] h-[400px] bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* Hero Section */}
        <section className="relative flex-grow flex items-center justify-center pt-32 pb-16 px-6 sm:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center z-10">
            {/* Main Title with Gradient */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-10 tracking-tight leading-tight uppercase">
                INSIDE AN ELECTRIC VEHICLE BATTERY: WHAT YOU NEED TO KNOW
            </h1>

            {/* Glassmorphism Content Card */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl text-left transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                Introduction
              </h2>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                   Electric vehicles (EVs) are revolutionising transportation with their efficiency and eco-friendliness. Have you ever wondered how they run? The answer lies in their beating hearts - the batteries. This article will take you through EV batteries, unravelling their structure, chemistry, and crucial components that keep them running smoothly.
                </p>
                
              </div>
            </div>
          </div>
        </section>

        {/* Core Architecture Section */}
        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full relative">
          <div className="space-y-16">
            
            <div className="space-y-6">

             <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                <span className="w-10 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></span>
                Structure of an EV battery:
              </h2>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                At the heart of an EV battery lies the single battery cell, the smallest power unit. These cells are connected in series or parallel to form different battery modules, and multiple modules are then linked in series to create the power battery pack.

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

        
      </div>

      <Footer />
    </div>
  );
}

export default InsideBattery;