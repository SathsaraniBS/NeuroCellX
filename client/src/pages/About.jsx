import React, { useState } from "react";
import {ArrowRight,BatteryCharging,Bolt,Car,ChevronDown,Gauge,Leaf,Map,PlayCircle,PlugZap,Route,ShieldCheck,Sparkles,Wallet,Wifi,Wrench,Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const WHY_CARDS = [
  {
    title: "Cleaner Mobility",
    text: "EVs reduce tailpipe emissions and help create cleaner, quieter cities.",
    icon: Leaf,
  },
  {
    title: "Lower Running Cost",
    text: "Electric driving can reduce fuel and service expenses over time.",
    icon: Wallet,
  },
  {
    title: "Instant Performance",
    text: "Electric motors deliver smooth acceleration, instant torque, and silent comfort.",
    icon: Gauge,
  },
  {
    title: "Smart Connected Tech",
    text: "Modern EVs support OTA updates, mobile apps, charging data, and smart controls.",
    icon: Wifi,
  },
];

const TOPICS = [
  {
    title: "EV Types",
    text: "Understand BEV, PHEV, HEV, and how each electric vehicle type works.",
    icon: Car,
  },
  {
    title: "EV Battery",
    text: "Learn battery capacity, range, degradation, and charging best practices.",
    icon: BatteryCharging,
  },
  {
    title: "Charging Guide",
    text: "Explore AC charging, DC fast charging, charging levels, and connector types.",
    icon: PlugZap,
  },
  {
    title: "Maintenance",
    text: "Keep your EV safe and efficient with simple ownership care tips.",
    icon: Wrench,
  },
  {
    title: "Buying Guide",
    text: "Know what to check before choosing your first electric vehicle.",
    icon: ShieldCheck,
  },
  {
    title: "Trip Planning",
    text: "Plan EV journeys using range, charger locations, stops, and driving style.",
    icon: Route,
  },
];

const FAQS = [
  {
    question: "How far can an EV go on a single charge?",
    answer:
      "EV range depends on battery size, vehicle efficiency, driving speed, road conditions, weather, and cabin climate usage. Most modern EVs are suitable for daily city driving and many support long-distance travel with planned charging stops.",
  },
  {
    question: "How long does it take to charge an EV?",
    answer:
      "Charging time depends on charger type and battery size. Home AC charging is slower but convenient for overnight charging, while DC fast charging can add significant range in a much shorter time.",
  },
  {
    question: "Are EVs expensive to maintain?",
    answer:
      "EVs usually have lower maintenance needs than petrol or diesel vehicles because they have fewer moving parts. There are no oil changes, but tyres, brakes, software, coolant systems, and battery health still need attention.",
  },
  {
    question: "Can I install a home charger?",
    answer:
      "Yes. Many EV owners install a dedicated home wall charger for safe and efficient overnight charging. A qualified electrician should inspect the wiring and install the charger correctly.",
  },
  {
    question: "Are EV batteries safe?",
    answer:
      "Modern EV batteries are protected by battery management systems, thermal controls, and safety structures. They are designed to operate safely in different weather and road conditions.",
  },
  {
    question: "Can I charge an EV in the rain?",
    answer:
      "Yes. EV charging systems are designed with safety protections. However, always use certified charging equipment and avoid damaged cables or submerged charging points.",
  },
];

const FLOW_ITEMS = [
  {
    label: "Battery Pack",
    icon: BatteryCharging,
  },
  {
    label: "Power Control",
    icon: Zap,
  },
  {
    label: "Electric Motor",
    icon: Bolt,
  },
  {
    label: "Wheels",
    icon: Gauge,
  },
];

const VoltIQLearnPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#050816] text-white font-sans selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-screen w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/src/assets/evstation.png"
              alt="Electric vehicle learning background"
              className="h-full w-full object-cover scale-105 opacity-70"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/80 to-[#050816]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/40" />
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-24">
            <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.15)]">
                  <Sparkles className="h-4 w-4" />
                  EV Learning Hub
                </div>

                <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl">
                  Learn The
                  <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
                    Electric Future
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl border-l-4 border-cyan-400 pl-5 text-lg leading-8 text-cyan-50/80 md:text-2xl">
                  Understand EV technology, charging, battery care, ownership,
                  and smart mobility in one premium learning experience.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="#topics"
                    className="group inline-flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 text-base font-black uppercase tracking-wide text-[#050816] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.45)]"
                  >
                    Start Exploring
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href="#how-it-works"
                    className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300"
                  >
                    <PlayCircle className="h-5 w-5" />
                    How EVs Work
                  </a>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-8 rounded-full bg-cyan-500/20 blur-[80px]" />
                <div className="relative rounded-[2rem] border border-cyan-400/20 bg-white/[0.06] p-6 shadow-[0_0_60px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
                  <div className="rounded-[1.5rem] border border-white/10 bg-[#07111f]/90 p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
                          VoltIQ System
                        </p>
                        <h3 className="mt-2 text-2xl font-black">
                          EV Knowledge Core
                        </h3>
                      </div>
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                        <Bolt className="h-8 w-8" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        ["Battery Health", "92%"],
                        ["Charging Efficiency", "88%"],
                        ["Range Confidence", "96%"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                        >
                          <div className="mb-3 flex items-center justify-between text-sm font-bold">
                            <span className="text-slate-300">{label}</span>
                            <span className="text-cyan-300">{value}</span>
                          </div>
                          <div className="h-2 overflow-hidden rounded-full bg-white/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                              style={{ width: value }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-5">
                        <BatteryCharging className="mb-4 h-8 w-8 text-emerald-300" />
                        <p className="text-3xl font-black">450+</p>
                        <p className="mt-1 text-sm text-slate-400">
                          KM Range Guide
                        </p>
                      </div>
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
                        <PlugZap className="mb-4 h-8 w-8 text-cyan-300" />
                        <p className="text-3xl font-black">80%</p>
                        <p className="mt-1 text-sm text-slate-400">
                          Smart Charge Target
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY EV SECTION */}
        <section className="relative py-24">
          <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-cyan-600/10 blur-[140px]" />
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Why Electric Vehicles"
              title="Smarter Driving Starts Here"
              text="EVs are not just vehicles. They are connected mobility systems built for efficiency, performance, and a cleaner future."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {WHY_CARDS.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                  >
                    <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-400/20" />
                    <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.12)]">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="mb-3 text-xl font-black uppercase tracking-tight text-white">
                      {card.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-400">
                      {card.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TOPICS SECTION */}
        <section id="topics" className="relative py-24">
          <div className="absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[150px]" />

          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader
              eyebrow="Explore Topics"
              title="Core EV Knowledge Areas"
              text="Learn everything from EV basics to charging, maintenance, ownership, and route planning."
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((topic) => {
                const Icon = topic.icon;

                return (
                  <div
                    key={topic.title}
                    className="group relative min-h-[230px] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 via-transparent to-emerald-400/0 opacity-0 transition group-hover:from-cyan-400/10 group-hover:to-emerald-400/10 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                          <Icon className="h-8 w-8" />
                        </div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-400 transition group-hover:border-cyan-400/50 group-hover:bg-cyan-400 group-hover:text-[#050816]">
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </div>

                      <h3 className="mb-3 text-2xl font-black uppercase tracking-tight">
                        {topic.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-400">
                        {topic.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="relative py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
                  How EVs Work
                </p>
                <h2 className="text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
                  Energy Flow
                  <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Made Simple
                  </span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-400">
                  Electric vehicles store energy inside a high-voltage battery.
                  That energy is controlled electronically and sent to an
                  electric motor, which drives the wheels with smooth and
                  instant torque.
                </p>

                <div className="mt-8 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                  <div className="mb-3 flex items-center gap-3 text-emerald-300">
                    <Zap className="h-6 w-6" />
                    <h3 className="text-lg font-black uppercase">
                      Regenerative Braking
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">
                    When slowing down, the motor can recover energy and send it
                    back to the battery, improving efficiency and range.
                  </p>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {FLOW_ITEMS.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div key={item.label} className="relative">
                        <div className="flex min-h-[170px] flex-col items-center justify-center rounded-3xl border border-cyan-400/20 bg-[#07111f]/90 p-5 text-center">
                          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                            <Icon className="h-8 w-8" />
                          </div>
                          <p className="text-sm font-black uppercase text-slate-200">
                            {item.label}
                          </p>
                        </div>

                        {index !== FLOW_ITEMS.length - 1 && (
                          <div className="absolute -right-5 top-1/2 z-20 hidden -translate-y-1/2 text-cyan-300 lg:block">
                            <ArrowRight className="h-7 w-7" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative py-24">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />

          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <SectionHeader
              eyebrow="Questions"
              title="EV Frequently Asked Questions"
              text="Quick answers for new EV owners and anyone learning about electric mobility."
            />

            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="text-base font-bold text-white md:text-lg">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-6 w-6 shrink-0 text-cyan-300 transition-transform duration-300 ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openFaq === index && (
                    <div className="border-t border-white/10 px-6 pb-6 pt-5 text-sm leading-7 text-slate-400 md:text-base">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="relative px-6 py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.04] to-emerald-500/10 p-8 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl md:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
                  Ready To Continue
                </p>
                <h2 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
                  Build Your EV Confidence
                </h2>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
                  Continue exploring charging guides, trip planning, EV
                  maintenance, and smart ownership tools inside VoltIQ.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
                <a
                  href="/public-charging"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 font-black uppercase text-[#050816] transition hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(34,211,238,0.4)]"
                >
                  Charging Guide
                  <PlugZap className="h-5 w-5" />
                </a>

                <a
                  href="/trip-planner"
                  className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/10 px-8 py-4 font-black uppercase text-white transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300"
                >
                  Plan EV Trip
                  <Map className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, text }) => {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center">
      <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
        {eyebrow}
      </p>
      <h2 className="text-4xl font-black uppercase leading-tight tracking-tight md:text-6xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
      <p className="mt-6 text-base leading-8 text-slate-400 md:text-lg">
        {text}
      </p>
    </div>
  );
};

export default VoltIQLearnPage;