"use client";

import { useEffect, useRef } from "react";

// Jellyfish-fire color palette
const PALETTE = [
  [1.0, 0.78, 0.25],  // gold
  [1.0, 0.78, 0.25],  // gold (weighted)
  [1.0, 0.45, 0.12],  // fire orange
  [1.0, 0.45, 0.12],  // fire orange (weighted)
  [1.0, 0.30, 0.45],  // hot coral-pink
  [0.75, 0.35, 1.0],  // jellyfish violet
  [0.25, 0.85, 1.0],  // glowing cyan
  [1.0, 0.92, 0.75],  // pale cream-white (hot core)
];

function generateColor() {
  const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  const k = 0.18; // brightness control
  return { r: r * k, g: g * k, b: b * k };
}

export default function SplashCursor({
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  DENSITY_DISSIPATION = 1.2,
  VELOCITY_DISSIPATION = 0.8,
  PRESSURE = 0.8,
  CURL = 25,
  SPLAT_RADIUS = 0.25,
  SPLAT_FORCE = 4500,
  COLOR_UPDATE_SPEED = 6,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (motionQuery.matches || !pointerQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const effectiveScale =
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
        ? Math.min(DYE_RESOLUTION, 512) / 1024
        : Math.min(DYE_RESOLUTION, 1024) / 1024;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * effectiveScale;
      canvas.width = Math.max(SIM_RESOLUTION, Math.floor(width * dpr));
      canvas.height = Math.max(SIM_RESOLUTION, Math.floor(height * dpr));
      ctx.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const puffs = [];
    let lastX = null;
    let lastY = null;
    let lastTime = performance.now();
    let rafId = null;

    const spawnSplat = (x, y, dx, dy) => {
      const color = generateColor();
      const speed = Math.hypot(dx, dy);
      const forceScale = Math.min(1.6, Math.max(0.35, (speed * SPLAT_FORCE) / 180000));
      const baseRadius = Math.max(36, Math.min(width, height) * SPLAT_RADIUS * 0.42);

      puffs.push({
        x,
        y,
        vx: dx * 0.14 + (Math.random() - 0.5) * 0.4,
        vy: dy * 0.14 + (Math.random() - 0.5) * 0.4,
        radius: baseRadius * (0.75 + Math.random() * 0.45),
        alpha: 0.72 * forceScale,
        spin: (Math.random() - 0.5) * 0.04 * CURL,
        r: Math.round(color.r * 255),
        g: Math.round(color.g * 255),
        b: Math.round(color.b * 255),
      });

      if (puffs.length > 64) {
        puffs.shift();
      }
    };

    const handlePointerMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      if (lastX !== null && lastY !== null) {
        const dx = x - lastX;
        const dy = y - lastY;
        if (Math.hypot(dx, dy) > 2) {
          spawnSplat(x, y, dx, dy);
        }
      }
      lastX = x;
      lastY = y;
    };

    const handlePointerDown = (e) => {
      spawnSplat(e.clientX, e.clientY, (Math.random() - 0.5) * 24, (Math.random() - 0.5) * 24);
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mousedown", handlePointerDown, { passive: true });

    const tick = (now) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      const velDecay = Math.exp(-VELOCITY_DISSIPATION * dt * 1.4);
      const densityDecay = Math.exp(-DENSITY_DISSIPATION * dt * 1.2);

      for (let i = puffs.length - 1; i >= 0; i--) {
        const p = puffs[i];

        // Apply subtle curl rotation to velocity
        const cos = Math.cos(p.spin * dt * 8);
        const sin = Math.sin(p.spin * dt * 8);
        const nvx = p.vx * cos - p.vy * sin;
        const nvy = p.vx * sin + p.vy * cos;

        p.vx = nvx * velDecay;
        p.vy = nvy * velDecay;
        p.x += p.vx;
        p.y += p.vy;
        p.radius += 22 * dt;
        p.alpha *= densityDecay;

        if (p.alpha < 0.008) {
          puffs.splice(i, 1);
          continue;
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`);
        grad.addColorStop(0.45, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.45})`);
        grad.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleMotionChange = (e) => {
      if (e.matches && rafId) {
        cancelAnimationFrame(rafId);
        ctx.clearRect(0, 0, width, height);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mousedown", handlePointerDown);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [SIM_RESOLUTION, DYE_RESOLUTION, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, CURL, SPLAT_RADIUS, SPLAT_FORCE]);

  return (
    <canvas
      ref={canvasRef}
      data-fluid-cursor
      aria-hidden="true"
      style={{
        mixBlendMode: "screen",
        filter: "saturate(1.25) blur(0.6px)",
        opacity: 0.85,
      }}
      className="fixed inset-0 w-full h-full pointer-events-none z-40"
    />
  );
}
