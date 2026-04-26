import React from "react";
import {
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
  Sparkles,
  Sprout,
  Wind,
} from "lucide-react";
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
      text: "Advanced batteries, smart tech, and sustainability pushed today’s EV boom.",
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
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Toyota Prius (1997)",
      text: "The hybrid pioneer that introduced millions to efficient driving.",
      image:
        "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Nissan Leaf (2010)",
      text: "The EV that helped make electric driving mainstream.",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Tesla Model S (2012)",
      text: "Redefined performance and long-range electric mobility.",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "BMW i3 (2013)",
      text: "Pioneered futuristic EV design with sustainability at its core.",
      image:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=700&q=80",
    },
    {
      name: "Tata Nexon EV (2020)",
      text: "Made EVs more accessible in fast-growing markets.",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=700&q=80",
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
      href: "/ev-types",
      color: "text-emerald-300",
    },
    {
      title: "Buying Guide",
      text: "Find tips to choose the perfect EV for you.",
      icon: ShoppingCart,
      href: "/ev-buying-guide",
      color: "text-cyan-300",
    },
    {
      title: "Charging Guide",
      text: "Learn everything about charging your EV.",
      icon: PlugZap,
      href: "/public-charging",
      color: "text-violet-300",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative min-h-[92vh] pt-28">
          <div className="absolute inset-0">
            <img
              src="/src/assets/ev3.png"
              alt="EV history hero"
              className="h-full w-full object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/85 to-[#050816]/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/80" />
            <div className="absolute left-0 top-20 h-[450px] w-[450px] rounded-full bg-cyan-500/20 blur-[150px]" />
            <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[150px]" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                <Sparkles className="h-4 w-4" />
                EV Learning Hub
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
                The EV Journey:
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  A Short History
                </span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-4 border-cyan-400 pl-5 text-lg leading-8 text-cyan-50/80 md:text-2xl">
                From early electric experiments to today’s intelligent mobility,
                explore the innovation, challenges, and breakthroughs that shaped
                the future of EVs.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#milestones"
                  className="group inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-black uppercase text-[#050816] transition hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                >
                  View Timeline
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>

                <a
                  href="#models"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-8 py-4 font-bold uppercase text-white backdrop-blur-xl transition hover:-translate-y-1 hover:border-emerald-400/50 hover:text-emerald-300"
                >
                  Explore Models
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-[90px]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-white/[0.06] p-4 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=1200&q=80"
                  alt="Electric vehicle charging"
                  className="h-[430px] w-full rounded-[1.5rem] object-cover"
                />
                <div className="absolute bottom-8 left-8 rounded-2xl border border-white/10 bg-[#050816]/80 p-5 backdrop-blur-xl">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                    EV Evolution
                  </p>
                  <p className="mt-2 text-3xl font-black">1832 → Now</p>
                </div>
              </div>
            </div>
          </div>
        </section>

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

        <section id="models" className="relative px-6 py-24">
          <SectionTitle title=
          {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
          Key EV Models <br />
           <span className="text-cyan-400">That Changed the Game</span>
          </h2>
          } 
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3 lg:grid-cols-6">
            {models.map((model) => (
              <div
                key={model.name}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
              >
                <div className="h-36 overflow-hidden bg-cyan-400/10">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h2 className="mb-3 text-xl font-black text-white">
                    {model.name}
                  </h2>
                  <p className="text-lg leading-6 text-slate-400">{model.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BATTERY */}
        <section className="mx-auto mt-20 max-w-7xl">
          <SectionTitle title=
           {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Evolution of <br />
               <span className="text-cyan-400"> Battery Technology 
               </span>
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
                  <p className="text-lg leading-7 text-slate-300">
                    {battery.text}
                  </p>
                </div>

                {index < batteries.length - 1 && (
                  <ArrowRight className="mx-auto hidden h-8 w-8 text-cyan-300 md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* WHY MATTER */}
        <section className="mx-auto mt-20 max-w-7xl">
          <SectionTitle title=
          {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">Why EVs <br />
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
                    <h2 className="mb-3 text-xl font-black text-white">
                      {item.title}
                    </h2>
                    <p className="text-lg leading-7 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl pb-12">

          <SectionTitle title=
           {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">Explore <br />
              <span className="text-cyan-400">More About EVs</span>
              </h2>
            }
          />
            

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            {explore.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="group flex items-center gap-7 rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
                >
                  <Icon className={`h-14 w-14 shrink-0 ${item.color}`} />
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-black text-white">
                      {item.title}
                    </h3>
                    <p className="text-lg leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </div>
                  <ArrowRight
                    className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${item.color}`}
                  />
                </a>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-14 max-w-3xl text-center">
    <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
      {eyebrow}
    </p>
    <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-6xl">
      {title}
    </h2>
    <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
    <p className="mt-6 text-base leading-8 text-slate-400 md:text-lg">{text}</p>
  </div>
);

export default EVHistoryPage;