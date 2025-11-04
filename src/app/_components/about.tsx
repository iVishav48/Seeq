"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="grid items-center gap-8 md:grid-cols-2"
      >
        <div>
          <h2 className="bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Art, Code, & Chaos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            InSight analyzes and generates visuals guided by the Golden Ratio. We merge
            mathematical precision with expressive motion to reveal order inside
            apparent disorder — a canvas where algorithms breathe.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-tr from-yellow-500/10 via-yellow-400/5 to-transparent blur-2xl" />
          <div className="aspect-[1.618/1] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-black via-zinc-900 to-black p-0.5">
            <div className="h-full w-full rounded-[calc(theme(borderRadius.3xl)-2px)] bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center">
              <img
                src="/spiral.gif"
                alt="Golden Ratio Illustration"
                className="h-full w-full object-cover rounded-[calc(theme(borderRadius.3xl)-2px)]"
              />
            </div>
          </div>
        </div>

      </motion.div>
    </section>
  );
}


