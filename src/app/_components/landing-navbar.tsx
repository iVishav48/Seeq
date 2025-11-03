"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navItems = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "/login", label: "Login" },
];

export default function LandingNavbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 10);
  });

  // subtle mount animation
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -12 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
    >
      <motion.nav
        aria-label="Primary"
        className="mx-3 mt-3 w-full max-w-6xl"
      >
        <div
          className={`flex items-center justify-between rounded-full border border-white/10 px-5 py-3 shadow-lg shadow-black/20 overflow-hidden backdrop-blur-md ${
            scrolled ? "bg-black/40" : "bg-black/20"
          }`}
        >
          <Link href="#" className="group inline-flex items-center gap-2">
            <span className="text-sm tracking-widest text-yellow-400/90">●</span>
            <span className="text-base font-semibold text-white">
              In<span className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.45)]">Sight</span>
            </span>
            <span className="ml-2 hidden text-xs text-white/50 sm:inline-block">Art, Code, & Chaos</span>
          </Link>

          <ul className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="relative text-sm text-white/80 transition-colors hover:text-yellow-300"
                >
                  <span>{item.label}</span>
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-yellow-300/80 to-yellow-500/80 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <a
              href="#features"
              className="rounded-full bg-gradient-to-r from-yellow-500/90 to-yellow-400/90 px-4 py-2 text-xs font-medium text-black shadow-[0_0_24px_rgba(250,204,21,0.35)]"
            >
              Explore
            </a>
          </div>
        </div>
      </motion.nav>
    </motion.header>
  );
}


