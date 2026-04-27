import React, { useState } from "react";
import {
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
  ShoppingCart,
  ShieldCheck,
  Zap,
  XCircle,
  ArrowRight,
} from "lucide-react";

const EVTypesTechnologies = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const evTypes = [
    {
      title: "Battery Electric Vehicle",
      short: "BEV",
      icon: BatteryCharging,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      desc: "Pure electric car; no internal-combustion engine, only battery and electric motor.",
      pros: "No tailpipe emissions, smooth and quiet, lowest running cost.",
      cons: "Requires charging infrastructure.",
      examples: ["Tata Nexon EV", "MG ZS EV"],
    },
    {
      title: "Plug-in Hybrid",
      short: "PHEV",
      icon: Plug,
      color: "text-blue-500",
      bg: "bg-blue-50",
      border: "border-blue-200",
      desc: "Small battery + plug-in charging + ICE engine.",
      pros: "Electric-only range for short trips; engine for long drives.",
      cons: "More complex; higher maintenance than BEV.",
      examples: ["BYD Seal U DM-i", "Mitsubishi Outlander PHEV"],
    },
    {
      title: "Hybrid Electric Vehicle",
      short: "HEV",
      icon: Cpu,
      color: "text-violet-500",
      bg: "bg-violet-50",
      border: "border-violet-200",
      desc: "Battery + electric motor + ICE, but no plug-in charging.",
      pros: "Better fuel efficiency; no need to plug in.",
      cons: "Lower EV range; still uses petrol.",
      examples: ["Toyota Prius", "Honda Accord Hybrid"],
    },
    {
      title: "Fuel-Cell Electric Vehicle",
      short: "FCEV",
      icon: Droplet,
      color: "text-teal-500",
      bg: "bg-teal-50",
      border: "border-teal-200",
      desc: "Uses hydrogen fuel cell that generates electricity.",
      pros: "Very fast refuel and zero tailpipe emissions.",
      cons: "Limited hydrogen stations; high infrastructure cost.",
      examples: ["Toyota Mirai", "Hyundai NEXO"],
    },
    {
      title: "Mild-Hybrid",
      short: "MHEV",
      icon: Zap,
      color: "text-orange-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
      desc: "Small electric assist system to improve efficiency.",
      pros: "Improves mileage and performance.",
      cons: "Cannot drive on electric power alone.",
      examples: ["Maruti Smart Hybrid", "Hyundai i20 Mild Hybrid"],
    },
  ];

  const chargingCards = [
    {
      title: "AC Level 1",
      power: "120V",
      icon: Home,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      range: "~4–6 km range / hour",
      text: "Slow home outlet charging. Best for overnight top-ups.",
    },
    {
      title: "AC Level 2",
      power: "240V",
      icon: Plug,
      color: "text-blue-500",
      bg: "bg-blue-50",
      range: "~20–30 km range / hour",
      text: "Home wall box or public AC charging. Most common.",
    },
    {
      title: "DC Fast Charging",
      power: "Level 3",
      icon: PlugZap,
      color: "text-violet-500",
      bg: "bg-violet-50",
      range: "~100–200 km range / 30 min",
      text: "High-power charging at public stations.",
    },
  ];

  const suitCards = [
    {
      title: "I mostly drive short trips in the city.",
      text: "BEV or PHEV is ideal. Lower running cost, no daily fuel spend.",
      icon: Home,
      link: "See Buying Guide",
    },
    {
      title: "I drive long distances often.",
      text: "PHEV, long-range BEV, or FCEV can be better options.",
      icon: Map,
      link: "See Trip Planner",
    },
    {
      title: "I can install a home charger.",
      text: "BEV is the smartest choice for daily use and savings.",
      icon: PlugZap,
      link: "See Charging Guide",
    },
    {
      title: "I don’t want to install a home charger.",
      text: "Use public charging + PHEV or FCEV options.",
      icon: BatteryCharging,
      link: "See Charging Guide",
    },
  ];

  const faqs = [
    "What is the difference between BEV, PHEV, and HEV?",
    "How long does it take to charge an EV?",
    "Is a BEV better than a Hybrid?",
    "Can I install a home charger myself?",
    "How does fast charging affect battery life?",
    "Are hydrogen fuel-cell cars better than battery EVs?",
  ];

  return (
    <div className="min-h-screen bg-white text-[#071b3a] font-sans">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-4xl font-semibold tracking-tight">
            Volt<span className="text-teal-400">IQ</span>
          </div>

          <nav className="hidden items-center gap-12 text-base font-semibold md:flex">
            {["Dashboard", "Charging", "Battery", "Trips", "Learn", "Support"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className={`relative transition hover:text-blue-500 ${
                    item === "Learn" ? "text-blue-500" : ""
                  }`}
                >
                  {item}
                  {item === "Learn" && (
                    <span className="absolute -bottom-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-blue-500" />
                  )}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="absolute -right-1 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                3
              </span>
              <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 0 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0" />
              </svg>
            </div>
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-teal-400 p-1">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                alt="User"
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-teal-400" />
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#f3faff] via-[#eef8ff] to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              EV Types & Technologies
            </h1>
            <p className="max-w-2xl text-2xl font-semibold leading-9">
              Understand <span className="text-blue-500">BEV, PHEV, Hybrid</span>,
              and Fuel-Cell EVs, and how{" "}
              <span className="text-violet-500">EV charging</span> and platforms work.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#314463]">
              EVs aren’t all the same: some run purely on battery, others mix
              battery and engine, and some use hydrogen. This page explains every
              major EV type and the technology behind them.
            </p>
          </div>

          <div className="relative min-h-[360px]">
            <div className="absolute inset-x-0 bottom-0 h-32 rounded-full bg-blue-200/40 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=1200&q=80"
              alt="Electric vehicle charging"
              className="relative z-10 h-[360px] w-full rounded-[2rem] object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <main className="rounded-t-[2rem] bg-white px-6 py-12">
        <section className="mx-auto max-w-7xl">
          <SectionTitle title="1. EV Types Explained" />

          <div className="grid gap-5 md:grid-cols-5">
            {evTypes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.short}
                  className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full border ${item.border} ${item.bg} ${item.color}`}>
                    <Icon className="h-12 w-12" />
                  </div>

                  <h3 className="mb-4 text-base font-extrabold">
                    {item.title}
                    <span className="block">({item.short})</span>
                  </h3>

                  <p className="mb-5 text-sm leading-7 text-[#314463]">{item.desc}</p>

                  <InfoLine type="good" text={item.pros} />
                  <InfoLine type="bad" text={item.cons} />

                  <div className="my-5 h-px bg-slate-200" />

                  <p className="mb-4 text-left text-sm font-extrabold">Examples</p>
                  <div className="grid grid-cols-2 gap-3">
                    {item.examples.map((example) => (
                      <div key={example}>
                        <div className="mb-2 flex h-14 items-center justify-center rounded-lg bg-slate-50">
                          <Car className="h-9 w-9 text-slate-500" />
                        </div>
                        <p className="text-xs leading-5 text-[#314463]">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-7xl">
          <SectionTitle title="2. Charging Technology" />

          <div className="grid gap-5 lg:grid-cols-[1fr_1.25fr]">
            <div className="grid gap-5 md:grid-cols-3">
              {chargingCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
                  >
                    <div className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                      <Icon className="h-12 w-12" />
                    </div>
                    <h3 className="text-lg font-extrabold">{item.title}</h3>
                    <p className={`mb-4 text-base font-bold ${item.color}`}>({item.power})</p>
                    <p className="mb-5 text-sm leading-7 text-[#314463]">{item.text}</p>
                    <div className={`${item.bg} ${item.color} rounded-lg px-3 py-2 text-xs font-bold`}>
                      {item.range}
                    </div>
                  </div>
                );
              })}
            </div>

            <ComparisonTable
              title="Charging Types Comparison"
              headers={["Type", "Speed", "Typical Use", "Battery Impact", "Cost / kWh"]}
              rows={[
                ["AC Level 1", "Slow", "Home overnight charging", "Very gentle", "Lowest"],
                ["AC Level 2", "Medium", "Home / public daily use", "Gentle", "Low–Medium"],
                ["DC Fast", "Fast", "Highway trips, top-ups", "More heat, use in moderation", "Medium–High"],
              ]}
            />
          </div>

          <div className="mt-5 flex items-start gap-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <Zap className="h-8 w-8" />
            </div>
            <p className="text-sm leading-7 text-[#314463]">
              Most EVs use an onboard charger to convert AC power from home or
              public charging into DC power for the battery. DC fast chargers
              convert AC to DC inside the station and deliver high power directly
              to the battery.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="3. EV Platform & Smart Tech" />

          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-sm leading-8 text-[#314463]">
              <p className="mb-4">
                Modern EVs are built on dedicated electric platforms designed
                from the ground up for safety, range, comfort, and smart control.
              </p>
              {[
                "Flat battery pack in the floor for better weight distribution, space, and safety.",
                "Integrated power electronics, thermal management, and high-efficiency motors.",
                "Advanced software enables range optimisation, ADAS, and OTA updates.",
                "Scalable architecture for different vehicle sizes and driving ranges.",
              ].map((item) => (
                <InfoLine key={item} type="good" text={item} />
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  ["Battery Pack", BatteryCharging],
                  ["Inverter / Power Electronics", Cpu],
                  ["Electric Motor", Gauge],
                  ["Wheels", Car],
                ].map(([label, Icon], index) => (
                  <div key={label} className="relative">
                    <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                      <Icon className="h-10 w-10" />
                    </div>
                    <p className="text-xs font-bold">{label}</p>
                    {index !== 3 && (
                      <ArrowRight className="absolute -right-4 top-8 h-5 w-5 text-teal-400" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-8 max-w-xs rounded-xl bg-teal-50 px-6 py-4 text-center text-sm font-extrabold text-teal-600">
                Vehicle Control Unit & Software
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-12 grid max-w-7xl gap-8 lg:grid-cols-2">
          <ComparisonTable
            title="4. EV Types Comparison"
            headers={["Feature", "BEV", "PHEV", "HEV", "FCEV"]}
            rows={[
              ["Power Source", "Battery + Motor", "Battery + ICE", "ICE + Motor", "Hydrogen Fuel Cell"],
              ["Emissions", "Zero tailpipe", "Very low", "Lower than ICE", "Zero tailpipe"],
              ["Electric Range", "200–600+ km", "40–100 km", "1–5 km", "500–700 km"],
              ["Fuel / Charging", "Electricity", "Electricity + Petrol", "Petrol", "Hydrogen"],
              ["Best For", "Daily use, city, savings", "Mixed driving", "Better mileage", "Long range, fast refuel"],
            ]}
          />

          <ComparisonTable
            title="Charging Types Comparison"
            headers={["Feature", "AC Level 1", "AC Level 2", "DC Fast"]}
            rows={[
              ["Power", "1.4–1.9 kW", "3.7–22 kW", "50–350+ kW"],
              ["Voltage", "120V AC", "240V AC", "200–1000V DC"],
              ["Time", "20–40 hrs", "4–8 hrs", "20–30 min"],
              ["Best Use", "Overnight home", "Home / Work", "Highway trips"],
              ["Battery Impact", "Very gentle", "Gentle", "Use moderately"],
              ["Cost / kWh", "Lowest", "Low–Medium", "Medium–High"],
            ]}
          />
        </section>

        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="5. Which EV Suits You?" />

          <div className="grid gap-5 md:grid-cols-4">
            {suitCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <Icon className="mb-5 h-14 w-14 text-teal-500" />
                  <h3 className="mb-3 text-base font-extrabold">{item.title}</h3>
                  <p className="mb-5 text-sm leading-7 text-[#314463]">{item.text}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-blue-500">
                    {item.link}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="Frequently Asked Questions" />

          <div className="grid gap-4 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={faq} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-semibold"
                >
                  {faq}
                  <ChevronDown className={`h-5 w-5 transition ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-slate-100 px-6 py-4 text-sm leading-7 text-[#314463]">
                    The answer depends on vehicle type, battery size, driving pattern,
                    charging access, and long-term ownership needs.
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-7xl gap-5 pb-10 md:grid-cols-3">
          <NextCard icon={Leaf} title="Next: EV Buying Guide" text="Find the right EV for you." color="emerald" />
          <NextCard icon={PlugZap} title="Next: Charging Guide" text="Learn about charging options and costs." color="blue" />
          <NextCard icon={Map} title="Next: EV History & Journey" text="Explore the history and future of electric mobility." color="violet" />
        </section>

        <footer className="pb-8 text-center text-sm text-slate-500">
          Drive electric. Save more. Live better.
        </footer>
      </main>
    </div>
  );
};

const SectionTitle = ({ title }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
    <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-teal-400" />
  </div>
);

const InfoLine = ({ type, text }) => (
  <div className="mb-3 flex items-start gap-2 text-left text-sm leading-6 text-[#314463]">
    {type === "good" ? (
      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal-500" />
    ) : (
      <XCircle className="mt-1 h-4 w-4 shrink-0 text-red-400" />
    )}
    <span>{text}</span>
  </div>
);

const ComparisonTable = ({ title, headers, rows }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="mb-4 text-center text-xl font-extrabold">{title}</h3>
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {headers.map((head) => (
              <th key={head} className="border border-slate-200 bg-slate-50 px-4 py-3 text-left font-extrabold">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-slate-200 px-4 py-4 align-top leading-6 text-[#314463]">
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

const NextCard = ({ icon: Icon, title, text, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-500",
    blue: "bg-blue-50 text-blue-500",
    violet: "bg-violet-50 text-violet-500",
  };

  return (
    <a
      href="#"
      className={`group flex items-center gap-6 rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-xl ${colors[color]}`}
    >
      <Icon className="h-14 w-14 shrink-0" />
      <div className="flex-1">
        <h3 className="mb-2 font-extrabold">{title}</h3>
        <p className="text-sm leading-6 text-[#314463]">{text}</p>
      </div>
      <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
    </a>
  );
};

export default EVTypesTechnologies;