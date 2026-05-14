import { useState, useEffect, useRef } from "react";

// ─── Particle (Li-ion) flowing along a path ───────────────────────────────────
function IonParticle({ x, y, delay, color, size = 6 }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: `ionPulse 2s ${delay}s ease-in-out infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Animated flowing ion stream ──────────────────────────────────────────────
function IonStream({ isCharging }) {
  const particles = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((i) => {
        const progress = i / particles.length;
        const x = isCharging
          ? `${85 - progress * 55}%`
          : `${30 + progress * 55}%`;
        const y = `${38 + Math.sin(progress * Math.PI * 2) * 8}%`;
        return (
          <IonParticle
            key={i}
            x={x}
            y={y}
            delay={i * 0.15}
            color={isCharging ? "#22d3ee" : "#f97316"}
            size={5 + Math.sin(progress * Math.PI) * 3}
          />
        );
      })}
    </div>
  );
}

// ─── 3D Battery Layer ─────────────────────────────────────────────────────────
function BatteryLayer({ label, color, depth, zIndex, isActive, children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translateZ(${depth}px)`,
        zIndex,
        border: `1px solid ${isActive ? color + "cc" : color + "44"}`,
        background: isActive
          ? `linear-gradient(135deg, ${color}22 0%, ${color}08 100%)`
          : `linear-gradient(135deg, #0a1628 0%, #071020 100%)`,
        backdropFilter: "blur(4px)",
        transition: "all 0.8s ease",
        boxShadow: isActive ? `inset 0 0 30px ${color}22, 0 0 20px ${color}33` : "none",
        borderRadius: 4,
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 8,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: isActive ? color : color + "66",
          fontFamily: "'Courier New', monospace",
          transition: "color 0.8s ease",
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ─── Electrode Grid (cathode / anode structure) ───────────────────────────────
function ElectrodeGrid({ color, rows = 5, cols = 8, filledRatio }) {
  const cells = Array.from({ length: rows * cols }, (_, i) => i);
  const filled = Math.floor(cells.length * filledRatio);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 3,
        padding: 8,
        width: "100%",
        height: "100%",
      }}
    >
      {cells.map((i) => (
        <div
          key={i}
          style={{
            borderRadius: "50%",
            background: i < filled ? color : color + "22",
            boxShadow: i < filled ? `0 0 6px ${color}` : "none",
            transition: `background 0.3s ${(i % 8) * 0.05}s ease, box-shadow 0.3s ease`,
            aspectRatio: "1",
          }}
        />
      ))}
    </div>
  );
}

// ─── Carbon Anode Hexagonal Grid ──────────────────────────────────────────────
function HexGrid({ filledRatio, color }) {
  const hexes = Array.from({ length: 24 }, (_, i) => i);
  const filled = Math.floor(hexes.length * filledRatio);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        padding: 8,
        alignContent: "flex-start",
      }}
    >
      {hexes.map((i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: 16,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: i < filled ? color : color + "22",
            boxShadow: i < filled ? `0 0 4px ${color}` : "none",
            transition: `background 0.4s ${(i % 6) * 0.06}s ease`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Electrolyte Flow Visualization ───────────────────────────────────────────
function ElectrolyteLayer({ isCharging, intensity }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* Wave lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: `${15 + i * 16}%`,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${
              isCharging ? "#22d3ee" : "#34d399"
            }${Math.floor(intensity * 160).toString(16).padStart(2, "0")}, transparent)`,
            animation: `waveLine ${1.5 + i * 0.2}s ${i * 0.1}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Charge Level Bar ─────────────────────────────────────────────────────────
function ChargeMeter({ level, isCharging }) {
  const segments = 10;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
      <div style={{ fontSize: 10, color: "#94a3b8", letterSpacing: "0.2em", fontFamily: "monospace" }}>
        CHARGE
      </div>
      <div style={{ display: "flex", gap: 3 }}>
        {Array.from({ length: segments }, (_, i) => {
          const filled = i / segments < level;
          const color = i < 3 ? "#ef4444" : i < 7 ? "#f59e0b" : "#22d3ee";
          return (
            <div
              key={i}
              style={{
                width: 8,
                height: 24,
                borderRadius: 2,
                background: filled ? color : color + "22",
                boxShadow: filled ? `0 0 6px ${color}` : "none",
                transition: `background 0.3s ${i * 0.05}s, box-shadow 0.3s ${i * 0.05}s`,
              }}
            />
          );
        })}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 900,
          fontFamily: "monospace",
          color: isCharging ? "#22d3ee" : "#f97316",
          textShadow: `0 0 20px ${isCharging ? "#22d3ee" : "#f97316"}`,
          transition: "color 0.5s, text-shadow 0.5s",
        }}
      >
        {Math.round(level * 100)}%
      </div>
    </div>
  );
}

