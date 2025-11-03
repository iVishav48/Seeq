"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import BackgroundCanvas from "./background-canvas";
import LandingNavbar from "./landing-navbar";
import { TypewriterEffectSmooth } from "./typewriter-effect";

function useMagnetic() {
  const ref = useRef<HTMLButtonElement | null>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${relX * 0.12}px, ${relY * 0.12}px)`;
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }
  return { ref, onMouseMove, onMouseLeave } as const;
}

export default function Hero() {
  const analyze = useMagnetic();
  const demo = useMagnetic();

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <LandingNavbar />
      <BackgroundCanvas />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          <TypewriterEffectSmooth
            className="mx-auto flex justify-center"
            cursorClassName="bg-yellow-400"
            words={[
              { text: "Where", className: "text-xl sm:text-6xl" },
              { text: "Art" , className: "text-xl sm:text-6xl" },
              { text: "Meets" , className: "text-xl sm:text-6xl" },
              { text: "Algorithm" , className: "text-xl sm:text-6xl" },
            ]}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="max-w-2xl text-balance text-sm md:text-xl text-muted-foreground"
        >
          Discover the hidden symmetry within visual chaos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            ref={analyze.ref}
            onMouseMove={analyze.onMouseMove}
            onMouseLeave={analyze.onMouseLeave}
            className="group relative rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400 px-4 py-2 text-sm font-semibold text-black shadow-[0_0_40px_rgba(250,204,21,0.35)] transition-transform will-change-transform"
          >
            <a href="/dashboard" className="relative z-10">Analyze Image</a>
            <span className="absolute inset-0 -z-0 rounded-full bg-yellow-300/40 blur-xl transition-opacity group-hover:opacity-90" />
          </button>
          <button
            ref={demo.ref}
            onMouseMove={demo.onMouseMove}
            onMouseLeave={demo.onMouseLeave}
            className="group relative rounded-full border border-yellow-400/40 bg-white/5 px-4 py-2 text-sm font-semibold text-yellow-200 backdrop-blur-lg transition-transform hover:border-yellow-300"
          >
            <span className="relative z-10">Explore Demo</span>
            <span className="absolute inset-0 -z-0 rounded-full bg-yellow-100/10 blur-xl transition-opacity group-hover:opacity-80" />
          </button>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}


