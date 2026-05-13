import React, { useState } from "react";
import {
  Play,
  ArrowRight,
  BatteryCharging,
  Bolt,
  Car,
  Globe2,
  Leaf,
  Lightbulb,
  PlugZap,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Wind,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EVHistoryPage = () => {
  const milestones = [
    {
      year: "1832",
      title: "The First Spark",
      text: "Robert Anderson invented the first crude electric carriage.",
      icon: Lightbulb,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(34,211,238,0.35)]",
      bg: "transparent",
    },
    {
      year: "1890s",
      title: "The Electric Era",
      text: "Electric cars became popular in the early 1900s — quiet, clean, and reliable.",
      icon: Bolt,
      color: "text-blue-300",
      glow: "shadow-[0_0_35px_rgba(59,130,246,0.35)]",
      bg: "transparent",
    },
    {
      year: "1930s - 1950s",
      title: "A Step Back",
      text: "Cheap petrol and better roads led to a decline in electric vehicles.",
      icon: Wind,
      color: "text-violet-300",
      glow: "shadow-[0_0_35px_rgba(139,92,246,0.35)]",
      bg: "transparent",
    },
    {
      year: "1970s - 1990s",
      title: "Renewed Interest",
      text: "Oil crises and environmental concerns sparked research and new EV prototypes.",
      icon: Sprout,
      color: "text-orange-300",
      glow: "shadow-[0_0_35px_rgba(249,115,22,0.35)]",
      bg: "transparent",
    },
    {
      year: "2000s - Now",
      title: "The EV Revolution",
      text: "Advanced batteries, smart tech, and sustainability pushed today's EV boom.",
      icon: Rocket,
      color: "text-emerald-300",
      glow: "shadow-[0_0_35px_rgba(16,185,129,0.35)]",
      bg: "transparent",
    },
  ];

  const models = [
    {
      name: "GM EV1 (1996)",
      text: "One of the first modern EVs, ahead of its time in technology.",
      image: "src/assets/gmev1.png",
    },
    {
      name: "Toyota Prius (1997)",
      text: "The hybrid pioneer that introduced millions to efficient driving.",
      image: "src/assets/toyota-prius.png",
    },
    {
      name: "Nissan Leaf (2010)",
      text: "The EV that helped make electric driving mainstream.",
      image: "src/assets/nissan-leaf.png",
    },
    {
      name: "Tesla Model S (2012)",
      text: "Redefined performance and long-range electric mobility.",
      image: "src/assets/tesla-model-s.png",
    },
    {
      name: "BMW i3 (2013)",
      text: "Pioneered futuristic EV design with sustainability at its core.",
      image: "src/assets/bmw-i3.png",
    },
    {
      name: "Tata Nexon EV (2020)",
      text: "Made EVs more accessible in fast-growing markets.",
      image: "src/assets/tata-nexon-ev.png",
    },
  ];

  const batteries = [
    {
      title: "Early Days",
      sub: "Lead-Acid / NiMH",
      text: "Heavy, low energy density, limited range, and basic performance.",
      color: "text-emerald-300",
      bg: "from-emerald-500/20 to-white/[0.03]",
    },
    {
      title: "Modern Era",
      sub: "Lithium-Ion",
      text: "Higher energy density, longer life, faster charging, and better reliability.",
      color: "text-cyan-300",
      bg: "from-cyan-500/20 to-white/[0.03]",
    },
    {
      title: "The Future",
      sub: "Solid-State & Beyond",
      text: "Safer, lighter, and more efficient batteries for next-generation EVs.",
      color: "text-violet-300",
      bg: "from-violet-500/20 to-white/[0.03]",
    },
  ];

  const matters = [
    {
      title: "Cleaner Planet",
      text: "EVs produce zero tailpipe emissions, helping reduce urban pollution.",
      icon: Leaf,
      color: "text-emerald-300",
    },
    {
      title: "Smarter Mobility",
      text: "Lower running costs, smart software, and fewer moving parts make EVs practical.",
      icon: ShieldCheck,
      color: "text-cyan-300",
    },
    {
      title: "Sustainable Future",
      text: "Electric mobility supports a global shift toward renewable energy.",
      icon: Globe2,
      color: "text-violet-300",
    },
  ];

  const explore = [
    {
      title: "EV Types",
      text: "Explore different types of electric vehicles.",
      icon: Car,
      to: "/ev-types",
      color: "text-emerald-300",
    },
    {
      title: "Buying Guide",
      text: "Find tips to choose the perfect EV for you.",
      icon: ShoppingCart,
      to: "/ev-types",
      color: "text-cyan-300",
    },
    {
      title: "Charging Guide",
      text: "Learn everything about charging your EV.",
      icon: PlugZap,
      to: "/charging",
      color: "text-violet-300",
    },
  ];

  const faqs = [
    {
      question: "When was the first electric vehicle invented ?",
      answer:
        "The first practical electric vehicles were developed in the late 1800s. In fact, EVs became popular before gasoline-powered cars because they were quieter, cleaner, and easier to operate at the time.",
    },
    {
      question: "Why did electric vehicles disappear for many years ?",
      answer:
        "EVs declined in popularity during the early 1900s because gasoline cars became cheaper, roads improved for long-distance travel, and petrol was widely available. Mass production of fuel-powered vehicles also made them more affordable.",
    },
    {
      question: "What caused the comeback of electric vehicles ?",
      answer:
        "Modern EVs returned due to advancements in battery technology, growing environmental concerns, rising fuel prices, and government support for cleaner transportation. Companies like Tesla helped accelerate global EV adoption.",
    },
    {
      question: "How have EV batteries improved over time ?",
      answer:
        "Early EVs used heavy lead-acid batteries with limited range. Today’s EVs mainly use lithium-ion batteries, which provide better range, faster charging, improved safety, and longer lifespan. Future technologies like solid-state batteries aim to improve efficiency even more.",
    },
    {
      question: "Why are electric vehicles important today ?",
      answer:
        "Electric vehicles help reduce air pollution, lower greenhouse-gas emissions, and decrease dependence on fossil fuels. They also offer lower running costs, quieter driving, and advanced smart technologies for modern transportation.",
    },
    
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/src/assets/ev-history.png"
              alt="EV Background"
              className="w-full h-full object-cover scale-105 animate-slow-zoom transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="max-w-3xl space-y-6 pt-20">
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">
                The EV Journey:
                <br />
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  A Short History of Electric Vehicles
                </span>
              </h1>

              <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
                From early experiments to today's intelligent electric mobility
                <br />a journey of innovation, persistence, and a cleaner future.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-6 pl-6 absolute left-30 bottom-10">
            <a
              href="https://youtu.be/VOB0q-oi_bU?si=uowZgyAD7jYx2YDL"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              Watch Video
              <Play className="w-5 h-5" />
            </a>
          </div>
        </section>

        {/* Milestones Section */}
        <section id="milestones" className="relative px-6 py-24">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Milestones in <br />
                <span className="text-cyan-400">the EV Journey</span>
              </h2>
            }
          />

          <div className="mx-auto max-w-7xl">
            <div className="relative mt-14">
              <div className="absolute left-10 right-10 top-8 hidden h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 md:block" />

              <div className="grid gap-6 md:grid-cols-5">
                {milestones.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.year} className="relative">
                      <div
                        className={`relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[#050816] ${item.color} ${item.glow}`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>

                      <div
                        className={`group min-h-[320px] rounded-3xl border border-cyan-400/20 bg-gradient-to-br ${item.bg} p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]`}
                      >
                        <h3 className={`mb-4 text-3xl font-black ${item.color}`}>
                          {item.year}
                        </h3>
                        <h4 className="mb-4 text-xl font-black text-white">
                          {item.title}
                        </h4>
                        <p className="mx-auto mb-8 max-w-[220px] text-lg leading-7 text-slate-300">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Models Section */}
        <section id="models" className="relative px-6 py-24">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Key EV Models <br />
                <span className="text-cyan-400">That Changed the Game</span>
              </h2>
            }
          />

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <div
                key={model.name}
                className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-cyan-300/20 bg-[#071124] shadow-[0_0_35px_rgba(34,211,238,0.10)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-300/50 hover:shadow-[0_0_55px_rgba(34,211,238,0.25)]"
              >
                <img
                  src={model.image}
                  alt={model.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="relative z-10 flex h-full min-h-[360px] flex-col justify-end p-7">
                  <h3 className="max-w-[260px] text-2xl font-black leading-tight text-white drop-shadow-[0_0_18px_rgba(34,211,238,0.35)]">
                    {model.name}
                  </h3>

                  <p className="mt-4 max-h-0 translate-y-5 overflow-hidden text-lg leading-7 text-slate-200 opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:translate-y-0 group-hover:opacity-100">
                    {model.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Battery Technology Section */}
        <section className="mx-auto mt-20 max-w-7xl px-6">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Evolution of <br />
                <span className="text-cyan-400"> Battery Technology</span>
              </h2>
            }
          />

          <div className="mx-auto grid max-w-7xl items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {batteries.map((battery, index) => (
              <React.Fragment key={battery.title}>
                <div
                  className={`min-h-[250px] rounded-3xl border border-white/10 bg-gradient-to-br ${battery.bg} p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/40`}
                >
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <h2 className={`text-2xl font-black ${battery.color}`}>
                        {battery.title}
                      </h2>
                      <p className={`mt-1 font-bold ${battery.color}`}>
                        {battery.sub}
                      </p>
                    </div>
                    <BatteryCharging className={`h-20 w-20 ${battery.color}`} />
                  </div>
                  <p className="text-lg leading-7 text-slate-300">{battery.text}</p>
                </div>

                {index < batteries.length - 1 && (
                  <ArrowRight className="mx-auto hidden h-8 w-8 text-cyan-300 md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Why EVs Matter Section */}
        <section className="mx-auto mt-20 max-w-7xl px-6">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Why EVs <br />
                <span className="text-cyan-400">Matter Today</span>
              </h2>
            }
          />

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {matters.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/40"
                >
                  <div
                    className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${item.color}`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="mb-3 text-xl font-black text-white">{item.title}</h2>
                    <p className="text-lg leading-7 text-slate-400">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto mt-20 max-w-7xl px-6 py-10">
          {/* Centered Header — matching Image 1 style */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Ev History{" "}
              <span className="text-cyan-400">FQA</span>
            </h2>
          </div>

          {/* Accordion Items */}
          <div className="py-24 bg-transparent">
              <div className="max-w-4xl mx-auto px-6">

            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
              </div>
          </div>
        </section>

        {/* Explore More Section */}
        <section className="mx-auto mt-20 max-w-7xl px-6 pb-12">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Explore <br />
                <span className="text-cyan-400">More About EVs</span>
              </h2>
            }
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {explore.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="group flex items-center gap-7 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
                >
                  <Icon className={`h-14 w-14 shrink-0 ${item.color}`} />
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-black text-white">{item.title}</h3>
                    <p className="text-lg leading-6 text-slate-400">{item.text}</p>
                  </div>
                  <ArrowRight
                    className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${item.color}`}
                  />
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes slow-zoom {
              0% { transform: scale(1); }
              100% { transform: scale(1.1); }
            }
            .animate-slow-zoom {
              animation: slow-zoom 20s infinite alternate ease-in-out;
            }
          `,
        }}
      />
    </div>
  );
};

/* ── FAQ Accordion Item ── */
const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b border-white/10 py-3 transition-all duration-300 ease-in-out last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-8 py-6 text-left group"
      >
        <span className="text-base md:text-lg font-black  tracking-wide text-white group-hover:text-cyan-100 transition-colors">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 ml-4 text-cyan-400 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`transition-all duration-300 ease-in-out px-8 ${
          open ? "max-h-60 pb-6 opacity-100" : "max-h-0 pb-0 opacity-0"
        } overflow-hidden`}
      >
        <p className="text-slate-400 text-base leading-relaxed border-t border-white/10 pt-5">
          {answer}
        </p>
      </div>
    </div>
  );
};

/* ── Section Title ── */
const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-14 max-w-7xl text-left">
    {eyebrow && (
      <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
        {eyebrow}
      </p>
    )}
    {title}
    {text && (
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
        {text}
      </p>
    )}
  </div>
);

export default EVHistoryPage;