import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight, ChevronLeft, MapPin, BatteryCharging, ShieldCheck, Globe } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data moved to constants for cleaner component logic
const TRENDS = [
  {
    id: 1,
    title: "Growing number of public charging stations",
    image: "src/assets/evhome.png", // Ensure paths are correct
    description: "The surge in public charging stations parallels the rise of EVs. Accessibility has been greatly enhanced, not just within cities but also for longer journeys, as charging facilities now dot the highways, boosting the appeal of EVs for their convenience."
  },
  {
    id: 2,
    title: "Community Charging",
    image: "src/assets/evstation.png",
    description: "EV owners are able to find convenient and accessible charging options with community charging stations. Collaborations between the residential communities and charging providers are fostering the installation of stations in residential societies, streamlining the charging process and enhancing overall EV ownership."
  },
  {
    id: 3,
    title: "Usage of Renewable Energy",
    image: "src/assets/evstation.png",
    description: "Renewable energy sources, such as solar and wind power, are playing an increasingly important role in electric vehicle (EV) charging. Since renewable energy sources produce zero or low emissions, they help reduce air pollution and also decrease our reliance on fossil fuels. The Ministry of New and Renewable Energy has formulated draft guidelines to encourage the establishment of decentralised solar power plants. Therefore, many EV charging stations have adopted solar panels to generate power."
  },
  {
    id: 4,
    title: "Charging Hubs ",
    image: "src/assets/evstation.png",
    description: "Charging hubs provide multiple charging points in a centralized location, especially those designed for fleets or high-traffic areas. These hubs are equipped with fast charging options, making them ideal for busy urban areas or locations where various EVs converge. Charging hubs streamline journey planning by offering a reliable and efficient charging solution in one place."
  },
  {
    id: 5,
    title: "Destination Charging Infrastructure",
    image: "src/assets/evstation.png",
    description: "These charging stations are installed at locations where people typically spend a significant amount of time, such as hotels, shopping centers, and workplaces. This allows EV drivers to charge while going about their day and it eliminates the need to make separate trips solely for charging. At MG Motor, we have partnered with IONAGE to strengthen the destination charging infrastructure, making intercity travel by electric vehicles a new reality."
  },
  {
    id: 6,
    title: "Smart Route Planning",
    image: "src/assets/evstation.png",
    description: "Sophisticated apps and services now guide EV drivers to nearby charging stations, incorporate charging stops into travel routes, and predict charging times, taking into account traffic and charger availability. This helps making journey planning more efficient and stress-free. The My MG app, for example, provides a seamless navigation experience with comprehensive service features."
  },
  {
    id: 7,
    title: "Simplified Payments",
    image: "src/assets/evstation.png",
    description: "The EV charging experience is smoother thanks to user-friendly payment and subscription services. Seamless payment methods, such as contactless payments, smartphone apps, or subscription services have simplified the process of accessing and paying for charging, further enhancing the convenience of public charging and the efficiency of journey planning."
  }
];

const NETWORKS = [
  {
    id: 1,
    title: "Public Networks",
    icon: <Globe className="text-cyan-400" />,
    bullets: ["Government/Oil company run", "Universal compatibility", "Highway & City focus"]
  },
  {
    id: 2,
    title: "OEM Networks",
    icon: <BatteryCharging className="text-lime-400" />,
    bullets: ["Manufacturer specific", "Seamless integration", "Exclusive owner perks"]
  },
  {
    id: 3,
    title: "Independent CPOs",
    icon: <Zap className="text-yellow-400" />,
    bullets: ["Tech-driven startups", "Local market solutions", "High availability"]
  },
  {
    id: 4,
    title: "Private Owners",
    icon: <ShieldCheck className="text-purple-400" />,
    bullets: ["Small businesses", "Captive usage", "Extra income source"]
  }
];

const Batterylife = () => {


  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/evstation.png')] bg-cover bg-center scale-105 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/60 via-[#050816]/40 to-[#050816]" />
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            HOW LONG DO ELECTRIC VEHICLE BATTERIES LAST?
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
          As electric vehicles race ahead in the innovation lane, one component stands out at the centre of this revolution: the battery. Keep scrolling as we unveil its remarkable technology and impressive longevity.
          </p>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 mt-8">
            The Building Blocks of Battery Endurance
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
                In the world of EVs, the lifespan and stability of batteries form the cornerstone of a superior driving experience. In recent years, this has become a possibility due to the evolution of battery technology which has further enhanced battery endurance. These innovative measures have enabled EV batteries to stand the test of time, ensuring dependable performance, extended range, and a sustainable driving future.

            </p>

            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light">
                The two main components that contribute to battery longevity are the Battery cells and BMS, the heart and the brain, of your Electric Vehicle battery. Let’s explore them in detail.

            </p>

        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        
        {/* Landscape Section */}
        <section className="py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              The Current <br />
              <span className="text-cyan-400">Landscape</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
              <p className='mb-4'>
                The global public EV charging network is expanding rapidly, with strong adoption across major cities and growing availability in emerging markets and along key transportation corridors. Currently, there are hundreds of thousands of charging stations worldwide, and this number is expected to grow significantly in the coming years as electric vehicle adoption accelerates.
              </p>
              <p>
                To support the transition to electric mobility and maintain an optimal ratio of approximately 1 charger for every 40 electric vehicles, millions of new charging stations will need to be installed annually. By 2030, the global charging infrastructure is projected to reach several million units, ensuring convenient, reliable, and widespread access for EV users everywhere.

              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-black rounded-3xl overflow-hidden border border-white/10">
              <img src="src/assets/ev11.png" alt="EV Landscape" className="w-full aspect-video object-cover" />
            </div>
          </div>
        </section>

        {/* Trends Slider */}
        <section className="py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase max-w-xl">
              Changing Trends in <span className="text-lime-400">Public Charging</span>
            </h2>
            <div className="flex gap-3">
              <button onClick={prevSlide} className="p-4 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full transition-all group">
                <ChevronLeft className="group-hover:scale-110" />
              </button>
              <button onClick={nextSlide} className="p-4 bg-white/5 hover:bg-cyan-500 border border-white/10 rounded-full transition-all group">
                <ChevronRight className="group-hover:scale-110" />
              </button>
            </div>
          </div>

          <div className="relative grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-auto">
              <img 
                src={TRENDS[currentSlide].image} 
                alt={TRENDS[currentSlide].title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            
            <div className="md:col-span-5 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md p-10 rounded-[40px] border border-white/10 relative">
               <span className="absolute -top-10 right-10 text-8xl font-black text-white/5">
                0{TRENDS[currentSlide].id}
               </span>
               <Zap className="text-cyan-400 mb-6" size={40} />
               <h3 className="text-3xl font-bold mb-4">{TRENDS[currentSlide].title}</h3>
               <p className="text-gray-400 text-lg leading-relaxed">
                 {TRENDS[currentSlide].description}
               </p>
            </div>
          </div>
        </section>

        {/* Ecosystem Grid */}
        <section className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6">The Charging <span className="text-cyan-400">Ecosystem</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Collaboration between energy providers and tech startups is accelerating the infrastructure rollout.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {NETWORKS.map((network) => (
              <div 
                key={network.id}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all hover:-translate-y-2"
              >
                <div className="mb-6 p-3 bg-white/5 w-fit rounded-2xl group-hover:bg-cyan-500/20 transition-colors">
                  {network.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{network.title}</h4>
                <ul className="space-y-3">
                  {network.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-cyan-500 mt-1">•</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Batterylife;