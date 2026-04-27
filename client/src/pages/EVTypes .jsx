import React, { useState } from "react";
import { Link } from "react-router-dom";
import {ArrowRight, BatteryCharging, Car, CheckCircle2, ChevronDown, Cpu,
Droplet, Gauge, Home, Leaf, Map, Plug, PlugZap, Zap, XCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const evTypeSections = [

  
  {
    id: "bev",
    short: "BEV",
    title: 
    (
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">"Battery Electric Vehicle",<span className="text-cyan-400">Vehicle</span> </h2>
    )
    },
    subtitle: "100% electric. No petrol engine.",
    icon: BatteryCharging,
    image: "/src/assets/evstation.png",
    badge: "Pure Electric",
    gradient: "from-cyan-400 to-blue-500",
    glow: "bg-cyan-500/20",
    desc: "A BEV runs fully on electricity using a large battery pack and one or more electric motors. It does not use petrol, diesel, or an internal-combustion engine.",
    points: [
      "Powered only by a rechargeable battery pack.",
      "Produces zero tailpipe emissions.",
      "Best when home, workplace, or public charging is available.",
      "Offers instant torque, quiet driving, and low running cost.",
    ],
    pros: [
      "Lowest running cost compared with fuel vehicles.",
      "Clean, quiet, and smooth driving experience.",
      "Fewer moving parts and lower maintenance.",
    ],
    cons: [
      "Needs charging access.",
      "Long trips require charging planning.",
      "Charging time is longer than fuel refilling.",
    ],
    examples: ["Tesla Model 3", "MG ZS EV", "Nissan Leaf"],
    bestFor: "Daily city driving, home charging users, and drivers who want the cleanest EV option.",
  },
  {
    id: "phev",
    short: "PHEV",
    title: "Plug-in Hybrid Electric Vehicle",
    subtitle: "Electric drive plus petrol backup.",
    icon: Plug,
    image: "/src/assets/evstation.png",
    badge: "Plug-in Hybrid",
    gradient: "from-emerald-400 to-cyan-500",
    glow: "bg-emerald-500/20",
    desc: "A PHEV combines a rechargeable battery, electric motor, and petrol engine. It can drive short distances using electricity, then switch to hybrid mode for longer journeys.",
    points: [
      "Can be charged from an external charger.",
      "Uses electric power for short daily trips.",
      "Petrol engine supports longer travel.",
      "Good bridge between fuel cars and full BEVs.",
    ],
    pros: [
      "Flexible for both city and long-distance driving.",
      "Lower fuel usage when charged regularly.",
      "No range anxiety because of petrol backup.",
    ],
    cons: [
      "More complex than a BEV.",
      "Needs both charging and fuel maintenance.",
      "Benefits reduce if the battery is not charged often.",
    ],
    examples: ["Mitsubishi Outlander PHEV", "BYD Seal U DM-i", "Toyota Prius Prime"],
    bestFor: "Drivers who want electric city driving but still need petrol backup for long trips.",
  },
  {
    id: "hev",
    short: "HEV",
    title: 
    (
    <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">"Hybrid Electric Vehicle",<span className="text-violet-400">Vehicle</span> </h2>
    ) ,
    subtitle: "Self-charging hybrid system.",
    icon: Cpu,
    image: "/src/assets/evstation.png",
    badge: "Hybrid",
    gradient: "from-violet-400 to-fuchsia-500",
    glow: "bg-violet-500/20",
    desc: "An HEV uses a petrol engine with electric motor assistance. It cannot be plugged in. The battery charges through regenerative braking and engine power.",
    points: [
      "Does not need external charging.",
      "Battery charges while driving.",
      "Electric motor assists the petrol engine.",
      "Improves fuel economy compared with normal petrol cars.",
    ],
    pros: [
      "No charging station required.",
      "Better mileage than petrol-only vehicles.",
      "Reliable and practical for mixed driving.",
    ],
    cons: [
      "Very limited electric-only driving.",
      "Still depends on petrol.",
      "Not zero-emission during normal use.",
    ],
    examples: ["Toyota Prius", "Honda Accord Hybrid", "Toyota Corolla Hybrid"],
    bestFor: "Users who want better fuel efficiency without depending on charging infrastructure.",
  },
  {
    id: "fcev",
    short: "FCEV",
    title: 
    (<h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">"Fuel-Cell Electric Vehicle",<span className="text-blue-400">Vehicle</span> </h2>) ,

    subtitle: "Hydrogen-powered electric drive.",
    icon: Droplet,
    image: "/src/assets/evstation.png",
    badge: "Hydrogen EV",
    gradient: "from-blue-400 to-cyan-400",
    glow: "bg-blue-500/20",
    desc: "An FCEV uses hydrogen gas in a fuel cell to generate electricity. The electric motor drives the vehicle, and the main tailpipe emission is water vapour.",
    points: [
      "Uses hydrogen instead of battery-only charging.",
      "Fuel cell generates electricity onboard.",
      "Fast refuelling compared with battery charging.",
      "Suitable for long range and heavy transport use cases.",
    ],
    pros: [
      "Quick refuelling time.",
      "Long driving range.",
      "Zero tailpipe carbon emissions.",
    ],
    cons: [
      "Hydrogen stations are limited.",
      "Infrastructure cost is high.",
      "Vehicle availability is lower than BEVs.",
    ],
    examples: ["Toyota Mirai", "Hyundai NEXO", "Honda Clarity Fuel Cell"],
    bestFor: "Long-range drivers and future clean transport systems where hydrogen refuelling exists.",
  },
  {
    id: "mhev",
    short: "MHEV",
    title: (
    <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">"Mild Hybrid Electric Vehicle",<span className="text-lime-400">Vehicle</span> </h2> ),
    subtitle: "Small electric assist system.",
    icon: Zap,
    image: "/src/assets/evstation.png",
    badge: "Mild Hybrid",
    gradient: "from-lime-400 to-emerald-500",
    glow: "bg-lime-500/20",
    desc: "An MHEV uses a small battery and motor-generator to support the engine. It improves efficiency but cannot drive using electric power alone.",
    points: [
      "Small battery supports the engine.",
      "Improves start-stop smoothness.",
      "Helps during acceleration.",
      "Cannot operate as a full electric vehicle.",
    ],
    pros: [
      "Better mileage than normal petrol vehicles.",
      "Lower cost than full hybrids or BEVs.",
      "Simple and practical technology.",
    ],
    cons: [
      "No electric-only driving.",
      "Still mainly fuel-powered.",
      "Lower EV benefits than BEV, PHEV, or HEV.",
    ],
    examples: ["Suzuki Smart Hybrid", "Audi MHEV", "Maruti Smart Hybrid"],
    bestFor: "Drivers who want small efficiency improvements without changing driving habits.",
  },
];

const chargingCards = [
  {
    title: "AC Level 1",
    power: "120V outlet",
    icon: Home,
    range: "4–6 km / hour",
    text: "Basic home charging for overnight top-ups and low daily mileage.",
  },
  {
    title: "AC Level 2",
    power: "240V wallbox",
    icon: Plug,
    range: "20–30 km / hour",
    text: "The most practical everyday charging option for homes, offices, and public parking.",
  },
  {
    title: "DC Fast Charging",
    power: "Level 3 station",
    icon: PlugZap,
    range: "100–200 km / 30 min",
    text: "High-power charging for highways, fleet hubs, and quick long-distance stops.",
  },
];

const suitCards = [
  {
    title: "Short city trips",
    text: "Choose a BEV or PHEV for low daily running cost and smooth urban driving.",
    icon: Home,
    link: "Buying Guide",
    path: "/ev-buying-guide",
  },
  {
    title: "Frequent long drives",
    text: "Consider a long-range BEV, PHEV, or FCEV depending on charging access.",
    icon: Map,
    link: "Trip Planner",
    path: "/trip-planner",
  },
  {
    title: "Home charging ready",
    text: "A BEV becomes the smartest daily option when you can charge overnight.",
    icon: PlugZap,
    link: "Home Charging",
    path: "/home-charging",
  },
  {
    title: "No home charger",
    text: "Use public AC/DC networks and compare PHEV options for backup flexibility.",
    icon: BatteryCharging,
    link: "Public Charging",
    path: "/public-charging",
  },
];

const faqs = [
  {
    q: "What is the difference between BEV, PHEV, and HEV?",
    a: "A BEV is fully electric, a PHEV can be plugged in and also uses an engine, while an HEV uses electric assistance without plug-in charging.",
  },
  {
    q: "How long does it take to charge an EV?",
    a: "Charging time depends on battery size and charger power. AC home charging usually takes hours, while DC fast charging can add useful range in minutes.",
  },
  {
    q: "Is a BEV better than a hybrid?",
    a: "For daily use with charging access, BEVs usually offer the best savings and lowest emissions. Hybrids can suit users without reliable charging.",
  },
  {
    q: "Can I install a home charger myself?",
    a: "A certified electrician should install a home charger because load capacity, earthing, breaker protection, and safety compliance matter.",
  },
];

const EVTypes = () => {
  const [openFaq, setOpenFaq] = useState(null);

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

            <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter"> EV Types &<br /><span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">Technologies</span></h1>
            <p className="text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
              Learn BEV, PHEV, HEV, FCEV, and MHEV as separate electric vehicle
              technologies with clear benefits, limitations, and real-world use cases.
            </p>
          </div>
        </div>

      </section>


      <main className="relative overflow-hidden">
        <GlowBackground />

        {evTypeSections.map((item, index) => (
          <EVTypeSection key={item.id} item={item} index={index} />
        ))}

        <section id="charging" className="relative border-y border-white/5 bg-white/[0.02] py-28">

          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="02 / Charging"
              title="Charging Technology"
              text="AC charging is ideal for daily use. DC fast charging is built for long journeys, public hubs, and quick energy top-ups."
            />
            <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
              <ComparisonTable
                title="Charging Types Comparison"
                headers={["Type", "Speed", "Typical Use", "Battery Impact", "Cost / kWh"]}
                rows={[
                  ["AC Level 1", "Slow", "Home overnight charging", "Very gentle", "Lowest"],
                  ["AC Level 2", "Medium", "Home / public daily use", "Gentle", "Low–Medium"],
                  ["DC Fast", "Fast", "Highway trips and top-ups", "More heat, use moderately", "Medium–High"],
                ]}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {chargingCards.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10"
                  >
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />

                    <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-10 w-10" />
                    </div>

                    <h3 className="relative text-2xl font-black uppercase">{item.title}</h3>
                    <p className="relative mt-2 font-bold text-cyan-300">{item.power}</p>
                    <p className="relative mt-5 leading-7 text-slate-400">{item.text}</p>

                    <div className="relative mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-300">
                      {item.range}
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        <section className="relative mx-auto grid max-w-7xl gap-10 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow="03 / Platform"
              title="Smart EV Architecture"
              text="Modern EVs are software-defined machines where the battery pack, motors, inverter, thermal system, and vehicle control unit work as one intelligent ecosystem."
            />

            <div className="space-y-4">
              {[
                "Battery packs store energy and support range, safety, and performance.",
                "Power electronics manage energy flow between battery, motor, and charger.",
                "Thermal systems protect battery health and charging performance.",
                "Connected software enables diagnostics, range optimisation, and smart updates.",
              ].map((point) => (
                <InfoLine key={point} type="good" text={point} />
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <div className="grid gap-5 sm:grid-cols-4">
              {[
                ["Battery Pack", BatteryCharging],
                ["Inverter", Cpu],
                ["Motor", Gauge],
                ["Wheels", Car],
              ].map(([label, Icon], index) => (
                <div key={label} className="relative text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-lg shadow-cyan-500/10">
                    <Icon className="h-11 w-11" />
                  </div>
                  <p className="text-sm font-black uppercase text-slate-300">{label}</p>

                  {index !== 3 && (
                    <ArrowRight className="absolute -right-4 top-10 hidden h-5 w-5 text-emerald-300 sm:block" />
                  )}
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 max-w-md rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-5 text-center text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
              Vehicle Control Unit & Smart Software
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/5 bg-black/20 py-28">
          <div className="mx-auto max-w-7xl px-6">
            <ComparisonTable
              title="EV Types Comparison"
              headers={["Feature", "BEV", "PHEV", "HEV", "FCEV", "MHEV"]}
              rows={[
                ["Main Power", "Battery", "Battery + Petrol", "Petrol + Motor", "Hydrogen Fuel Cell", "Petrol + Small Assist"],
                ["Plug-in Charging", "Yes", "Yes", "No", "No", "No"],
                ["Electric-only Drive", "Yes", "Yes", "Limited", "Yes", "No"],
                ["Tailpipe Emissions", "Zero", "Low when charged", "Lower than ICE", "Water vapour", "Lower than ICE"],
                ["Best For", "Daily EV users", "Mixed driving", "No charger users", "Hydrogen networks", "Simple efficiency"],
              ]}
            />
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 py-28">
          <SectionHeader
            eyebrow="04 / Decision Guide"
            title="Which EV Suits You?"
            text="Match the vehicle type with your daily route, charging access, budget, and long-term ownership goals."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {suitCards.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-cyan-500/10"
                >
                  <Icon className="mb-6 h-12 w-12 text-cyan-300" />
                  <h3 className="mb-4 text-xl font-black uppercase leading-tight">{item.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-slate-400">{item.text}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase text-emerald-300">
                    {item.link}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-28">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            text="Quick answers for common questions about EV categories, charging, and battery health."
          />

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-black uppercase tracking-wide text-white"
                >
                  {faq.q}
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-cyan-300 transition ${openFaq === index ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {openFaq === index && (
                  <div className="border-t border-white/10 px-6 py-5 leading-7 text-slate-400">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-3">
          <NextCard
            icon={Leaf}
            title="EV Buying Guide"
            text="Find the right EV for your budget and driving pattern."
            path="/ev-buying-guide"
          />
          <NextCard
            icon={PlugZap}
            title="Charging Guide"
            text="Learn about home, public, AC, and DC fast charging."
            path="/home-charging"
          />
          <NextCard
            icon={Map}
            title="EV History"
            text="Explore the journey and future of electric mobility."
            path="/ev-history"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const EVTypeSection = ({ item, index }) => {
  const Icon = item.icon;
  const reverse = index % 2 !== 0;

  return (
    <section
      id={item.id}
      className="relative border-t border-white/5 py-28 scroll-mt-24"
    >
      <div className={`absolute ${reverse ? "left-0" : "right-0"} top-20 h-96 w-96 rounded-full ${item.glow} blur-[150px]`} />

      <div
        className={`relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
      >
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
          <img
            src={item.image}
            alt={item.title}
            className="h-[460px] w-full rounded-[2rem] object-cover opacity-80"
          />

          <div className="absolute inset-5 rounded-[2rem] bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute bottom-10 left-10 right-10">
            <div
              className={`mb-4 inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${item.gradient} px-5 py-2 text-sm font-black uppercase tracking-[0.25em] text-[#031014]`}
            >
              <Icon className="h-4 w-4" />
              {item.badge}
            </div>

            <h2 className="text-4xl font-black uppercase leading-tight md:text-5xl">
              {item.short}
            </h2>

            <p className="mt-3 text-lg font-bold text-cyan-100">{item.subtitle}</p>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-cyan-300">
            {String(index + 1).padStart(2, "0")} / {item.short}
          </p>

          <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
            {item.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">{item.desc}</p>

          <div className="mt-8 grid gap-3">
            {item.points.map((point) => (
              <InfoLine key={point} type="good" text={point} />
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-black uppercase text-emerald-300">
                <CheckCircle2 className="h-5 w-5" />
                Advantages
              </h3>
              <div className="space-y-3">
                {item.pros.map((point) => (
                  <p key={point} className="text-sm leading-6 text-slate-300">
                    {point}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-rose-400/20 bg-rose-400/10 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-black uppercase text-rose-300">
                <XCircle className="h-5 w-5" />
                Limitations
              </h3>
              <div className="space-y-3">
                {item.cons.map((point) => (
                  <p key={point} className="text-sm leading-6 text-slate-300">
                    {point}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <h3 className="mb-3 font-black uppercase text-cyan-300">Best For</h3>
            <p className="leading-7 text-slate-300">{item.bestFor}</p>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              Vehicle Examples
            </p>

            <div className="flex flex-wrap gap-3">
              {item.examples.map((example) => (
                <div
                  key={example}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm font-bold text-slate-300"
                >
                  <Car className="h-4 w-4 text-cyan-300" />
                  {example}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GlowBackground = () => (
  <>
    <div className="pointer-events-none absolute left-0 top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
    <div className="pointer-events-none absolute right-0 top-[680px] h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
    <div className="pointer-events-none absolute bottom-96 left-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />
  </>
);

const SectionHeader = ({ eyebrow, title, text, align = "center" }) => {
  const words = title.split(" ");
  const lastWord = words.pop();

  return (
    <div className={`mb-14 ${align === "left" ? "text-left" : "mx-auto max-w-3xl text-center"}`}>
      <p className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-cyan-300">
        {eyebrow}
      </p>

      <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
        {words.join(" ")}{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-emerald-300 bg-clip-text text-transparent">
          {lastWord}
        </span>
      </h2>

      {text && <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p>}
    </div>
  );
};

const InfoLine = ({ type, text }) => (
  <div className="mb-3 flex items-start gap-3 text-left text-sm leading-7 text-slate-400">
    {type === "good" ? (
      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
    ) : (
      <XCircle className="mt-1 h-5 w-5 shrink-0 text-rose-300" />
    )}
    <span>{text}</span>
  </div>
);

const ComparisonTable = ({ title, headers, rows }) => (
  <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
    <h3 className="mb-6 text-center text-2xl font-black uppercase tracking-tight text-white">
      {title}
    </h3>

    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-cyan-400/10 text-cyan-200">
            {headers.map((head) => (
              <th
                key={head}
                className="border border-white/10 px-4 py-4 text-left font-black uppercase tracking-wide"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={`${title}-${index}`} className="odd:bg-white/[0.03] even:bg-black/10">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${title}-${index}-${cellIndex}`}
                  className="border border-white/10 px-4 py-4 align-top leading-6 text-slate-300"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const NextCard = ({ icon: Icon, title, text, path }) => (
  <Link
    to={path}
    className="group flex items-center gap-5 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-cyan-500/10"
  >
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Icon className="h-8 w-8" />
    </div>

    <div className="flex-1">
      <h3 className="mb-2 font-black uppercase text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>

    <ArrowRight className="h-6 w-6 text-emerald-300 transition group-hover:translate-x-1" />
  </Link>
);

export default EVTypes;