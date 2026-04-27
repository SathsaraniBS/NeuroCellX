import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BatteryCharging,
  Car,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Droplet,
  Gauge,
  Home,
  Leaf,
  Map,
  Plug,
  PlugZap,
  ShieldCheck,
  Sparkles,
  Zap,
  XCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const evTypes = [
  {
    title: "Battery Electric Vehicle",
    short: "BEV",
    icon: BatteryCharging,
    accent: "cyan",
    desc: "A fully electric vehicle powered only by a battery pack and electric motors, with no internal-combustion engine.",
    pros: "Zero tailpipe emissions, quiet driving, instant torque, and low running cost.",
    cons: "Needs reliable charging access and careful route planning for long trips.",
    examples: ["Tesla Model 3", "MG ZS EV"],
  },
  {
    title: "Plug-in Hybrid Electric Vehicle",
    short: "PHEV",
    icon: Plug,
    accent: "emerald",
    desc: "Combines a rechargeable battery with a petrol engine, allowing short electric trips and longer hybrid drives.",
    pros: "Good for mixed driving, city EV range, and backup engine flexibility.",
    cons: "More complex drivetrain and higher maintenance than a pure BEV.",
    examples: ["BYD Seal U DM-i", "Outlander PHEV"],
  },
  {
    title: "Hybrid Electric Vehicle",
    short: "HEV",
    icon: Cpu,
    accent: "violet",
    desc: "Uses an engine with electric assistance, but the battery is charged by regenerative braking and the engine, not a plug.",
    pros: "Better fuel efficiency than petrol-only cars and no charging setup required.",
    cons: "Very limited electric-only driving and still depends on fuel.",
    examples: ["Toyota Prius", "Honda Accord Hybrid"],
  },
  {
    title: "Fuel-Cell Electric Vehicle",
    short: "FCEV",
    icon: Droplet,
    accent: "blue",
    desc: "Uses hydrogen in a fuel cell to generate electricity for the electric motor while emitting only water vapour.",
    pros: "Fast refuelling, long range, and zero tailpipe carbon emissions.",
    cons: "Hydrogen stations are limited and infrastructure costs are high.",
    examples: ["Toyota Mirai", "Hyundai NEXO"],
  },
  {
    title: "Mild Hybrid Electric Vehicle",
    short: "MHEV",
    icon: Zap,
    accent: "lime",
    desc: "A small battery and motor support the engine during acceleration and improve overall efficiency.",
    pros: "Improves mileage, start-stop smoothness, and acceleration support.",
    cons: "Cannot drive using electric power alone.",
    examples: ["Suzuki Smart Hybrid", "Audi MHEV"],
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
  {
    q: "Does fast charging damage the battery?",
    a: "Modern EVs manage heat and charging speed automatically, but regular AC charging and moderate fast-charger use are healthier long term.",
  },
  {
    q: "Are hydrogen cars better than battery EVs?",
    a: "Hydrogen cars refuel quickly and can travel far, but battery EVs currently have stronger charging availability and lower infrastructure complexity.",
  },
];

const accentStyles = {
  cyan: "from-cyan-400/25 to-cyan-500/5 text-cyan-300 border-cyan-400/20 shadow-cyan-500/20",
  emerald: "from-emerald-400/25 to-emerald-500/5 text-emerald-300 border-emerald-400/20 shadow-emerald-500/20",
  violet: "from-violet-400/25 to-violet-500/5 text-violet-300 border-violet-400/20 shadow-violet-500/20",
  blue: "from-blue-400/25 to-blue-500/5 text-blue-300 border-blue-400/20 shadow-blue-500/20",
  lime: "from-lime-400/25 to-lime-500/5 text-lime-300 border-lime-400/20 shadow-lime-500/20",
};

const EVTypesTechnologies = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/src/assets/evstation.png"
            alt="Futuristic EV charging technology"
            className="h-full w-full object-cover opacity-70 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#050816]/70 to-[#050816]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
          <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[140px]" />
          <div className="absolute bottom-12 right-16 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.35em] text-cyan-200 backdrop-blur-md">
              <Sparkles className="h-4 w-4" /> EV Learning Hub
            </div>

            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
              EV Types &<br />
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-lime-300 bg-clip-text text-transparent">
                Technologies
              </span>
            </h1>

            <p className="max-w-2xl border-l-4 border-cyan-400 pl-5 text-xl font-medium leading-9 text-cyan-50/90 md:text-2xl">
              Understand BEV, PHEV, HEV, FCEV, smart charging, power electronics,
              and the platform technology behind modern electric mobility.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#ev-types"
                className="group inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-black uppercase tracking-wide text-[#031014] transition hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
              >
                Explore Types <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#charging"
                className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-black uppercase tracking-wide text-white backdrop-blur-md transition hover:border-cyan-400/40 hover:bg-white/10"
              >
                Charging Tech
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="relative overflow-hidden">
        <GlowBackground />

        <section id="ev-types" className="relative mx-auto max-w-7xl px-6 py-28">
          <SectionHeader eyebrow="01 / Vehicle Types" title="Every EV drivetrain explained" text="Choose the right technology by understanding how each vehicle stores energy, delivers power, and fits real-world driving." />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {evTypes.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.short}
                  className={`group rounded-[2rem] border bg-white/[0.04] p-6 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:bg-white/[0.07] hover:shadow-2xl ${accentStyles[item.accent]}`}
                >
                  <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-lg ${accentStyles[item.accent]}`}>
                    <Icon className="h-10 w-10" />
                  </div>

                  <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-slate-500">{item.short}</p>
                  <h3 className="mb-4 min-h-[72px] text-xl font-black uppercase leading-tight text-white">{item.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-slate-400">{item.desc}</p>

                  <InfoLine type="good" text={item.pros} />
                  <InfoLine type="bad" text={item.cons} />

                  <div className="my-6 h-px bg-white/10" />
                  <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-slate-500">Examples</p>
                  <div className="space-y-2">
                    {item.examples.map((example) => (
                      <div key={example} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">
                        <Car className="h-4 w-4 text-cyan-300" /> {example}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="charging" className="relative border-y border-white/5 bg-white/[0.02] py-28">
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow="02 / Charging" title="Charging technology made simple" text="AC charging is ideal for daily use. DC fast charging is built for long journeys, public hubs, and quick energy top-ups." />

            <div className="grid gap-6 lg:grid-cols-3">
              {chargingCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:shadow-2xl hover:shadow-cyan-500/10">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />
                    <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      <Icon className="h-10 w-10" />
                    </div>
                    <h3 className="relative text-2xl font-black uppercase">{item.title}</h3>
                    <p className="relative mt-2 text-cyan-300 font-bold">{item.power}</p>
                    <p className="relative mt-5 text-slate-400 leading-7">{item.text}</p>
                    <div className="relative mt-8 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-300">
                      {item.range}
                    </div>
                  </article>
                );
              })}
            </div>

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
          </div>
        </section>

        <section className="relative mx-auto grid max-w-7xl gap-10 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader align="left" eyebrow="03 / Platform" title="Smart EV platform architecture" text="Modern EVs are software-defined machines where the battery pack, motors, inverter, thermal system, and vehicle control unit work as one intelligent ecosystem." />
            <div className="space-y-4">
              {[
                "Flat floor battery packs improve space, handling, and crash protection.",
                "Power electronics manage energy flow between battery, motor, and charger.",
                "Thermal systems protect battery health and charging performance.",
                "Connected software enables range optimisation, diagnostics, and OTA updates.",
              ].map((item) => (
                <InfoLine key={item} type="good" text={item} />
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
                  {index !== 3 && <ArrowRight className="absolute -right-4 top-10 hidden h-5 w-5 text-emerald-300 sm:block" />}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-md rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-6 py-5 text-center text-sm font-black uppercase tracking-[0.25em] text-emerald-300">
              Vehicle Control Unit & Smart Software
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/5 bg-black/20 py-28">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 xl:grid-cols-2">
            <ComparisonTable
              title="EV Types Comparison"
              headers={["Feature", "BEV", "PHEV", "HEV", "FCEV"]}
              rows={[
                ["Power Source", "Battery + Motor", "Battery + ICE", "ICE + Motor", "Hydrogen Fuel Cell"],
                ["Emissions", "Zero tailpipe", "Very low", "Lower than ICE", "Zero tailpipe"],
                ["Electric Range", "200–600+ km", "40–100 km", "1–5 km", "500–700 km"],
                ["Fuel / Charging", "Electricity", "Electricity + Petrol", "Petrol", "Hydrogen"],
                ["Best For", "Daily savings", "Mixed driving", "Fuel efficiency", "Fast refuel"],
              ]}
            />
            <ComparisonTable
              title="Charger Power Comparison"
              headers={["Feature", "AC Level 1", "AC Level 2", "DC Fast"]}
              rows={[
                ["Power", "1.4–1.9 kW", "3.7–22 kW", "50–350+ kW"],
                ["Voltage", "120V AC", "240V AC", "200–1000V DC"],
                ["Time", "20–40 hrs", "4–8 hrs", "20–30 min"],
                ["Best Use", "Overnight home", "Home / workplace", "Highway trips"],
                ["Battery Impact", "Very gentle", "Gentle", "Use moderately"],
              ]}
            />
          </div>
        </section>

        <section className="relative mx-auto max-w-7xl px-6 py-28">
          <SectionHeader eyebrow="04 / Decision Guide" title="Which EV suits you?" text="Match the vehicle type with your daily route, charging access, budget, and long-term ownership goals." />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {suitCards.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.path} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-cyan-500/10">
                  <Icon className="mb-6 h-12 w-12 text-cyan-300" />
                  <h3 className="mb-4 text-xl font-black uppercase leading-tight">{item.title}</h3>
                  <p className="mb-6 text-sm leading-7 text-slate-400">{item.text}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-black uppercase text-emerald-300">
                    {item.link} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto max-w-5xl px-6 pb-28">
          <SectionHeader eyebrow="FAQ" title="Frequently asked questions" text="Quick answers for common questions about EV categories, charging, and battery health." />
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-black uppercase tracking-wide text-white"
                >
                  {faq.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-300 transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-white/10 px-6 py-5 text-slate-400 leading-7">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="relative mx-auto grid max-w-7xl gap-6 px-6 pb-28 md:grid-cols-3">
          <NextCard icon={Leaf} title="EV Buying Guide" text="Find the right EV for your budget and driving pattern." path="/ev-buying-guide" />
          <NextCard icon={PlugZap} title="Charging Guide" text="Learn about home, public, AC, and DC fast charging." path="/home-charging" />
          <NextCard icon={Map} title="EV History" text="Explore the journey and future of electric mobility." path="/ev-history" />
        </section>
      </main>

      <Footer />
    </div>
  );
};

const GlowBackground = () => (
  <>
    <div className="pointer-events-none absolute left-0 top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[140px]" />
    <div className="pointer-events-none absolute right-0 top-[680px] h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" />
    <div className="pointer-events-none absolute bottom-96 left-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />
  </>
);

const SectionHeader = ({ eyebrow, title, text, align = "center" }) => (
  <div className={`mb-14 ${align === "left" ? "text-left" : "mx-auto max-w-3xl text-center"}`}>
    <p className="mb-4 text-sm font-black uppercase tracking-[0.4em] text-cyan-300">{eyebrow}</p>
    <h2 className="text-4xl font-black uppercase tracking-tight md:text-5xl">
      {title.split(" ").slice(0, -1).join(" ")} {" "}
      <span className="bg-gradient-to-r from-cyan-400 to-emerald-300 bg-clip-text text-transparent">
        {title.split(" ").slice(-1)}
      </span>
    </h2>
    {text && <p className="mt-5 text-lg leading-8 text-slate-400">{text}</p>}
  </div>
);

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
    <h3 className="mb-6 text-center text-2xl font-black uppercase tracking-tight text-white">{title}</h3>
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead>
          <tr className="bg-cyan-400/10 text-cyan-200">
            {headers.map((head) => (
              <th key={head} className="border border-white/10 px-4 py-4 text-left font-black uppercase tracking-wide">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${title}-${index}`} className="odd:bg-white/[0.03] even:bg-black/10">
              {row.map((cell, cellIndex) => (
                <td key={`${title}-${index}-${cellIndex}`} className="border border-white/10 px-4 py-4 align-top leading-6 text-slate-300">
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

export default EVTypesTechnologies;
