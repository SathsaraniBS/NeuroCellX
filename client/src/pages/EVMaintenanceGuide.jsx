
import { useState, useEffect, useRef } from "react";

// ─── Mock API layer (replace with real fetch calls to FastAPI) ───────────────
const API_BASE = "http://localhost:8000/api";

const api = {
  getSections: async () => {
    // GET /api/maintenance/sections
    return SECTIONS_DATA;
  },
  getFaqs: async () => {
    // GET /api/maintenance/faq
    return FAQ_DATA;
  },
  bookAppointment: async (data) => {
    // POST /api/appointments
    console.log("Booking appointment:", data);
    return { success: true, id: Math.random().toString(36).slice(2) };
  },
};

// ─── Static data (mirrors DB rows from PostgreSQL) ───────────────────────────
const SECTIONS_DATA = [
  {
    id: 1,
    order_num: 1,
    icon: "🔋",
    title: "Battery care & charging habits",
    color: "#22c55e",
    items: [
      { text: "Keep daily charge between 20% – 80% for optimal battery health." },
      { text: "Avoid deep-discharge (0%) and frequent 100% DC fast charging." },
      { text: "Don't park at 0% or 100% for long periods." },
      { text: "Use preconditioning (heating/cooling) while plugged in for better range and battery efficiency." },
    ],
  },
  {
    id: 2,
    order_num: 2,
    icon: "🔧",
    title: "Routine maintenance checklist",
    color: "#3b82f6",
    table: [
      { task: "Tyre pressure & tread condition", interval: "Every 10,000 km" },
      { task: "Brake pads, rotors & braking system", interval: "Every 15,000 km" },
      { task: "Air filter, cabin filter, wiper blades", interval: "Every 15,000 km / 12 months" },
      { task: "Lights, indicators, horn, seat belts", interval: "Every 15,000 km / 12 months" },
      { task: "Coolant, brake fluid, washer fluid", interval: "Every 25,000 km / 12 months" },
      { task: "High-voltage system inspection", interval: "Yearly / As per manual" },
    ],
  },
  {
    id: 3,
    order_num: 3,
    icon: "☁️",
    title: "Software updates & features",
    color: "#6366f1",
    items: [
      { text: "OTA updates bring bug fixes, performance improvements, new features, and safety enhancements." },
      { text: "Check for updates on your car's screen or in the companion app." },
      { text: "Always keep your software up to date for the best experience." },
    ],
  },
  {
    id: 4,
    order_num: 4,
    icon: "❄️",
    title: "Winter / weather-related range tips",
    color: "#0ea5e9",
    items: [
      { text: "Cold weather can reduce range. Precondition the cabin while charging." },
      { text: "Avoid aggressive acceleration in cold conditions." },
      { text: "In hot weather, park in shade and pre-cool the cabin when possible." },
    ],
  },
  {
    id: 5,
    order_num: 5,
    icon: "🛡️",
    title: "Service schedule & warranty info",
    color: "#10b981",
    schedule: [
      { service: "Inspection", interval: "Every 15,000 km" },
      { service: "Battery health check", interval: "Every 2 years" },
      { service: "Software updates", interval: "When available" },
      { service: "High-voltage inspection", interval: "Yearly" },
    ],
    warranty: [
      "Most EVs come with comprehensive warranty coverage.",
      "Battery & Drive unit: 8 years / 160,000 km.",
      "Vehicle warranty: 3 years / 100,000 km.",
      "What's not covered: Accidents, misuse, unauthorized modifications, tampering.",
    ],
  },
  {
    id: 6,
    order_num: 6,
    icon: "⚠️",
    title: "Roadside assistance & emergencies",
    color: "#f59e0b",
    items: [
      { text: "Call our 24/7 roadside assistance or request help in the app." },
      { text: "In case of low battery, use nearest charger or request tow." },
      { text: "For towing: Follow manufacturer guidelines." },
      { text: "High-voltage components are dangerous. Leave repairs to authorised technicians only." },
    ],
    callout: { label: "VoltIQ Roadside Assistance", phone: "1800-123-4567", note: "Available 24/7" },
  },
  {
    id: 7,
    order_num: 7,
    icon: "💲",
    title: "Insurance & ownership costs",
    color: "#8b5cf6",
    items: [
      { text: "Insure your EV with a comprehensive policy that covers battery, high-voltage components, and charging equipment." },
      { text: "Protect against theft of mobile charger and charging cable." },
      { text: "EVs have lower running costs compared to ICE vehicles (electricity vs fuel, fewer parts, less maintenance)." },
    ],
    badge: { label: "Lower running costs, higher savings, better for the planet." },
  },
];

