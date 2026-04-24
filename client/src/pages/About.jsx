import { useState, useEffect, useRef } from "react";
// ─── CONFIG ────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env?.VITE_API_URL ?? "http://localhost:8000";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const C = {
  midnight: "#0A0F1E",
  navy: "#0D1B3E",
  electric: "#00D4FF",
  neon: "#39FF14",
  amber: "#FFB800",
  rose: "#FF3D71",
  slate: "#1A2544",
  slateLight: "#243060",
  textPrimary: "#E8EEFF",
  textMuted: "#7A8AB8",
};

// ─── TINY HOOK: useFetch ───────────────────────────────────────────────────────
function useFetch(url, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}

// ─── FALLBACK / MOCK DATA (renders even without backend) ──────────────────────
const MOCK_TASKS = [
  { id: 1, title: "Tire Rotation", description: "Rotate tires every 10,000 km to ensure even wear and optimal range.", interval_km: 10000, interval_months: 6, category: "tires", priority: "high", icon: "🔄" },
  { id: 2, title: "Brake Fluid Check", description: "EV regen reduces wear but hydraulic fluid still absorbs moisture over time.", interval_km: 30000, interval_months: 24, category: "brakes", priority: "medium", icon: "🛑" },
  { id: 3, title: "Cabin Air Filter", description: "Replace HEPA cabin filter for clean air and efficient HVAC performance.", interval_km: 20000, interval_months: 12, category: "hvac", priority: "medium", icon: "💨" },
  { id: 4, title: "Battery Coolant", description: "Thermal management fluid degrades — critical for long battery lifespan.", interval_km: 60000, interval_months: 48, category: "battery", priority: "high", icon: "🔋" },
  { id: 5, title: "Wiper Blades", description: "Replace wipers seasonally for safe visibility in rain and debris.", interval_km: null, interval_months: 12, category: "safety", priority: "low", icon: "🌧️" },
  { id: 6, title: "Software Update", description: "OTA updates improve efficiency, charging speed, and safety features.", interval_km: null, interval_months: 3, category: "software", priority: "high", icon: "📡" },
];

const MOCK_BATTERY = {
  soh_percent: 94,
  capacity_kwh: 72.1,
  cycles: 312,
  last_check: "2025-03-15",
  range_estimate_km: 420,
};

const MOCK_SCHEDULE = [
  { id: 1, date: "2026-05-10", task: "Annual Service + Software Update", status: "upcoming" },
  { id: 2, date: "2026-04-01", task: "Tire Rotation", status: "completed" },
  { id: 3, date: "2025-11-20", task: "Brake Inspection", status: "completed" },
  { id: 4, date: "2026-07-15", task: "Battery Coolant Flush", status: "upcoming" },
];

const MOCK_TIPS = [
  { id: 1, tip_text: "Keep charge between 20–80% daily for maximum cell longevity.", category: "charging", icon: "⚡" },
  { id: 2, tip_text: "Pre-condition the battery while plugged in before cold-weather drives.", category: "weather", icon: "🌡️" },
  { id: 3, tip_text: "Use DC fast charging sparingly — L2 AC is gentler on the pack.", category: "charging", icon: "🔌" },
  { id: 4, tip_text: "Park in shade or a garage in extreme heat to reduce thermal stress.", category: "weather", icon: "☀️" },
  { id: 5, tip_text: "Regenerative braking extends brake pad life by up to 10×.", category: "driving", icon: "🚗" },
  { id: 6, tip_text: "Check tire pressure monthly — underinflation kills range fast.", category: "tires", icon: "🔍" },
];

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,15,30,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.slateLight}` : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: "64px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontSize: "1.6rem" }}>⚡</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: C.electric, fontSize: "1.1rem", letterSpacing: "0.05em" }}>
          VoltIQ
        </span>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        {["Dashboard", "Battery", "Schedule", "Tips", "Logs"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} style={{
            color: C.textMuted, fontSize: "0.85rem", fontFamily: "'Space Mono', monospace",
            textDecoration: "none", letterSpacing: "0.05em",
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => e.target.style.color = C.electric}
            onMouseLeave={(e) => e.target.style.color = C.textMuted}
          >{item}</a>
        ))}
      </div>
      <div style={{
        background: `linear-gradient(135deg, ${C.electric}, #0099cc)`,
        color: C.midnight, fontWeight: 700, fontSize: "0.8rem",
        padding: "0.5rem 1.2rem", borderRadius: "999px", cursor: "pointer",
        fontFamily: "'Space Mono', monospace",
      }}>Book Service</div>
    </nav>
  );
}

