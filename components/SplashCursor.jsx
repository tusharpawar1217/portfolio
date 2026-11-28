"use client";

import { useEffect, useRef, useState } from "react";

// Subtle smoky fire color stops (kept dim so additive WebGL dye never washes out text)
const FIRE_COLORS = [
  { r: 0.16, g: 0.065, b: 0.008 }, // smoky flame orange
  { r: 0.18, g: 0.105, b: 0.012 }, // warm amber gold
  { r: 0.15, g: 0.042, b: 0.008 }, // deep ember orange
  { r: 0.13, g: 0.025, b: 0.014 }, // subtle crimson spark
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  DENSITY_DISSIPATION = 1.45,
  VELOCITY_DISSIPATION = 0.55,
  PRESSURE = 0.8,
  CURL = 24,
  SPLAT_RADIUS = 0.16,
  SPLAT_FORCE = 4800,
  COLOR_UPDATE_SPEED = 10,
}) {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateEnabled = () => {
      setEnabled(!motionQuery.matches && pointerQuery.matches);
    };
    updateEnabled();

    motionQuery.addEventListener("change", updateEnabled);
    pointerQuery.addEventListener("change", updateEnabled);

    return () => {
      motionQuery.removeEventListener("change", updateEnabled);
      pointerQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let colorTimer = null;
    let introTimer = null;
    let introRaf = null;

    const splatColor = { ...FIRE_COLORS[0] };
    let colorPhase = 0;

    const advanceFireColor = (step = 0.08) => {
      colorPhase = (colorPhase + step) % FIRE_COLORS.length;
      const i0 = Math.floor(colorPhase);
      const i1 = (i0 + 1) % FIRE_COLORS.length;
      const frac = colorPhase - i0;
      const c0 = FIRE_COLORS[i0];
      const c1 = FIRE_COLORS[i1];
      splatColor.r = lerp(c0.r, c1.r, frac);
      splatColor.g = lerp(c0.g, c1.g, frac);
      splatColor.b = lerp(c0.b, c1.b, frac);
    };

    const effectiveDyeRes =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
        ? Math.min(DYE_RESOLUTION, 512)
        : Math.min(DYE_RESOLUTION, 1024);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dispatchCanvasEvent = (type, x, y) => {
      const evt = new MouseEvent(type, {
        clientX: x,
        clientY: y,
        bubbles: false,
        cancelable: false,
      });
      Object.defineProperty(evt, "offsetX", { value: x });
      Object.defineProperty(evt, "offsetY", { value: y });
      canvas.dispatchEvent(evt);
    };

    const handleMouseMove = (e) => {
      advanceFireColor(0.08);
      dispatchCanvasEvent("mousemove", e.clientX, e.clientY);
    };

    const handleMouseDown = (e) => {
      advanceFireColor(0.4);
      dispatchCanvasEvent("mousedown", e.clientX, e.clientY);
    };

    import("webgl-fluid").then((mod) => {
      if (cancelled || !canvas) return;
      const WebGLFluid = mod.default || mod;

      WebGLFluid(canvas, {
        TRIGGER: "hover",
        IMMEDIATE: false,
        AUTO: false,
        SIM_RESOLUTION,
        DYE_RESOLUTION: effectiveDyeRes,
        DENSITY_DISSIPATION,
        VELOCITY_DISSIPATION,
        PRESSURE,
        PRESSURE_ITERATIONS: 20,
        CURL,
        SPLAT_RADIUS,
        SPLAT_FORCE,
        SPLAT_COLOR: splatColor,
        SHADING: true,
        COLORFUL: true,
        COLOR_UPDATE_SPEED,
        PAUSED: false,
        TRANSPARENT: true,
        BLOOM: true,
        BLOOM_ITERATIONS: 6,
        BLOOM_RESOLUTION: 256,
        BLOOM_INTENSITY: 0.28,
        BLOOM_THRESHOLD: 0.55,
        BLOOM_SOFT_KNEE: 0.7,
        SUNRAYS: false,
      });

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mousedown", handleMouseDown, { passive: true });
      colorTimer = setInterval(() => advanceFireColor(0.12), 110);

      // Faint opening smoky curl between headline and portrait (like Tata Crucible)
      introTimer = setTimeout(() => {
        if (cancelled) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        const startX = w * 0.56;
        const startY = h * 0.62;
        let frame = 0;
        const totalFrames = 16;

        const sweep = () => {
          if (cancelled || frame > totalFrames) return;
          const t = frame / totalFrames;
          const x = startX + Math.sin(t * Math.PI * 1.4) * (w * 0.035);
          const y = startY - t * (h * 0.15);
          advanceFireColor(0.14);
          dispatchCanvasEvent("mousemove", x, y);
          frame += 1;
          introRaf = requestAnimationFrame(sweep);
        };
        introRaf = requestAnimationFrame(sweep);
      }, 650);
    });

    return () => {
      cancelled = true;
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      if (colorTimer) clearInterval(colorTimer);
      if (introTimer) clearTimeout(introTimer);
      if (introRaf) cancelAnimationFrame(introRaf);
    };
  }, [
    enabled,
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    COLOR_UPDATE_SPEED,
  ]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      data-fluid-cursor
      aria-hidden="true"
      style={{
        mixBlendMode: "screen",
        opacity: 0.85,
      }}
      className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
    />
  );
}
