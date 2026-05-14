import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {Zap,Car,MapPin,CreditCard,HeadphonesIcon,BatteryCharging,    BookOpen,ArrowRight,ChevronLeft,ChevronRight,Star,Leaf,DollarSign,
Gauge,Wifi,ShieldCheck,Newspaper,Bell,Mail,Calendar,CheckCircle2,TrendingUp,Globe,ChevronDown} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const TRUST_BADGES = [
  { icon: Zap,        label: "100% EV Focused",   sub: "Trusted Information" },
  { icon: Newspaper,  label: "Up-to-date",         sub: "EV Market & News" },
  { icon: BookOpen,   label: "Expert Guides",      sub: "For Every Buyer" },
  { icon: ShieldCheck,label: "Secure & Reliable",  sub: "Your Data, Our Priority" },
];

const EXPLORE_CARDS = [
  {
    icon: Car,
    title: "Explore EVs",
    desc: "Compare EV models, specs, range, and prices.",
    path: "/ev-types",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]",
  },
  {
    icon: MapPin,
    title: "Charging & Map",
    desc: "Find charging stations near you. Plan your trip.",
    path: "/charging",
    color: "text-emerald-300",
    border: "border-emerald-400/25",
    bg: "bg-emerald-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(52,211,153,0.15)]",
  },
  {
    icon: CreditCard,
    title: "EV Financing",
    desc: "EMI calculator, loan options, and exclusive offers.",
    path: "/financing",
    color: "text-violet-300",
    border: "border-violet-400/25",
    bg: "bg-violet-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(167,139,250,0.15)]",
  },
  {
    icon: HeadphonesIcon,
    title: "Support & Help",
    desc: "FAQs, service booking, roadside assistance.",
    path: "/support",
    color: "text-orange-300",
    border: "border-orange-400/25",
    bg: "bg-orange-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(251,146,60,0.15)]",
  },
  {
    icon: BatteryCharging,
    title: "EV Battery Basics",
    desc: "Understand batteries, chemistry, safety & more.",
    path: "/battery-basics",
    color: "text-blue-300",
    border: "border-blue-400/25",
    bg: "bg-blue-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(147,197,253,0.15)]",
  },
  {
    icon: BookOpen,
    title: "EV Buying Guide",
    desc: "Tips, checklists, and advice for first-time buyers.",
    path: "/buying-guide",
    color: "text-pink-300",
    border: "border-pink-400/25",
    bg: "bg-pink-400/10",
    glow: "hover:shadow-[0_0_35px_rgba(249,168,212,0.15)]",
  },
];

const TRENDING_EVS = [
  {
    brand: "Tata",
    model: "Nexon EV",
    badge: "Popular",
    badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    image: "/src/assets/nexon.png",
    range: "465 km",
    rangeLabel: "Range (ARAI)",
    battery: "40.5 kWh",
    price: "₹14.49 – 19.29 Lakh",
    path: "/ev/nexon-ev",
  },
  {
    brand: "MG",
    model: "ZS EV",
    badge: "Popular",
    badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    image: "/src/assets/zs.png",
    range: "461 km",
    rangeLabel: "Range (ARAI)",
    battery: "50.3 kWh",
    price: "₹18.98 – 24.98 Lakh",
    path: "/ev/mg-zs-ev",
  },
  {
    brand: "BYD",
    model: "Atto 3",
    badge: "New",
    badgeColor: "bg-cyan-500/20 border-cyan-400/40 text-cyan-300",
    image: "/src/assets/atto3.png",
    range: "521 km",
    rangeLabel: "Range (WLTP)",
    battery: "60.5 kWh",
    price: "₹33.99 – 35.99 Lakh",
    path: "/ev/byd-atto-3",
  },
  {
    brand: "Hyundai",
    model: "IONIQ 5",
    badge: "Popular",
    badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    image: "/src/assets/ioniq5.png",
    range: "631 km",
    rangeLabel: "Range (WLTP)",
    battery: "72.6 kWh",
    price: "₹44.95 – 46.05 Lakh",
    path: "/ev/hyundai-ioniq5",
  },
  {
    brand: "Kia",
    model: "EV6",
    badge: "Popular",
    badgeColor: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
    image: "/src/assets/ev6.png",
    range: "528 km",
    rangeLabel: "Range (WLTP)",
    battery: "77.4 kWh",
    price: "₹60.97 – 65.97 Lakh",
    path: "/ev/kia-ev6",
  },
];

