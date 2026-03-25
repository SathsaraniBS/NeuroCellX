import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// API CONFIG  — point to your FastAPI backend
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function apiFetch(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK DATA  (shown while API loads or on error)
// ─────────────────────────────────────────────────────────────────────────────
const FALLBACK_STATS = {
  total_batteries: 2847,
  avg_soh: 91.4,
  alerts_today: 12,
  predictions_made: 148320,
};

const FALLBACK_FLEET = [
  { id: "BAT-20491", vehicle: "Tesla Model 3", soh: 91.2, status: "Good",    rul: 1840 },
  { id: "BAT-18843", vehicle: "BMW iX",        soh: 78.6, status: "Warning", rul: 620  },
  { id: "BAT-31102", vehicle: "Hyundai Ioniq 5",soh: 95.1, status: "Good",   rul: 2210 },
  { id: "BAT-09774", vehicle: "BYD Atto 3",    soh: 64.3, status: "Critical",rul: 190  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const statusStyle = (s) =>
  s === "Good"
    ? { color: "#00ff9d", bg: "#00ff9d11", border: "#00ff9d33" }
    : s === "Warning"
    ? { color: "#facc15", bg: "#facc1511", border: "#facc1533" }
    : { color: "#f87171", bg: "#f8717111", border: "#f8717133" };

const sohColor = (v) => (v >= 85 ? "#00ff9d" : v >= 70 ? "#facc15" : "#f87171");

function useCountUp(target, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/** Animated counter stat card */
function StatCard({ label, value, suffix = "", accent = "#00c8ff", icon }) {
  const animated = useCountUp(parseFloat(value) || 0);
  return (
    <div
      style={{ background: "#0a1525", borderColor: `${accent}22` }}
      className="rounded-2xl border p-5 flex flex-col gap-2 hover:scale-[1.02] transition-transform duration-200"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium tracking-widest uppercase" style={{ color: "#7a9bb5" }}>
          {label}
        </span>
        <span className="text-lg">{icon}</span>
      </div>
      <p
        className="text-3xl font-bold"
        style={{ color: accent, fontFamily: "'Syne', sans-serif" }}
      >
        {Number.isInteger(parseFloat(value))
          ? animated.toLocaleString()
          : animated.toFixed(1)}
        {suffix}
      </p>
    </div>
  );
}

/** Feature card */
function FeatureCard({ icon, title, desc, accent, delay }) {
  return (
    <div
      style={{
        background: "#0a1525",
        borderColor: `${accent}22`,
        animationDelay: `${delay}ms`,
      }}
      className="rounded-2xl border p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg animate-fadeUp"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}33` }}
      >
        {icon}
      </div>
      <h3
        className="text-base font-bold mb-2"
        style={{ fontFamily: "'Syne',sans-serif", color: "#e8f4ff" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#7a9bb5" }}>
        {desc}
      </p>
    </div>
  );
}

/** Mini battery row in fleet preview table */
function FleetRow({ bat, onClick }) {
  const st = statusStyle(bat.status);
  return (
    <tr
      onClick={() => onClick(bat.id)}
      className="cursor-pointer transition-colors hover:bg-white/5"
      style={{ borderBottom: "1px solid #0d2040" }}
    >
      <td className="py-3 px-4 font-bold text-sm" style={{ color: "#00c8ff", fontFamily: "'Syne',sans-serif" }}>
        {bat.id}
      </td>
      <td className="py-3 px-4 text-sm" style={{ color: "#e8f4ff" }}>{bat.vehicle}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-1.5 rounded-full" style={{ background: "#0d2040", minWidth: "60px" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${bat.soh}%`, background: sohColor(bat.soh) }}
            />
          </div>
          <span className="text-xs font-semibold" style={{ color: sohColor(bat.soh) }}>
            {bat.soh}%
          </span>
        </div>
      </td>
      <td className="py-3 px-4">
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}
        >
          {bat.status}
        </span>
      </td>
      <td className="py-3 px-4 text-sm" style={{ color: "#7a9bb5" }}>
        {bat.rul.toLocaleString()} cycles
      </td>
      <td className="py-3 px-4 text-right">
        <span className="text-xs px-2.5 py-1 rounded-lg" style={{ color: "#00c8ff", background: "#00c8ff11", border: "1px solid #00c8ff22" }}>
          View →
        </span>
      </td>
    </tr>
  );
}