const FAQ_DATA = [
  { id: 1, question: "How long does an EV battery last?", answer: "Most EV batteries are designed to last 8–15 years or 160,000–300,000 km. Battery degradation is gradual, typically losing 1–2% capacity per year under normal use. Manufacturers usually provide an 8-year / 160,000 km warranty on battery packs." },
  { id: 2, question: "How often should I service my EV?", answer: "Most EVs require a service check every 15,000 km or 12 months, whichever comes first. Unlike ICE vehicles, EVs skip oil changes. Key service items include tyre rotation, brake inspection, cabin filter replacement, and software updates." },
  { id: 3, question: "Can I charge my EV in the rain?", answer: "Yes — EV charging systems are designed to be weatherproof. Both the charging port and plug meet IP ratings for water resistance. However, always inspect cables for damage before charging and avoid submerged charging equipment." },
  { id: 4, question: "What happens if my battery degrades?", answer: "Battery degradation reduces your maximum range over time but rarely causes sudden failure. If capacity drops below the warranty threshold (usually 70%), the manufacturer may replace or refurbish the pack under warranty." },
  { id: 5, question: "Are EVs more expensive to insure?", answer: "EV insurance can be 5–15% higher than comparable ICE vehicles, mainly because of higher repair and replacement costs for batteries and high-voltage components. However, lower maintenance costs often offset the difference." },
  { id: 6, question: "Will fast charging damage my battery?", answer: "Occasional DC fast charging is fine, but regular daily use of fast chargers can accelerate battery degradation over time. For everyday charging, prefer AC home charging at a moderate rate (7–11 kW) and keep charge between 20–80%." },
  { id: 7, question: "How can I maximise my EV's driving range?", answer: "Drive smoothly, use regenerative braking, precondition the cabin while plugged in, keep tyres properly inflated, reduce highway speeds, limit use of heating/AC when possible, and maintain a 20–80% charge level." },
  { id: 8, question: "What should I do if my EV won't start?", answer: "Check the 12V auxiliary battery (a common culprit), ensure the high-voltage battery has sufficient charge, check for any dashboard warnings, try locking/unlocking the vehicle to reset the system. If the issue persists, contact roadside assistance." },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">
            VoltIQ Learn
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
            EV Care:<br />
            <span className="text-emerald-600">Maintenance &</span><br />
            Ownership Guide
          </h1>
          <p className="text-slate-500 text-base max-w-md leading-relaxed">
            Learn how to keep your electric car healthy, save money, and extend its life.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
              ✅ Good care
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
              💰 Better performance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
              🌱 Greener tomorrow
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 relative">
          <div className="w-64 h-44 rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-7xl shadow-xl">
            🚗
          </div>
          <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-xl shadow-lg">
            ⚡
          </div>
          <div className="absolute -bottom-3 -left-3 w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white text-base shadow-lg">
            🔌
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyMattersSection() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Why EV Maintenance Matters</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-3">
            Electric vehicles have fewer moving parts than traditional cars, which means no oil changes
            or spark plug replacements. However, key areas like the battery, tyres, brakes, software,
            and regular inspections still need your attention.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Good care ensures better performance, longer battery life, safety on the road,
            and lower overall ownership costs.
          </p>
        </div>
        <div className="flex-shrink-0 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 flex items-center gap-4 max-w-xs">
          <span className="text-4xl">🌱</span>
          <p className="text-sm font-semibold text-emerald-800 italic">
            "A little care today drives a better tomorrow."
          </p>
        </div>
      </div>
    </div>
  );
}

