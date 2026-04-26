import React from "react";
import { BatteryCharging, Download, Bolt, Car, Leaf, Lightbulb, PlugZap, Rocket, ShieldCheck, ShoppingCart, Sprout, Wind, Globe2, ArrowRight, } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const EVHistoryPage = () => {
  const milestones = [
    {
      year: "1832",
      title: "The First Spark",
      text: "Robert Anderson invented the first crude electric carriage.",
      icon: Lightbulb,
      image:
        "https://images.unsplash.com/photo-1627634777217-c864268db30c?auto=format&fit=crop&w=500&q=80",
      color: "text-teal-500",
      border: "border-teal-300",
      bg: "bg-teal-50",
    },
    {
      year: "1890s",
      title: "The Electric Era",
      text: "Electric cars became popular in the early 1900s — quiet, clean, and reliable.",
      icon: Bolt,
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=500&q=80",
      color: "text-blue-500",
      border: "border-blue-300",
      bg: "bg-blue-50",
    },
    {
      year: "1930s - 1950s",
      title: "A Step Back",
      text: "Cheap petrol and better roads led to a decline in electric vehicles.",
      icon: Wind,
      image:
        "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=500&q=80",
      color: "text-violet-500",
      border: "border-violet-300",
      bg: "bg-violet-50",
    },
    {
      year: "1970s - 1990s",
      title: "Renewed Interest",
      text: "Oil crises and environmental concerns sparked research and new EV prototypes.",
      icon: Sprout,
      image:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=500&q=80",
      color: "text-orange-500",
      border: "border-orange-300",
      bg: "bg-orange-50",
    },
    {
      year: "2000s - Now",
      title: "The EV Revolution",
      text: "Advanced batteries, smart tech, and sustainability push drove today's EV boom.",
      icon: Rocket,
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=500&q=80",
      color: "text-emerald-500",
      border: "border-emerald-300",
      bg: "bg-emerald-50",
    },
  ];

  const models = [
    {
      name: "GM EV1 (1996)",
      text: "One of the first modern EVs, ahead of its time in technology.",
      image:
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Toyota Prius (1997)",
      text: "The hybrid pioneer that introduced millions to efficient driving.",
      image:
        "https://images.unsplash.com/photo-1616788494672-ec7ca25fdda9?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Nissan Leaf (2010)",
      text: "The world's best-selling EV that made electric driving mainstream.",
      image:
        "https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Tesla Model S (2012)",
      text: "Redefined performance and range for electric vehicles.",
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "BMW i3 (2013)",
      text: "Pioneered modern EV design with sustainability at its core.",
      image:
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Tata Nexon EV (2020)",
      text: "Made EVs accessible to millions in emerging markets.",
      image:
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=500&q=80",
    },
  ];

  const batteries = [
    {
      title: "Early Days",
      sub: "Lead-Acid / NiMH",
      text: "Heavy, low energy density, limited range and performance.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
    },
    {
      title: "Modern Era",
      sub: "Lithium-Ion",
      text: "Higher energy density, longer life, faster charging, and more reliable.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
    },
    {
      title: "The Future",
      sub: "Solid-State & Beyond",
      text: "Safer, lighter, more efficient batteries for the next generation of EVs.",
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
    },
  ];

  const matters = [
    {
      title: "Cleaner Planet",
      text: "EVs produce zero tailpipe emissions, helping reduce air pollution and fight climate change.",
      icon: Leaf,
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    {
      title: "Smarter Mobility",
      text: "Lower running costs, fewer moving parts, and advanced technology make EVs the smarter choice.",
      icon: ShieldCheck,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      title: "Sustainable Future",
      text: "A global shift towards renewable energy and electric mobility for generations to come.",
      icon: Globe2,
      bg: "bg-violet-50",
      color: "text-violet-500",
    },
  ];

  const explore = [
    {
      title: "EV Types",
      text: "Explore different types of electric vehicles.",
      icon: Car,
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    {
      title: "Buying Guide",
      text: "Find tips to choose the perfect EV for you.",
      icon: ShoppingCart,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      title: "Charging Guide",
      text: "Learn everything about charging your EV.",
      icon: PlugZap,
      bg: "bg-violet-50",
      color: "text-violet-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white flex flex-col font-sans selection:bg-cyan-500/30">
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

            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">The EV Journey:<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">A Short History of Electric Vehicles</span></h1>
            <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4"> From early experiments to today’s intelligent electric mobility<br />
              a journey of innovation, persistence, and a cleaner future.</p>
          </div>
        </div>
        <div className="flex gap-4 pt-6 pl-6 absolute left-30 bottom-10">
          {/* Fixed: removed undefined activeEV variable from the link path */}
          <a
            href="/ev-manual.pdf"
            download="EV_Maintenance_Manual.pdf"
            className="px-10 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            Download Manual
            <Download className="w-5 h-5" />
          </a>

        </div>
      </section>


      <main className="rounded-t-[2rem]  px-6 py-14">
        {/* MILESTONES */}
        <section className="mx-auto max-w-7xl">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Milestones in <br />
                <span className="text-cyan-400">the EV Journey</span>
              </h2>
            }
          />


          <div className="relative mt-14">
            <div className="absolute left-10 right-10 top-7 hidden h-1 bg-blue-400 md:block" />

            <div className="grid gap-5 md:grid-cols-5">
              {milestones.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.year} className="relative">
                    <div
                      className={`relative z-10 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-white ${item.border} ${item.color}`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                      <h3 className={`mb-4 text-2xl font-extrabold ${item.color}`}>
                        {item.year}
                      </h3>
                      <h4 className="mb-4 text-base font-extrabold text-[#071b3a]">
                        {item.title}
                      </h4>
                      <p className="mb-6 text-sm leading-7 text-[#314463]">
                        {item.text}
                      </p>
                      <div
                        className={`mx-auto flex h-20 w-24 items-center justify-center rounded-2xl ${item.bg} ${item.color}`}
                      >
                        <Car className="h-14 w-14" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* MODELS */}
        <section className="mx-auto  bg-yellow-50 mt-20 max-w-7xl">
          <SectionTitle title=
          {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
          Key EV Models <br />
           <span className="text-cyan-400">That Changed the Game</span>
          </h2>
          } 
          />

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
            {models.map((model) => (
              <div
                key={model.name}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="h-32 bg-blue-50">
                  <img
                    src={model.image}
                    alt={model.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="mb-4 text-sm font-extrabold text-[#071b3a]">
                    {model.name}
                  </h3>
                  <p className="text-xs leading-6 text-[#314463]">{model.text}</p>
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

          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            {batteries.map((battery, index) => (
              <React.Fragment key={battery.title}>
                <div
                  className={`flex min-h-[210px] items-center justify-between rounded-xl border p-8 ${battery.bg} ${battery.border}`}
                >
                  <div>
                    <h3 className={`text-lg font-extrabold ${battery.color}`}>
                      {battery.title}
                    </h3>
                    <p className={`mt-1 text-base font-bold ${battery.color}`}>
                      ({battery.sub})
                    </p>
                    <p className="mt-7 max-w-xs text-sm leading-7 text-[#314463]">
                      {battery.text}
                    </p>
                  </div>

                  <BatteryCharging className={`h-24 w-24 ${battery.color}`} />
                </div>

                {index < batteries.length - 1 && (
                  <ArrowRight className="mx-auto hidden h-7 w-7 text-[#071b3a] md:block" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* WHY MATTER */}
        <section className="mx-auto mt-20 max-w-7xl">
          <SectionTitle title=
          {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">Why EVs 
              <span className="text-cyan-400">Matter Today</span>
              </h2>
            }
          />

          <div className="grid gap-10 md:grid-cols-3">
            {matters.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-7">
                  <div
                    className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full ${item.bg} ${item.color}`}
                  >
                    <Icon className="h-12 w-12" />
                  </div>
                  <div>
                    <h3 className="mb-4 text-xl font-extrabold text-[#071b3a]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-7 text-[#314463]">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EXPLORE */}
        <section className="mx-auto mt-20 max-w-7xl pb-12">
          <SectionTitle title=
          {
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">Explore 
              <span className="text-cyan-400">More About EVs</span>
              </h2>
            }
          />

          <div className="grid gap-6 md:grid-cols-3">
            {explore.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group flex items-center gap-7 rounded-xl border border-slate-200 p-8 transition hover:-translate-y-1 hover:shadow-xl ${item.bg}`}
                >
                  <Icon className={`h-16 w-16 shrink-0 ${item.color}`} />
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-extrabold text-[#071b3a]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-[#314463]">{item.text}</p>
                  </div>
                  <ArrowRight
                    className={`h-7 w-7 shrink-0 transition group-hover:translate-x-1 ${item.color}`}
                  />
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-extrabold tracking-tight text-[#071b3a]">
      {title}
    </h2>
    <div className="mx-auto mt-4 h-1 w-10 rounded-full bg-teal-400" />
  </div>
);

export default EVHistoryPage;