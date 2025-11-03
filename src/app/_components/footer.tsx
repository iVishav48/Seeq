import React from "react";

export default function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-6xl px-6 py-12 text-center">
      <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80 backdrop-blur">
        <span>© 2025 InSight | Crafted with Art, Code, & Chaos.</span>
      </div>
      <div className="mt-5 flex items-center justify-center gap-4">
        <a
          href="#"
          className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-yellow-400/40 hover:text-yellow-300"
        >
          Twitter
        </a>
        <a
          href="#"
          className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-yellow-400/40 hover:text-yellow-300"
        >
          GitHub
        </a>
        <a
          href="#"
          className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/70 transition-colors hover:border-yellow-400/40 hover:text-yellow-300"
        >
          Docs
        </a>
      </div>
    </footer>
  );
}


