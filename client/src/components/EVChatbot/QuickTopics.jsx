// components/EVChatbot/QuickTopics.jsx
// Tailwind CSS only — no separate .css file

const TOPICS = [
  { label: "⚡ EV Basics",        query: "What are EV basics? Explain simply." },
  { label: "🚗 Vehicle Types",    query: "What are the different EV vehicle types like BEV PHEV HEV FCEV?" },
  { label: "🚘 EV Examples",      query: "Give me popular EV car examples with specs." },
  { label: "🔋 Battery Types",    query: "Explain EV battery types like NMC LFP NCA and Solid-State." },
  { label: "🔬 Battery Examples", query: "Give me real EV battery examples like Tesla 4680 CATL BYD Blade Battery." },
  { label: "🔌 Charging Tips",    query: "Give me practical EV charging tips to extend battery life." },
  { label: "⚙️ Battery Tech",     query: "Explain EV battery technologies like BMS thermal management cell-to-pack." },
  { label: "📖 EV Guide",         query: "Give me a complete EV user guide for new EV owners." },
  { label: "🛡️ Battery Guide",    query: "Give me an EV battery care and use guide for maximum lifespan." },
];

export default function QuickTopics({ onSelect, disabled }) {
  return (
    <div className="bg-[#080f1e]/95 border-b border-white/[0.04] px-4 py-2.5 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {TOPICS.map((t) => (
        <button
          key={t.label}
          disabled={disabled}
          onClick={() => onSelect(t.query)}
          className="
            flex-shrink-0 px-3 py-1.5 rounded-full
            text-[11px] font-medium whitespace-nowrap
            bg-white/[0.04] border border-white/[0.08] text-white/60
            hover:bg-[#00c896]/10 hover:border-[#00c896]/30 hover:text-[#00d4a0]
            disabled:opacity-35 disabled:cursor-not-allowed
            transition-all duration-150
          "
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}