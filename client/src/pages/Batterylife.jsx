import React, { useState } from 'react';
import { Zap, MapPin, BatteryCharging, BatteryMedium, BatteryWarning, ShieldCheck, Globe, ThermometerSnowflake, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data moved to constants for cleaner component logic
const TRENDS = [
  {
    id: 1,
    title: "Growing number of public charging stations",
    image: "src/assets/evhome.png",
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

const leftColumnTips = [
  {
    id: 1,
    description: "Lithium-ion batteries (LiB) uses different types of cells according to different type of usages e.g. cylindrical, prismatic and pouch.",
  },
  {
    id: 2,
    description: "A cylindrical cell is a cell enclosed in a rigid cylinder can. Cylindrical cells are small and round, making it possible to stack them in devices of all sizes. They are the most commonly used cell type due to their lower cost. These are often used in laptop batteries and even EVs.",
  },
  {
    id: 3,
    description: "A prismatic cell is a cell whose chemistry is enclosed in a rigid casing. Its rectangular shape allows efficiently stacking multiple units in a battery module. Prismatic cells are designed are thin and light. They can use either steel or aluminium casing, which makes them more stable.",
  },
  {
    id: 4,
    description: "For the same volume, stacked prismatic cells can release more energy at once, offering better performance. Theoretically, The energy density of prismatic cells is higher than cylindrical cells.",
  }
];

const rightColumnTips = [
  {
    id: 5,
    description: "A pouch cell is a type of lithium-ion battery used in electric vehicles (EVs). They are characterised by their lightweight design and flexibility, making them a popular choice for some EV manufacturers. The batteries are made up of multiple layers of electrode materials and separators enclosed in a flexible, heat-sealed pouch. They offer advantages such as design flexibility, reduced weight, and efficient space utilization within an EV's battery pack.",
  },
  {
    id: 6,
    description: "Currently Prismatic cells are most widely used worldwide in EVs and Energy Storage solutions (ESS). Prismatic cells are also two types – the electrode sheet inside the casing (anode, separator, cathode) is either stacked or rolled and flattened.",
  }
];

// Add your video data here
const VIDEO_DATA = [
  { id: 1, title: "Battery Crush Test", youtube_id: "1W0w2lEwOPY" }, // Replace with real IDs
  { id: 2, title: "Thermal Runaway Prevention", youtube_id: "8svJ02q4Oeo" },
  { id: 3, title: "Water Ingress Testing (IP67)", youtube_id: "8svJ02q4Oeo" },
  { id: 4, title: "Nail Penetration Safety Test", youtube_id: "7_2ZTIQH1eQ" },
];

const TipCard = ({ tip }) => (
  <div className="group relative bg-[#0a1122]/80 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-cyan-500/40 transition-all duration-300 flex gap-5 mb-6 overflow-hidden shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
    <div className="absolute top-0 left-0 w-1 h-full bg-transparent group-hover:bg-cyan-500 transition-colors duration-300" />

    <div className="relative">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-sm font-bold text-cyan-500/50">0{tip.id}</span>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{tip.description}</p>
    </div>
  </div>
);

function Batterylife() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Initialize state with the actual video data
  const [videos, setVideos] = useState(VIDEO_DATA);
  const [page, setPage] = useState(0);

  // Pagination Logic
  const videosPerPage = 2;
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Calculate which videos to show based on the current page
  const displayedVideos = videos.slice(
    page * videosPerPage,
    (page + 1) * videosPerPage
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === TRENDS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? TRENDS.length - 1 : prev - 1));
  };

  // State Management
  const [openFaqId, setOpenFaqId] = useState(null);
  const [articleIndex, setArticleIndex] = useState(0);

  const [faqs] = useState([
    {
      id: 1,
      question: "How much is the life of EV/Battery in EV ?",
      answer: (
        <div className="space-y-4">
          <p>
            Li-Ion batteries endure 10 to 15 years before needing to be replaced or refurbished depending on the usage and charging pattern. The ZS EV’s LFP type battery has a charging capacity of 2000-2500 cycles (one charging cycle is equivalent to one cycle of complete charging and discharging of the battery). Considering the vehicle is charged twice a week, it would take around 20 years to complete this. However, batteries life depends on many external factors which are as follow:

          </p>

          <ol className="list-decimal pl-5 space-y-2 text-slate-400">

            <li>Time (calendar aging) </li>


            <li>Thermal expansion and contraction due to temperature fluctuations

            </li>


            <li>Operating at high and low state of charge (time spent at high or low state of charge)

            </li>

            <li>High current charging
            </li>

            <li>Charge and discharge cycles

            </li>

          </ol>

        </div>
      )
    },
    {
      id: 2,
      question: "How can the battery life of a car be increased ?",
      answer: (
        <div className="space-y-4">
          <p>The battery can have a very long life if the following factors are kept under control:

          </p>

          <ol className="list-decimal pl-5 space-y-2 text-slate-400">

            <li><strong className="text-white">Keep the battery cool and be careful in extreme temperatures: </strong> Batteries that deal with extreme temperatures can be damaged, so it is important to keep the battery cool, especially in hot climates. Extreme cold can also have a negative effect on the battery. Try to Park under a shade as and when possible.</li>

            <li><strong className="text-white">Avoid rapid charging frequently: </strong> While rapid charging is a convenient way to charge your battery, it’s not the best for its longevity. Rapid charging can put a strain on the battery and shorten its lifespan. If you can, charge your battery slowly and steadily and only use rapid charging when necessary.</li>

            <li><strong className="text-white">Do not drain the battery completely: </strong>  It’s important to avoid draining the battery completely as this can also damage it. Try to keep the battery above 20% to avoid putting strain on the battery.</li>

            <li><strong className="text-white">Keep an Eye on the Battery: </strong> It’s important to keep an eye on the battery and be aware of any changes. If you notice anything unusual, take the car to an authorized workshop to have it checked out.</li>

            <li><strong className="text-white">Avoid frequent charging to keep SOC at 100% always. </strong> (If one is driving within the city limits, keep the SOC between 30 to 80%, it will improve Battery health, 100% charge may be planned for outstation Trips)</li>


          </ol>
        </div>
      )
    },
    {
      id: 3,
      question: "What will be the impact on performance if the SOH drop to 70% or 80% ?",
      answer: (
        <div className="space-y-4">
          <p>When there is a drop in SOH of battery to 70% or 80% there will be drop in performance range. For example, if a battery with 100% SOH can travel 100 kms on a full charge, the same car with battery SOH 80% will travel only 80kms on a full charge.

          </p>
        </div>
      )
    },
    {
      id: 4,
      question: "How much drop in SOH will be there year on year ?",
      answer: (
        <div className="space-y-4">
          <p>SOH depends on the usage and charging pattern. On average,  in 8 years, it is expected to drop maximum of 30% SOH as it depends on the usage of individual. It is advised to follow battery charging do’s and don’t’s to maintain health of the battery.

          </p>

        </div>
      )
    },
    {
      id: 5,
      question: "What if the car is not in much use? Will battery degrade or SOH will go down ?",
      answer: (
        <div className="space-y-4">
          <p>It is always advised to frequently use the Electric vehicle as the car mechanism get more efficient over usage.

          </p>

        </div>
      )
    }
  ]);



  const toggleFaq = (id) => setOpenFaqId(openFaqId === id ? null : id);

  const handleArticleClick = (path) => { if (path && path !== "#") navigate(path); };

  const getVisibleArticles = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(articles[(articleIndex + i) % articles.length]);
    }
    return visible;
  };


  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/assets/evstation.png')] bg-cover bg-center scale-105 animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/60 via-[#050816]/40 to-[#050816]" />
      </section>

      {/* Intro Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              HOW LONG DO <span className="text-cyan-400">ELECTRIC VEHICLE BATTERIES LAST?</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              As electric vehicles race ahead in the innovation lane, one component stands out at the centre of this revolution: the battery. Keep scrolling as we unveil its remarkable technology and impressive longevity.
            </p>

            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              The Building Blocks of <span className="text-cyan-400">Battery Endurance</span>
            </h1>

            <p className="text-gray-400 text-lg mb-8">
              In the world of EVs, the lifespan and stability of batteries form the cornerstone of a superior driving experience. In recent years, this has become a possibility due to the evolution of battery technology which has further enhanced battery endurance. These innovative measures have enabled EV batteries to stand the test of time, ensuring dependable performance, extended range, and a sustainable driving future.
            </p>

            <p className="text-gray-400 text-lg mb-8">
              The two main components that contribute to battery longevity are the Battery cells and BMS, the heart and the brain, of your Electric Vehicle battery. Let's explore them in detail.
            </p>
          </div>
          <div className="relative group">
            <img
              src="src/assets/evbattery-cells.png"
              alt="EV Battery"
              className="w-full h-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
            />
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
          </div>
        </div>
      </section>

      {/* Cells Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent p-10 overflow-hidden relative">
          <div className="relative group">
            <img
              src="src/assets/evbattery-cells.png"
              alt="EV Battery"
              className="w-full h-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
            />
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              CELLS: HEARTBEAT OF THE <span className="text-cyan-400">ELECTRIC VEHICLE BATTERY</span>
            </h1>

            <p className="text-gray-400 text-lg mb-4">
              Lithium-ion batteries (LiB) uses different types of cells according to different type of usages e.g. cylindrical, prismatic and pouch.
            </p>

            <p className="text-gray-400 text-lg mb-4">
              A cylindrical cell is a cell enclosed in a rigid cylinder can. Cylindrical cells are small and round, making it possible to stack them in devices of all sizes. They are the most commonly used cell type due to their lower cost. These are often used in laptop batteries and even EVs.
            </p>

            <p className="text-gray-400 text-lg mb-4">
              A prismatic cell is a cell whose chemistry is enclosed in a rigid casing. Its rectangular shape allows efficiently stacking multiple units in a battery module. Prismatic cells are designed are thin and light. They can use either steel or aluminium casing, which makes them more stable.
            </p>

            <p className="text-gray-400 text-lg mb-4">
              For the same volume, stacked prismatic cells can release more energy at once, offering better performance. Theoretically, the energy density of prismatic cells is higher than cylindrical cells.
            </p>

            <p className="text-gray-400 text-lg mb-4">
              A pouch cell is a type of lithium-ion battery used in electric vehicles (EVs). They are characterised by their lightweight design and flexibility, making them a popular choice for some EV manufacturers. The batteries are made up of multiple layers of electrode materials and separators enclosed in a flexible, heat-sealed pouch. They offer advantages such as design flexibility, reduced weight, and efficient space utilization within an EV's battery pack.
            </p>

            <p className="text-gray-400 text-lg mb-4">
              Currently Prismatic cells are most widely used worldwide in EVs and Energy Storage solutions (ESS). Prismatic cells are also two types – the electrode sheet inside the casing (anode, separator, cathode) is either stacked or rolled and flattened.
            </p>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              CELLS: HEARTBEAT OF THE{" "}
              <span className="transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                ELECTRIC VEHICLE BATTERY
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column Tips */}
            <div className="flex flex-col">
              {leftColumnTips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>

            {/* Right Column Tips + Image */}
            <div className="flex flex-col">
              <div className="relative overflow-hidden rounded-2xl mb-6 h-64 md:h-80 border border-white/10 shadow-lg group">
                <img
                  src="/src/assets/maintenance-img2.png"
                  alt="EV Maintenance"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/0a1122/ffffff?text=Maintenance"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent" />
              </div>

              {rightColumnTips.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
                  BMS: The brain behind <span className="text-cyan-400"> the operations</span>
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-lime-400 mb-3 uppercase tracking-wider">What is BMS:</h3>
                <p className="text-slate-300 leading-relaxed">
                  A Battery Management System, commonly referred to as BMS, is an intelligent electronic system designed to oversee and manage EV batteries. It monitors and manages the battery's performance and charging while ensuring optimal conditions for the cells inside the battery modules
                </p>

                <h3 className="text-xl font-bold text-lime-400 mt-6 mb-6 uppercase tracking-wider">What does it do:</h3>
                <p className="text-slate-300 leading-relaxed">
                  It meticulously oversees battery parameters like charge, voltage, and temperature while ensuring all individual cells in the battery pack charge and discharge evenly, thus maximizing efficiency and lifespan. It also safeguards the battery from potential harm due to overcharging, overheating, or deep discharging.
                </p>

                <h3 className="text-xl font-bold text-lime-400 mt-6 mb-6 uppercase tracking-wider">Why is it important: </h3>
                <p className="text-slate-300 leading-relaxed">
                  BMS acts like the central nervous system for an EV's battery. By constantly optimizing performance and ensuring safe operation, an efficient BMS significantly slows down battery degradation, ensuring your EV battery remains healthy and lasts longer.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0a0f25] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/src/assets/bms.png" alt="EV Anatomy Architecture" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-600/10 blur-[150px] -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#0a0f25] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/src/assets/bms.png" alt="EV Anatomy Architecture" className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105" />

              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-white mb-6">
                  Innovations Lighting the  <span className="text-cyan-400"> Path Forward</span>
                </h2>

                <p className="text-slate-300 leading-relaxed">
                  Our electric future is powered by innovation. Every day, advancements in battery technology push the boundaries of what's possible, ensuring that the electric journey is both impressive in range and lasting in longevity. Two such innovations in the space are:
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-lime-400 mb-3 uppercase tracking-wider">The rise in energy density:</h3>
                <p className="text-slate-300 leading-relaxed">
                  Ongoing research is enabling batteries to pack more energy in the same footprint. This not only promises extended EV ranges but also contributes to the battery's overall longevity!
                </p>

                <h3 className="text-xl font-bold text-lime-400 mt-6 mb-6 uppercase tracking-wider">Building India’s EV ecosystem: </h3>
                <p className="text-slate-300 leading-relaxed">
                  India is also set on expanding the EV ecosystem through innovative partnerships with leaders in Battery Technology, Charging Infrastructure, Product Development, Technology Innovation, AI implementation & Electronics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 font-sans">
        {/* Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#2b70a0] tracking-wide mb-10">
          BATTERY TESTS <span className="text-cyan-400">|</span> QUALITY ASSURANCE
        </h2>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedVideos.map((video) => (
            <div key={video.id} className="flex flex-col items-center">
              {/* 16:9 Aspect Ratio Container for YouTube iFrame */}
              <div className="w-full aspect-video bg-gray-200 shadow-md relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full object-cover"
                ></iframe>
              </div>
              {/* Video Caption */}
              <p className="mt-3 text-white text-sm md:text-base font-medium text-center">
                {video.title}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-3 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${page === 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-[#2b70a0] text-white hover:bg-blue-800'
              }`}
          >
            {/* Left Arrow SVG */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages - 1 || videos.length === 0}
            className={`w-9 h-9 flex items-center justify-center rounded transition-colors ${page >= totalPages - 1 || videos.length === 0
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-[#2b70a0] text-white hover:bg-blue-800'
              }`}
          >
            {/* Right Arrow SVG */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* KNOWLEDGE BASE (FAQ & Articles) */}
      <section className="py-20 relative border-t border-white/5 bg-[#050816]/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* FAQ Area */}
          <div className="max-w-3xl mx-auto mb-32">
            <h2 className="text-center text-3xl md:text-4xl font-black text-white mb-12 tracking-wide uppercase">
              Frequently Asked <span className="text-cyan-400">Questions</span>
            </h2>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all duration-300 ${openFaqId === faq.id ? 'bg-[#0e172a] border-cyan-500/50 shadow-lg' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                    aria-expanded={openFaqId === faq.id}
                  >
                    <span className="font-semibold text-white text-lg pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`text-cyan-400 flex-shrink-0 transform transition-transform duration-300 ${openFaqId === faq.id ? 'rotate-180' : ''}`}
                      size={20}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-white/5 mt-2">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


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