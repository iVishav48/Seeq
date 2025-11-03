"use client";
import React, { useEffect, useRef } from "react";

// Lightweight particle flow with golden accents
export default function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    const particles: { x: number; y: number; vx: number; vy: number; life: number }[] = [];
    const GOLD = "rgba(250,204,21,0.85)"; // yellow-400
    const GOLD_SOFT = "rgba(250,204,21,0.18)";
    const MAX = 160;

    const seed = (n: number) => {
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          life: 200 + Math.random() * 400,
        });
      }
    };
    seed(MAX);

    const phi = (1 + Math.sqrt(5)) / 2;

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      // soft vignette gradient
      const g = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.1,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.7
      );
      g.addColorStop(0, "rgba(255,255,255,0.02)");
      g.addColorStop(1, "rgba(0,0,0,0.2)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // flow field influenced by golden ratio spiral
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const angle =
          Math.sin((p.x * 0.002) / phi) + Math.cos((p.y * 0.002) * phi) + Math.sin((p.x + p.y) * 0.0009);
        p.vx += Math.cos(angle) * 0.02;
        p.vy += Math.sin(angle) * 0.02;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        if (p.life <= 0) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.vx = (Math.random() - 0.5) * 0.6;
          p.vy = (Math.random() - 0.5) * 0.6;
          p.life = 200 + Math.random() * 400;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = GOLD;
        ctx.shadowColor = GOLD_SOFT;
        ctx.shadowBlur = 8;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    window.addEventListener("resize", handleResize);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full"></canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 via-transparent to-black/40" />
    </div>
  );
}


