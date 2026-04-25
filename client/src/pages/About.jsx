import React, { useState, useEffect, useRef } from "react";
import { 
  Zap, Car, Fuel, Leaf, Rocket, 
  Battery, ShieldCheck, Globe, LayoutGrid, 
  ChevronRight, Bookmark, ArrowRight, ChevronDown, 
  BatteryCharging, Cpu
} from "lucide-react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/* ─── static data (replace with API calls in production) ────────── */
const MILESTONES = [
  {
    year: "1832",
    era: "The First Spark",
    icon: <Zap className="text-cyan-400" size={28} />,
    body: "Robert Anderson builds the first crude electric carriage in Scotland, powered by non-rechargeable primary cells.",
  },
  {
    year: "1900s",
    era: "The Electric Era",
    icon: <Car className="text-cyan-400" size={28} />,
    body: "Electric vehicles outsell gasoline cars in the US. New York City runs a fleet of electric taxis. Range anxiety didn't exist yet.",
  },
  {
    year: "1930s–1960s",
    era: "The Dark Age",
    icon: <Fuel className="text-slate-400" size={28} />,
    body: "Cheap oil and mass production of ICE vehicles push EVs to the fringe. The electric car nearly vanishes from public roads.",
  },
  {
    year: "1970s–1990s",
    era: "The Oil Crisis Revival",
    icon: <Leaf className="text-lime-400" size={28} />,
    body: "The 1973 oil crisis reignites interest. GM, Ford and NASA explore EVs. California's Zero Emission Vehicle mandate is born.",
  },
  {
    year: "2000s – Now",
    era: "The Modern Impact",
    icon: <Rocket className="text-cyan-400" size={28} />,
    body: "Tesla proves EVs can be desirable. Battery costs plummet 97% since 2010. Global EV sales exceed 14 million units in 2023.",
  },
];

const EV_MODELS = [
  { name: "GM EV1", year: 1996, note: "First mass-produced modern EV. Leased only — famously crushed.", icon: <Battery size={24} />, range: "100–160 km" },
  { name: "Corbin Sparrow", year: 1999, note: "Tiny single-seat EV, a cult classic of the dot-com era.", icon: <Car size={24} />, range: "65 km" },
  { name: "Nissan Leaf", year: 2010, note: "World's best-selling EV for a decade. Brought EVs to the mainstream.", icon: <Leaf size={24} />, range: "150 km" },
  { name: "Tesla Model S", year: 2012, note: "Shattered range anxiety with 400 km+ and ludicrous acceleration.", icon: <Zap size={24} />, range: "400+ km" },
  { name: "BMW i3", year: 2013, note: "Carbon fibre body, quirky design — proof EVs could be premium.", icon: <ShieldCheck size={24} />, range: "130–300 km" },
  { name: "Tesla Model 3", year: 2020, note: "Most sold EV in history. Made EVs accessible to the mass market.", icon: <Globe size={24} />, range: "560+ km" },
];

const BATTERY_GENS = [
  {
    era: "Early Days",
    title: "Lead Acid",
    subtitle: "Low energy density",
    body: "Heavy and slow to charge. Powered milkfloats and golf carts for decades. Still used in 12V auxiliary systems.",
    icon: <Battery className="text-slate-400" size={28} />,
    activeBorder: "border-slate-500",
    activeGlow: "shadow-slate-500/20",
    textColor: "text-slate-400"
  },
  {
    era: "Modern Era",
    title: "Lithium-Ion",
    subtitle: "High energy, light weight",
    body: "The breakthrough chemistry. Higher density, longer life and fast-charge capability that made today's EVs possible.",
    icon: <BatteryCharging className="text-cyan-400" size={28} />,
    activeBorder: "border-cyan-500",
    activeGlow: "shadow-cyan-500/20",
    textColor: "text-cyan-400"
  },
  {
    era: "The Future",
    title: "Solid-State",
    subtitle: "Next-gen (2026 – Beyond)",
    body: "No liquid electrolyte — safer, faster charging, 2× the energy density. Toyota, Samsung and QuantumScape are racing to market.",
    icon: <Cpu className="text-amber-400" size={28} />,
    activeBorder: "border-amber-500",
    activeGlow: "shadow-amber-500/20",
    textColor: "text-amber-400"
  },
];

