import React, { useState, useEffect } from 'react';
import {Zap,ChevronRight,ChevronLeft,ShieldCheck,PlayCircle,Info,CheckCircle,Home, MapPin, Calculator, ArrowRight
} from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import EVCalculator from '../components/EVCalculator';

/*
  IMPORTANT FIXES:
  1) Removed hardcoded localhost fetch calls that caused 404 console errors.
  2) Fixed "charging is not defined" by using chargingConnectors.
  3) Added separate loading states for levels, connectors, and steps.
  4) Page now works even when FastAPI endpoints are not created yet.

  If you later create FastAPI endpoints, add this to your .env file:
  VITE_API_BASE_URL=http://localhost:8000
*/

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

const DUMMY_VEHICLES = [
  {
    _id: 'ev1',
    title: 'Model Zenith S',
    image: 'src/assets/carousel-img1.jpg',
    range: '420 miles',
    topSpeed: '155 mph',
    acceleration: '3.1s',
    tagline: 'The Future of Sustainable Performance',
    description:
      'Experience the pinnacle of electric engineering. The Zenith S combines industry-leading range with breathtaking acceleration, all wrapped in a zero-emission package.',
  },
  {
    _id: 'ev2',
    title: 'EcoRunner SUV',
    image: 'src/assets/carousel-img2.jpg',
    range: '310 miles',
    topSpeed: '130 mph',
    acceleration: '5.4s',
    tagline: 'Adventure without Compromise',
    description:
      'Built for the rugged outdoors, the EcoRunner SUV features dual-motor all-wheel drive and a reinforced battery chassis designed for any terrain.',
  },
  {
    _id: 'ev3',
    title: 'Volt City Compact',
    image: 'src/assets/carousel-img3.jpg',
    range: '250 miles',
    topSpeed: '95 mph',
    acceleration: '7.2s',
    tagline: 'Master the Modern Urban Jungle',
    description:
      'Agile, smart, and fully connected. The Volt City is the perfect companion for urban commuters looking to slash their carbon footprint.',
  },
];

const FALLBACK_CHARGING_DATA = [
  {
    id: 1,
    level_name: 'Level 1',
    voltage: '120V',
    image: 'src/assets/level1.png',
    description: 'Standard home outlet. Best for overnight charging at home.',
  },
  {
    id: 2,
    level_name: 'Level 2',
    voltage: '240V',
    image: 'src/assets/level2.png',
    description: 'Fast home and public charging. Ideal for daily drivers.',
  },
  {
    id: 3,
    level_name: 'DC Fast',
    voltage: '480V+',
    image: 'src/assets/level3.png',
    description: 'Rapid commercial charging for long-distance travel.',
  },
];

const STATION_TYPES = [
  {
    id: 1,
    title: 'Private / Home',
    image: 'src/assets/evhome.png',
    bullets: [
      'Installed in private residences or apartment complexes.',
      'Usually Level 1 or Level 2 chargers for overnight use.',
    ],
  },
  {
    id: 2,
    title: 'Public Stations',
    image: 'src/assets/evstation.png',
    bullets: [
      'Mostly available at public or commercial locations on a chargeable basis.',
      'Installed on the ground as per technical and electrical specifications.',
      'Often feature DC Fast Charging for rapid top-ups.',
    ],
  },
];

const CHARGING_STEPS = [
  {
    id: 1,
    step_name: 'Plug In',
    image: 'src/assets/plugin.png',
    description: 'Connect the charging plug to your EV and the power source.',
  },
  {
    id: 2,
    step_name: 'Communication',
    image: 'src/assets/com-icon.png',
    description: 'The car and charger communicate to verify compatibility and safety.',
  },
  {
    id: 3,
    step_name: 'Convert & Deliver',
    image: 'src/assets/convert-icon.png',
    description:
      'Power is converted if needed and delivered to the battery through the on-board charger.',
  },
  {
    id: 4,
    step_name: 'Stop When Full',
    image: 'src/assets/battery-icon.png',
    description: 'Charging slows down as the battery nears full and stops automatically.',
  },
];

