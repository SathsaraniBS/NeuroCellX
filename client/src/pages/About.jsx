import React from "react";

export default function BatteryLife() {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-6 md:p-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          EV Battery Life
        </h1>
        <p className="text-gray-300 max-w-3xl">
          As electric vehicles evolve, battery technology plays a crucial role in
          performance, range, and sustainability. Discover how EV batteries work
          and what impacts their lifespan.
        </p>
      </div>

      {/* Section 1 */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-cyan-500/20 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            The Building Blocks of Battery Endurance
          </h2>
          <p className="text-gray-300 leading-relaxed">
            The lifespan and stability of EV batteries define the driving
            experience. Modern innovations have significantly improved battery
            durability, ensuring reliable performance and longer range.
          </p>
          <p className="text-gray-300 mt-4">
            Two key components contribute to battery longevity:
            <span className="text-cyan-400"> Battery Cells</span> and
            <span className="text-cyan-400"> Battery Management System (BMS)</span>.
          </p>
        </div>

        {/* Image Placeholder */}
        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-cyan-500/20 flex items-center justify-center">
          <img
            src="/battery-types.png"
            alt="Battery Types"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Battery Types */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
          Battery Cell Types
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {["Prismatic", "Cylindrical", "Pouch"].map((type, i) => (
            <div
              key={i}
              className="bg-white/5 p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400 transition"
            >
              <div className="h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4" />
              <h3 className="text-lg font-semibold text-white">{type} Cells</h3>
              <p className="text-gray-400 text-sm mt-2">
                {type === "Cylindrical"
                  ? "Small, cost-effective cells commonly used in EVs and electronics."
                  : type === "Prismatic"
                  ? "Compact rectangular cells offering efficient space utilization."
                  : "Flexible lightweight cells used in modern EV designs."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Details Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-400">
          Cells: Heart of the EV Battery
        </h2>

        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-cyan-500/20">
          <ul className="space-y-4 text-gray-300">
            <li>
              Lithium-ion batteries are widely used in EVs and come in different
              formats such as cylindrical, prismatic, and pouch.
            </li>
            <li>
              Cylindrical cells are enclosed in rigid cylinders, making them
              durable and cost-effective.
            </li>
            <li>
              Prismatic cells use rectangular casings, improving space efficiency
              and stability.
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Glow */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        Futuristic EV Learning Hub • Battery Insights
      </div>
    </div>
  );
}
