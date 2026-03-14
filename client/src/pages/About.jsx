import React from "react";

const evTypes = [
  {
    title: "BEV",
    subtitle: "Battery Electric Vehicle",
    desc: "Fully electric vehicles powered only by batteries. They produce zero tailpipe emissions.",
    examples: "Tesla Model 3, Nissan Leaf, BYD Seal",
    color: "from-blue-100 to-blue-50",
  },
  {
    title: "PHEV",
    subtitle: "Plug-in Hybrid Electric Vehicle",
    desc: "Uses both a battery and fuel engine. Can drive short distances using battery power alone.",
    examples: "Toyota Prius Prime, Mitsubishi Outlander PHEV",
    color: "from-green-100 to-green-50",
  },
  {
    title: "HEV",
    subtitle: "Hybrid Electric Vehicle",
    desc: "Combines an electric motor with a fuel engine. Battery is charged through regenerative braking.",
    examples: "Toyota Prius, Honda Insight",
    color: "from-yellow-100 to-yellow-50",
  },
];

const chemistries = [
  {
    name: "Lithium-ion (NMC)",
    points: [
      "High energy density",
      "Widely used in EVs",
      "Good performance and range",
    ],
    accent: "text-blue-600",
  },
  {
    name: "Lithium Iron Phosphate (LFP)",
    points: [
      "Safer and longer cycle life",
      "Lower energy density than NMC",
      "Popular in cost-efficient EVs",
    ],
    accent: "text-green-600",
  },
  {
    name: "Solid-State Batteries",
    points: [
      "Emerging technology",
      "Potentially higher safety",
      "Higher energy density potential",
    ],
    accent: "text-purple-600",
  },
];

const metrics = [
  {
    title: "SOH",
    full: "State of Health",
    desc: "Shows how much battery capacity remains compared to its original condition.",
    color: "border-green-200 bg-green-50",
  },
  {
    title: "SOC",
    full: "State of Charge",
    desc: "Indicates the current battery charge level as a percentage of full capacity.",
    color: "border-cyan-200 bg-cyan-50",
  },
  {
    title: "RUL",
    full: "Remaining Useful Life",
    desc: "Estimates how long the battery can continue working before replacement is needed.",
    color: "border-red-200 bg-red-50",
  },
];

const degradationFactors = [
  "High operating temperatures",
  "Frequent fast charging",
  "Deep discharge cycles",
  "High cycle count",
  "Improper charging habits",
];

const maintenanceTips = [
  "Avoid extreme charging levels for daily use.",
  "Keep the battery within safe temperature ranges.",
  "Prefer moderate charging speeds when possible.",
  "Avoid frequent full discharges.",
  "Follow manufacturer maintenance recommendations.",
];