const WHY_EVS = [
  { icon: <Leaf size={32} className="text-lime-400" />, title: "Cleaner Planet", body: "EVs produce zero tailpipe emissions, drastically reducing urban air pollution and long-term CO₂ output when charged on renewables." },
  { icon: <LayoutGrid size={32} className="text-cyan-400" />, title: "Greater Mobility", body: "Quieter cities, lower running costs, and over-the-air software upgrades make EVs a smarter urban mobility choice." },
  { icon: <BatteryCharging size={32} className="text-amber-400" />, title: "Sustainable Future", body: "Paired with solar and grid storage, EVs become rolling batteries that can power homes and stabilise the electricity grid." },
];

const EXPLORE = [
  { icon: <Car size={20} />, title: "EV Types", desc: "SUVs, sedans, vans — explore what body style suits you." },
  { icon: <ShieldCheck size={20} />, title: "Buying Guide", desc: "Find the perfect EV within your budget and lifestyle." },
  { icon: <Zap size={20} />, title: "Charging Guide", desc: "Home charging, public networks and fast-charge tips." },
];

/* ─── API helpers ─────────────────────────────────────────────── */
const API = "http://localhost:8000/api/ev-history";
const USER_ID = "demo-user-001";

async function toggleBookmark(section, itemKey, isBookmarked) {
  const method = isBookmarked ? "DELETE" : "POST";
  try {
    await fetch(`${API}/bookmark`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: USER_ID, section, item_key: itemKey }),
    });
  } catch { /* silent fail */ }
}

/* ─── useIntersection hook for scroll-reveal ──────────────────── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Reveal wrapper ──────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, vis] = useVisible();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ─── Shared Components ───────────────────────────────────────── */
function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="w-8 h-1 rounded-full bg-cyan-500" />
      <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase">
        {text}
      </span>
    </div>
  );
}

