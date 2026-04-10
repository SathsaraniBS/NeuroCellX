// EVChargingCalculator.jsx
// React + Tailwind CSS (inline) EV Home Charging Cost Calculator
// Supports all world currencies via live exchange rates from FastAPI backend

import { useState, useEffect, useCallback, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:8000";

const CHARGER_OPTIONS = [
  { label: "3.3 kW (Standard Home)", value: 3.3 },
  { label: "7.4 kW (Fast Home)", value: 7.4 },
  { label: "11 kW (Three Phase)", value: 11 },
  { label: "22 kW (Three Phase Fast)", value: 22 },
  { label: "50 kW (DC Fast)", value: 50 },
  { label: "100 kW (DC Rapid)", value: 100 },
  { label: "150 kW (Ultra Rapid)", value: 150 },
  { label: "350 kW (HPC)", value: 350 },
];

const POPULAR_CURRENCIES = [
  "USD", "EUR", "GBP", "JPY", "INR", "LKR", "AUD", "CAD",
  "CNY", "AED", "SGD", "CHF", "BRL", "MXN", "KRW", "THB",
];

// ── Slider Component ────────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange, unit, format }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        {label}
      </p>
      <p style={{ fontSize: 28, fontWeight: 800, color: "#00E5FF", marginBottom: 12, fontFamily: "'Space Mono', monospace" }}>
        {format ? format(value) : value}{unit}
      </p>
      <div style={{ position: "relative", height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 8 }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: `${percent}%`, borderRadius: 3,
          background: "linear-gradient(90deg, #0277BD, #00E5FF)",
          transition: "width 0.1s ease"
        }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            opacity: 0, cursor: "pointer", margin: 0,
          }}
        />
        <div style={{
          position: "absolute", top: "50%", transform: "translate(-50%, -50%)",
          left: `${percent}%`, width: 18, height: 18, borderRadius: "50%",
          background: "#00E5FF", border: "3px solid #001F3F",
          boxShadow: "0 0 12px rgba(0,229,255,0.6)",
          pointerEvents: "none", transition: "left 0.1s ease"
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );
}