function AccordionSection({ section, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      className={`border rounded-2xl mb-3 overflow-hidden transition-all duration-300 ${
        open ? "border-slate-200 shadow-md" : "border-slate-100 shadow-sm"
      } bg-white`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
          style={{ background: section.color + "18" }}
        >
          {section.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-black tabular-nums"
              style={{ color: section.color }}
            >
              {String(section.order_num).padStart(2, "0")}
            </span>
            <h3 className="text-base font-bold text-slate-800">{section.title}</h3>
          </div>
        </div>
        <span
          className={`text-slate-400 text-xl transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          ⌃
        </span>
      </button>

      {open && (
        <div className="px-6 pb-6 border-t border-slate-100 pt-5">
          {/* Bullet list */}
          {section.items && (
            <ul className="space-y-2.5">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: section.color }}
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {/* Maintenance table */}
          {section.table && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-2 pr-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">Task</th>
                    <th className="text-right py-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">Interval</th>
                  </tr>
                </thead>
                <tbody>
                  {section.table.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 pr-4 text-slate-700">{row.task}</td>
                      <td className="py-2.5 text-right">
                        <span
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ background: section.color + "18", color: section.color }}
                        >
                          {row.interval}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Service schedule */}
          {section.schedule && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Service Schedule</h4>
                <div className="space-y-2">
                  {section.schedule.map((row, i) => (
                    <div key={i} className="flex items-center justify-between text-sm border-b border-slate-50 pb-2">
                      <span className="text-slate-700">{row.service}</span>
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: section.color + "18", color: section.color }}
                      >
                        {row.interval}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {section.warranty && (
                <div className="flex-1 bg-slate-50 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Warranty Info</h4>
                  <ul className="space-y-2">
                    {section.warranty.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Emergency callout */}
          {section.callout && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-4">
              <div className="text-3xl">📞</div>
              <div>
                <p className="text-xs font-bold text-amber-700">{section.callout.label}</p>
                <p className="text-xl font-black text-amber-800">{section.callout.phone}</p>
                <p className="text-xs text-amber-600">{section.callout.note}</p>
              </div>
            </div>
          )}

          {/* Cost badge */}
          {section.badge && (
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <p className="text-sm font-semibold text-emerald-800">{section.badge.label}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FAQSection({ faqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-black text-slate-900 mb-2">EV Ownership: Frequently Asked Questions</h2>
      <p className="text-slate-500 text-sm mb-8">Everything you need to know about owning and maintaining your EV.</p>
      <div className="space-y-2">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors gap-4"
            >
              <span className="text-sm font-semibold text-slate-800">{faq.question}</span>
              <span className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${openId === faq.id ? "rotate-180" : ""}`}>
                ⌃
              </span>
            </button>
            {openId === faq.id && (
              <div className="px-5 pb-4 border-t border-slate-100 pt-3">
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", service: "", notes: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 px-6 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-white">Book a Service Appointment</h3>
            <p className="text-emerald-100 text-xs mt-0.5">Schedule your EV service with a certified technician</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors text-sm">✕</button>
        </div>

        {success ? (
          <div className="p-10 flex flex-col items-center gap-3">
            <span className="text-5xl">✅</span>
            <p className="text-slate-800 font-bold text-lg">Appointment Booked!</p>
            <p className="text-slate-500 text-sm text-center">We'll send a confirmation to {form.email}</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "Jane Smith" },
              { label: "Email", key: "email", type: "email", placeholder: "jane@example.com" },
              { label: "Date", key: "date", type: "date" },
              { label: "Time", key: "time", type: "time" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Service Type</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent bg-white"
              >
                <option value="">Select a service...</option>
                <option>Routine Inspection</option>
                <option>Battery Health Check</option>
                <option>Tyre Rotation & Alignment</option>
                <option>Brake Inspection</option>
                <option>Software Update</option>
                <option>High-Voltage System Inspection</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Notes (optional)</label>
              <textarea
                placeholder="Any specific concerns..."
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent resize-none"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading || !form.name || !form.email || !form.date || !form.service}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-200 text-sm"
            >
              {loading ? "Booking..." : "Confirm Appointment →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CTAFooterBar({ onBookAppointment }) {
  return (
    <div className="bg-white border-t border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
        {/* Download PDF */}
        <a
          href={`${API_BASE}/maintenance/checklist/pdf`}
          download
          className="flex items-center gap-3 border-2 border-slate-200 rounded-2xl px-6 py-3.5 hover:border-slate-300 hover:bg-slate-50 transition-all group"
        >
          <span className="text-2xl">📄</span>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Download PDF</p>
            <p className="text-sm font-bold text-slate-800">Maintenance Checklist</p>
          </div>
          <span className="text-slate-300 group-hover:text-slate-500 transition-colors ml-2">↓</span>
        </a>

        {/* Book Appointment */}
        <button
          onClick={onBookAppointment}
          className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl px-8 py-3.5 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-100 group"
        >
          <span className="text-2xl">📅</span>
          <div className="text-left">
            <p className="text-xs text-emerald-100 font-medium">Schedule Now</p>
            <p className="text-sm font-bold text-white">Book a Service Appointment</p>
          </div>
          <span className="text-emerald-200 group-hover:translate-x-1 transition-transform ml-2">→</span>
        </button>

        {/* Visit Charging Guide */}
        <a
          href="#"
          className="flex items-center gap-3 border-2 border-slate-200 rounded-2xl px-6 py-3.5 hover:border-slate-300 hover:bg-slate-50 transition-all group"
        >
          <span className="text-2xl">⚡</span>
          <div className="text-left">
            <p className="text-xs text-slate-400 font-medium">Learn More</p>
            <p className="text-sm font-bold text-slate-800">Visit Charging Guide</p>
          </div>
          <span className="text-slate-300 group-hover:text-slate-500 transition-colors ml-2">→</span>
        </a>
      </div>

      <div className="border-t border-slate-50 py-3 text-center">
        <p className="text-xs text-slate-400">
          ✅ Good care &nbsp;·&nbsp; 💡 Better performance &nbsp;·&nbsp; 💰 Lower costs &nbsp;·&nbsp; 🌱 Greener tomorrow
        </p>
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function EVMaintenanceGuide() {
  const [sections, setSections] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectionsData, faqsData] = await Promise.all([
          api.getSections(),
          api.getFaqs(),
        ]);
        setSections(sectionsData);
        setFaqs(faqsData);
      } catch (err) {
        console.error("Failed to fetch maintenance data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleBookAppointment = async (formData) => {
    return await api.bookAppointment(formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <NavBar />
      <HeroBanner />
      <WhyMattersSection />

      {/* Accordion sections */}
      <div className="max-w-6xl mx-auto px-6 pb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">Maintenance Sections</h2>
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-white rounded-2xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          sections.map((section, i) => (
            <AccordionSection key={section.id} section={section} index={i} />
          ))
        )}
      </div>

      {/* FAQ */}
      <div className="bg-white border-y border-slate-100">
        <FAQSection faqs={faqs} />
      </div>

      {/* CTA Footer */}
      <CTAFooterBar onBookAppointment={() => setAppointmentOpen(true)} />

      {/* Appointment Modal */}
      <AppointmentModal
        open={appointmentOpen}
        onClose={() => setAppointmentOpen(false)}
        onSubmit={handleBookAppointment}
      />
    </div>
  );
}