const WHY_EVS = [
  {
    icon: Leaf,
    title: "Better for the Planet",
    desc: "Zero tailpipe emissions. Cleaner air, greener future.",
    color: "text-emerald-300",
    border: "border-emerald-400/25",
    bg: "bg-emerald-400/10",
  },
  {
    icon: DollarSign,
    title: "Lower Running Cost",
    desc: "Electricity is cheaper than petrol. Less maintenance.",
    color: "text-cyan-300",
    border: "border-cyan-400/25",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Gauge,
    title: "Performance & Comfort",
    desc: "Instant torque, smooth drive, quiet and refined.",
    color: "text-violet-300",
    border: "border-violet-400/25",
    bg: "bg-violet-400/10",
  },
  {
    icon: Wifi,
    title: "Smart & Connected",
    desc: "App control, OTA updates, smart features and more.",
    color: "text-orange-300",
    border: "border-orange-400/25",
    bg: "bg-orange-400/10",
  },
];

const TESTIMONIALS = [
  {
    name: "Sameera",
    role: "EV Owner",
    stars: 5,
    text: "VoltIQ helped me compare EVs easily and find the right one.",
    color: "text-cyan-300",
    border: "border-cyan-400/20",
  },
  {
    name: "Nuwan",
    role: "EV Enthusiast",
    stars: 5,
    text: "The charging map and trip planner are super helpful for long drives.",
    color: "text-emerald-300",
    border: "border-emerald-400/20",
  },
  {
    name: "Dilshan",
    role: "First-time EV Buyer",
    stars: 5,
    text: "Financing options and guides made my EV purchase simple.",
    color: "text-violet-300",
    border: "border-violet-400/20",
  },
];