// ── Currency Selector ───────────────────────────────────────────────────────
function CurrencySelector({ currencies, selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef(null);
  const cur = currencies.find(c => c.code === selected) || { code: selected, symbol: selected };

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = currencies.filter(c =>
    c.code.toLowerCase().includes(search.toLowerCase()) ||
    (c.name || "").toLowerCase().includes(search.toLowerCase())
  );
  const popular = filtered.filter(c => POPULAR_CURRENCIES.includes(c.code));
  const others = filtered.filter(c => !POPULAR_CURRENCIES.includes(c.code));

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
        Currency
      </p>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.25)",
          borderRadius: 10, padding: "10px 16px", cursor: "pointer",
          color: "#fff", fontSize: 16, fontWeight: 700, width: "100%",
          justifyContent: "space-between"
        }}
      >
        <span>{cur.symbol} {cur.code}</span>
        <span style={{ fontSize: 10, opacity: 0.6, transform: open ? "rotate(180deg)" : "none", transition: "0.2s" }}>▼</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", zIndex: 100, top: "calc(100% + 8px)", left: 0, right: 0,
          background: "#001830", border: "1px solid rgba(0,229,255,0.3)",
          borderRadius: 12, maxHeight: 320, overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
        }}>
          <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <input
              autoFocus placeholder="Search currency..."
              value={search} onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%", background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
                padding: "6px 10px", color: "#fff", fontSize: 13, outline: "none",
                boxSizing: "border-box"
              }}
            />
          </div>
          <div style={{ overflowY: "auto", maxHeight: 260 }}>
            {search === "" && popular.length > 0 && (
              <>
                <p style={{ fontSize: 10, color: "#64B5F6", padding: "8px 12px 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Popular</p>
                {popular.map(c => (
                  <CurrencyOption key={c.code} c={c} selected={selected} onSelect={code => { onSelect(code); setOpen(false); setSearch(""); }} />
                ))}
                <p style={{ fontSize: 10, color: "#64B5F6", padding: "8px 12px 4px", letterSpacing: "0.08em", textTransform: "uppercase" }}>All Currencies</p>
                {others.map(c => (
                  <CurrencyOption key={c.code} c={c} selected={selected} onSelect={code => { onSelect(code); setOpen(false); setSearch(""); }} />
                ))}
              </>
            )}
            {search !== "" && filtered.map(c => (
              <CurrencyOption key={c.code} c={c} selected={selected} onSelect={code => { onSelect(code); setOpen(false); setSearch(""); }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CurrencyOption({ c, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(c.code)}
      style={{
        padding: "8px 14px", cursor: "pointer", fontSize: 14,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: selected === c.code ? "rgba(0,229,255,0.1)" : "transparent",
        color: selected === c.code ? "#00E5FF" : "#fff",
        transition: "background 0.15s"
      }}
      onMouseEnter={e => { if (selected !== c.code) e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
      onMouseLeave={e => { if (selected !== c.code) e.currentTarget.style.background = "transparent"; }}
    >
      <span>{c.symbol} {c.code}</span>
      {c.rate_vs_usd && <span style={{ fontSize: 11, opacity: 0.45 }}>{c.rate_vs_usd.toFixed(4)}</span>}
    </div>
  );
}

// ── Result Card ─────────────────────────────────────────────────────────────
function ResultCard({ label, value, sub, accent }) {
  return (
    <div style={{
      background: accent
        ? "linear-gradient(135deg, #0277BD 0%, #01579B 100%)"
        : "rgba(255,255,255,0.04)",
      borderRadius: 16, padding: "20px 24px",
      border: `1px solid ${accent ? "transparent" : "rgba(255,255,255,0.08)"}`,
      flex: 1, minWidth: 160,
      boxShadow: accent ? "0 4px 24px rgba(2,119,189,0.4)" : "none"
    }}>
      <p style={{ fontSize: 12, color: accent ? "rgba(255,255,255,0.7)" : "#64B5F6", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{label}</p>
      <p style={{ fontSize: 32, fontWeight: 900, color: "#fff", fontFamily: "'Space Mono', monospace", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>{sub}</p>}
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────────────
export default function EVChargingCalculator() {
  const [batteryKwh, setBatteryKwh] = useState(30);
  const [tariff, setTariff] = useState(0.15);           // USD per kWh
  const [chargerKw, setChargerKw] = useState(3.3);
  const [currency, setCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const debounceRef = useRef(null);

  // Load currency list on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/currencies`)
      .then(r => r.json())
      .then(d => setCurrencies(d.currencies || []))
      .catch(() => setCurrencies(POPULAR_CURRENCIES.map(c => ({ code: c, symbol: c }))));
  }, []);

  // Debounced calculation
  const calculate = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`${API_BASE}/api/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            battery_capacity_kwh: batteryKwh,
            electricity_tariff: tariff,
            charger_capacity_kw: chargerKw,
            target_currency: currency,
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        setResult(await res.json());
      } catch (e) {
        setError("API connection failed. Showing local estimate.");
        // Fallback calculation
        const time = batteryKwh / chargerKw;
        const costUsd = batteryKwh * tariff;
        const h = Math.floor(time), m = Math.round((time - h) * 60);
        setResult({
          charging_time_formatted: `${h}h ${m}m`,
          cost_usd: costUsd,
          cost_local: costUsd,
          currency_code: "USD",
          currency_symbol: "$",
          exchange_rate: 1,
        });
      } finally {
        setLoading(false);
      }
    }, 400);
  }, [batteryKwh, tariff, chargerKw, currency]);

  useEffect(() => { calculate(); }, [calculate]);

  const fmtTariff = v => `$${v.toFixed(2)}`;

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Exo+2:wght@300;400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000D1A; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.3); border-radius: 2px; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      <div style={{
        minHeight: "100vh", background: "#000D1A",
        fontFamily: "'Exo 2', sans-serif", color: "#fff", padding: "40px 20px"
      }}>

        {/* Background glow */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,119,189,0.15) 0%, transparent 70%)"
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48, animation: "fadeUp 0.6s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "linear-gradient(135deg, #0277BD, #00E5FF)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, boxShadow: "0 0 24px rgba(0,229,255,0.4)"
              }}>⚡</div>
              <h1 style={{
                fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900,
                background: "linear-gradient(90deg, #fff 30%, #00E5FF 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em"
              }}>
                EV Home Charging Calculator
              </h1>
            </div>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
              ගෙදරදී ඔබේ EV රථය චාර්ජ් කිරීමේ <strong style={{ color: "#64B5F6" }}>කාලය සහ වියදම</strong> ලෝකයේ ඕනෑම මුදල් ඒකකයකින් ගණනය කරන්න
            </p>
          </div>

          {/* Main Card */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 24, padding: "36px 32px",
            backdropFilter: "blur(12px)",
            animation: "fadeUp 0.6s ease 0.1s both"
          }}>

            {/* Sliders Row */}
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
              <Slider
                label="Vehicle Battery Capacity"
                value={batteryKwh} min={10} max={200} step={1}
                onChange={setBatteryKwh} unit=" kWh"
              />
              <Slider
                label="Electricity Tariff (USD / kWh)"
                value={tariff} min={0.01} max={1.0} step={0.01}
                onChange={setTariff} unit="" format={fmtTariff}
              />
            </div>

            {/* Charger + Currency Row */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 36 }}>
              {/* Charger dropdown */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#64B5F6", marginBottom: 4, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  Charger Capacity
                </p>
                <select
                  value={chargerKw}
                  onChange={e => setChargerKw(parseFloat(e.target.value))}
                  style={{
                    width: "100%", background: "rgba(0,229,255,0.08)",
                    border: "1px solid rgba(0,229,255,0.25)", borderRadius: 10,
                    padding: "10px 16px", color: "#fff", fontSize: 15,
                    fontWeight: 600, cursor: "pointer", outline: "none",
                    fontFamily: "'Exo 2', sans-serif"
                  }}
                >
                  {CHARGER_OPTIONS.map(o => (
                    <option key={o.value} value={o.value} style={{ background: "#001830" }}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency selector */}
              <div style={{ flex: 1, minWidth: 220 }}>
                <CurrencySelector currencies={currencies} selected={currency} onSelect={setCurrency} />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(255,152,0,0.1)", border: "1px solid rgba(255,152,0,0.3)",
                borderRadius: 10, padding: "10px 16px", marginBottom: 20,
                fontSize: 13, color: "#FFB74D"
              }}>⚠️ {error}</div>
            )}

            {/* Results */}
            <div style={{
              background: "rgba(0,0,0,0.3)", borderRadius: 16, padding: "24px",
              border: "1px solid rgba(0,229,255,0.1)"
            }}>
              {loading ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{
                    width: 32, height: 32, border: "3px solid rgba(0,229,255,0.2)",
                    borderTopColor: "#00E5FF", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite", display: "inline-block"
                  }} />
                </div>
              ) : result ? (
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  <ResultCard
                    label="⏱ Charging Time"
                    value={result.charging_time_formatted}
                    sub={`${batteryKwh} kWh ÷ ${chargerKw} kW`}
                  />
                  <ResultCard
                    label={`💰 Cost (${result.currency_code})`}
                    value={`${result.currency_symbol}${result.cost_local?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    sub={result.currency_code !== "USD" ? `= $${result.cost_usd?.toFixed(4)} USD` : `${batteryKwh} kWh × $${tariff}/kWh`}
                    accent
                  />
                  {result.currency_code !== "USD" && (
                    <ResultCard
                      label="📈 Exchange Rate"
                      value={`1 USD = ${result.exchange_rate?.toFixed(4)}`}
                      sub={result.currency_code}
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>

          {/* Fun fact */}
          <div style={{
            marginTop: 28, background: "rgba(0,229,255,0.05)",
            border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16,
            padding: "18px 24px", animation: "fadeUp 0.6s ease 0.3s both"
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#00E5FF", marginBottom: 4 }}>
              💡 Fun Fact – ගෙදරදී EV චාර්ජ් කිරීම කොතරම් ලාභද?
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              ගෙදරදී EV රථයක් නිතිපතා චාර්ජ් කිරීම, ඉන්ධන රථයක් මෙහෙයවීමට සාපේක්ෂව{" "}
              <strong style={{ color: "#fff" }}>70% දක්වා</strong> ඉතිරි කරගත හැකිය.
              ඔබේ Tariff සහ Battery Capacity අනුව ඉහත ගණකය භාවිතයෙන් ගෙදරදීම නිවැරදි ගණනය ලබාගන්න.
            </p>
          </div>

          {/* Formula explanation */}
          <div style={{
            marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap",
            animation: "fadeUp 0.6s ease 0.4s both"
          }}>
            {[
              { icon: "🔋", title: "Charging Time", formula: "Battery kWh ÷ Charger kW = Hours" },
              { icon: "💵", title: "Charging Cost", formula: "Battery kWh × Tariff (USD/kWh)" },
              { icon: "🌍", title: "Currency Convert", formula: "Cost USD × Exchange Rate" },
            ].map(f => (
              <div key={f.title} style={{
                flex: 1, minWidth: 200,
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12, padding: "14px 18px"
              }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{f.icon} {f.title}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>{f.formula}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p style={{ textAlign: "center", marginTop: 28, fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
            * This calculator provides approximate estimates. Actual charging time and cost may vary based on battery state, temperature, and charger efficiency.
            Exchange rates update hourly.
          </p>
        </div>
      </div>
    </>
  );
}