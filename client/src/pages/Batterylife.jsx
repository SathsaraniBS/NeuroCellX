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

function Batterylife() {
  // Added state to track the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Added functions to handle the next and previous buttons
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === TRENDS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? TRENDS.length - 1 : prev - 1));
  };

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

            <p className="text-gray-300 max-w-2xl mx-auto text-lg md:text-xl font-light mt-4">
                The two main components that contribute to battery longevity are the Battery cells and BMS, the heart and the brain, of your Electric Vehicle battery. Let’s explore them in detail.
            </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">
        
        

        

        
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
}

export default Batterylife;