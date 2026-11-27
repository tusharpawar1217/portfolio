"use client";

import { useEffect, useRef } from "react";

const FluidCursor = () => {
  const canvasRef = useRef(null);
  const fluidRef = useRef(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Dynamically import webgl-fluid (client-side only)
    import("webgl-fluid").then((WebGLFluid) => {
      const config = {
        TRANSPARENT: true,
        COLORFUL: true,
        SIM_RESOLUTION: 128,
        DYE_RESOLUTION: 1440,
        DENSITY_DISSIPATION: 1.2,  // slower dissipation = longer trails
        VELOCITY_DISSIPATION: 0.8, // floatier motion
        PRESSURE: 0.8,
        CURL: 25,                  // silky swirls
        SPLAT_RADIUS: 0.25,
        SPLAT_FORCE: 4500,         // gentler splats
        BLOOM: true,
        BLOOM_INTENSITY: 0.6,
        SUNRAYS: true,
        SUNRAYS_WEIGHT: 0.5,
        COLOR_UPDATE_SPEED: 6,
      };

      fluidRef.current = WebGLFluid.default(canvas, config);

      // Override color generation with jellyfish-fire palette
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

      // Monkey-patch the color generation
      if (fluidRef.current && fluidRef.current.config) {
        const originalGenerateColor = fluidRef.current.generateColor;
        fluidRef.current.generateColor = function() {
          const [r, g, b] = PALETTE[Math.floor(Math.random() * PALETTE.length)];
          const k = 0.18; // brightness control
          return { r: r * k, g: g * k, b: b * k };
        };
      }

      // Idle pulsing - gentle random splats every 2-3 seconds
      let lastInteraction = Date.now();
      let idleInterval;

      const updateInteraction = () => {
        lastInteraction = Date.now();
      };

      const idlePulse = () => {
        const now = Date.now();
        if (now - lastInteraction > 2000) { // 2 seconds idle
          // Generate random position for idle splat
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          
          // Gentle pulse
          if (fluidRef.current && fluidRef.current.splatPointer) {
            fluidRef.current.splatPointer(x, y, 0, 0, 2000);
          }
        }
      };

      // Track mouse/touch interaction
      canvas.addEventListener("mousemove", updateInteraction);
      canvas.addEventListener("touchmove", updateInteraction);
      canvas.addEventListener("click", updateInteraction);

      // Start idle pulsing
      idleInterval = setInterval(idlePulse, 2500);

      return () => {
        canvas.removeEventListener("mousemove", updateInteraction);
        canvas.removeEventListener("touchmove", updateInteraction);
        canvas.removeEventListener("click", updateInteraction);
        clearInterval(idleInterval);
      };
    });

    return () => {
      // Cleanup
      if (fluidRef.current) {
        fluidRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="fluid-cursor"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9998,
        mixBlendMode: "screen",
        filter: "saturate(1.25) blur(0.6px)",
        opacity: 0.85,
      }}
    />
  );
};

export default FluidCursor;