const CHARGING_CONNECTORS = [
  {
    id: 1,
    step_name: 'Type 1 / CCS1',
    image: 'src/assets/CCS1.png',
    description: 'Commonly used in North America.',
  },
  {
    id: 2,
    step_name: 'Type 2 / CCS2',
    image: 'src/assets/CCS2.png',
    description: 'Widely used in Europe and many Asian regions.',
  },
  {
    id: 3,
    step_name: 'CHAdeMO',
    image: 'src/assets/CHAdeMO.png',
    description: 'Japan-based fast charging connector standard.',
  },
  {
    id: 4,
    step_name: 'Tesla Supercharger',
    image: 'src/assets/tesla-charger.png',
    description: 'Tesla-specific charging system, now opening to more EVs.',
  },
];

const CHARGING_ROWS = [
  {
    type: 'Level 1 (AC 120V)',
    power: '1.4 - 2.4 kW',
    time: '~20 - 40 hours',
    bar: 'w-[24%] bg-emerald-400',
  },
  {
    type: 'Level 2 (AC 240V)',
    power: '7 - 22 kW',
    time: '~4 - 8 hours',
    bar: 'w-[42%] bg-blue-500',
  },
  {
    type: 'DC Fast Charging',
    power: '50 - 350 kW',
    time: '~20 - 30 minutes',
    bar: 'w-[78%] bg-purple-500',
  },
];

const safetyTips = [
    "Use only certified chargers and cables.",
    "Avoid over-using DC fast-charging; balance with home/AC.",
    "Keep charging port and cable dry.",
    "Don’t pull the cable by the cord, use the plug handle.",
    "Follow manufacturer guidelines and local safety rules.",
  ];

