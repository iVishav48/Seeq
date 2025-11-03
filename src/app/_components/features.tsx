"use client";
import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, Scan } from "lucide-react";

const features = [
  {
    icon: Scan,
    title: "Golden Ratio Analysis",
    desc: "Detect hidden symmetry in images.",
  },
  {
    icon: Sparkles,
    title: "Generative Art Output",
    desc: "Turn your data into evolving visuals.",
  },
  {
    icon: Shield,
    title: "Personalized Access",
    desc: "Secure login to save your creations.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8 text-center text-2xl font-semibold text-white sm:text-3xl"
      >
        Features
      </motion.h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, desc }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 + idx * 0.1, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-yellow-400/20 bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <div className="absolute -inset-20 -z-10 scale-100 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.14),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="flex items-start gap-4">
              <div className="rounded-xl border border-yellow-400/30 bg-yellow-400/15 p-3 text-yellow-300 shadow-[0_0_24px_rgba(250,204,21,0.25)]">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
                <p className="mt-1 text-sm text-white/70">{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