/* ─── Sections ────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 md:px-16 overflow-hidden flex items-center min-h-[500px] bg-slate-950 border-b border-white/5">
      {/* Decorative Gradients */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

      <div className="max-w-2xl relative z-10">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-1.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs text-cyan-400 font-bold tracking-widest uppercase">
            Learning Hub · EV History
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-2 tracking-tight">
          The EV Journey:
        </h1>
        <h2 className="text-2xl md:text-4xl font-bold text-cyan-400 mb-6 tracking-tight">
          A Short History of Electric Vehicles
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-lg mb-8 leading-relaxed">
          From early experiments to today's intelligent electric mobility —
          a journey of innovation, persistence, and a cleaner future.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2">
            Explore the Timeline <ArrowRight size={16} />
          </button>
          <button className="bg-transparent border-2 border-slate-700 text-white hover:border-cyan-500 hover:text-cyan-400 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300">
            Key Models
          </button>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="bg-slate-900 py-24 px-6 md:px-16 border-b border-white/5">
      <Reveal>
        <SectionLabel text="Milestones in the EV Journey" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-16">
          From the first spark to the electric revolution
        </h2>
      </Reveal>

      <div className="relative">
        {/* Horizontal rule (Desktop) */}
        <div className="hidden md:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-4 overflow-x-auto pb-8 snap-x">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.1} className="flex-1 min-w-[240px] snap-center">
              <div className="flex flex-col items-center text-center px-4 group">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-700 group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] flex items-center justify-center relative z-10 mb-6 transition-all duration-300">
                  {m.icon}
                </div>
                <span className="text-xs font-bold text-cyan-400 tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full mb-3">
                  {m.year}
                </span>
                <strong className="text-lg text-white block mb-2">{m.era}</strong>
                <p className="text-sm text-slate-400 leading-relaxed">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelsSection() {
  const [bookmarks, setBookmarks] = useState({});

  const toggle = (key) => {
    const next = !bookmarks[key];
    setBookmarks(p => ({ ...p, [key]: next }));
    toggleBookmark("models", key, !next);
  };

  return (
    <section className="bg-slate-950 py-24 px-6 md:px-16 border-b border-white/5">
      <Reveal>
        <SectionLabel text="Key EV Models That Changed the Game" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          The cars that wrote history
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {EV_MODELS.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.08}>
            <div className="group bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(6,182,212,0.1)]">
              <button
                onClick={() => toggle(m.name)}
                className="absolute top-4 right-4 text-slate-500 hover:text-cyan-400 transition-colors"
                title={bookmarks[m.name] ? "Remove bookmark" : "Bookmark"}
              >
                <Bookmark className={bookmarks[m.name] ? "fill-cyan-400 text-cyan-400" : ""} size={20} />
              </button>

              <div className="w-14 h-14 rounded-xl bg-slate-800 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>

              <div className="text-xs text-cyan-500 font-bold tracking-widest mb-2">{m.year}</div>
              <h3 className="text-xl font-bold text-white mb-2">{m.name}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 h-10">{m.note}</p>

              <div className="inline-flex items-center gap-2 text-xs text-cyan-400 font-semibold bg-cyan-500/10 rounded-full px-3 py-1.5">
                <LayoutGrid size={14} /> Range: {m.range}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BatterySection() {
  const [active, setActive] = useState(1);

  return (
    <section className="bg-slate-900 py-24 px-6 md:px-16 border-b border-white/5">
      <Reveal>
        <SectionLabel text="Evolution of Battery Technology" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          The power behind the revolution
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {BATTERY_GENS.map((b, i) => {
          const isActive = active === i;
          return (
            <Reveal key={b.title} delay={i * 0.12}>
              <div
                onClick={() => setActive(i)}
                className={`h-full bg-slate-950 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 relative ${
                  isActive ? `${b.activeBorder} ${b.activeGlow} scale-[1.02]` : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {i < BATTERY_GENS.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-slate-700 z-10">
                    <ChevronRight size={24} />
                  </div>
                )}

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-slate-900 border ${isActive ? b.activeBorder : 'border-slate-800'}`}>
                  {b.icon}
                </div>

                <div className={`text-xs font-bold tracking-widest uppercase mb-2 ${b.textColor}`}>
                  {b.era}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{b.title}</h3>
                <div className="text-sm text-slate-500 italic mb-4">{b.subtitle}</div>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-40 opacity-100' : 'max-h-20 opacity-70'}`}>
                  <p className="text-sm text-slate-400 leading-relaxed">{b.body}</p>
                </div>

                {!isActive && (
                  <div className={`mt-4 text-xs font-semibold flex items-center gap-1 ${b.textColor}`}>
                    Click to expand <ChevronDown size={14} />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.3}>
        <div className="mt-10 bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="bg-cyan-500/20 p-3 rounded-xl text-cyan-400">
            <Zap size={28} />
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed m-0">
            <strong className="text-white">Battery cost breakthrough:</strong> Lithium-ion pack costs fell from{" "}
            <strong className="text-cyan-400">$1,200/kWh in 2010</strong> to under <strong className="text-cyan-400">$139/kWh in 2023</strong>{" "}
            — a 97% reduction, making EVs cost-competitive with petrol cars.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-slate-950 py-24 px-6 md:px-16 border-b border-white/5">
      <Reveal>
        <SectionLabel text="Why EVs Matter Today" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Three reasons the shift is inevitable
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {WHY_EVS.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.1}>
            <div className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/50 hover:shadow-[0_10px_40px_rgba(6,182,212,0.05)]">
              <div className="mb-6 bg-slate-950 w-16 h-16 flex items-center justify-center rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-300">
                {w.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{w.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{w.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ExploreSection() {
  return (
    <section className="bg-slate-900 py-24 px-6 md:px-16">
      <Reveal>
        <SectionLabel text="Explore More About EVs" />
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Keep learning
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {EXPLORE.map((e, i) => (
          <Reveal key={e.title} delay={i * 0.1}>
            <button className={`w-full flex items-center gap-4 p-6 rounded-2xl text-left transition-all duration-300 group ${
              i === 1 
                ? 'bg-cyan-600 hover:bg-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.2)]' 
                : 'bg-slate-950 border border-slate-800 hover:border-cyan-500/50'
            }`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                i === 1 ? 'bg-white/20 text-white' : 'bg-slate-900 text-cyan-400 group-hover:text-cyan-300'
              }`}>
                {e.icon}
              </div>
              <div className="flex-1">
                <div className={`font-bold text-sm mb-1 ${i === 1 ? 'text-white' : 'text-slate-200'}`}>
                  {e.title}
                </div>
                <div className={`text-xs leading-relaxed ${i === 1 ? 'text-cyan-100' : 'text-slate-500'}`}>
                  {e.desc}
                </div>
              </div>
              <ArrowRight size={20} className={`transform group-hover:translate-x-1 transition-transform ${
                i === 1 ? 'text-white' : 'text-cyan-500'
              }`} />
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Root page component ─────────────────────────────────────────── */
export default function EVHistoryJourneyPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="font-sans bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Navbar />
      <main>
        <Hero />
        <TimelineSection />
        <ModelsSection />
        <BatterySection />
        <WhySection />
        <ExploreSection />
      </main>
      <Footer />
    </div>
  );
}