function Charging() {
  const [vehicles] = useState(DUMMY_VEHICLES);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [chargingData, setChargingData] = useState(FALLBACK_CHARGING_DATA);
  const [chargingSteps, setChargingSteps] = useState(CHARGING_STEPS);
  const [chargingConnectors, setChargingConnectors] = useState(CHARGING_CONNECTORS);
  const [levelsLoading, setLevelsLoading] = useState(false);
  const [stepsLoading, setStepsLoading] = useState(false);
  const [connectorsLoading, setConnectorsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % vehicles.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [vehicles.length]);

  useEffect(() => {
    if (!API_BASE_URL) return;

    const fetchChargingLevels = async () => {
      setLevelsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/charging-levels`);
        if (!response.ok) throw new Error('Charging levels API unavailable');
        const data = await response.json();
        setChargingData(Array.isArray(data) && data.length > 0 ? data : FALLBACK_CHARGING_DATA);
      } catch (error) {
        setChargingData(FALLBACK_CHARGING_DATA);
      } finally {
        setLevelsLoading(false);
      }
    };

    fetchChargingLevels();
  }, []);

  useEffect(() => {
    if (!API_BASE_URL) return;

    const fetchChargingSteps = async () => {
      setStepsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/charging-steps`);
        if (!response.ok) throw new Error('Charging steps API unavailable');
        const data = await response.json();
        setChargingSteps(Array.isArray(data) && data.length > 0 ? data : CHARGING_STEPS);
      } catch (error) {
        setChargingSteps(CHARGING_STEPS);
      } finally {
        setStepsLoading(false);
      }
    };

    fetchChargingSteps();
  }, []);

  useEffect(() => {
    if (!API_BASE_URL) return;

    const fetchChargingConnectors = async () => {
      setConnectorsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/charging-connectors`);
        if (!response.ok) throw new Error('Charging connectors API unavailable');
        const data = await response.json();
        setChargingConnectors(Array.isArray(data) && data.length > 0 ? data : CHARGING_CONNECTORS);
      } catch (error) {
        setChargingConnectors(CHARGING_CONNECTORS);
      } finally {
        setConnectorsLoading(false);
      }
    };

    fetchChargingConnectors();
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? STATION_TYPES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === STATION_TYPES.length - 1 ? 0 : prev + 1));
  };

  const LoadingSpinner = ({ className = 'col-span-full' }) => (
    <div className={`${className} text-center py-20`}>
      <div className="animate-spin h-10 w-10 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto" />
    </div>
  );

  const CardGrid = ({ items }) => (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative h-96 rounded-3xl overflow-hidden group border border-white/10 shadow-lg"
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${item.image})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
            <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
              <h3 className="text-xl font-bold text-white mb-1">{item.step_name}</h3>
            </div>

            <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <div className="h-[2px] w-12 bg-cyan-500 mb-4" />
              <p className="text-gray-300 text-lg font-bold leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="-mt-20 flex-grow">
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
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter uppercase">
                EV charging basics :
                <br />
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  How it works
                </span>
              </h1>
              <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
                Learn about AC vs DC, charging levels, and how
                <br /> electric reaches your EV battery.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-6 pl-6 absolute left-6 md:left-30 bottom-10">
            <Link
              to="/find-station"
              className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Find Charging Station
              <FaMapMarkerAlt className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="py-20 relative">
          <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-transparent p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row gap-10 items-center justify-between">
              <div className="max-w-2xl">
                <h2 className="text-5xl font-black uppercase tracking-tight mb-4">
                  What is <br />
                  <span className="text-cyan-400">
                    EV <span className="inline-block ml-1">Charging ?</span>
                  </span>
                </h2>

                <p className="text-slate-400 leading-relaxed text-lg mb-4">
                  EV charging is the process of delivering electrical energy to your vehicle's
                  battery. Electricity can come in different forms - AC (Alternating Current) or
                  DC (Direct Current).
                </p>

                <p className="text-slate-400 leading-relaxed text-lg mb-4">
                  Your car has an onboard charger that converts AC power from a compatible plug or
                  charger into DC power to safely store in the battery.
                </p>

                <p className="text-slate-400 leading-relaxed text-lg mb-4">
                  The right combination of plug, charger, and power determines how fast and
                  efficiently your EV charges.
                </p>
              </div>

              <div className="bg-[url('src/assets/ev-charging.png')] bg-cover bg-no-repeat bg-center rounded-2xl border border-emerald-500/30 text-center w-full max-w-sm h-[280px] md:h-[360px] relative overflow-hidden" />
            </div>
          </div>
        </section>

        {/* CHARGING LEVELS SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-left mb-20 space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase">
                Charging <span className="text-cyan-400">Levels</span>
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-6">
                {levelsLoading ? (
                  <LoadingSpinner className="col-span-3" />
                ) : (
                  chargingData.map((level) => (
                    <div
                      key={level.id}
                      className="relative h-96 rounded-3xl overflow-hidden group border border-white/10 shadow-lg"
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${level.image})` }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                        <div className="transform transition-transform duration-500 translate-y-8 group-hover:translate-y-0">
                          <h3 className="text-xl font-bold text-cyan-400 mb-1">
                            {level.level_name}
                          </h3>
                          <h4 className="text-4xl font-black text-white mb-4">
                            {level.voltage}
                          </h4>
                        </div>

                        <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                          <div className="h-[2px] w-12 bg-cyan-500 mb-4" />
                          <p className="text-gray-300 text-lg font-bold leading-relaxed">
                            {level.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="lg:w-1/3">
                <div className="bg-transparent p-10 rounded-3xl">
                  <h3 className="text-4xl font-black mb-4 uppercase text-white">
                    What are <span className="text-cyan-400">charging levels ?</span>
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-xl mb-4">
                    Charging speed is determined by the level of the charger. From standard wall
                    outlets to high-speed DC stations, we help you pick the right power for your
                    journey.
                  </p>
                  <div className="h-1.5 w-16 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-2 gap-12 items-center bg-transparent py-10 overflow-hidden relative">
            <div>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                It’s just like charging <span className="text-cyan-400">your phone</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Plug it in when you get home, and wake up to a full battery. VoltIQ provides
                real-time health insights and AI-driven predictions to ensure your phone on wheels
                stays healthy for years.
              </p>
              <Link
                to="/login"
                className="flex items-center gap-2 text-cyan-400 font-bold hover:gap-4 transition-all"
              >
                Learn more about RUL Predictions <ChevronRight size={20} />
              </Link>
            </div>

            <div className="relative group">
              <img
                src="src/assets/ev4.png"
                alt="EV Battery"
                className="w-full h-full object-cover shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10"
              />
              <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl -z-10 group-hover:bg-cyan-500/20 transition-colors" />
            </div>
          </div>
        </section>

        {/* CLOSER LOOK CAROUSEL */}
        <section className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide">
              A Closer Look <span className="text-cyan-400"> At Stations </span>
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="relative w-full md:w-[85%] h-[400px] md:h-[500px] rounded-[30px] overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.15)] border border-white/10">
              <img
                src={STATION_TYPES[currentSlide].image}
                alt={STATION_TYPES[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-1/4 md:translate-x-0 flex gap-2 overflow-hidden z-20">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="p-3 bg-white/10 backdrop-blur-md hover:bg-cyan-500 border border-white/10 rounded-xl text-white transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="md:absolute right-0 bottom-[-40px] md:translate-y-0 w-full md:w-[45%] bg-[#0a0f25]/90 backdrop-blur-xl rounded-[30px] shadow-2xl p-8 border border-cyan-500/30 z-10 mt-6 md:mt-0">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-lime-400" size={24} />
                <h3 className="text-3xl font-black text-white">
                  {STATION_TYPES[currentSlide].title}
                </h3>
              </div>
              <ul className="space-y-4">
                {STATION_TYPES[currentSlide].bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-gray-300 text-sm md:text-base leading-relaxed"
                  >
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden md:block absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-30 select-none pointer-events-none">
              <div className="text-7xl font-black text-white flex items-baseline">
                {String(currentSlide + 1).padStart(2, '0')}
                <span className="text-4xl text-gray-500 font-medium ml-2">
                  /{String(STATION_TYPES.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* COST SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12 bg-transparent">
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
              But, how much does <span className="text-cyan-400">charging cost you ?</span>
            </h2>

            <h3 className="text-xl md:text-2xl font-bold text-cyan-400">
              It’s cheaper than conventional fuel!
            </h3>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              When it comes to EV charging, you're in for a money-saving ride. EV charging can
              reduce daily running costs compared with conventional petrol or diesel vehicles.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img
                src="src/assets/vs.png"
                alt="EV Cost Savings"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </section>

        <EVCalculator />

        {/* CONNECTORS SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 transform -translate-x-1/2 w-full max-w-3xl h-64  pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-left mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black uppercase">
                Common EV <br />
                <span className="text-cyan-400">charging connectors</span>
              </h2>
            </div>

            <div className="w-full flex justify-center mt-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {connectorsLoading ? (
                  <LoadingSpinner />
                ) : (
                  <CardGrid items={chargingConnectors} />
                )}
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-24 mb-10">
          <div className="flex flex-col md:flex-row items-center gap-12 bg-transparent">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6 uppercase">
                Charger <span className="text-cyan-400">Types</span>
              </h2>

              <p className="text-gray-400 text-xl leading-relaxed">
                Understanding how your EV draws power is crucial for maximizing battery lifespan
                and planning long trips effectively.
              </p>

              <div className="space-y-4 pt-4">
                <div className="flex items-start gap-3 text-gray-300">
                  
                  <p className="text-xl text-gray-300">Different regions support different standard charging connectors.</p>
                </div>
                <div className="flex items-start gap-3 text-gray-300">
                  
                  <p className="text-xl text-gray-300">
                    They provide slow, moderate, and ultra-fast charging depending on
                    infrastructure specifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-black aspect-video group">
              {!isVideoPlaying ? (
                <div
                  className="absolute inset-0 z-10 cursor-pointer"
                  onClick={() => setIsVideoPlaying(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') setIsVideoPlaying(true);
                  }}
                >
                  <img
                    src="https://img.youtube.com/vi/NWWW-bh_P_Q/maxresdefault.jpg"
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-cyan-500 text-[#050816] rounded-full p-4 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] transition-all duration-300">
                      <PlayCircle size={40} className="fill-current" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs shadow-lg">
                      EV
                    </div>
                    <div className="text-white drop-shadow-md bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
                      <p className="font-bold text-sm">Types of chargers</p>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full border-none"
                  src="https://www.youtube.com/embed/NWWW-bh_P_Q?autoplay=1"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>
        </section>


        <section className="relative w-full overflow-hidden py-20">
          {/* Neon background glow */}
          <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 bottom-8 h-64 w-64 rounded-full bg-blue-600/10 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Top Info */}
            <div className="mb-10 flex items-center justify-center gap-3 text-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-400/15 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.45)] backdrop-blur-md">
                <Info size={17} />
              </div>
              <p className="text-2xl font-semibold text-cyan-100/80">
                Make sure your car and charger use the same connector type.
              </p>
            </div>

            {/* Title */}
            <div className="mb-10 text-left">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-cyan-300/80">
                Charging Speed Guide
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                How Long Does <span className="text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.75)]">Charging Take?</span>
              </h2>
              
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-[1.7rem] border border-cyan-300/25 bg-slate-950/70 shadow-[0_0_45px_rgba(34,211,238,0.18)] ring-1 ring-white/10 backdrop-blur-xl">
              {/* Header */}
              <div className="grid grid-cols-1 border-b border-cyan-300/20 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-emerald-400/10 md:grid-cols-4">
                <div className="px-7 py-5 text-lg font-extrabold text-cyan-100">
                  Charger Type
                </div>
                <div className="px-7 py-5 text-lg font-extrabold text-cyan-100">
                  Typical kW
                </div>
                <div className="px-7 py-5 text-lg font-extrabold text-cyan-100">
                  Example: 60 kWh battery <br />
                  <span className="text-cyan-300">20% → 80%</span>
                </div>
                <div className="hidden px-7 py-5 text-lg font-extrabold text-cyan-100 md:block">
                  Speed Level
                </div>
              </div>

              {/* Rows */}
              {CHARGING_ROWS.map((row, index) => (
                <div
                  key={index}
                  className="group grid grid-cols-1 border-b border-cyan-300/15 transition-all duration-300 last:border-b-0 hover:bg-cyan-400/5 md:grid-cols-4"
                >
                  <div className="px-7 py-6 text-lg font-extrabold text-white group-hover:text-cyan-200">
                    {row.type}
                  </div>

                  <div className="px-7 py-6 text-lg font-semibold text-slate-300">
                    {row.power}
                  </div>

                  <div className="px-7 py-6 text-lg font-semibold text-slate-300">
                    {row.time}
                  </div>

                  <div className="flex items-center px-7 py-6">
                    <div className="h-2.5 w-full rounded-full bg-slate-700/80 shadow-inner shadow-black/40">
                      <div
                        className={`h-2.5 rounded-full shadow-[0_0_18px_rgba(34,211,238,0.65)] ${row.bar}`}
                      />
                    </div>
                  </div>
                </div>
              ))}

              {/* Formula Footer */}
              <div className="flex flex-col items-center justify-center gap-3 border-t border-cyan-300/20 bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-emerald-400/10 px-6 py-6 text-center md:flex-row md:gap-4">
                <Zap className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
                <p className="text-base font-bold text-cyan-50/85 md:text-lg">
                  Charging time ≈ Battery capacity ÷ Charger power × efficiency factor
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP BY STEP SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-0 transform -translate-x-1/2 w-full max-w-3xl h-64 bg-cyan-500/10 blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-left mb-20 space-y-4">
              <h2 className="text-5xl md:text-6xl font-black uppercase">
                How EV charging <br />
                <span className="text-cyan-400">works - Step by step</span>
              </h2>
            </div>

            <div className="w-full flex justify-center mt-8">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stepsLoading ? <LoadingSpinner /> : <CardGrid items={chargingSteps} />}
              </div>
            </div>
          </div>
        </section>


      <section className="w-full flex justify-center mb-10 mt-10">
      <div className="relative w-full max-w-5xl rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-[#0a0f1f] via-[#0f172a] to-[#020617] p-5 md:p-6 shadow-lg shadow-cyan-500/10 overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-cyan-400/5 blur-2xl opacity-30 pointer-events-none"></div>

        <div className="relative flex items-start gap-15">

          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-transparent">
            <ShieldCheck className="text-cyan-400 w-20 h-20"  size={40} />
          </div>

          {/* Text Content */}
          <div className="text-left ">
            <h3 className="text-3xl  font-semibold text-white mb-1">
              Battery health best practice:
            </h3>

            <p className="text-xl text-gray-300 leading-relaxed">
              For longer battery life, keep your charge between{" "}
              <span className="text-cyan-400 font-medium">20%</span> and{" "}
              <span className="text-cyan-400 font-medium">80%</span> for daily driving.
              <br />
              Avoid frequent full charges or deep discharges.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section className="relative w-full overflow-hidden py-16">
              {/* EV theme background glows */}
              <div className="pointer-events-none absolute left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[110px]" />
              <div className="pointer-events-none absolute right-10 top-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />
    
              <div className="relative mx-auto max-w-7xl px-6">
                <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-[#071124]/80 p-6 shadow-[0_0_45px_rgba(34,211,238,0.16)] ring-1 ring-white/10 backdrop-blur-xl md:p-8">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_35%),radial-gradient(circle_at_85%_35%,rgba(132,204,22,0.10),transparent_32%)]" />
                  <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/50 to-transparent" />
    
                  <div className="relative grid items-center gap-8 md:grid-cols-[105px_1fr_300px]">
                    {/* Left Icon */}
                    <div className="flex justify-center md:justify-start">
                      <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-300/35 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.22)]">
                        <div className="absolute inset-2 rounded-2xl border border-cyan-200/10" />
                        <ShieldCheck className="h-12 w-12 text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.85)]" />
                      </div>
                    </div>
    
                    {/* Text Content */}
                    <div>
                      <p className="mb-2 text-xs font-bold uppercase tracking-[0.32em] text-cyan-300/80">
                        Charging Protection
                      </p>
                      <h2 className="mb-5 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                        Safety and <span className="text-cyan-300">Best Practices</span>
                      </h2>
    
                      <ul className="grid gap-3 ">
                        {safetyTips.map((tip, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 rounded-2xl border border-cyan-300/10 bg-white/[0.03] px-4 py-3 text-lg font-semibold text-slate-300 transition-all duration-300 hover:border-cyan-300/35 hover:bg-cyan-400/10 hover:text-cyan-50"
                          >
                            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300 drop-shadow-[0_0_10px_rgba(110,231,183,0.75)]" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
    
                    {/* Right Visual */}
                    
                  </div>
                </div>
              </div>
          </section>

          <section className="relative w-full overflow-hidden py-16">
          {/* EV theme background glows */}
              <div className="pointer-events-none absolute left-0 top-8 h-72 w-72 rounded-full bg-cyan-500/10 blur-[115px]" />
                    <div className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-[120px]" />
          
                    <div className="relative mx-auto max-w-7xl px-6">
                      {/* Title */}
                      <div className="mb-8 text-left">
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-cyan-300/75">
                          Continue Learning
                        </p>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                          Explore More <span className="text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.75)]">Charging Tools</span>
                        </h2>
                        
                      </div>
          
                      {/* Cards */}
                      <div className="grid gap-5 md:grid-cols-3">
                        {/* Card 1 */}
                        <Link to="/home-charging" className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#071124]/80 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/10 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_34%)] opacity-80" />
                          <div className="relative flex items-center justify-between gap-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                                <Home className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">
                                  Next
                                </p>
                                <p className="mt-1 text-base font-extrabold text-white transition-colors group-hover:text-cyan-100">
                                  Home Charging Guide
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </Link>
          
                        {/* Card 2 Highlighted */}
                        <Link
                          to="/find-station"
                          className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#071124]/80 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/45 hover:bg-cyan-400/10 hover:shadow-[0_0_45px_rgba(34,211,238,0.24)]"
                        >
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_34%)] opacity-80" />
                          <div className="relative flex items-center justify-between gap-5" />
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.18)]">
                                <MapPin className="h-7 w-7 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300/70">
                                  Locate
                                </p>
                                <p className="mt-1 text-base font-extrabold text-white transition-colors group-hover:text-cyan-100">
                                  Find Nearest Charging Station
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </Link>
          
                        {/* Card 3 */}
                        <Link to="/public-charging" className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#071124]/80 p-5 shadow-[0_0_35px_rgba(34,211,238,0.12)] ring-1 ring-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300/45 hover:bg-emerald-400/10 hover:shadow-[0_0_45px_rgba(16,185,129,0.22)]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(16,185,129,0.14),transparent_34%)] opacity-80" />
                          <div className="relative flex items-center justify-between gap-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-400/10 shadow-[0_0_24px_rgba(16,185,129,0.16)]">
                                <Calculator className="h-7 w-7 text-emerald-300 drop-shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                              </div>
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/70">
                                  Visit
                                </p>
                                <p className="mt-1 text-base font-extrabold text-white transition-colors group-hover:text-emerald-100">
                                  Charging Calculator
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="h-6 w-6 text-emerald-300 transition-transform duration-300 group-hover:translate-x-1" />
                          </div>
                        </Link>
                      </div>
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
          animation: slow-zoom 20s infinite alternate linear;
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Charging;
