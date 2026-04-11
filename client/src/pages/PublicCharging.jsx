import React, { useState } from 'react';
import { Zap, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Public_Charging_Trends = [
  {
    id: 1,
    title: "Growing number of public charging stations",
    image: "src/assets/evhome.png",
    description: "The surge in public charging stations parallels the rise of EVs. Accessibility has been greatly enhanced, not just within cities but also for longer journeys, as charging facilities now dot the highways, boosting the appeal of EVs for their convenience.",
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
    title: "Charging Hubs",
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
    title: "Route Planning Services",
    image: "src/assets/evstation.png",
    description: "Sophisticated apps and services now guide EV drivers to nearby charging stations, incorporate charging stops into travel routes, and predict charging times, taking into account traffic and charger availability. This helps making journey planning more efficient and stress-free. The My MG app, for example, provides a seamless navigation experience with comprehensive service features."
  },
  {
    id: 7,
    title: "Payment and Subscription Models",
    image: "src/assets/evstation.png",
    description: "The EV charging experience is smoother thanks to user-friendly payment and subscription services. Seamless payment methods, such as contactless payments, smartphone apps, or subscription services have simplified the process of accessing and paying for charging, further enhancing the convenience of public charging and the efficiency of journey planning."
  }
];

const Charging_Networks = [

  {
    id: 1,
    title: "Public Charging Networks",
    bullets: [
      "Run by independent or oil marketing companies or government authorities",
      "Accessible to all compatible Electric Vehicles",
      "Developing in cities, highways, fuel stations, public parking lots"
    ],
    image: "src/assets/evhome.png", // Updated fallback image

  },
  {
    id: 2,
    title: "Manufacturer-Specific Networks",
    bullets: [
      "Set up by EV Manufacturers",
      "Seamlessly integrate with specific vehicle makes",
      "Offer benefits and incentives for customers"
    ],
    image: "src/assets/evstation.png", // Updated fallback image

  },
  {
    id: 3,
    title: "Charge Point Operators",
    bullets: [
      "Independent companies and startups creating solutions for local conditions",
      "Accessible to all compatible EV makes and models",
      "Promote competition and increase availability"
    ],
    image: "src/assets/evstation.png", // Updated fallback image

  },
  {
    id: 4,
    title: "Individual Owners",
    bullets: [
      "Private individuals or small businesses",
      "Can be for captive or public usage",
      "Incremental source of income"
    ],
    image: "src/assets/evhome.png", // Updated fallback image
  }
];

const EVEcosystem = () => {
  const networks = [
    {
      title: "Public Charging Network",
      items: [
        "Run by independent or oil marketing companies or government authorities",
        "Accessible to all compatible Electric Vehicles",
        "Developing in cities, highways, fuel stations, public parking lots"
      ]
    },
    {
      title: "Manufacturer-Specific Networks",
      items: [
        "Set up by EV Manufacturers",
        "Seamlessly integrate with specific vehicle makes",
        "Offer benefits and incentives for customers"
      ]
    },
    {
      title: "Charge Point Operators",
      items: [
        "Independent companies and startups creating solutions for local conditions",
        "Accessible to all compatible EV makes and models",
        "Promote competition and increase availability"
      ]
    },
    {
      title: "Individual Owners",
      items: [
        "Private individuals or small businesses",
        "Can be for captive or public usage",
        "Incremental source of income"
      ]
    }

  ];
}

function PublicCharging() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Handlers (Fixed to use Public_Charging_Trends instead of STATION_TYPES)
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? Public_Charging_Trends.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === Public_Charging_Trends.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans">
      <Navbar />

      <section className="min-h-screen relative bg-[url('/src/assets/evstation.png')] animate-slow-zoom bg-black/40 bg-blend-multiply bg-center bg-cover bg-no-repeat flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center text-white p-6 sm:p-8 max-w-3xl mx-auto">
          <div className="title mb-6 font-bold">
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
              Charge up anytime, anywhere.
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore the world of Public EV charging and the vast network of charging points near you.
            </p>
            <p>From bustling cities to remote highways, we've got the lowdown on where and how to charge your electric vehicle on the go. Charge up and hit the road with confidence!</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white/5 border border-white/10 rounded-[40px] p-10 overflow-hidden relative">
          <div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              The current
              <span className="text-cyan-400"> Landscape</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              The global public EV charging network is expanding rapidly, with strong adoption across major cities and growing availability in emerging markets and along key transportation corridors. Currently, there are hundreds of thousands of charging stations worldwide, and this number is expected to grow significantly in the coming years as electric vehicle adoption accelerates.
            </p>
            <p className="text-gray-400 text-lg mb-8">
              To support the transition to electric mobility and maintain an optimal ratio of approximately 1 charger for every 40 electric vehicles, millions of new charging stations will need to be installed annually. By 2030, the global charging infrastructure is projected to reach several million units, ensuring convenient, reliable, and widespread access for EV users everywhere.
            </p>
          </div>
          <div className="relative group">
            <img
              src="src/assets/ev11.png"
              alt="EV Battery"
              className="w-full h-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
            />
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase tracking-wide">
            Changing trends in Public Charging
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Image */}
          <div className="relative w-full md:w-[85%] h-[400px] md:h-[500px] rounded-[30px] overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10">
            <img
              src={Public_Charging_Trends[currentSlide].image}
              alt={Public_Charging_Trends[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />

            {/* Pagination Arrows */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-1/4 md:translate-x-0 flex gap-2 overflow-hidden z-20">
              <button
                onClick={handlePrevSlide}
                className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNextSlide}
                className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Overlapping Info Card */}
          <div className="md:absolute right-0 bottom-[-40px] md:translate-y-0 w-full md:w-[45%] bg-[#0a0f25]/90 backdrop-blur-xl rounded-[30px] shadow-2xl p-8 border border-cyan-500/30 z-10 mt-6 md:mt-0">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="text-lime-400" size={24} />
              <h3 className="text-3xl font-black text-white">
                {Public_Charging_Trends[currentSlide].title}
              </h3>
            </div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {Public_Charging_Trends[currentSlide].description}
            </p>
          </div>

          {/* Step Counter (02/07) */}
          <div className="hidden md:block absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-30 select-none pointer-events-none">
            <div className="text-7xl font-black text-white flex items-baseline">
              {String(currentSlide + 1).padStart(2, '0')}
              <span className="text-4xl text-gray-500 font-medium ml-2">
                /{String(Public_Charging_Trends.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <img
          src="src/assets/ev12.png"
          alt="EV Battery"
          className="w-full h-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
        />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400 uppercase">
              Getting You Started
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
              Whether you're new to EVs or a veteran, our guide helps you navigate the fundamentals of charging speeds and battery health.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 py-15 mb-16 bg-blue-900/5">
          {Charging_Networks.map((network) => (
            <div
              key={network.title}
              className="rounded-2xl border border-white/20 bg-gradient-to-br shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <img
                  src={network.image}
                  alt={network.title}
                  className="h-full w-full object-cover mb-4 rounded-lg"
                />
              </div>




            </div>
          ))}
        </div>


      </section>

      <Footer />

      {/* Added some custom keyframes for the zoom effect */}
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate linear;
        }
      `}</style>
    </div>
  );
}

export default PublicCharging;