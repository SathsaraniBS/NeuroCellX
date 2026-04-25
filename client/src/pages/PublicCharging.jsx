import React, { useState, useEffect } from 'react';
import { Zap, ChevronRight, ChevronLeft, Download, BatteryCharging, ShieldCheck, Globe } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

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
    image: "src/assets/solarchargingstation.png",
    description: "Renewable energy sources, such as solar and wind power, are playing an increasingly important role in electric vehicle (EV) charging. Since renewable energy sources produce zero or low emissions, they help reduce air pollution and also decrease our reliance on fossil fuels. The Ministry of New and Renewable Energy has formulated draft guidelines to encourage the establishment of decentralised solar power plants. Therefore, many EV charging stations have adopted solar panels to generate power."
  },
  {
    id: 4,
    title: "Charging Hubs ",
    image: "src/assets/charging-hub.png",
    description: "Charging hubs provide multiple charging points in a centralized location, especially those designed for fleets or high-traffic areas. These hubs are equipped with fast charging options, making them ideal for busy urban areas or locations where various EVs converge. Charging hubs streamline journey planning by offering a reliable and efficient charging solution in one place."
  },
  {
    id: 5,
    title: "Destination Charging Infrastructure",
    image: "src/assets/destination-charging.png",
    description: "These charging stations are installed at locations where people typically spend a significant amount of time, such as hotels, shopping centers, and workplaces. This allows EV drivers to charge while going about their day and it eliminates the need to make separate trips solely for charging. At MG Motor, we have partnered with IONAGE to strengthen the destination charging infrastructure, making intercity travel by electric vehicles a new reality."
  },
  {
    id: 6,
    title: "Smart Route Planning",
    image: "src/assets/route-planning.png",
    description: "Sophisticated apps and services now guide EV drivers to nearby charging stations, incorporate charging stops into travel routes, and predict charging times, taking into account traffic and charger availability. This helps making journey planning more efficient and stress-free. The My MG app, for example, provides a seamless navigation experience with comprehensive service features."
  },
  {
    id: 7,
    title: "Simplified Payments",
    image: "src/assets/simplified-payments.png",
    description: "The EV charging experience is smoother thanks to user-friendly payment and subscription services. Seamless payment methods, such as contactless payments, smartphone apps, or subscription services have simplified the process of accessing and paying for charging, further enhancing the convenience of public charging and the efficiency of journey planning."
  }
];

const NETWORKS = [
  {
    id: 1,
    image: "src/assets/public-networks.png",
    title: "Public Networks",
    icon: <Globe className="text-cyan-400" />,
    bullets: ["Government/Oil company run", "Universal compatibility", "Highway & City focus"]
  },
  {
    id: 2,
    image: "src/assets/oem-networks.png",
    title: "OEM Networks",
    icon: <BatteryCharging className="text-lime-400" />,
    bullets: ["Manufacturer specific", "Seamless integration", "Exclusive owner perks"]
  },
  {
    id: 3,
    image: "src/assets/charge-point.png",
    title: "Independent CPOs",
    icon: <Zap className="text-yellow-400" />,
    bullets: ["Tech-driven startups", "Local market solutions", "High availability"]
  },
  {
    id: 4,
    image: "src/assets/individual-owners.png",
    title: "Individual Owners",
    icon: <ShieldCheck className="text-purple-400" />,
    bullets: ["Small businesses", "Captive usage", "Incremental source of income"]
  }
];

const PublicCharging = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === TRENDS.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? TRENDS.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/ev3.png"
            alt="EV Background"
            className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-3xl space-y-6 pt-20">
            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">Charge Up <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent"> Anywhere </span></h1>
            <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">Empowering your journey with a seamless,  <br /> Global EV charging ecosystem.</p>
          </div>
        </div>
        <div className="flex gap-4 pt-6 pl-6 absolute left-30 bottom-10">
          <a
            href="/ev-manual.pdf"
            download="EV_Maintenance_Manual.pdf"
            className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            Download EV Manual
            <Download className="w-5 h-5" />
          </a>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6">

        {/* Landscape Section */}
        <section className="py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              The Current <br />
              <span className="text-cyan-400">Landscape</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-xl leading-relaxed">
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

        <section className="py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              Developing the right ecosystem for building  <br />
              <span className="text-cyan-400">EV charging network</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
            
            </div>
          </div>
          <div className="relative group">
            
            <div className="space-y-4 text-gray-400 text-xl leading-relaxed">
              <p className='mb-4'>
                Key collaborations between energy providers, automakers, and technology companies are playing a vital role in expanding public EV charging networks worldwide. To accelerate the adoption of electric vehicles, governments and regulatory bodies across many countries have introduced policies, standards, and incentives to ensure charging infrastructure is safe, reliable, and accessible. In addition, charging network operators around the world are partnering with businesses, utilities, and vehicle manufacturers to broaden coverage, enhance user experience, and offer integrated services to EV owners.
              </p>
             
            </div>
            
          </div>
        </section>

        {/* Ecosystem Grid */}
        <section className="py-24 border-t border-white/5">
          <div className="text-left mb-16">
            <h2 className="text-4xl  md:text-5xl font-black uppercase mb-6">The Charging <span className="text-cyan-400">Ecosystem</span></h2>
            
          </div>

          {/* UPDATED CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {NETWORKS.map((network) => (
              <div
                key={network.id}
                className={`group relative h-[400px] rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:-translate-y-2 ${network.glowColor} hover:shadow-2xl`}
              >
                {/* Background Image */}
                <img
                  src={network.image}
                  alt={network.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-500 group-hover:bg-black/70" />

                {/* Card Content */}
                <div className="relative h-full flex flex-col justify-end p-8 z-10">
                  <div className="flex items-center gap-3 mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20">
                      {network.icon}
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">{network.title}</h3>
                  </div>

                  {/* Description - Hidden by default, fades in on hover */}
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-slate-200 leading-relaxed text-[15px] border-t border-white/10 pt-4">
                    </p>
                    
                    <ul className="space-y-3">
                      {network.bullets.map((b, i) => (
                        <li key={i} className="text-lg text-gray-400 flex items-start gap-2">
                          <span className="text-cyan-500 mt-1">•</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase leading-none">
              Pricing strategies for   <br />
              <span className="text-cyan-400">public chargers?</span>
            </h2>
            <div className="space-y-4 text-gray-400 text-lg leading-relaxed">
            
            </div>
          </div>
          <div className="relative group">
            
            <div className="space-y-4 text-gray-400 text-xl leading-relaxed">
              <p className='mb-4'>
                There are many popular pricing models for public EV charging such as time-based pricing or usage-based pricing, where users pay for the duration or usage during the charging session. This model is simple and straightforward, allowing users to conveniently charge their vehicles and pay based on usage of the charging station.


              </p>
             
            </div>
            
          </div>
        </section>
        <EVCalculator />
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

export default PublicCharging;