/* ─────────────────────────────────────────
   Sub-Components
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300/80 mb-4">{children}</p>
);

const StarRow = ({ count }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
export default function HomePage() {
  const [evSlide, setEvSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [evData, setEvData] = useState(TRENDING_EVS);
  const visibleEVs = 4;

  // FastAPI fetch (with graceful fallback)
  useEffect(() => {
    const fetchEVs = async () => {
      try {
        const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
        const res = await fetch(`${base}/api/trending-evs`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length) setEvData(data);
        }
      } catch {
        // silently use fallback data
      }
    };
    fetchEVs();
  }, []);

  const nextEV = () => setEvSlide(p => Math.min(p + 1, evData.length - visibleEVs));
  const prevEV = () => setEvSlide(p => Math.max(p - 1, 0));
  const nextTestimonial = () => setTestimonialSlide(p => (p + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialSlide(p => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const handleSubscribe = async () => {
    if (!email) return;
    try {
      const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
      await fetch(`${base}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch { }
    setSubscribed(true);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">

        {/* ── HERO ── */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
          {/* BG image */}
          <div className="absolute inset-0">
            <img
              src="/src/assets/ev3.png"
              alt="Electric Vehicle"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
              onError={e => {
                e.target.src = "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=2072&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
          </div>

          {/* Ambient glows */}
          <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="pointer-events-none absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-emerald-400/10 blur-[130px]" />

          <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 w-full">
            <div className="max-w-3xl space-y-7">
              <SectionLabel>Welcome to VoltIQ</SectionLabel>

              <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                Explore the World of
                <br />
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  Electric Vehicles.
                </span>
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                Discover EVs, charging, financing, and support in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/book-test-drive"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold text-base hover:bg-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_0_28px_rgba(34,211,238,0.30)] transition-all duration-300 backdrop-blur-sm"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Test Drive
                </Link>
                <Link
                  to="/ev-types"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/[0.07] border border-white/20 text-white font-bold text-base hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300 backdrop-blur-sm"
                >
                  <Car className="w-5 h-5" />
                  Explore EVs
                </Link>
              </div>
            </div>
          </div>

          {/* Scroll cue */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-cyan-400" />
            <ChevronRight className="w-4 h-4 text-cyan-400 rotate-90" />
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <section className="border-y border-white/10 bg-[#071124]/60 backdrop-blur-sm py-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {TRUST_BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                      <Icon className="h-5 w-5 text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">{b.label}</p>
                      <p className="text-slate-500 text-xs">{b.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── START EXPLORING ── */}
        <section className="py-20 max-w-7xl mx-auto px-6 relative">
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-cyan-500/6 blur-[120px]" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-400/6 blur-[120px]" />

          <div className="mb-12">
            <SectionLabel>Navigation</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Start{" "}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                Exploring
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXPLORE_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.path}
                  className={`group flex items-start gap-5 rounded-[2rem] border ${card.border} bg-[#071124]/60 backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07] ${card.glow}`}
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${card.color}`} />

                  <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${card.border} ${card.bg} ${card.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-black text-base uppercase mb-2 ${card.color}`}>{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{card.desc}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${card.color} group-hover:gap-2 transition-all`}>
                      Explore <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── TRENDING EVS CAROUSEL ── */}
        <section className="py-16 relative">
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/6 blur-[130px]" />

          <div className="max-w-7xl mx-auto px-6">
            {/* Header row */}
            <div className="flex items-end justify-between mb-10">
              <div>
                <SectionLabel>Hot Right Now</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                  Trending{" "}
                  <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                    EVs
                  </span>
                </h2>
              </div>
              <Link
                to="/ev-types"
                className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-cyan-100 transition-colors"
              >
                View all EVs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Cards + arrows */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex gap-5 transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(calc(-${evSlide * (100 / visibleEVs)}% - ${evSlide * 20 / visibleEVs}px))` }}
                >
                  {evData.map((ev, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 w-[calc(25%-15px)] min-w-[240px] rounded-[2rem] border border-white/10 bg-[#071124]/70 backdrop-blur-xl overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden h-44 bg-gradient-to-br from-white/5 to-white/[0.02]">
                        <div className="absolute top-3 left-3 flex gap-2 z-10">
                          <span className="text-xs font-bold text-slate-400">{ev.brand}</span>
                        </div>
                        <span className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-bold border ${ev.badgeColor}`}>
                          {ev.badge}
                        </span>
                        <img
                          src={ev.image}
                          alt={ev.model}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                          onError={e => {
                            e.target.src = "https://images.unsplash.com/photo-1593941707882-a5bba14938cb?q=80&w=400&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071124] via-transparent to-transparent" />
                      </div>

                      {/* Info */}
                      <div className="p-5">
                        <h3 className="font-black text-lg text-white mb-4">{ev.model}</h3>

                        <div className="flex gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-1 text-cyan-300">
                              <Gauge className="h-3.5 w-3.5" />
                              <span className="text-sm font-black">{ev.range}</span>
                            </div>
                            <p className="text-slate-500 text-xs">{ev.rangeLabel}</p>
                          </div>
                          <div>
                            <div className="flex items-center gap-1 text-emerald-300">
                              <BatteryCharging className="h-3.5 w-3.5" />
                              <span className="text-sm font-black">{ev.battery}</span>
                            </div>
                            <p className="text-slate-500 text-xs">Battery</p>
                          </div>
                        </div>

                        <p className="text-white font-black text-base mb-4">{ev.price}</p>

                        <Link
                          to={ev.path}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-bold text-sm hover:bg-cyan-400/20 hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(34,211,238,0.20)] transition-all duration-300"
                        >
                          View Details <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrows */}
              {evSlide > 0 && (
                <button
                  onClick={prevEV}
                  className="absolute -left-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#071124]/80 backdrop-blur-sm text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}
              {evSlide < evData.length - visibleEVs && (
                <button
                  onClick={nextEV}
                  className="absolute -right-5 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#071124]/80 backdrop-blur-sm text-white hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300 z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.max(1, evData.length - visibleEVs + 1) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setEvSlide(i)}
                  className={`rounded-full transition-all duration-300 ${evSlide === i ? "w-6 h-2 bg-cyan-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── LIMITED TIME OFFER ── */}
        <section className="py-8 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/30 bg-emerald-500/10 backdrop-blur-xl p-8 md:p-10 shadow-[0_0_50px_rgba(52,211,153,0.12)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_5%_50%,rgba(52,211,153,0.10),transparent_45%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_95%_50%,rgba(34,211,238,0.08),transparent_45%)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-400/15 text-3xl">
                  🎁
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/80 mb-1">
                    Limited Time Offer
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
                    Get up to{" "}
                    <span className="bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent">
                      ₹75,000 off
                    </span>{" "}
                    on your next EV purchase
                  </h3>
                  <p className="text-slate-400 text-base">
                    or <span className="text-white font-bold">Free home charger installation</span> on select models.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                <Link
                  to="/offers"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-emerald-400/40 bg-emerald-500/20 text-emerald-200 font-black text-base hover:bg-emerald-500/30 hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(52,211,153,0.30)] transition-all duration-300 whitespace-nowrap"
                >
                  See Offer Details <ArrowRight className="h-5 w-5" />
                </Link>
                <p className="text-slate-500 text-xs">T&C Apply.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE EVs ── */}
        <section className="py-20 max-w-7xl mx-auto px-6 relative">
          <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-emerald-500/6 blur-[120px]" />

          <div className="mb-12">
            <SectionLabel>Benefits</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Why Choose{" "}
              <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                EVs?
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_EVS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`flex flex-col items-center text-center gap-4 p-8 rounded-[2rem] border ${item.border} bg-[#071124]/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-[0_0_35px_rgba(34,211,238,0.10)]`}
                >
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${item.border} ${item.bg} ${item.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className={`font-black text-base uppercase ${item.color}`}>{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-16 relative">
          <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-violet-500/6 blur-[130px]" />

          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <SectionLabel>Community</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
                What Our Users{" "}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  Say
                </span>
              </h2>
              <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-cyan-400 to-emerald-400" />
            </div>

            <div className="relative">
              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t, i) => (
                  <div
                    key={i}
                    className={`relative overflow-hidden rounded-[2rem] border ${t.border} bg-[#071124]/60 backdrop-blur-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.07]`}
                  >
                    <div className={`absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30 ${t.color}`} />

                    {/* Quote mark */}
                    <div className={`text-6xl font-black leading-none mb-4 ${t.color} opacity-40`}>"</div>

                    <StarRow count={t.stars} />
                    <p className="text-slate-300 text-base leading-relaxed my-5">"{t.text}"</p>

                    <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-full border ${t.border} ${t.color} font-black text-sm`}>
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">— {t.name}</p>
                        <p className="text-slate-500 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialSlide(i)}
                    className={`rounded-full transition-all duration-300 ${testimonialSlide === i ? "w-6 h-2 bg-cyan-400" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="py-10 max-w-7xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[2rem] border border-cyan-300/20 bg-[#071124]/70 backdrop-blur-xl p-10 md:p-14 shadow-[0_0_60px_rgba(34,211,238,0.10)]">
            <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_50%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_90%_50%,rgba(52,211,153,0.06),transparent_40%)]" />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Text */}
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/25 bg-cyan-400/10">
                  <Mail className="h-7 w-7 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300/80 mb-1">Newsletter</p>
                  <h3 className="text-2xl font-black uppercase text-white mb-1">
                    Stay Updated on{" "}
                    <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                      EV News & Offers
                    </span>
                  </h3>
                  <p className="text-slate-400 text-sm">Subscribe to our newsletter and never miss an update.</p>
                </div>
              </div>

              {/* Input */}
              {subscribed ? (
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-emerald-400/30 bg-emerald-400/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <p className="text-emerald-300 font-bold text-sm">You're subscribed!</p>
                </div>
              ) : (
                <div className="flex gap-3 w-full md:w-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubscribe()}
                    placeholder="Enter your email address"
                    className="flex-1 md:w-64 px-5 py-3.5 rounded-xl border border-white/10 bg-white/[0.06] text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400/50 focus:bg-white/[0.09] transition-all backdrop-blur-sm"
                  />
                  <button
                    onClick={handleSubscribe}
                    className="px-6 py-3.5 rounded-xl border border-cyan-400/40 bg-cyan-500/20 text-cyan-200 font-bold text-sm hover:bg-cyan-500/30 hover:border-cyan-400/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all duration-300 whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tagline */}
        <div className="py-10 text-center">
          <div className="inline-flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-400" />
              <Zap className="h-4 w-4 text-cyan-400" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-400" />
            </div>
            <p className="text-slate-500 text-sm">Your trusted EV guide for smarter mobility and a sustainable future.</p>
            <p className="font-black text-base bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent uppercase tracking-wide mt-1">
              Drive electric. Drive the future.
            </p>
          </div>
        </div>

      </main>

      <Footer />

      <style>{`
        @keyframes slow-zoom {
          0%   { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}