function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (!heroRef.current) return;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - left) / width,
        y: (e.clientY - top) / height,
      });
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <section ref={heroRef} id="dashboard" style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(0,212,255,0.12) 0%, transparent 60%), 
                   radial-gradient(ellipse at 80% 20%, rgba(57,255,20,0.06) 0%, transparent 50%),
                   linear-gradient(180deg, ${C.midnight} 0%, ${C.navy} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", textAlign: "center",
      padding: "8rem 2rem 4rem",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${C.electric} 1px, transparent 1px), linear-gradient(90deg, ${C.electric} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "0.5rem",
        background: `rgba(0,212,255,0.1)`, border: `1px solid rgba(0,212,255,0.3)`,
        borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "2rem",
        fontFamily: "'Space Mono', monospace", fontSize: "0.75rem", color: C.electric,
        letterSpacing: "0.15em",
      }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.neon, display: "inline-block", animation: "pulse 2s infinite" }} />
        EV MAINTENANCE GUIDE 2026
      </div>

      <h1 style={{
        fontFamily: "'Bebas Neue', 'Impact', sans-serif",
        fontSize: "clamp(3rem, 8vw, 7rem)",
        lineHeight: 0.95, letterSpacing: "0.02em",
        color: C.textPrimary, marginBottom: "0.5rem",
        maxWidth: "900px",
      }}>
        KEEP YOUR EV
        <br />
        <span style={{
          background: `linear-gradient(90deg, ${C.electric}, ${C.neon})`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>PEAK PERFECT</span>
      </h1>

      <p style={{
        color: C.textMuted, fontSize: "1.1rem", maxWidth: "560px",
        lineHeight: 1.7, marginTop: "1.5rem", marginBottom: "2.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        From battery health to software updates — your comprehensive guide to
        maximizing performance, range, and lifespan of your electric vehicle.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button style={{
          background: `linear-gradient(135deg, ${C.electric}, #0099cc)`,
          color: C.midnight, fontWeight: 800, fontSize: "0.9rem",
          padding: "0.9rem 2rem", borderRadius: "999px", border: "none",
          cursor: "pointer", fontFamily: "'Space Mono', monospace",
          letterSpacing: "0.05em",
          boxShadow: `0 0 30px rgba(0,212,255,0.4)`,
        }}>
          VIEW SCHEDULE →
        </button>
        <button style={{
          background: "transparent", color: C.textPrimary, fontWeight: 600,
          fontSize: "0.9rem", padding: "0.9rem 2rem", borderRadius: "999px",
          border: `1px solid ${C.slateLight}`, cursor: "pointer",
          fontFamily: "'Space Mono', monospace",
          transition: "border-color 0.2s",
        }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = C.electric}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = C.slateLight}
        >
          LOG SERVICE
        </button>
      </div>

      {/* Floating stat cards */}
      <div style={{ display: "flex", gap: "1.5rem", marginTop: "5rem", flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { label: "Battery Health", value: "94%", color: C.neon, icon: "🔋" },
          { label: "Next Service", value: "2,100 km", color: C.electric, icon: "🔧" },
          { label: "Software", value: "Up to date", color: C.amber, icon: "📡" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: `rgba(26,37,68,0.8)`,
            border: `1px solid ${C.slateLight}`,
            backdropFilter: "blur(12px)",
            borderRadius: "16px", padding: "1.2rem 1.8rem",
            textAlign: "left", minWidth: "180px",
            boxShadow: `0 4px 30px rgba(0,0,0,0.3)`,
          }}>
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ color: stat.color, fontFamily: "'Space Mono', monospace", fontSize: "1.4rem", fontWeight: 700 }}>
              {stat.value}
            </div>
            <div style={{ color: C.textMuted, fontSize: "0.78rem", marginTop: "0.2rem" }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "3rem" }}>
      <div style={{
        fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
        color: C.electric, letterSpacing: "0.2em", marginBottom: "0.8rem",
        textTransform: "uppercase",
      }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: "'Bebas Neue', Impact, sans-serif",
        fontSize: "clamp(2rem, 4vw, 3.5rem)", color: C.textPrimary,
        letterSpacing: "0.03em", marginBottom: "0.8rem",
      }}>{title}</h2>
      {subtitle && <p style={{ color: C.textMuted, maxWidth: "520px", margin: "0 auto", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</p>}
    </div>
  );
}