// ─── Electron Flow Arrow ──────────────────────────────────────────────────────
function ElectronFlow({ isCharging }) {
  const direction = isCharging ? "←" : "→";
  const color = isCharging ? "#22d3ee" : "#f97316";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        padding: "6px 14px",
        border: `1px solid ${color}44`,
        borderRadius: 20,
        background: color + "11",
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", boxShadow: "0 0 8px #f59e0b" }} />
      <span style={{ fontSize: 11, color: "#94a3b8", fontFamily: "monospace", letterSpacing: "0.1em" }}>
        e⁻
      </span>
      <div
        style={{
          fontSize: 18,
          color,
          animation: "arrowPulse 1s ease-in-out infinite",
          textShadow: `0 0 10px ${color}`,
          transition: "color 0.5s",
        }}
      >
        {direction}
      </div>
      <span style={{ fontSize: 9, color: "#64748b", fontFamily: "monospace" }}>
        {isCharging ? "CHARGER" : "LOAD"}
      </span>
    </div>
  );
}

// ─── 3D Battery Scene ─────────────────────────────────────────────────────────
function Battery3D({ isCharging, chargeLevel }) {
  const cathodeRatio = isCharging ? 1 - chargeLevel : chargeLevel;
  const anodeRatio = isCharging ? chargeLevel : 1 - chargeLevel;

  return (
    <div
      style={{
        width: 480,
        height: 220,
        position: "relative",
        perspective: 1200,
        perspectiveOrigin: "50% 40%",
        margin: "0 auto",
      }}
    >
      {/* 3D container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(20deg) rotateY(-15deg)",
          animation: "gentleRotate 20s ease-in-out infinite",
        }}
      >
        {/* ── CATHODE (LiMetal Oxides – left green) ── */}
        <div
          style={{
            position: "absolute",
            left: "2%",
            top: "10%",
            width: "28%",
            height: "80%",
            transformStyle: "preserve-3d",
          }}
        >
          <BatteryLayer label="Cathode (+)" color="#34d399" depth={0} zIndex={1} isActive={!isCharging}>
            <ElectrodeGrid color="#34d399" filledRatio={cathodeRatio} rows={5} cols={5} />
          </BatteryLayer>
          {/* Aluminium current collector top edge */}
          <div
            style={{
              position: "absolute",
              top: -12,
              left: 0,
              right: 0,
              height: 12,
              background: "linear-gradient(180deg, #94a3b8 0%, #475569 100%)",
              transform: "rotateX(90deg) translateZ(-6px)",
              fontSize: 7,
              color: "#1e293b",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: "0.1em",
            }}
          >
            Al COLLECTOR
          </div>
        </div>

        {/* ── SEPARATOR ── */}
        <div
          style={{
            position: "absolute",
            left: "31%",
            top: "8%",
            width: "8%",
            height: "84%",
            transformStyle: "preserve-3d",
          }}
        >
          <BatteryLayer label="Sep." color="#a78bfa" depth={0} zIndex={2} isActive={true}>
            <div style={{ padding: 4 }}>
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    height: 3,
                    margin: "2px 0",
                    background: `rgba(167,139,250,${0.2 + Math.sin(i) * 0.15})`,
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
          </BatteryLayer>
        </div>

        {/* ── ELECTROLYTE ── */}
        <div
          style={{
            position: "absolute",
            left: "30%",
            top: "5%",
            width: "40%",
            height: "90%",
            transformStyle: "preserve-3d",
            zIndex: 3,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: isCharging
                ? "linear-gradient(135deg, rgba(34,211,238,0.08) 0%, rgba(6,182,212,0.04) 100%)"
                : "linear-gradient(135deg, rgba(52,211,153,0.08) 0%, rgba(16,185,129,0.04) 100%)",
              border: `1px solid ${isCharging ? "#22d3ee" : "#34d399"}22`,
              borderRadius: 4,
              overflow: "hidden",
              transition: "background 0.8s, border-color 0.8s",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.15em",
                color: "#22d3ee99",
                fontFamily: "monospace",
                whiteSpace: "nowrap",
              }}
            >
              ELECTROLYTE
            </div>
            <ElectrolyteLayer isCharging={isCharging} intensity={0.7} />

            {/* Li+ ions floating */}
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${10 + (i % 4) * 22}%`,
                  top: `${20 + Math.floor(i / 4) * 40}%`,
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#ef4444",
                  boxShadow: "0 0 8px #ef4444",
                  fontSize: 6,
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontFamily: "monospace",
                  animation: `ionFloat ${1.5 + i * 0.2}s ${i * 0.18}s ease-in-out infinite`,
                }}
              >
                Li
              </div>
            ))}
          </div>
        </div>

        {/* ── ANODE (Carbon – right blue) ── */}
        <div
          style={{
            position: "absolute",
            right: "2%",
            top: "10%",
            width: "28%",
            height: "80%",
            transformStyle: "preserve-3d",
          }}
        >
          <BatteryLayer label="Anode (–)" color="#22d3ee" depth={0} zIndex={1} isActive={isCharging}>
            <HexGrid filledRatio={anodeRatio} color="#22d3ee" />
          </BatteryLayer>
          {/* Copper current collector */}
          <div
            style={{
              position: "absolute",
              top: -12,
              left: 0,
              right: 0,
              height: 12,
              background: "linear-gradient(180deg, #f59e0b 0%, #b45309 100%)",
              transform: "rotateX(90deg) translateZ(-6px)",
              fontSize: 7,
              color: "#1e293b",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              letterSpacing: "0.1em",
            }}
          >
            Cu COLLECTOR
          </div>
        </div>

        {/* ── ION STREAM (moving particles) ── */}
        <IonStream isCharging={isCharging} />
      </div>
    </div>
  );
}

// ─── Info Panel ───────────────────────────────────────────────────────────────
function InfoPanel({ label, value, unit, color, icon }) {
  return (
    <div
      style={{
        background: "rgba(7,17,36,0.8)",
        border: `1px solid ${color}33`,
        borderRadius: 8,
        padding: "10px 16px",
        backdropFilter: "blur(12px)",
        minWidth: 100,
      }}
    >
      <div style={{ fontSize: 9, color: "#64748b", letterSpacing: "0.2em", fontFamily: "monospace", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span style={{ fontSize: 22, fontWeight: 900, color, fontFamily: "monospace", textShadow: `0 0 15px ${color}` }}>
          {value}
        </span>
        <span style={{ fontSize: 11, color: "#64748b", fontFamily: "monospace" }}>{unit}</span>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LithiumBatteryAnimation() {
  const [isCharging, setIsCharging] = useState(false);
  const [chargeLevel, setChargeLevel] = useState(0.35);
  const [isAnimating, setIsAnimating] = useState(false);
  const [voltage, setVoltage] = useState(3.7);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  // Simulate charge/discharge
  useEffect(() => {
    if (!isAnimating) return;
    intervalRef.current = setInterval(() => {
      setChargeLevel((prev) => {
        const delta = isCharging ? 0.004 : -0.004;
        const next = Math.max(0.02, Math.min(0.98, prev + delta));
        if (next >= 0.98 || next <= 0.02) {
          setIsAnimating(false);
        }
        return next;
      });
      setVoltage(isCharging ? +(3.0 + chargeLevel * 1.2).toFixed(2) : +(2.8 + chargeLevel * 1.3).toFixed(2));
      setCurrent(isCharging ? 2.4 : -1.8);
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, [isAnimating, isCharging, chargeLevel]);

  const handleToggle = () => {
    setIsCharging((c) => !c);
    setIsAnimating(true);
  };

  const modeColor = isCharging ? "#22d3ee" : "#f97316";
  const modeLabel = isCharging ? "CHARGING" : "DISCHARGING";

  return (
    <>
      <style>{`
        @keyframes gentleRotate {
          0%, 100% { transform: rotateX(20deg) rotateY(-15deg); }
          50% { transform: rotateX(18deg) rotateY(-10deg); }
        }
        @keyframes ionPulse {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes ionFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          33% { transform: translateY(-6px) translateX(3px); opacity: 1; }
          66% { transform: translateY(4px) translateX(-3px); opacity: 0.8; }
        }
        @keyframes waveLine {
          0% { transform: scaleX(0.8) translateX(-5%); opacity: 0.3; }
          100% { transform: scaleX(1.1) translateX(5%); opacity: 0.8; }
        }
        @keyframes arrowPulse {
          0%, 100% { transform: translateX(0px); opacity: 0.7; }
          50% { transform: translateX(3px); opacity: 1; }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#050816",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "32px 16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glows */}
        <div style={{ position: "absolute", top: "15%", left: "5%", width: 350, height: 350, borderRadius: "50%", background: "rgba(34,211,238,0.07)", filter: "blur(100px)", animation: "glowPulse 4s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(52,211,153,0.07)", filter: "blur(110px)", animation: "glowPulse 5s 1s ease-in-out infinite", pointerEvents: "none" }} />

        {/* Scan line effect */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.15), transparent)", animation: "scanLine 8s linear infinite", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.4em", color: "#22d3ee99", fontWeight: 700, textTransform: "uppercase", fontFamily: "monospace", marginBottom: 10 }}>
            ⬡ ELECTROCHEMICAL CELL SIMULATION
          </div>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 900,
              margin: 0,
              background: "linear-gradient(135deg, #22d3ee 0%, #34d399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 1.1,
            }}
          >
            Lithium-Ion Battery
          </h1>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 8, letterSpacing: "0.05em" }}>
            Interactive 3D Charge / Discharge Cycle Visualization
          </div>
        </div>

        {/* Mode badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 100,
            border: `1.5px solid ${modeColor}55`,
            background: modeColor + "11",
            marginBottom: 24,
            transition: "all 0.5s ease",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: modeColor,
              boxShadow: `0 0 12px ${modeColor}`,
              animation: isAnimating ? "ionPulse 0.8s ease-in-out infinite" : "none",
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 700, color: modeColor, letterSpacing: "0.25em", fontFamily: "monospace" }}>
            {modeLabel}
          </span>
          {isAnimating && (
            <span style={{ fontSize: 10, color: modeColor + "88", fontFamily: "monospace" }}>● LIVE</span>
          )}
        </div>

        {/* 3D Battery */}
        <div style={{ width: "100%", maxWidth: 600, position: "relative" }}>
          <Battery3D isCharging={isCharging} chargeLevel={chargeLevel} />
        </div>

        {/* Labels below battery */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 500,
            marginTop: 8,
            padding: "0 10px",
          }}
        >
          {[
            { label: "Li-Metal Oxides", sub: "LiCoO₂ / NMC", color: "#34d399" },
            { label: "Separator", sub: "Polyethylene", color: "#a78bfa" },
            { label: "Electrolyte", sub: "LiPF₆ Solution", color: "#22d3ee" },
            { label: "Carbon Anode", sub: "Graphite Layers", color: "#22d3ee" },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: item.color, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                {item.label}
              </div>
              <div style={{ fontSize: 8, color: "#475569", fontFamily: "monospace" }}>{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Electron flow + charge meter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 28,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <ElectronFlow isCharging={isCharging} />
          <ChargeMeter level={chargeLevel} isCharging={isCharging} />

          {/* Stats */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
            <InfoPanel label="VOLTAGE" value={voltage.toFixed(1)} unit="V" color="#22d3ee" />
            <InfoPanel label="CURRENT" value={Math.abs(current).toFixed(1)} unit="A" color={isCharging ? "#22d3ee" : "#f97316"} />
            <InfoPanel label="CYCLE" value="247" unit="cyc" color="#34d399" />
          </div>
        </div>

        {/* Control Button */}
        <button
          onClick={handleToggle}
          style={{
            marginTop: 32,
            padding: "14px 40px",
            borderRadius: 100,
            border: `2px solid ${modeColor}66`,
            background: `linear-gradient(135deg, ${modeColor}22 0%, transparent 100%)`,
            color: modeColor,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.25em",
            fontFamily: "monospace",
            cursor: "pointer",
            textTransform: "uppercase",
            backdropFilter: "blur(12px)",
            boxShadow: `0 0 30px ${modeColor}22`,
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = `0 0 50px ${modeColor}44`;
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = `0 0 30px ${modeColor}22`;
            e.target.style.transform = "translateY(0)";
          }}
        >
          {isCharging ? "⚡ Switch to Discharge" : "🔋 Switch to Charge"}
        </button>

        {/* Legend */}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { color: "#ef4444", label: "Li⁺ Ions" },
            { color: "#f59e0b", label: "Electrons (e⁻)" },
            { color: "#34d399", label: "Cathode Material" },
            { color: "#22d3ee", label: "Anode (Graphite)" },
            { color: "#a78bfa", label: "Separator" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color, boxShadow: `0 0 6px ${item.color}` }} />
              <span style={{ fontSize: 10, color: "#64748b", fontFamily: "monospace", letterSpacing: "0.1em" }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: 24, fontSize: 10, color: "#1e3a5f", fontFamily: "monospace", letterSpacing: "0.15em" }}>
          LI-ION CELL · 3.6V NOMINAL · 3000mAh · NMC CHEMISTRY
        </div>
      </div>
    </>
  );
}