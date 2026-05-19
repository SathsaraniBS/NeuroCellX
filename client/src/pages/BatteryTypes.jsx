import React, { useState } from "react";
import {ArrowRight,BatteryCharging,BarChart3,CheckCircle2,ChevronDown,CircleDot,Rocket,ShieldCheck,Wrench,XCircle,Zap,Snowflake,Cpu,Sparkles,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EVChatbot from '../components/EVChatbot/EVChatbot';

const BatteryTypes = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const chemistries = [
    {
      no: "1.",
      title: "Lead-acid",
      sub: "Older Battery Tech",
      image: "/src/assets/Nimh.png",
      desc: "Heavy, low-energy-density technology, widely used in older cars and 12V systems.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(148,163,184,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "bad", "Very Low"],
        ["Cost", "good", "Very Low"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "bad", "Short"],
      ],
    },
    {
      no: "2.",
      title: "NiMH",
      sub: "Nickel-metal Hydride",
      desc: "Used mainly in hybrids. More energy than lead-acid but heavier than Li-ion.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(16,185,129,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "bad", "Low"],
        ["Cost", "warn", "Medium"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "warn", "Medium"],
      ],
    },
    {
      no: "3.",
      title: "Lithium-ion",
      sub: "General EV Standard",
      desc: "Today's dominant EV battery family. Includes NMC, NCA, LFP, LMFP and more.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(34,211,238,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "High"],
        ["Cost", "warn", "Medium"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "good", "Long"],
      ],
    },
    {
      no: "4.",
      title: "LFP",
      sub: "Lithium Iron Phosphate",
      desc: "Cobalt-free lithium-ion chemistry known for safety, durability and lower cost.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(45,212,191,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "warn", "Medium"],
        ["Cost", "good", "Low"],
        ["Safety", "good", "Excellent"],
        ["Life / Longevity", "good", "Very Long"],
      ],
    },
    {
      no: "5.",
      title: "NMC / NCA",
      sub: "High Performance Chemistry",
      desc: "High energy density chemistry offering long range and strong performance.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(139,92,246,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "Very High"],
        ["Cost", "bad", "High"],
        ["Safety", "warn", "Good"],
        ["Life / Longevity", "warn", "Medium – Long"],
      ],
    },
    {
      no: "6.",
      title: "Solid-State",
      sub: "Next Generation",
      desc: "Uses solid electrolyte instead of liquid. Very high energy density and superior safety.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(96,165,250,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "good", "Very High"],
        ["Cost", "bad", "Very High"],
        ["Safety", "good", "Excellent"],
        ["Life / Longevity", "good", "Very Long Potential"],
      ],
    },
    {
      no: "7.",
      title: "Sodium-ion",
      sub: "Low Cost Future Tech",
      desc: "Uses sodium instead of lithium. Low cost, safe, and good for cold climates.",
      icon: BatteryCharging,
      color: "text-cyan-300",
      glow: "shadow-[0_0_35px_rgba(251,146,60,0.25)]",
      bg: "from-cyan-500/20 to-white/[0.03]",
      rows: [
        ["Range / Energy", "warn", "Low – Medium"],
        ["Cost", "good", "Low"],
        ["Safety", "good", "Good"],
        ["Life / Longevity", "warn", "Medium – Long Potential"],
      ],
    },
  ];

  const batteryCards = [
    {
      no: "1.",
      title: "Lead-acid",
      image: "/src/assets/lithium-acid.png",
      desc: "Heavy, low-energy-density technology, widely used in older cars and 12V systems.",
    },
    {
      no: "2.",
      title: "Lithium-ion",
      image: "/src/assets/lithium-iron.png",
      desc: "Today's dominant EV battery family. Includes NMC, NCA, LFP, LMFP and more.",
    },
    {
      no: "3.",
      title: "Lithium Iron Phosphate",
      image: "/src/assets/lfp.png",
      desc: "Cobalt-free lithium-ion chemistry known for safety, durability and lower cost.",
    },
    {
      no: "4.",
      title: "Nickel Cobalt Aluminum",
      image: "/src/assets/nca.png",
      desc: "High energy density chemistry favored by Tesla for long-range performance.",
    },
    {
      no: "5.",
      title: "Nickel Metal Hydride",
      image: "/src/assets/nmh.png",
      desc: "Used mainly in hybrids. More energy than lead-acid but heavier than Li-ion.",
    },
    {
      no: "6.",
      title: "Solid-State",
      image: "/src/assets/solid-state.png",
      desc: "Uses solid electrolyte instead of liquid. Very high energy density and superior safety.",
    },
    {
      no: "7.",
      title: "Sodium-ion",
      image: "/src/assets/sodium-ion.png",
      desc: "Uses sodium instead of lithium. Low cost, safe, and good for cold climates.",
    },
  ];

  const compareRows = [
    ["Energy Density (Wh/kg)", "30 – 50", "60 – 120", "90 – 160", "150 – 250", "300 – 500+*", "100 – 160"],
    ["EV Range Friendliness", "Very Low", "Low", "Good", "Excellent", "Excellent", "Medium"],
    ["Relative Cost", "Very Low", "Low – Medium", "Low – Medium", "High", "Very High", "Low"],
    ["Safety", "Good", "Good", "Excellent", "Good", "Excellent", "Good"],
    ["Cycle Life / Longevity", "200 – 500", "500 – 1,000", "2,000 – 5,000+", "1,000 – 2,000+", "5,000+ Potential", "1,000 – 3,000 Potential"],
    ["Maturity Level", "Mature Old Tech", "Mature Older", "Mature Widely Used", "Mature Widely Used", "Emerging Pilot", "Emerging Ramp-up"],
  ];

  const fitCards = [
    {
      title: "Want maximum range and performance?",
      text: "Choose NMC/NCA for highest energy density and long-range performance.",
      link: "See EV Buying Guide",
      icon: Rocket,
      color: "text-cyan-300",
    },
    {
      title: "Want low-cost, safe, long-life everyday EV?",
      text: "LFP is the best balance of safety, life, and total cost of ownership.",
      link: "See Battery Care Guide",
      icon: ShieldCheck,
      color: "text-cyan-300",
    },
    {
      title: "Curious about future-tech and high-end cars?",
      text: "Solid-state offers very high potential in range and safety.",
      link: "See EV Technologies",
      icon: Sparkles,
      color: "text-cyan-300",
    },
    {
      title: "Cost-sensitive or city-use focused?",
      text: "LFP or Sodium-ion are ideal for daily city use where available.",
      link: "See Trip Planner",
      icon: BatteryCharging,
      color: "text-cyan-300",
    },
  ];

  const faqs = [
    {
      q: "What is the best battery for an EV today?",
      a: "Lithium-ion batteries are currently the best and most widely used EV batteries. NMC/NCA is good for long range, while LFP is good for safety and long life.",
    },
    {
      q: "How long do EV batteries last?",
      a: "Most EV batteries last around 8–15 years depending on usage, charging habits, climate, and maintenance.",
    },
    {
      q: "Is LFP better than NMC?",
      a: "LFP is safer, cheaper, and lasts longer. NMC gives higher energy density and better driving range.",
    },
    {
      q: "Are solid-state batteries available now?",
      a: "Not widely yet. Solid-state batteries are still developing and are expected to become more common in future EVs.",
    },
    {
      q: "Do cold temperatures affect EV batteries?",
      a: "Yes. Cold weather can temporarily reduce battery performance, charging speed, and driving range.",
    },
    {
      q: "Can I replace my EV battery?",
      a: "Yes. EV batteries can be replaced, but replacement cost can be high depending on the vehicle model and battery size.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] font-sans text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        <section className="relative h-screen pt-28">
          <div className="absolute inset-0">
            <img
              src="/src/assets/battery.png"
              alt="EV battery chemistry hero"
              className="h-full w-full object-cover opacity-70"
              onError={(event) => { event.currentTarget.style.display = "none"; }}
            />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter">
                EV Battery Types{" "}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent">
                  & Chemistry
                </span>
              </h1>

              <p className="mt-6 text-2xl text-cyan-100/90 font-medium italic border-l-4 border-cyan-500 pl-4">
                Compare lead-acid, NiMH, lithium-ion, NMC, LFP, solid-state, and
                sodium-ion batteries for EV range, cost, safety, and lifespan.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#chemistry"
                  className="group inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-black uppercase text-[#050816] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                >
                  Explore Chemistry
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 rounded-[2rem] border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 via-white/[0.04] to-emerald-500/10 p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl md:grid-cols-3">
              <InfoPanel icon={BatteryCharging} title="Why Chemistry Matters" text="Battery chemistry directly affects range, weight, cost, safety, charging behavior, and long-term battery life." />
              <InfoPanel icon={Cpu} title="Modern EV Standard" text="Most modern EVs use lithium-ion batteries such as NMC, NCA, and LFP because they balance power, range, and reliability." />
              <InfoPanel icon={Sparkles} title="Future Innovation" text="Solid-state and sodium-ion batteries are shaping the next stage of safer, cheaper, and more efficient EV technology." />
            </div>
          </div>
        </section>

        <section id="chemistry" className="relative px-6 py-24">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Battery <br />
                <span className="text-cyan-400">Chemistry Explained</span>
              </h2>
            }
          />
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {chemistries.slice(0, 4).map((item) => (
              <ChemistryCard key={item.title} item={item} />
            ))}
          </div>
          <div className="mx-auto mt-6 grid max-w-7xl gap-6 md:grid-cols-3">
            {chemistries.slice(4).map((item) => (
              <ChemistryCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        {/* ✅ Battery Types — image as background, title overlaid, description on hover */}
        <section id="battery-types" className="relative px-6 py-24">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Battery{" "}
                <span className="text-cyan-400">Types</span>
              </h2>
            }
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {batteryCards.slice(0, 4).map((item) => (
              <BatteryTypeCard key={item.title} item={item} />
            ))}
          </div>

          <div className="mx-auto mt-6 grid max-w-7xl gap-6 md:grid-cols-3">
            {batteryCards.slice(4).map((item) => (
              <BatteryTypeCard key={item.title} item={item} />
            ))}
          </div>
        </section>

        <section id="comparison" className="relative px-6 py-24">
          <SectionTitle
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Battery
                <span className="text-cyan-400"> Comparison</span>
              </h2>
            }
          />
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-[0_0_45px_rgba(34,211,238,0.08)] backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    {["Chemistry","Lead-acid","NiMH","LFP","NMC / NCA","Solid-State","Sodium-ion"].map((head) => (
                      <th key={head} className="border border-white/10 bg-cyan-400/10 px-5 py-4 text-left font-black uppercase tracking-wide text-cyan-200">{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="transition hover:bg-white/[0.04]">
                      <td className="border border-white/10 px-5 py-4 font-bold text-white">
                        <span className="inline-flex items-center gap-2">
                          <CircleDot className="h-4 w-4 text-cyan-300" />
                          {row[0]}
                        </span>
                      </td>
                      {row.slice(1).map((cell, index) => (
                        <td key={`${row[0]}-${index}`} className="border border-white/10 px-5 py-4 leading-6 text-slate-300">
                          <StatusDot value={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Choose Smart"
            title={
              <h2 className="text-4xl md:text-5xl text-left text-white font-black uppercase mb-4 tracking-tight">
                Which Chemistry <br />
                <span className="text-cyan-400">Fits Your EV?</span>
              </h2>
            }
          />
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
            {fitCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="group rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]">
                  <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${card.color}`}>
                    <Icon className="h-9 w-9" />
                  </div>
                  <h3 className="mb-3 text-lg font-black text-white">{card.title}</h3>
                  <p className="mb-6 text-lg leading-7 text-slate-300">{card.text}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-black text-cyan-300 transition group-hover:gap-3">
                    {card.link}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        <section className="relative px-6 py-24">
          <SectionTitle
            center
            eyebrow="FAQ"
            title={
              <h2 className="text-4xl text-center text-white font-black uppercase tracking-tight leading-tight">
                Battery{" "}
                <span className="text-cyan-400">FAQ</span>
              </h2>
            }
          />
          <div className="mx-auto max-w-4xl grid gap-5">
            {faqs.map((faq, index) => (
              <div key={faq.q} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left"
                >
                  <span className="text-xl text-white">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <div className="border-t border-white/10 px-7 py-6 text-base leading-8 text-slate-400">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="relative px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <NextCard icon={Wrench} title="Next: Battery Maintenance & Care" text="Keep your battery healthy with better charging and ownership habits." color="text-cyan-300" />
            <NextCard icon={BarChart3} title="Next: Battery Longevity & Degradation" text="Understand how EV batteries age and how to extend battery life." color="text-cyan-300" />
            <NextCard icon={ShieldCheck} title="Next: Battery Safety & Warranty" text="Know your warranty, safety protections, and battery coverage." color="text-cyan-300" />
          </div>
        </section>
      </main>

      <Footer />
      <EVChatbot />
    </div>
  );
};

const InfoPanel = ({ icon: Icon, title, text }) => (
  <div className="flex gap-5">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Icon className="h-9 w-9" />
    </div>
    <div>
      <h3 className="mb-3 text-xl font-black text-white">{title}</h3>
      <p className="text-sm leading-7 text-slate-400">{text}</p>
    </div>
  </div>
);

const ChemistryCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${item.bg} p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]`}>
      <div className={`mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${item.color} ${item.glow}`}>
        <Icon className="h-9 w-9" />
      </div>
      <h3 className={`text-2xl font-black ${item.color}`}>{item.no} {item.title}</h3>
      <p className={`mt-1 text-sm font-bold ${item.color}`}>{item.sub}</p>
      <p className="mt-5 text-sm leading-7 text-slate-400">{item.desc}</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        {item.rows.map(([label, type, value]) => (
          <div key={`${item.title}-${label}`} className="grid grid-cols-[1fr_1fr] border-b border-white/10 last:border-b-0">
            <div className="bg-white/[0.04] px-4 py-3 text-xs font-black uppercase text-slate-300">{label}</div>
            <div className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-slate-300">
              {type === "good" && <CheckCircle2 className="h-4 w-4 text-emerald-300" />}
              {type === "bad" && <XCircle className="h-4 w-4 text-red-300" />}
              {type === "warn" && <CircleDot className="h-4 w-4 text-orange-300" />}
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const BatteryTypeCard = ({ item }) => (
  <div className="group relative h-64 overflow-hidden rounded-3xl border border-white/10 cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-[0_0_45px_rgba(34,211,238,0.25)]">

    {/* Full-card background image — zooms on hover */}
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />

   
    
    {/* Number badge — top-left corner, fades out on hover */}
    <span className="absolute top-4 left-4 rounded-lg bg-black/50 px-2 py-1 text-xs font-black uppercase tracking-widest text-cyan-400 transition-opacity duration-300 group-hover:opacity-0">
      {item.no}
    </span>

    {/* Idle state: icon + title at bottom, slides down & fades on hover */}
    <div className="absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 group-hover:-translate-y-2 group-hover:opacity-0">
      <BatteryCharging className="mb-1 h-5 w-5 text-cyan-400" />
      <h3 className="text-xl font-black leading-snug text-white drop-shadow-lg">
        {item.title}
      </h3>
    </div>

    {/* Hover state: icon + title + description centred, slides up & fades in */}
    <div className="absolute inset-0 flex translate-y-4 flex-col items-center justify-center p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
      <BatteryCharging className="mb-3 h-8 w-8 text-cyan-400" />
      <h3 className="mb-3 text-center text-lg font-black leading-snug text-white">
        {item.title}
      </h3>
      <p className="text-center text-sm leading-6 text-slate-300">
        {item.desc}
      </p>
    </div>

  </div>
);

const StatusDot = ({ value }) => {
  const lower = String(value).toLowerCase();
  let color = "bg-slate-300";
  if (lower.includes("excellent") || lower.includes("good") || lower.includes("very low") || lower === "low") color = "bg-emerald-400";
  if (lower.includes("medium")) color = "bg-orange-400";
  if (lower.includes("high") || lower.includes("very high")) color = "bg-red-400";
  if (lower.match(/\d/)) return <span>{value}</span>;
  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      {value}
    </span>
  );
};

const NextCard = ({ icon: Icon, title, text, color }) => (
  <a href="#" className="group flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]">
    <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${color}`}>
      <Icon className="h-9 w-9" />
    </div>
    <div className="flex-1">
      <h3 className="mb-2 text-lg font-black text-white">{title}</h3>
      <p className="text-sm font-bold leading-6 text-slate-300">{text}</p>
    </div>
    <ArrowRight className={`h-6 w-6 shrink-0 transition group-hover:translate-x-1 ${color}`} />
  </a>
);

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-14 max-w-7xl text-left">
    <div className="text-left">
      {typeof title === "string" ? (
        <h2 className="text-4xl font-black uppercase leading-tight tracking-tight text-white md:text-6xl">{title}</h2>
      ) : title}
    </div>
    <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">{text}</p>
  </div>
);

export default BatteryTypes;