import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LithiumBatteryAnimation() {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const ionsRef = useRef([]);
  const electronsRef = useRef([]);
  const [mode, setMode] = useState("discharge"); // "discharge" | "charge"
  const modeRef = useRef("discharge");
  const [isPlaying, setIsPlaying] = useState(true);
  const isPlayingRef = useRef(true);
  const [speed, setSpeed] = useState(1);
  const speedRef = useRef(1);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Scene ─────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1e);
    scene.fog = new THREE.Fog(0x0a0f1e, 18, 35);
    sceneRef.current = scene;

    // ── Camera ────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(6, 5, 10);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x334466, 1.2));
    const sun = new THREE.DirectionalLight(0xffffff, 2.5);
    sun.position.set(8, 12, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    scene.add(sun);
    const fill = new THREE.PointLight(0x00d4ff, 1.5, 20);
    fill.position.set(-6, 3, 4);
    scene.add(fill);
    const rimLight = new THREE.PointLight(0xff6600, 1.0, 15);
    rimLight.position.set(4, -3, -5);
    scene.add(rimLight);

    // ── Helpers ───────────────────────────────────────────
    const mkMat = (color, opacity = 1, emissive = 0x000000, emissiveIntensity = 0) =>
      new THREE.MeshStandardMaterial({
        color,
        metalness: 0.3,
        roughness: 0.5,
        transparent: opacity < 1,
        opacity,
        emissive,
        emissiveIntensity,
      });

    const box = (w, h, d, mat, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      scene.add(m);
      return m;
    };

    // ── Battery body ──────────────────────────────────────
    // Cathode (aluminium current collector) - teal/green block
    const cathodeMat = mkMat(0x1abc9c, 1, 0x0d6e5a, 0.3);
    box(2.2, 3, 3.2, cathodeMat, -3.3, 0, 0);
    // Cathode label highlight
    const cathodeTop = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.08, 3.2),
      mkMat(0x2ecc71, 0.9, 0x1abc9c, 0.5)
    );
    cathodeTop.position.set(-3.3, 1.54, 0);
    scene.add(cathodeTop);

    // LI-Metal Oxides spheres (cathode material)
    const oxidePositions = [];
    for (let x = -4.0; x <= -2.6; x += 0.6) {
      for (let y = -1.1; y <= 1.1; y += 0.55) {
        for (let z = -1.2; z <= 1.2; z += 0.6) {
          oxidePositions.push([x, y, z]);
        }
      }
    }
    const oxideMat = mkMat(0x27ae60, 1, 0x145a32, 0.1);
    const oxideSm = mkMat(0xe74c3c, 1, 0x7b241c, 0.4);
    oxidePositions.forEach(([x, y, z]) => {
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), oxideMat);
      sphere.position.set(x, y, z);
      sphere.castShadow = true;
      scene.add(sphere);
    });

    // Separator - translucent layer
    const sepMat = new THREE.MeshStandardMaterial({
      color: 0xaaddff,
      transparent: true,
      opacity: 0.18,
      metalness: 0,
      roughness: 0.1,
      side: THREE.DoubleSide,
    });
    box(0.12, 3, 3.2, sepMat, -0.5, 0, 0);

    // Li-Metal Carbon layer (graphite hexagonal structure simulation)
    const carbonMat = mkMat(0x5d6d7e, 1, 0x1a252f, 0.2);
    box(1.0, 3, 3.2, carbonMat, 0.7, 0, 0);

    // Hexagonal grid on carbon (anode face)
    const hexGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.06, 6);
    const hexMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.6, roughness: 0.3 });
    for (let row = -2; row <= 2; row++) {
      for (let col = -2; col <= 2; col++) {
        const hx = new THREE.Mesh(hexGeo, hexMat);
        hx.rotation.y = Math.PI / 6;
        hx.rotation.z = Math.PI / 2;
        hx.position.set(1.22, row * 0.55, col * 0.55 + (row % 2) * 0.275);
        scene.add(hx);
      }
    }

    // Anode (copper current collector) - blue block
    const anodeMat = mkMat(0x3498db, 1, 0x1a5276, 0.25);
    box(1.6, 3, 3.2, anodeMat, 2.5, 0, 0);

    // Electrolyte - top translucent blue slab
    const elecMat = new THREE.MeshStandardMaterial({
      color: 0x5dade2,
      transparent: true,
      opacity: 0.22,
      metalness: 0,
      roughness: 0.05,
      emissive: 0x1a5276,
      emissiveIntensity: 0.15,
    });
    box(7, 0.7, 3.2, elecMat, -0.55, 1.85, 0);

    // ── Lithium Ions (red spheres) ─────────────────────────
    const ionMat = new THREE.MeshStandardMaterial({
      color: 0xff3030,
      emissive: 0xff1a00,
      emissiveIntensity: 0.8,
      metalness: 0.1,
      roughness: 0.3,
    });
    const ions = [];
    for (let i = 0; i < 18; i++) {
      const ion = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), ionMat);
      // Start positions spread across battery
      const startX = THREE.MathUtils.randFloat(-4.2, 2.8);
      ion.position.set(
        startX,
        THREE.MathUtils.randFloat(-1.2, 1.2),
        THREE.MathUtils.randFloat(-1.2, 1.2)
      );
      // Give each ion a random progress 0-1 and offset
      ion.userData = {
        progress: Math.random(),
        speed: THREE.MathUtils.randFloat(0.08, 0.18),
        yOffset: THREE.MathUtils.randFloat(-1.0, 1.0),
        zOffset: THREE.MathUtils.randFloat(-1.0, 1.0),
        trail: [],
      };
      scene.add(ion);
      ions.push(ion);
    }
    ionsRef.current = ions;

    // Ion trail geometry
    const trailMat = new THREE.MeshBasicMaterial({ color: 0xff6060, transparent: true, opacity: 0.25 });

    // ── Electrons (small white/cyan particles, external circuit) ─
    const elecParticleMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ccff,
      emissiveIntensity: 1.2,
    });
    const electrons = [];
    for (let i = 0; i < 10; i++) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), elecParticleMat);
      e.userData = { progress: i / 10 };
      scene.add(e);
      electrons.push(e);
    }
    electronsRef.current = electrons;

    // External circuit path (top arc)
    const arcPoints = [];
    for (let t = 0; t <= 1; t += 0.02) {
      const x = THREE.MathUtils.lerp(-3.3, 2.5, t);
      const y = 2.5 + Math.sin(t * Math.PI) * 1.5;
      arcPoints.push(new THREE.Vector3(x, y, 0));
    }
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcLine = new THREE.Line(arcGeo, new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 }));
    scene.add(arcLine);

    // Glowing circuit line
    const circuitMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.3 });
    const tubeGeo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(arcPoints),
      64, 0.03, 6, false
    );
    scene.add(new THREE.Mesh(tubeGeo, circuitMat));

    // ── Floating labels (canvas textures) ─────────────────
    const makeLabel = (text, color = "#00d4ff") => {
      const canvas = document.createElement("canvas");
      canvas.width = 512; canvas.height = 128;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "transparent";
      ctx.clearRect(0, 0, 512, 128);
      ctx.font = "bold 42px 'Courier New', monospace";
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.shadowColor = color;
      ctx.shadowBlur = 18;
      ctx.fillText(text, 256, 75);
      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(2.8, 0.7, 1);
      return sprite;
    };

    const labels = [
      { text: "CATHODE (+)", color: "#1abc9c", pos: [-3.3, 2.6, 0] },
      { text: "ANODE (−)", color: "#3498db", pos: [2.5, 2.6, 0] },
      { text: "ELECTROLYTE", color: "#5dade2", pos: [-0.5, 3.2, 0] },
      { text: "SEPARATOR", color: "#aaddff", pos: [-0.5, -2.1, 0] },
      { text: "Li⁺ ION", color: "#ff4444", pos: [0.2, -2.5, 0] },
      { text: "e⁻ ELECTRON", color: "#00ffff", pos: [-0.5, 4.5, 0] },
    ];
    labels.forEach(({ text, color, pos }) => {
      const s = makeLabel(text, color);
      s.position.set(...pos);
      scene.add(s);
    });

    // ── Mode label ─────────────────────────────────────────
    const modeCanvas = document.createElement("canvas");
    modeCanvas.width = 512; modeCanvas.height = 128;
    const modeCtx = modeCanvas.getContext("2d");
    const modeTex = new THREE.CanvasTexture(modeCanvas);
    const modeMat = new THREE.SpriteMaterial({ map: modeTex, transparent: true });
    const modeSprite = new THREE.Sprite(modeMat);
    modeSprite.scale.set(3.5, 0.9, 1);
    modeSprite.position.set(-0.5, -3.3, 0);
    scene.add(modeSprite);

    const updateModeLabel = (m) => {
      modeCtx.clearRect(0, 0, 512, 128);
      modeCtx.font = "bold 52px 'Courier New', monospace";
      const c = m === "discharge" ? "#ff8800" : "#00ff88";
      modeCtx.fillStyle = c;
      modeCtx.shadowColor = c;
      modeCtx.shadowBlur = 22;
      modeCtx.textAlign = "center";
      modeCtx.fillText(m === "discharge" ? "◀ DISCHARGE" : "▶ CHARGE", 256, 80);
      modeTex.needsUpdate = true;
    };
    updateModeLabel("discharge");

    // ── Camera gentle orbit ────────────────────────────────
    let camAngle = 0;

    // ── Animate ────────────────────────────────────────────
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const dt = clockRef.current.getDelta();
      const t = clockRef.current.getElapsedTime();

      if (!isPlayingRef.current) return;

      const spd = speedRef.current;
      const currentMode = modeRef.current;

      // Gentle camera orbit
      camAngle += dt * 0.12;
      camera.position.x = Math.cos(camAngle) * 11 * 0.55 + 0;
      camera.position.z = Math.sin(camAngle) * 10 * 0.55 + 0;
      camera.position.y = 5 + Math.sin(camAngle * 0.5) * 0.8;
      camera.lookAt(0, 0.5, 0);

      // Update mode label
      updateModeLabel(currentMode);

      // Move lithium ions: discharge = cathode → anode (+x), charge = anode → cathode (−x)
      ionsRef.current.forEach((ion) => {
        ion.userData.progress += dt * ion.userData.speed * spd;
        if (ion.userData.progress > 1) ion.userData.progress -= 1;
        const p = ion.userData.progress;

        let x, y, z;
        if (currentMode === "discharge") {
          // Left to right: cathode (x=-4.2) → anode (x=2.8)
          x = THREE.MathUtils.lerp(-4.2, 2.8, p);
        } else {
          // Right to left: anode → cathode
          x = THREE.MathUtils.lerp(2.8, -4.2, p);
        }
        y = ion.userData.yOffset + Math.sin(p * Math.PI * 3 + t) * 0.15;
        z = ion.userData.zOffset + Math.cos(p * Math.PI * 2 + t * 0.7) * 0.1;
        ion.position.set(x, y, z);

        // Pulse emissive
        ion.material.emissiveIntensity = 0.5 + Math.sin(t * 4 + ion.userData.progress * 10) * 0.3;
      });

      // Move electrons along external circuit arc
      electronsRef.current.forEach((e) => {
        e.userData.progress += dt * 0.4 * spd;
        if (e.userData.progress > 1) e.userData.progress -= 1;
        let p = e.userData.progress;
        if (currentMode === "charge") p = 1 - p; // reverse direction
        const idx = Math.floor(p * (arcPoints.length - 1));
        const next = Math.min(idx + 1, arcPoints.length - 1);
        const frac = p * (arcPoints.length - 1) - idx;
        const pos = arcPoints[idx].clone().lerp(arcPoints[next], frac);
        e.position.copy(pos);
        e.material.emissiveIntensity = 0.8 + Math.sin(t * 6 + p * 20) * 0.4;
      });

      // Subtle pulsing on electrolyte glow
      fill.intensity = 1.2 + Math.sin(t * 1.5) * 0.4;
      rimLight.intensity = 0.8 + Math.cos(t * 1.1) * 0.3;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#0a0f1e", fontFamily: "'Courier New', monospace", overflow: "hidden", position: "relative" }}>
      {/* Title */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", padding: "18px 0 0", zIndex: 10, pointerEvents: "none" }}>
        <h1 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 32px)", letterSpacing: "0.18em", color: "#00d4ff", textShadow: "0 0 24px #00d4ff, 0 0 60px #0066ff", fontWeight: 900 }}>
          LITHIUM-ION BATTERY
        </h1>
        <p style={{ margin: "4px 0 0", color: "#5dade2", fontSize: "clamp(10px, 1.4vw, 14px)", letterSpacing: "0.25em", opacity: 0.75 }}>
          3D ELECTROCHEMICAL SIMULATION
        </p>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Legend */}
      <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { color: "#1abc9c", label: "Cathode (Al+ Collector)" },
          { color: "#3498db", label: "Anode (Cu- Collector)" },
          { color: "#ff4444", label: "Li⁺ Ions" },
          { color: "#00ffff", label: "Electrons (e⁻)" },
          { color: "#aaddff", label: "Electrolyte / Separator" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
            <span style={{ color: "#cde", fontSize: "clamp(10px, 1.2vw, 13px)", letterSpacing: "0.1em" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div style={{ position: "absolute", bottom: 20, right: 20, zIndex: 10, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
        {/* Mode toggle */}
        <div style={{ display: "flex", gap: 8 }}>
          {["discharge", "charge"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: "8px 18px",
                borderRadius: 6,
                border: `2px solid ${mode === m ? (m === "discharge" ? "#ff8800" : "#00ff88") : "#334"}`,
                background: mode === m ? (m === "discharge" ? "rgba(255,136,0,0.18)" : "rgba(0,255,136,0.18)") : "rgba(10,15,30,0.7)",
                color: mode === m ? (m === "discharge" ? "#ff8800" : "#00ff88") : "#556",
                cursor: "pointer",
                fontFamily: "'Courier New', monospace",
                fontWeight: 700,
                fontSize: "clamp(10px, 1.2vw, 13px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                boxShadow: mode === m ? `0 0 16px ${m === "discharge" ? "#ff880066" : "#00ff8866"}` : "none",
                transition: "all 0.25s",
              }}
            >
              {m === "discharge" ? "◀ Discharge" : "Charge ▶"}
            </button>
          ))}
        </div>

        {/* Play/Pause */}
        <button
          onClick={() => setIsPlaying((p) => !p)}
          style={{
            padding: "8px 18px",
            borderRadius: 6,
            border: "2px solid #00d4ff",
            background: "rgba(0,212,255,0.12)",
            color: "#00d4ff",
            cursor: "pointer",
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            fontSize: "clamp(10px, 1.2vw, 13px)",
            letterSpacing: "0.15em",
            boxShadow: "0 0 12px #00d4ff44",
          }}
        >
          {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
        </button>

        {/* Speed */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "#5dade2", fontSize: "clamp(9px, 1.1vw, 12px)", letterSpacing: "0.1em" }}>SPEED</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              style={{
                padding: "5px 12px",
                borderRadius: 5,
                border: `1px solid ${speed === s ? "#00d4ff" : "#334"}`,
                background: speed === s ? "rgba(0,212,255,0.2)" : "transparent",
                color: speed === s ? "#00d4ff" : "#556",
                cursor: "pointer",
                fontFamily: "'Courier New', monospace",
                fontSize: "clamp(9px, 1.1vw, 12px)",
                fontWeight: 700,
              }}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>

      {/* Process description */}
      <div style={{
        position: "absolute", top: "50%", right: 16, transform: "translateY(-50%)",
        zIndex: 10, maxWidth: 180, background: "rgba(10,15,30,0.75)",
        border: "1px solid #1a3050", borderRadius: 10, padding: "14px 14px",
        backdropFilter: "blur(8px)", pointerEvents: "none",
      }}>
        <div style={{ color: mode === "discharge" ? "#ff8800" : "#00ff88", fontWeight: 900, fontSize: 13, letterSpacing: "0.15em", marginBottom: 10 }}>
          {mode === "discharge" ? "DISCHARGE" : "CHARGE"}
        </div>
        {(mode === "discharge" ? [
          "Li⁺ ions travel cathode → anode through electrolyte",
          "e⁻ flow through external circuit",
          "Energy released to load",
        ] : [
          "Li⁺ ions travel anode → cathode",
          "e⁻ flow in reverse via external source",
          "Energy stored in battery",
        ]).map((line, i) => (
          <div key={i} style={{ color: "#8ab", fontSize: 11, lineHeight: 1.55, marginBottom: 5, paddingLeft: 10, borderLeft: `2px solid ${mode === "discharge" ? "#ff880060" : "#00ff8860"}` }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}