function BatterySection({ battery }) {
  const soh = battery?.soh_percent ?? MOCK_BATTERY.soh_percent;
  const capacity = battery?.capacity_kwh ?? MOCK_BATTERY.capacity_kwh;
  const cycles = battery?.cycles ?? MOCK_BATTERY.cycles;
  const range = battery?.range_estimate_km ?? MOCK_BATTERY.range_estimate_km;
  const lastCheck = battery?.last_check ?? MOCK_BATTERY.last_check;

  const segments = 20;
  const filledSegments = Math.round((soh / 100) * segments);
  const sohColor = soh > 85 ? C.neon : soh > 70 ? C.amber : C.rose;

  return (
    <section id="battery" style={{ padding: "6rem 2rem", background: C.navy }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="⚡ Power Core"
          title="BATTERY HEALTH MONITOR"
          subtitle="Real-time State of Health data pulled from your vehicle's BMS via the FastAPI telemetry endpoint."
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {/* SOH Gauge */}
          <div style={{
            background: C.slate, borderRadius: "24px",
            border: `1px solid ${C.slateLight}`, padding: "2.5rem",
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.72rem", color: C.textMuted, marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
              STATE OF HEALTH
            </div>

            {/* Arc gauge visual */}
            <div style={{ position: "relative", width: "200px", height: "200px", marginBottom: "1rem" }}>
              <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
                <circle cx="100" cy="100" r="80" fill="none" stroke={C.slateLight} strokeWidth="16" />
                <circle
                  cx="100" cy="100" r="80" fill="none"
                  stroke={sohColor} strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 80 * soh / 100} ${2 * Math.PI * 80}`}
                  transform="rotate(-90 100 100)"
                  style={{ transition: "stroke-dasharray 1.5s ease", filter: `drop-shadow(0 0 8px ${sohColor})` }}
                />
                <text x="100" y="95" textAnchor="middle" fill={sohColor}
                  style={{ fontFamily: "'Space Mono', monospace", fontSize: "2.4rem", fontWeight: 700 }}>
                  {soh}%
                </text>
                <text x="100" y="118" textAnchor="middle" fill={C.textMuted}
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem" }}>
                  EXCELLENT
                </text>
              </svg>
            </div>

            {/* Battery segment bar */}
            <div style={{ display: "flex", gap: "3px", marginTop: "0.5rem" }}>
              {Array.from({ length: segments }).map((_, i) => (
                <div key={i} style={{
                  width: "10px", height: "28px", borderRadius: "3px",
                  background: i < filledSegments ? sohColor : C.slateLight,
                  opacity: i < filledSegments ? (0.5 + (i / segments) * 0.5) : 0.4,
                  boxShadow: i < filledSegments ? `0 0 6px ${sohColor}55` : "none",
                  transition: `background 0.3s ease ${i * 30}ms`,
                }} />
              ))}
            </div>
          </div>

          {/* Battery Stats Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { label: "Usable Capacity", value: `${capacity} kWh`, icon: "🔋", color: C.electric },
              { label: "Charge Cycles", value: cycles, icon: "🔄", color: C.amber },
              { label: "Est. Range", value: `${range} km`, icon: "🗺️", color: C.neon },
              { label: "Last Health Check", value: lastCheck, icon: "📅", color: C.textMuted },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: C.midnight, borderRadius: "16px",
                border: `1px solid ${C.slateLight}`, padding: "1.5rem",
                display: "flex", flexDirection: "column", gap: "0.4rem",
              }}>
                <span style={{ fontSize: "1.6rem" }}>{stat.icon}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "1.2rem", fontWeight: 700, color: stat.color }}>
                  {stat.value}
                </span>
                <span style={{ color: C.textMuted, fontSize: "0.75rem" }}>{stat.label}</span>
              </div>
            ))}

            {/* Degradation timeline bar */}
            <div style={{
              gridColumn: "1 / -1",
              background: C.midnight, borderRadius: "16px",
              border: `1px solid ${C.slateLight}`, padding: "1.5rem",
            }}>
              <div style={{ color: C.textMuted, fontSize: "0.75rem", marginBottom: "1rem", fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em" }}>
                PROJECTED DEGRADATION
              </div>
              <div style={{ display: "flex", gap: "0", height: "12px", borderRadius: "8px", overflow: "hidden" }}>
                {[
                  { label: "Year 1-3", pct: 30, color: C.neon },
                  { label: "Year 4-6", pct: 30, color: C.electric },
                  { label: "Year 7-10", pct: 25, color: C.amber },
                  { label: "10+", pct: 15, color: C.rose },
                ].map((seg) => (
                  <div key={seg.label} style={{ width: `${seg.pct}%`, background: seg.color, opacity: 0.85 }} title={`${seg.label}: ${seg.pct}%`} />
                ))}
              </div>
              <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.8rem" }}>
                {[
                  { label: "Year 1–3", color: C.neon, range: "96–100%" },
                  { label: "Year 4–6", color: C.electric, range: "88–96%" },
                  { label: "Year 7–10", color: C.amber, range: "78–88%" },
                  { label: "Year 10+", color: C.rose, range: "<78%" },
                ].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "2px", background: l.color }} />
                    <span style={{ color: C.textMuted, fontSize: "0.7rem" }}>{l.label}: <strong style={{ color: l.color }}>{l.range}</strong></span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaintenanceTasksSection({ tasks }) {
  const allTasks = tasks ?? MOCK_TASKS;
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const categories = ["all", ...new Set(allTasks.map((t) => t.category))];
  const filtered = activeCategory === "all" ? allTasks : allTasks.filter((t) => t.category === activeCategory);

  const priorityColor = { high: C.rose, medium: C.amber, low: C.neon };

  return (
    <section id="schedule" style={{ padding: "6rem 2rem", background: C.midnight }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="🔧 Service Items"
          title="MAINTENANCE CHECKLIST"
          subtitle="Intervals sourced from manufacturer specs, stored in PostgreSQL and served via FastAPI."
        />

        {/* Category filter pills */}
        <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "0.45rem 1.1rem", borderRadius: "999px",
              fontFamily: "'Space Mono', monospace", fontSize: "0.72rem",
              letterSpacing: "0.08em", cursor: "pointer", border: "none",
              background: activeCategory === cat ? C.electric : C.slate,
              color: activeCategory === cat ? C.midnight : C.textMuted,
              transition: "all 0.2s",
            }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Task cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.2rem" }}>
          {filtered.map((task, i) => {
            const isExpanded = expandedId === task.id;
            return (
              <div key={task.id}
                onClick={() => setExpandedId(isExpanded ? null : task.id)}
                style={{
                  background: C.slate, borderRadius: "18px",
                  border: `1px solid ${isExpanded ? C.electric : C.slateLight}`,
                  padding: "1.5rem", cursor: "pointer",
                  transition: "all 0.3s ease",
                  transform: isExpanded ? "scale(1.02)" : "scale(1)",
                  boxShadow: isExpanded ? `0 8px 32px rgba(0,212,255,0.15)` : "none",
                  animationDelay: `${i * 60}ms`,
                }}
                onMouseEnter={(e) => !isExpanded && (e.currentTarget.style.borderColor = `${C.electric}55`)}
                onMouseLeave={(e) => !isExpanded && (e.currentTarget.style.borderColor = C.slateLight)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1.8rem" }}>{task.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: C.textPrimary, fontSize: "1rem" }}>
                        {task.title}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: C.textMuted, marginTop: "0.1rem", fontFamily: "'Space Mono', monospace" }}>
                        {task.category.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.68rem",
                    fontFamily: "'Space Mono', monospace", letterSpacing: "0.08em",
                    background: `${priorityColor[task.priority]}22`,
                    color: priorityColor[task.priority], border: `1px solid ${priorityColor[task.priority]}44`,
                  }}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${C.slateLight}`, paddingTop: "1rem", marginTop: "0.5rem" }}>
                    <p style={{ color: C.textMuted, fontSize: "0.875rem", lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif", marginBottom: "1rem" }}>
                      {task.description}
                    </p>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {task.interval_km && (
                        <div style={{ background: C.midnight, borderRadius: "10px", padding: "0.5rem 0.9rem", fontSize: "0.78rem" }}>
                          <span style={{ color: C.electric, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{task.interval_km.toLocaleString()} km</span>
                          <span style={{ color: C.textMuted, marginLeft: "0.4rem" }}>interval</span>
                        </div>
                      )}
                      {task.interval_months && (
                        <div style={{ background: C.midnight, borderRadius: "10px", padding: "0.5rem 0.9rem", fontSize: "0.78rem" }}>
                          <span style={{ color: C.amber, fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{task.interval_months} mo</span>
                          <span style={{ color: C.textMuted, marginLeft: "0.4rem" }}>or whichever first</span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); alert(`Mark "${task.title}" as done — POST /api/maintenance/service-log`); }}
                      style={{
                        marginTop: "1rem", width: "100%", padding: "0.65rem",
                        background: `linear-gradient(135deg, ${C.electric}, #0099cc)`,
                        color: C.midnight, fontWeight: 700, fontSize: "0.8rem",
                        border: "none", borderRadius: "10px", cursor: "pointer",
                        fontFamily: "'Space Mono', monospace",
                      }}>
                      ✓ MARK COMPLETE
                    </button>
                  </div>
                )}

                {!isExpanded && (
                  <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.5rem" }}>
                    {task.interval_km && (
                      <span style={{ fontSize: "0.72rem", color: C.electric, fontFamily: "'Space Mono', monospace" }}>
                        {task.interval_km.toLocaleString()} km
                      </span>
                    )}
                    {task.interval_months && (
                      <span style={{ fontSize: "0.72rem", color: C.textMuted, fontFamily: "'Space Mono', monospace" }}>
                        {task.interval_months} months
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection({ schedule }) {
  const items = schedule ?? MOCK_SCHEDULE;

  return (
    <section style={{ padding: "6rem 2rem", background: C.navy }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="📅 Timeline"
          title="SERVICE SCHEDULE"
          subtitle="Upcoming and completed service events stored in PostgreSQL."
        />

        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute", left: "50%", top: 0, bottom: 0,
            width: "2px", background: `linear-gradient(to bottom, ${C.electric}, transparent)`,
            transform: "translateX(-50%)",
          }} />

          {items.map((item, i) => {
            const isCompleted = item.status === "completed";
            const isLeft = i % 2 === 0;
            return (
              <div key={item.id} style={{
                display: "flex",
                justifyContent: isLeft ? "flex-end" : "flex-start",
                paddingRight: isLeft ? "calc(50% + 2rem)" : "0",
                paddingLeft: isLeft ? "0" : "calc(50% + 2rem)",
                marginBottom: "2rem",
                position: "relative",
              }}>
                {/* Dot on line */}
                <div style={{
                  position: "absolute", left: "50%", top: "1.2rem",
                  width: "14px", height: "14px", borderRadius: "50%",
                  background: isCompleted ? C.neon : C.electric,
                  border: `2px solid ${C.navy}`,
                  transform: "translateX(-50%)",
                  boxShadow: `0 0 10px ${isCompleted ? C.neon : C.electric}`,
                }} />

                <div style={{
                  background: C.slate, borderRadius: "14px",
                  border: `1px solid ${isCompleted ? `${C.neon}33` : `${C.electric}33`}`,
                  padding: "1.2rem 1.5rem", maxWidth: "280px", width: "100%",
                }}>
                  <div style={{
                    fontFamily: "'Space Mono', monospace", fontSize: "0.7rem",
                    color: isCompleted ? C.neon : C.electric, marginBottom: "0.4rem",
                    letterSpacing: "0.1em",
                  }}>
                    {item.date} · {isCompleted ? "✓ DONE" : "⏳ UPCOMING"}
                  </div>
                  <div style={{ color: C.textPrimary, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
                    {item.task}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChargingTipsSection({ tips }) {
  const allTips = tips ?? MOCK_TIPS;

  return (
    <section id="tips" style={{ padding: "6rem 2rem", background: C.midnight }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <SectionHeader
          eyebrow="💡 Pro Tips"
          title="CHARGING & CARE TIPS"
          subtitle="Expert-curated guidance to extend range and battery life — refreshed via FastAPI."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.2rem" }}>
          {allTips.map((tip, i) => (
            <div key={tip.id} style={{
              background: `linear-gradient(135deg, ${C.slate} 0%, ${C.navy} 100%)`,
              borderRadius: "18px", border: `1px solid ${C.slateLight}`,
              padding: "1.8rem", display: "flex", gap: "1rem",
              transition: "transform 0.2s, border-color 0.2s",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = `${C.electric}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = C.slateLight;
              }}
            >
              <div style={{
                fontSize: "2rem", width: "3rem", height: "3rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `rgba(0,212,255,0.08)`, borderRadius: "12px", flexShrink: 0,
              }}>{tip.icon}</div>
              <div>
                <div style={{ fontSize: "0.7rem", fontFamily: "'Space Mono', monospace", color: C.electric, letterSpacing: "0.12em", marginBottom: "0.4rem" }}>
                  {tip.category.toUpperCase()}
                </div>
                <p style={{ color: C.textPrimary, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65, fontSize: "0.9rem" }}>
                  {tip.tip_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: C.midnight, borderTop: `1px solid ${C.slateLight}`,
      padding: "3rem 2rem", textAlign: "center",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "1rem" }}>
        <span style={{ fontSize: "1.4rem" }}>⚡</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, color: C.electric, fontSize: "1rem" }}>VoltIQ</span>
      </div>
      <p style={{ color: C.textMuted, fontSize: "0.8rem", fontFamily: "'DM Sans', sans-serif", marginBottom: "0.5rem" }}>
        EV Maintenance Guide · React + FastAPI + PostgreSQL
      </p>
      <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "1.5rem" }}>
        {["GET /api/maintenance/tasks", "GET /api/maintenance/battery", "POST /api/maintenance/service-log"].map((ep) => (
          <code key={ep} style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.68rem", color: `${C.electric}88`, background: C.slate, padding: "0.25rem 0.6rem", borderRadius: "6px" }}>
            {ep}
          </code>
        ))}
      </div>
      <p style={{ color: `${C.textMuted}55`, fontSize: "0.72rem", marginTop: "2rem", fontFamily: "'Space Mono', monospace" }}>
        © 2026 VoltIQ · Built with React · FastAPI · PostgreSQL
      </p>
    </footer>
  );
}
// ─── LOADING SKELETON ──────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div style={{
      background: C.slate, borderRadius: "18px",
      border: `1px solid ${C.slateLight}`, padding: "1.5rem", height: "120px",
      animation: "shimmer 1.5s infinite",
      background: `linear-gradient(90deg, ${C.slate} 25%, ${C.slateLight} 50%, ${C.slate} 75%)`,
      backgroundSize: "200% 100%",
    }} />
  );
}
// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
function EVMaintenanceGuide() {
  const { data: tasks, loading: tasksLoading } = useFetch(`${API_BASE}/api/maintenance/tasks`);
  const { data: battery, loading: batteryLoading } = useFetch(`${API_BASE}/api/maintenance/battery`);
  const { data: schedule } = useFetch(`${API_BASE}/api/maintenance/schedule`);
  const { data: tips } = useFetch(`${API_BASE}/api/charging/tips`);

  return (
    <>
      {/* Global font imports & keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.midnight}; }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.midnight}; }
        ::-webkit-scrollbar-thumb { background: ${C.slateLight}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.electric}; }
      `}</style>

      <div style={{ fontFamily: "'DM Sans', sans-serif", background: C.midnight, color: C.textPrimary, minHeight: "100vh" }}>
        <NavBar />
        <HeroSection />

        {batteryLoading
          ? <section style={{ padding: "6rem 2rem", background: C.navy }}><div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}><SkeletonCard /><SkeletonCard /></div></section>
          : <BatterySection battery={battery} />
        }

        {tasksLoading
          ? <section style={{ padding: "6rem 2rem", background: C.midnight }}><div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }}>{[1,2,3].map(i=><SkeletonCard key={i}/>)}</div></section>
          : <MaintenanceTasksSection tasks={tasks} />
        }

        <ScheduleSection schedule={schedule} />
        <ChargingTipsSection tips={tips} />
        <Footer />
      </div>
    </>
  );
}

export default EVMaintenanceGuide;