/** Glowing orb background decoration */
function Orb({ color, top, left, size = 400, opacity = 0.06 }) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents: "none",
        filter: "blur(1px)",
      }}
    />
  );
}

/** Animated mini gauge (SVG arc) */
function MiniGauge({ value, color, label }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="90" height="90" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="#0d2040" strokeWidth="7" />
        <circle
          cx="45" cy="45" r={r} fill="none"
          stroke={color} strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          strokeDashoffset={c * 0.25}
          style={{ transition: "stroke-dasharray 1.2s ease" }}
        />
        <text x="45" y="50" textAnchor="middle" fontSize="14" fontWeight="700"
          fill={color} fontFamily="'Syne',sans-serif">
          {value}%
        </text>
      </svg>
      <p className="text-xs text-center" style={{ color: "#7a9bb5" }}>{label}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const navigate = useNavigate();

  // ── state ──────────────────────────────────────────────────────────────────
  const [stats,       setStats]       = useState(FALLBACK_STATS);
  const [fleet,       setFleet]       = useState(FALLBACK_FLEET);
  const [loading,     setLoading]     = useState(true);
  const [apiError,    setApiError]    = useState(false);
  const [liveVoltage, setLiveVoltage] = useState(394.2);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const heroRef = useRef(null);

  // ── fetch dashboard stats from FastAPI ─────────────────────────────────────
  // GET /api/dashboard/stats
  // Returns: { total_batteries, avg_soh, alerts_today, predictions_made }
  useEffect(() => {
    apiFetch("/api/dashboard/stats")
      .then(setStats)
      .catch(() => setApiError(true))
      .finally(() => setLoading(false));
  }, []);

  // ── fetch fleet preview from FastAPI ───────────────────────────────────────
  // GET /api/batteries?limit=4&sort=status
  // Returns: [{ id, vehicle, soh, status, rul }]
  useEffect(() => {
    apiFetch("/api/batteries?limit=4&sort=status")
      .then(setFleet)
      .catch(() => {}); // silently fall back to mock data
  }, []);

  // ── simulated live voltage ticker ──────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => {
      setLiveVoltage((v) => +(v + (Math.random() - 0.5) * 0.6).toFixed(1));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // ── nav links ──────────────────────────────────────────────────────────────
  const navLinks = [
    { label: "Dashboard",   path: "/dashboard"  },
    { label: "Predictions", path: "/predictions"},
    { label: "History",     path: "/history"    },
    { label: "Learning Hub",path: "/learning"   },
    { label: "About",       path: "/about"      },
  ];

  const features = [
    {
      icon: "⚡",
      title: "Real-Time Battery Monitoring",
      desc:  "Track voltage, current, temperature, and SoC of your entire EV fleet 24/7 with millisecond precision.",
      accent: "#00c8ff",
    },
    {
      icon: "🧠",
      title: "AI Failure Predictions",
      desc:  "Our ML model predicts battery failures up to 30 days in advance using degradation pattern analysis.",
      accent: "#7b61ff",
    },
    {
      icon: "📊",
      title: "RUL Estimation Engine",
      desc:  "Remaining Useful Life calculated per cell using physics-informed neural networks and historical data.",
      accent: "#00ff9d",
    },
    {
      icon: "🔔",
      title: "Smart Alerts & Reports",
      desc:  "Instant notifications for anomalies, threshold breaches, and scheduled maintenance windows.",
      accent: "#f97316",
    },
    {
      icon: "🌡",
      title: "Thermal Management Insights",
      desc:  "Cell-level temperature mapping to detect hotspots before they cause irreversible damage.",
      accent: "#facc15",
    },
    {
      icon: "🔋",
      title: "State of Health Analytics",
      desc:  "Deep SoH trending across charging cycles, seasons, and usage patterns with exportable reports.",
      accent: "#f87171",
    },
  ];

  const trustedBy = ["TESLA", "BYD", "NISSAN", "GM", "BMW", "HYUNDAI"];

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#050c15", fontFamily: "'DM Sans', sans-serif", color: "#e8f4ff" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse-slow {
          0%,100% { opacity:1; } 50% { opacity:0.5; }
        }
        @keyframes float {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-12px); }
        }
        @keyframes scan {
          0%   { top: 0%; }
          100% { top: 100%; }
        }
        .animate-fadeUp  { animation: fadeUp 0.6s ease both; }
        .animate-float   { animation: float 4s ease-in-out infinite; }
        .pulse-dot       { animation: pulse-slow 2s ease-in-out infinite; }
        .scan-line       { animation: scan 3s linear infinite; }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ════════════════════════════════════════════════════════════
          NAVBAR
      ════════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 lg:px-10 h-16 border-b"
        style={{ background: "rgba(5,12,21,0.9)", backdropFilter: "blur(24px)", borderColor: "#00c8ff1a" }}
      >
        {/* Logo */}
        <span
          className="text-xl font-extrabold cursor-pointer"
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Syne',sans-serif",
            background: "linear-gradient(135deg,#00c8ff,#00ff9d)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}
        >
          VoltIQ
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 list-none">
          {navLinks.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => navigate(l.path)}
                className="text-sm font-medium transition-colors duration-150 hover:text-white"
                style={{ color: "#7a9bb5", background: "none", border: "none", cursor: "pointer" }}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Live pulse */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border"
            style={{ color: "#00ff9d", borderColor: "#00ff9d33", background: "#00ff9d0f" }}>
            <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#00ff9d" }} />
            {liveVoltage} V Live
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-sm font-medium px-4 py-2 rounded-xl border transition-all hover:bg-white/5"
            style={{ color: "#e8f4ff", borderColor: "#00c8ff33" }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-sm font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg,#00c8ff,#00ff9d)", color: "#050c15" }}
          >
            Sign Up
          </button>
          {/* Mobile burger */}
          <button
            className="md:hidden text-xl"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ color: "#7a9bb5", background: "none", border: "none", cursor: "pointer" }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4 border-b"
          style={{ background: "#0a1525", borderColor: "#00c8ff1a" }}
        >
          {navLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => { navigate(l.path); setMenuOpen(false); }}
              className="text-sm text-left transition-colors"
              style={{ color: "#7a9bb5", background: "none", border: "none", cursor: "pointer" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden px-6 lg:px-16 pt-20 pb-24 flex flex-col lg:flex-row items-center gap-12"
        id="hero"
      >
        {/* Background orbs */}
        <Orb color="#00c8ff" top="-100px" left="-100px" size={600} opacity={0.07} />
        <Orb color="#00ff9d" top="200px"  left="60%"   size={400} opacity={0.05} />
        <Orb color="#7b61ff" top="400px"  left="30%"   size={350} opacity={0.04} />

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,200,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,255,0.03) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Left: text */}
        <div className="relative z-10 flex-1 max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 animate-fadeUp"
            style={{ background: "#00c8ff08", borderColor: "#00c8ff25", color: "#00c8ff" }}
          >
            <span className="pulse-dot w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#00c8ff" }} />
            <span className="text-xs font-semibold tracking-wider uppercase">AI-Powered Battery Intelligence</span>
          </div>

          <h1
            className="text-4xl lg:text-6xl font-extrabold leading-tight mb-6 animate-fadeUp"
            style={{ fontFamily: "'Syne',sans-serif", animationDelay: "100ms" }}
          >
            EV Battery Health
            <span
              className="block"
              style={{
                background: "linear-gradient(90deg,#00c8ff,#00ff9d)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              Prediction & RUL
            </span>
            Estimation System
          </h1>

          <p
            className="text-base lg:text-lg leading-relaxed mb-8 animate-fadeUp"
            style={{ color: "#7a9bb5", maxWidth: "520px", animationDelay: "200ms" }}
          >
            Optimize battery performance, predict failures, and ensure the longevity
            of your EV fleet with VoltIQ's advanced AI analytics and real-time monitoring.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 animate-fadeUp" style={{ animationDelay: "300ms" }}>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg,#00c8ff,#00ff9d)", color: "#050c15" }}
            >
              Get Started Free →
            </button>
            <button
              onClick={() => navigate("/learning")}
              className="px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-white/5"
              style={{ color: "#e8f4ff", borderColor: "#00c8ff33" }}
            >
              ▶ Watch Demo
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-4 mt-8 animate-fadeUp" style={{ animationDelay: "400ms" }}>
            {["✓ No credit card required", "✓ GDPR Compliant", "✓ 99.9% Uptime"].map((t) => (
              <span key={t} className="text-xs" style={{ color: "#4a6a85" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right: live dashboard card */}
        <div
          className="relative z-10 flex-shrink-0 w-full max-w-sm animate-float animate-fadeUp"
          style={{ animationDelay: "350ms" }}
        >
          <div
            className="rounded-3xl p-5 relative overflow-hidden"
            style={{
              background: "rgba(10,21,37,0.85)",
              border: "1px solid #00c8ff22",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(0,200,255,0.08)",
            }}
          >
            {/* Scan line effect */}
            <div
              className="scan-line absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent,#00c8ff44,transparent)" }}
            />

            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "#7a9bb5" }}>
                Battery Health Monitor
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "#00ff9d", background: "#00ff9d11", border: "1px solid #00ff9d33" }}>
                ● Live
              </span>
            </div>

            {/* Gauges row */}
            <div className="flex justify-around mb-5">
              <MiniGauge value={91} color="#00ff9d" label="SoH" />
              <MiniGauge value={78} color="#00c8ff" label="SoC" />
              <MiniGauge value={82} color="#7b61ff" label="RUL" />
            </div>

            {/* Live metrics */}
            {[
              { label: "Pack Voltage",  value: `${liveVoltage} V`, color: "#00c8ff" },
              { label: "Current",       value: "−14.6 A",          color: "#00ff9d" },
              { label: "Temperature",   value: "28.4 °C",          color: "#f97316" },
              { label: "Total Cycles",  value: "412",              color: "#7b61ff" },
            ].map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between py-2 border-b"
                style={{ borderColor: "#0d2040" }}
              >
                <span className="text-xs" style={{ color: "#7a9bb5" }}>{m.label}</span>
                <span className="text-xs font-bold" style={{ color: m.color, fontFamily: "'Syne',sans-serif" }}>
                  {m.value}
                </span>
              </div>
            ))}

            {/* Status */}
            <div className="mt-4 rounded-xl p-3 flex items-center gap-3"
              style={{ background: "#00ff9d0a", border: "1px solid #00ff9d22" }}>
              <span className="text-lg">✓</span>
              <div>
                <p className="text-xs font-semibold" style={{ color: "#00ff9d" }}>Battery Status: Good</p>
                <p className="text-xs" style={{ color: "#4a6a85" }}>No anomalies detected · Est. 1,840 cycles remaining</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS BAND  (fetched from FastAPI)
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-16 py-12 border-y"
        style={{ borderColor: "#00c8ff0f", background: "#07111e" }}
        id="stats"
      >
        {apiError && (
          <p className="text-center text-xs mb-4" style={{ color: "#f87171" }}>
            ⚠ Could not reach API — showing sample data
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Batteries Monitored" value={stats.total_batteries}    icon="🔋" accent="#00c8ff" />
          <StatCard label="Avg Fleet SoH"        value={stats.avg_soh}            suffix="%" icon="💚" accent="#00ff9d" />
          <StatCard label="Alerts Today"          value={stats.alerts_today}       icon="🔔" accent="#facc15" />
          <StatCard label="AI Predictions Made"   value={stats.predictions_made}   icon="🧠" accent="#7b61ff" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURES
      ════════════════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-20" id="features">
        <div className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#00c8ff" }}>
            Why VoltIQ
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            Everything you need to manage
            <span
              className="block mt-1"
              style={{
                background: "linear-gradient(90deg,#00c8ff,#00ff9d)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              EV battery health at scale
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 80} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FLEET PREVIEW TABLE  (fetched from FastAPI)
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-16 py-16"
        style={{ background: "#07111e" }}
        id="fleet"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "#00c8ff" }}>Live Fleet</p>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Syne',sans-serif" }}>
              Battery Fleet Overview
            </h2>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm px-4 py-2 rounded-xl border transition-all hover:bg-white/5"
            style={{ color: "#00c8ff", borderColor: "#00c8ff33" }}
          >
            View All →
          </button>
        </div>

        <div
          className="rounded-2xl overflow-hidden border"
          style={{ background: "#0a1525", borderColor: "#00c8ff1a" }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: "#00c8ff" }}
                />
                <p className="text-sm" style={{ color: "#7a9bb5" }}>Loading fleet data…</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid #0d2040", background: "#050c15" }}>
                    {["Battery ID", "Vehicle", "State of Health", "Status", "RUL", ""].map((h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-medium tracking-widest uppercase"
                        style={{ color: "#4a6a85" }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fleet.map((b) => (
                    <FleetRow
                      key={b.id}
                      bat={b}
                      onClick={(id) => navigate(`/batteries/${id}`)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-20" id="how-it-works">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#00c8ff" }}>Process</p>
          <h2 className="text-3xl font-bold" style={{ fontFamily: "'Syne',sans-serif" }}>
            How VoltIQ Works
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Connecting line (desktop) */}
          <div
            className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-px"
            style={{ background: "linear-gradient(90deg,#00c8ff22,#00ff9d44,#00c8ff22)" }}
          />

          {[
            { step: "01", icon: "📡", title: "Data Collection",      desc: "BMS sensors stream voltage, current, temperature in real time via MQTT." },
            { step: "02", icon: "⚙️",  title: "Signal Processing",    desc: "FastAPI backend cleans, normalises and stores data in PostgreSQL." },
            { step: "03", icon: "🧠", title: "AI Inference",          desc: "ML model predicts SoH degradation and RUL using LSTM + physics models." },
            { step: "04", icon: "📊", title: "Insights & Alerts",     desc: "React dashboard surfaces predictions, trends and maintenance alerts." },
          ].map((s, i) => (
            <div
              key={s.step}
              className="flex flex-col items-center text-center gap-3 animate-fadeUp"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl relative z-10"
                style={{ background: "#0a1525", border: "1px solid #00c8ff33" }}
              >
                {s.icon}
              </div>
              <span className="text-xs font-bold tracking-widest" style={{ color: "#00c8ff" }}>
                STEP {s.step}
              </span>
              <h3 className="text-sm font-bold" style={{ fontFamily: "'Syne',sans-serif" }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: "#7a9bb5" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUSTED BY
      ════════════════════════════════════════════════════════════ */}
      <section
        className="px-6 lg:px-16 py-14 border-y text-center"
        style={{ background: "#07111e", borderColor: "#00c8ff0f" }}
      >
        <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "#4a6a85" }}>
          Trusted across the EV industry
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          {trustedBy.map((brand) => (
            <span
              key={brand}
              className="text-base font-bold tracking-widest opacity-30 hover:opacity-60 transition-opacity"
              style={{ fontFamily: "'Syne',sans-serif", color: "#e8f4ff" }}
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TECH STACK SECTION
      ════════════════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-16 py-20" id="tech">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs tracking-widest uppercase mb-3" style={{ color: "#00c8ff" }}>Tech Stack</p>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Syne',sans-serif" }}>
              Comprehensive Dashboard
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg,#00c8ff,#00ff9d)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}
              >
                for All Your Battery Needs
              </span>
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#7a9bb5" }}>
              Gain valuable insights into battery State of Health (SoH), Remaining
              Useful Life (RUL), and receive instant alerts for potential issues —
              all in one unified React dashboard backed by FastAPI and PostgreSQL.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Frontend", value: "React.js", color: "#00c8ff" },
                { label: "Backend",  value: "FastAPI",  color: "#00ff9d" },
                { label: "Database", value: "PostgreSQL", color: "#7b61ff" },
              ].map((t) => (
                <div
                  key={t.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "#0a1525", border: `1px solid ${t.color}22` }}
                >
                  <p className="text-xs mb-1" style={{ color: "#4a6a85" }}>{t.label}</p>
                  <p className="text-xs font-bold" style={{ color: t.color, fontFamily: "'Syne',sans-serif" }}>
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mini dashboard mockup */}
          <div
            className="rounded-2xl p-4"
            style={{ background: "#0a1525", border: "1px solid #00c8ff1a" }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold" style={{ color: "#7a9bb5" }}>Battery Health</p>
              <span className="text-xs px-2 py-0.5 rounded-lg" style={{ color: "#00c8ff", background: "#00c8ff11" }}>
                Monitor
              </span>
            </div>
            {/* Fake chart bars */}
            <div className="flex items-end gap-2 h-24 mb-3">
              {[65, 80, 72, 91, 85, 78, 88, 92, 70, 95, 89, 91].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${h}%`,
                    background: `linear-gradient(180deg,${i === 11 ? "#00ff9d" : "#00c8ff"}88,${i === 11 ? "#00ff9d" : "#00c8ff"}22)`,
                    transition: "height 1s ease",
                  }}
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "SoH",  v: "91.2%", c: "#00ff9d" },
                { l: "RUL",  v: "1,840",  c: "#7b61ff" },
                { l: "SoC",  v: "78%",    c: "#00c8ff" },
                { l: "Temp", v: "28.4°C", c: "#f97316" },
              ].map((m) => (
                <div key={m.l} className="rounded-lg p-2 flex items-center justify-between"
                  style={{ background: "#050c15" }}>
                  <span className="text-xs" style={{ color: "#4a6a85" }}>{m.l}</span>
                  <span className="text-xs font-bold" style={{ color: m.c }}>{m.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════════════════════════════ */}
      <section
        className="mx-6 lg:mx-16 mb-16 rounded-3xl px-8 py-14 text-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#0a1f3a,#0d2a40)",
          border: "1px solid #00c8ff22",
        }}
      >
        <Orb color="#00c8ff" top="-60px" left="50%" size={400} opacity={0.08} />
        <p className="text-xs tracking-widest uppercase mb-3 relative z-10" style={{ color: "#00c8ff" }}>
          Get Started Today
        </p>
        <h2
          className="text-3xl lg:text-4xl font-extrabold mb-4 relative z-10"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          Ready to optimize your EV
          <span
            className="block"
            style={{
              background: "linear-gradient(90deg,#00c8ff,#00ff9d)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}
          >
            battery management?
          </span>
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto relative z-10" style={{ color: "#7a9bb5" }}>
          Join fleet operators and EV manufacturers who trust VoltIQ to keep their batteries healthy and efficient.
        </p>
        <div className="flex flex-wrap justify-center gap-3 relative z-10">
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-85"
            style={{ background: "linear-gradient(135deg,#00c8ff,#00ff9d)", color: "#050c15" }}
          >
            Get Started Free →
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 rounded-xl font-semibold text-sm border transition-all hover:bg-white/5"
            style={{ color: "#e8f4ff", borderColor: "#00c8ff33" }}
          >
            Contact Sales
          </button>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════════ */}
      <footer
        className="border-t px-6 lg:px-16 py-10"
        style={{ borderColor: "#00c8ff0f", background: "#050c15" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <span
              className="text-lg font-extrabold block mb-3"
              style={{
                fontFamily: "'Syne',sans-serif",
                background: "linear-gradient(135deg,#00c8ff,#00ff9d)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}
            >
              VoltIQ
            </span>
            <p className="text-xs leading-relaxed" style={{ color: "#4a6a85" }}>
              AI-powered EV battery health prediction and Remaining Useful Life estimation system.
            </p>
          </div>
          {[
            { title: "Product",  links: ["Dashboard", "Predictions", "Battery Details", "Reports"] },
            { title: "Learn",    links: ["Learning Hub", "Documentation", "API Reference", "Changelog"] },
            { title: "Company",  links: ["About", "Contact", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "#7a9bb5" }}>
                {col.title}
              </p>
              <ul className="space-y-2 list-none">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#4a6a85" }}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t gap-3"
          style={{ borderColor: "#0d2040" }}
        >
          <p className="text-xs" style={{ color: "#4a6a85" }}>
            © 2025 VoltIQ. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#4a6a85" }}>
            Built with React.js · FastAPI · PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  );
}