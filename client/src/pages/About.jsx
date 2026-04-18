import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function LithiumBatteryAnimation() {
  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  // FIX 1: Use THREE.Timer instead of deprecated THREE.Clock
  const timerRef = useRef(null);
  const ionsRef = useRef([]);
  const electronsRef = useRef([]);
  const arcPointsRef = useRef([]);
  const modeRef = useRef("discharge");
  const isPlayingRef = useRef(true);
  const speedRef = useRef(1);

  const [mode, setMode] = useState("discharge");
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  useEffect(() => {
    const container = mountRef.current;
    const W = container.clientWidth;
    const H = container.clientHeight;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x080d1a, 1);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Timer (replaces deprecated Clock) ────────────────
    // THREE.Timer is available in Three.js r155+
    // Fallback: manual timer using Date.now() for older versions
    let timer;
    let elapsed = 0;
    let lastTime = performance.now();

    const getDelta = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05); // cap at 50ms
      lastTime = now;
      elapsed += dt;
      return dt;
    };
    const getElapsed = () => elapsed;

    // ── Scene & Camera ────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080d1a, 0.042);

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.set(0, 3.5, 13);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x223355, 1.8));

    const sun = new THREE.DirectionalLight(0xffffff, 2.2);
    sun.position.set(6, 10, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -10; sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10; sun.shadow.camera.bottom = -10;
    scene.add(sun);

    const fillLight = new THREE.PointLight(0x00d4ff, 2.0, 25);
    fillLight.position.set(-5, 2, 5);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff6600, 1.2, 18);
    rimLight.position.set(5, -2, -4);
    scene.add(rimLight);

    // ── Battery group (scaled to fit screen) ──────────────
    const G = new THREE.Group();
    G.scale.set(0.7, 0.7, 0.7);
    G.position.set(0, -0.2, 0);
    scene.add(G);

    // ── Helpers ───────────────────────────────────────────
    const stdMat = (color, emissive = 0x000000, emInt = 0) =>
      new THREE.MeshStandardMaterial({
        color, metalness: 0.25, roughness: 0.55,
        emissive, emissiveIntensity: emInt,
      });

    // FIX 2: Never use Object.assign on a Mesh — set position explicitly
    const addBox = (w, h, d, mat, x, y, z) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);       // explicit set, not Object.assign
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      G.add(mesh);
      return mesh;
    };

    const addMesh = (geo, mat, x, y, z, group = G) => {
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);       // explicit set
      group.add(mesh);
      return mesh;
    };

    // ── Cathode (teal) ────────────────────────────────────
    addBox(1.9, 2.8, 2.8, stdMat(0x16a085, 0x0e6655, 0.25), -3.15, 0, 0);

    // Cathode top glow strip
    addMesh(
      new THREE.BoxGeometry(1.9, 0.07, 2.8),
      new THREE.MeshStandardMaterial({ color: 0x1abc9c, emissive: 0x1abc9c, emissiveIntensity: 0.6 }),
      -3.15, 1.44, 0
    );

    // LiMetal Oxide spheres inside cathode
    const oxMat = stdMat(0x1e8449, 0x145a32, 0.1);
    const liDotMat = new THREE.MeshStandardMaterial({ color: 0xe74c3c, emissive: 0xff2200, emissiveIntensity: 0.5 });
    for (let xi = -3.85; xi <= -2.5; xi += 0.52) {
      for (let yi = -0.95; yi <= 0.95; yi += 0.48) {
        for (let zi = -0.85; zi <= 0.85; zi += 0.48) {
          addMesh(new THREE.SphereGeometry(0.15, 10, 10), oxMat, xi, yi, zi);
          addMesh(new THREE.SphereGeometry(0.056, 8, 8), liDotMat, xi, yi, zi);
        }
      }
    }

    // ── Separator (translucent) ───────────────────────────
    addBox(
      0.12, 2.8, 2.8,
      new THREE.MeshStandardMaterial({ color: 0x85c1e9, transparent: true, opacity: 0.22, side: THREE.DoubleSide }),
      -1.95, 0, 0
    );

    // ── Carbon / Graphite layer ───────────────────────────
    addBox(1.4, 2.8, 2.8, stdMat(0x4d5d6e, 0x1a252f, 0.15), -0.95, 0, 0);

    const hexGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.055, 6);
    const hexMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50, metalness: 0.7, roughness: 0.25 });
    for (let row = -2; row <= 2; row++) {
      for (let col = -2; col <= 2; col++) {
        const h = new THREE.Mesh(hexGeo, hexMat);
        h.rotation.y = Math.PI / 6;
        h.rotation.z = Math.PI / 2;
        h.position.set(-0.22, row * 0.48, col * 0.48 + (row % 2) * 0.24);
        G.add(h);
      }
    }

    // ── Anode (blue) ──────────────────────────────────────
    addBox(1.5, 2.8, 2.8, stdMat(0x2471a3, 0x1a5276, 0.2), 1.65, 0, 0);

    addMesh(
      new THREE.BoxGeometry(1.5, 0.07, 2.8),
      new THREE.MeshStandardMaterial({ color: 0x3498db, emissive: 0x3498db, emissiveIntensity: 0.5 }),
      1.65, 1.44, 0
    );

    // ── Electrolyte slab (top) ────────────────────────────
    addBox(
      6.5, 0.52, 2.8,
      new THREE.MeshStandardMaterial({ color: 0x5dade2, transparent: true, opacity: 0.2, emissive: 0x1a5276, emissiveIntensity: 0.1 }),
      -0.75, 1.66, 0
    );

    // ── Lithium Ions ──────────────────────────────────────
    const ionBaseMat = new THREE.MeshStandardMaterial({
      color: 0xff2222, emissive: 0xff1100, emissiveIntensity: 0.9,
      metalness: 0.05, roughness: 0.3,
    });
    const ions = [];
    for (let i = 0; i < 22; i++) {
      const ion = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), ionBaseMat.clone());
      ion.userData = {
        progress: Math.random(),
        speed: 0.065 + Math.random() * 0.12,
        yBase: -1.0 + Math.random() * 2.0,
        zBase: -0.85 + Math.random() * 1.7,
      };
      G.add(ion);
      ions.push(ion);
    }
    ionsRef.current = ions;

    // ── External circuit arc (world space) ────────────────
    const S = 0.7;
    const arcXL = -3.15 * S;
    const arcXR =  1.65 * S;
    const arcY0 = -0.2;
    const arcPts = [];
    for (let t = 0; t <= 1; t += 0.02) {
      arcPts.push(new THREE.Vector3(
        arcXL + (arcXR - arcXL) * t,
        arcY0 + 5.0 * Math.sin(t * Math.PI),
        0
      ));
    }
    arcPointsRef.current = arcPts;

    const arcCurve = new THREE.CatmullRomCurve3(arcPts);
    const tube = new THREE.Mesh(
      new THREE.TubeGeometry(arcCurve, 80, 0.026, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.32 })
    );
    scene.add(tube);

    // ── Electrons ─────────────────────────────────────────
    const eMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ccff, emissiveIntensity: 1.3 });
    const electrons = [];
    for (let i = 0; i < 12; i++) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.065, 8, 8), eMat.clone());
      e.userData = { progress: i / 12 };
      scene.add(e);
      electrons.push(e);
    }
    electronsRef.current = electrons;

    // ── Canvas sprite label helper ────────────────────────
    const makeLabel = (text, textColor, bgColor, fontSize = 34) => {
      const canvas = document.createElement("canvas");
      canvas.width = 520; canvas.height = 100;
      const ctx = canvas.getContext("2d");
      const r = 14;
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.moveTo(r, 0); ctx.lineTo(520 - r, 0);
      ctx.quadraticCurveTo(520, 0, 520, r);
      ctx.lineTo(520, 100 - r);
      ctx.quadraticCurveTo(520, 100, 520 - r, 100);
      ctx.lineTo(r, 100);
      ctx.quadraticCurveTo(0, 100, 0, 100 - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.fill();
      ctx.font = `900 ${fontSize}px 'Courier New', monospace`;
      ctx.fillStyle = textColor;
      ctx.shadowColor = textColor;
      ctx.shadowBlur = 14;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 260, 52);
      const tex = new THREE.CanvasTexture(canvas);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
      return sprite;
    };

    // ── Static labels ─────────────────────────────────────
    const staticLabels = [
      { t: "CATHODE (+)",      tc: "#1dbe91", bg: "rgba(14,102,85,0.82)",  x: -3.15*S, y:  2.48, sw: 2.3,  sh: 0.44 },
      { t: "ANODE (−)",        tc: "#4db6e8", bg: "rgba(26,82,118,0.82)",  x:  1.65*S, y:  2.48, sw: 2.0,  sh: 0.44 },
      { t: "ELECTROLYTE",      tc: "#85c1e9", bg: "rgba(15,40,70,0.82)",   x: -0.75*S, y:  2.98, sw: 2.2,  sh: 0.42 },
      { t: "SEPARATOR",        tc: "#aaddff", bg: "rgba(10,25,50,0.82)",   x: -1.95*S, y: -2.08, sw: 2.0,  sh: 0.40 },
      { t: "Li⁺  ION",         tc: "#ff4444", bg: "rgba(80,10,10,0.82)",   x: -0.4*S,  y: -2.55, sw: 1.8,  sh: 0.40 },
      { t: "Li-METAL CARBON",  tc: "#8899aa", bg: "rgba(20,30,45,0.82)",   x: -0.95*S, y:  2.15, sw: 2.55, sh: 0.40 },
      { t: "e⁻  ELECTRONS",    tc: "#00ffff", bg: "rgba(0,35,55,0.82)",    x: -0.6*S,  y:  5.38, sw: 2.2,  sh: 0.42 },
    ];
    staticLabels.forEach(({ t, tc, bg, x, y, sw, sh }) => {
      const sp = makeLabel(t, tc, bg);
      sp.position.set(x, y, 0);
      sp.scale.set(sw, sh, 1);
      scene.add(sp);
    });

    // ── Dynamic mode label ────────────────────────────────
    const mlCanvas = document.createElement("canvas");
    mlCanvas.width = 520; mlCanvas.height = 108;
    const mlCtx = mlCanvas.getContext("2d");
    const mlTex = new THREE.CanvasTexture(mlCanvas);
    const mlSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: mlTex, transparent: true, depthTest: false }));
    mlSprite.scale.set(2.9, 0.52, 1);
    mlSprite.position.set(0, -3.18, 0);
    scene.add(mlSprite);

    const drawModeLabel = (m) => {
      mlCtx.clearRect(0, 0, 520, 108);
      const c   = m === "discharge" ? "#ff9900" : "#00ff99";
      const bgC = m === "discharge" ? "rgba(80,40,0,0.88)" : "rgba(0,60,30,0.88)";
      const r = 14;
      mlCtx.fillStyle = bgC;
      mlCtx.beginPath();
      mlCtx.moveTo(r, 0); mlCtx.lineTo(520 - r, 0);
      mlCtx.quadraticCurveTo(520, 0, 520, r);
      mlCtx.lineTo(520, 108 - r);
      mlCtx.quadraticCurveTo(520, 108, 520 - r, 108);
      mlCtx.lineTo(r, 108);
      mlCtx.quadraticCurveTo(0, 108, 0, 108 - r);
      mlCtx.lineTo(0, r);
      mlCtx.quadraticCurveTo(0, 0, r, 0);
      mlCtx.fill();
      mlCtx.font = "900 46px 'Courier New', monospace";
      mlCtx.fillStyle = c;
      mlCtx.shadowColor = c; mlCtx.shadowBlur = 22;
      mlCtx.textAlign = "center"; mlCtx.textBaseline = "middle";
      mlCtx.fillText(m === "discharge" ? "◀  DISCHARGE" : "CHARGE  ▶", 260, 54);
      mlTex.needsUpdate = true;
    };
    drawModeLabel("discharge");

    // ── Animation loop ────────────────────────────────────
    let camAngle = 0;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const dt = getDelta();
      const t  = getElapsed();

      if (!isPlayingRef.current) {
        renderer.render(scene, camera);
        return;
      }

      const spd = speedRef.current;
      const m   = modeRef.current;

      // Gentle camera orbit
      camAngle += dt * 0.09;
      camera.position.x = Math.sin(camAngle) * 4.5;
      camera.position.z = 10.5 + Math.cos(camAngle) * 2.5;
      camera.position.y = 3.5 + Math.sin(camAngle * 0.45) * 0.6;
      camera.lookAt(0, 0.3, 0);

      // Redraw dynamic label
      drawModeLabel(m);

      // Move lithium ions (local group coords)
      const ionXMin = -3.9, ionXMax = 2.2;
      ionsRef.current.forEach((ion, i) => {
        ion.userData.progress += dt * ion.userData.speed * spd;
        if (ion.userData.progress > 1) ion.userData.progress -= 1;
        const p = ion.userData.progress;
        const x = m === "discharge"
          ? ionXMin + (ionXMax - ionXMin) * p
          : ionXMax - (ionXMax - ionXMin) * p;
        ion.position.set(
          x,
          ion.userData.yBase + Math.sin(p * Math.PI * 4 + t + i) * 0.18,
          ion.userData.zBase + Math.cos(p * Math.PI * 3 + t * 0.8 + i) * 0.12
        );
        ion.material.emissiveIntensity = 0.6 + Math.sin(t * 5 + i) * 0.35;
      });

      // Move electrons along arc
      const ap = arcPointsRef.current;
      electronsRef.current.forEach((e, i) => {
        e.userData.progress += dt * 0.38 * spd;
        if (e.userData.progress > 1) e.userData.progress -= 1;
        let p = e.userData.progress;
        if (m === "charge") p = 1 - p;
        const idx = Math.min(Math.floor(p * (ap.length - 1)), ap.length - 2);
        const frac = p * (ap.length - 1) - idx;
        const pos = ap[idx].clone().lerp(ap[idx + 1], frac);
        e.position.copy(pos);
        e.material.emissiveIntensity = 0.9 + Math.sin(t * 7 + i) * 0.4;
      });

      // Breathe lights
      fillLight.intensity = 1.8 + Math.sin(t * 1.4) * 0.5;
      rimLight.intensity  = 1.0 + Math.cos(t * 1.0) * 0.35;

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── Shared button style factory ────────────────────────
  const btn = (active, accent, extra = {}) => ({
    fontFamily: "'Courier New', monospace",
    fontWeight: 900,
    letterSpacing: "0.1em",
    cursor: "pointer",
    border: `2px solid ${active ? accent : "#1a3050"}`,
    borderRadius: 6,
    fontSize: 12,
    padding: "7px 14px",
    background: active ? `${accent}22` : "rgba(8,13,26,0.8)",
    color: active ? accent : "#3a5060",
    boxShadow: active ? `0 0 14px ${accent}55` : "none",
    transition: "all 0.2s",
    textTransform: "uppercase",
    ...extra,
  });

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#080d1a", position: "relative", overflow: "hidden", fontFamily: "'Courier New', monospace" }}>

      {/* Title */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, textAlign: "center", zIndex: 20, padding: "14px 0 0", pointerEvents: "none" }}>
        <div style={{ fontSize: "clamp(14px,2.2vw,26px)", fontWeight: 900, letterSpacing: "0.22em", color: "#00d4ff", textShadow: "0 0 20px #00d4ff,0 0 50px #0066ff" }}>
          LITHIUM-ION BATTERY
        </div>
        <div style={{ fontSize: "clamp(9px,1vw,12px)", color: "#4a90b8", letterSpacing: "0.3em", marginTop: 3 }}>
          3D ELECTROCHEMICAL SIMULATION
        </div>
      </div>

      {/* 3D Canvas */}
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />

      {/* Legend — bottom left */}
      <div style={{ position: "absolute", bottom: 18, left: 18, zIndex: 20, background: "rgba(8,13,26,0.85)", border: "1px solid #1a3050", borderRadius: 10, padding: "12px 16px", backdropFilter: "blur(8px)", display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          { color: "#1abc9c", label: "Cathode  (Al Current Collector)" },
          { color: "#3498db", label: "Anode  (Cu Current Collector)" },
          { color: "#ff3333", label: "Li⁺  Ions" },
          { color: "#00ffff", label: "Electrons  (e⁻)" },
          { color: "#85c1e9", label: "Electrolyte / Separator" },
          { color: "#8899aa", label: "Li-Metal Carbon (Graphite)" },
        ].map(({ color, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: color, boxShadow: `0 0 7px ${color}`, flexShrink: 0 }} />
            <span style={{ color: "#8ab", fontSize: "clamp(9px,1vw,12px)", letterSpacing: "0.07em" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Controls — bottom right */}
      <div style={{ position: "absolute", bottom: 18, right: 18, zIndex: 20, display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setMode("discharge")} style={btn(mode === "discharge", "#ff9900")}>◀ DISCHARGE</button>
          <button onClick={() => setMode("charge")}    style={btn(mode === "charge",    "#00ff99")}>CHARGE ▶</button>
        </div>
        <button onClick={() => setIsPlaying(p => !p)} style={btn(true, "#00d4ff", { width: "100%", padding: "7px 0" })}>
          {isPlaying ? "⏸  PAUSE" : "▶  PLAY"}
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#4a90b8", fontSize: 11, letterSpacing: "0.12em" }}>SPEED</span>
          {[0.5, 1, 2].map(s => (
            <button key={s} onClick={() => setSpeed(s)} style={btn(speed === s, "#00d4ff", { padding: "5px 10px", fontSize: 11 })}>{s}×</button>
          ))}
        </div>
      </div>

      {/* Info panel — right middle */}
      <div style={{ position: "absolute", top: "50%", right: 18, transform: "translateY(-50%)", zIndex: 20, width: 165, background: "rgba(8,13,26,0.88)", border: `1px solid ${mode === "discharge" ? "#ff990044" : "#00ff9944"}`, borderRadius: 10, padding: "14px 14px", backdropFilter: "blur(8px)", pointerEvents: "none" }}>
        <div style={{ color: mode === "discharge" ? "#ff9900" : "#00ff99", fontWeight: 900, fontSize: 12, letterSpacing: "0.18em", marginBottom: 10, textShadow: `0 0 10px ${mode === "discharge" ? "#ff9900" : "#00ff99"}` }}>
          {mode === "discharge" ? "DISCHARGE" : "CHARGE"}
        </div>
        {(mode === "discharge"
          ? ["Li⁺ move: cathode → anode", "e⁻ flow through external circuit", "Releases energy to load"]
          : ["Li⁺ move: anode → cathode", "e⁻ driven by external source", "Stores electrical energy"]
        ).map((line, i) => (
          <div key={i} style={{ color: "#7a9ab5", fontSize: 10, lineHeight: 1.65, marginBottom: 6, paddingLeft: 9, borderLeft: `2px solid ${mode === "discharge" ? "#ff990055" : "#00ff9955"}` }}>
            {line}
          </div>
        ))}
      </div>

    </div>
  );
}