const faqs = [
  "What is battery SOH?",
  "Why does battery capacity decrease over time?",
  "How is RUL estimated?",
  "How accurate are AI-based battery predictions?",
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 min-h-screen flex-col bg-slate-900 text-white px-6 py-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-11 w-11 rounded-2xl bg-green-500 flex items-center justify-center text-2xl shadow-lg">
              🔋
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">VoltWise</h1>
              <p className="text-sm text-slate-300">EV Learning Hub</p>
            </div>
          </div>

          <nav className="space-y-3">
            {[
              "Dashboard",
              "Battery Reports",
              "Learning Hub",
              "Admin Dashboard",
            ].map((item, index) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                  index === 2
                    ? "bg-slate-800 border border-slate-700 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl bg-slate-800 p-4 border border-slate-700">
            <p className="text-sm text-slate-300">AI Battery Insights</p>
            <h3 className="mt-1 font-semibold">Learn how EV batteries work</h3>
            <p className="mt-2 text-xs text-slate-400 leading-5">
              Understand battery chemistry, degradation factors, and how AI helps
              estimate health and lifespan.
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200 px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Educational Module</p>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  EV Learning Hub
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search topics..."
                  className="w-full md:w-72 rounded-xl border border-slate-300 px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                />
                <div className="h-11 w-11 rounded-xl bg-slate-100 flex items-center justify-center">
                  🔔
                </div>
                <div className="h-11 w-11 rounded-xl bg-green-100 flex items-center justify-center">
                  👤
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 md:p-8 space-y-8">
            {/* Hero */}
            <section className="rounded-3xl bg-gradient-to-r from-white to-green-50 border border-slate-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-6 md:p-10">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-1.5 text-sm font-medium">
                    🌿 Smart EV Education
                  </div>
                  <h3 className="mt-4 text-3xl md:text-4xl font-bold leading-tight text-slate-900">
                    Explore how EV batteries work and how AI predicts battery
                    health and lifespan.
                  </h3>
                  <p className="mt-4 text-slate-600 leading-7">
                    Learn EV basics, battery chemistry, degradation factors,
                    maintenance best practices, and the meaning of battery
                    metrics such as SOH, SOC, and RUL.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-xl bg-green-600 text-white px-5 py-3 font-medium hover:bg-green-700 transition">
                      Start Learning
                    </button>
                    <button className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium hover:bg-slate-50 transition">
                      View Battery Guide
                    </button>
                  </div>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-blue-100 via-white to-green-100 border border-slate-200 min-h-[260px] flex items-center justify-center text-center p-8">
                  <div>
                    <div className="text-7xl mb-4">🚗🔋</div>
                    <p className="text-lg font-semibold text-slate-700">
                      EV Battery Intelligence
                    </p>
                    <p className="text-sm text-slate-500 mt-2">
                      Education + Analytics + Prediction
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* EV Basics */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🍃</span>
                <h3 className="text-2xl font-bold">Electric Vehicle Basics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {evTypes.map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${item.color} shadow-sm p-6 hover:shadow-md transition`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-bold">{item.title}</h4>
                      <span className="text-4xl">🚘</span>
                    </div>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                      {item.subtitle}
                    </p>
                    <p className="mt-4 text-slate-700 leading-7">{item.desc}</p>
                    <div className="mt-4 rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                      <span className="font-semibold">Examples:</span>{" "}
                      {item.examples}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Chemistry */}
            <section className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">🧪</span>
                <h3 className="text-2xl font-bold">EV Battery Chemistry Guide</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {chemistries.map((chem) => (
                  <div
                    key={chem.name}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <h4 className={`text-lg font-bold ${chem.accent}`}>
                      {chem.name}
                    </h4>
                    <ul className="mt-4 space-y-2 text-slate-700">
                      {chem.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="text-green-600">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Metrics */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📊</span>
                <h3 className="text-2xl font-bold">Battery Health Metrics</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {metrics.map((metric) => (
                  <div
                    key={metric.title}
                    className={`rounded-2xl border p-5 shadow-sm ${metric.color}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-2xl font-bold">{metric.title}</h4>
                        <p className="text-sm text-slate-500">{metric.full}</p>
                      </div>
                      <span className="text-3xl">🔋</span>
                    </div>
                    <p className="mt-4 leading-7 text-slate-700">
                      {metric.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Two-column section */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🌡️</span>
                  <h3 className="text-2xl font-bold">
                    Battery Degradation Factors
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-6 items-center">
                  <ul className="space-y-3">
                    {degradationFactors.map((factor) => (
                      <li
                        key={factor}
                        className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 border border-slate-200"
                      >
                        <span className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          ⚠️
                        </span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 border border-slate-200 min-h-[220px] flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-6xl">🔋📉</div>
                      <p className="mt-3 text-sm text-slate-500">
                        Battery performance declines faster under stressful
                        operating conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🛠️</span>
                  <h3 className="text-2xl font-bold">Battery Maintenance Tips</h3>
                </div>

                <div className="space-y-3">
                  {maintenanceTips.map((tip) => (
                    <div
                      key={tip}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 border border-slate-200"
                    >
                      <span className="mt-0.5 h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center">
                        ✔️
                      </span>
                      <p className="text-slate-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* AI + FAQ */}
            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-2xl font-bold">
                    AI in Battery Health Prediction
                  </h3>
                </div>

                <p className="text-slate-700 leading-7">
                  Machine learning models analyze voltage, current, temperature,
                  cycle count, and capacity data to estimate battery State of
                  Health (SOH), State of Charge (SOC), and Remaining Useful Life
                  (RUL). These predictions help users monitor degradation,
                  improve maintenance decisions, and better understand long-term
                  EV battery performance.
                </p>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 min-h-[220px] flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-7xl">🧠🔋</div>
                    <p className="mt-4 text-lg font-semibold text-slate-700">
                      Data → Features → AI Model → SOH / SOC / RUL
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-3">
                  {faqs.map((faq) => (
                    <button
                      key={faq}
                      className="w-full flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-left hover:bg-slate-100 transition"
                    >
                      <span>{faq}</span>
                      <span>›</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}