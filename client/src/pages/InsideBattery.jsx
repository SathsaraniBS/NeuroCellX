import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const InsideBattery = () => {
  const location = useLocation(); // Ready to be used for route logic

  // Initialized with the static data from the design. 
  // You can later swap this out to setBatteryData from your FastAPI response.
  const [batteryData, setBatteryData] = useState([
    {
      id: 1,
      name: "Cylindrical Cells",
      imageUrl: "/assets/cylindrical-cells.png", // Replace with your actual image paths
      structure: "Enclosed in a rigid cylinder can, with a small, round shape that allows for versatile stacking.",
      usedIn: "EVs, laptops, e-bikes, medical devices, satellites, and space exploration."
    },
    {
      id: 2,
      name: "Prismatic Cells",
      imageUrl: "/assets/prismatic-cells.png",
      structure: "Rectangular cells enclosed in a rigid casing, with two types: stacked for better performance and flattened for increased durability.",
      usedIn: "EVs and energy storage systems."
    },
    {
      id: 3,
      name: "Pouch Cells",
      imageUrl: "/assets/pouch-cells.png",
      structure: "Have a polymer shell, offering a lightweight design with a compact profile.",
      usedIn: "EVs, mobile phones, drones, portable energy stations and applications for automotive, consumer electronics, and military."
    }
  ]);

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
          </div>
        </section>

        <section className="py-16 px-6 sm:px-12 lg:px-24 max-w-6xl mx-auto w-full relative">
          <div className="space-y-16">
            <div className="space-y-6">
             <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-4">
                Type of cells used in Lithium-Ion Batteries (LiBs):
              </h3>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">
                EV batteries utilize lithium-ion cells in various shapes tailored for specific applications. They include:
              </p>
            </div> 

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Section */}
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-3xl font-bold text-[#38bdf8] mb-4">
                  Types of cells used in Lithium-Ion Batteries (LIBs):
                </h2>
                <p className="text-base text-gray-800 max-w-4xl mx-auto">
                  EV batteries utilise lithium-ion cells in various shapes tailored for specific applications. They include:
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {batteryData.map((cell) => (
                  <div key={cell.id} className="flex flex-col items-center">
                    {/* Cell Title */}
                    <h3 className="text-xl font-bold text-[#38bdf8] mb-8">{cell.name}</h3>

                    {/* Image Container */}
                    <div className="h-48 w-full flex items-center justify-center mb-8">
                       {/* Fallback to a placeholder if the image isn't found during dev */}
                       <img 
                          src={cell.imageUrl} 
                          alt={cell.name} 
                          className="max-h-full object-contain"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Image+Needed' }} 
                       />
                    </div>

                    {/* Text Content */}
                    <div className="w-full text-left space-y-6 px-2">
                      <div>
                        <h4 className="font-semibold text-[#38bdf8] mb-1">Structure:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {cell.structure}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#38bdf8] mb-1">Used in:</h4>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {cell.usedIn}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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