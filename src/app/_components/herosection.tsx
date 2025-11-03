"use client";
import React from "react";
import { Navbar } from "@/components/ui/navbar-menu";

export default function HeroSection() {
  return (
    <section className="relative w-full flex flex-col items-center gap-6 py-10">
      <Navbar className="top-2" />
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-black dark:text-white">Welcome</h1>
        <p className="text-neutral-700 dark:text-neutral-300 mt-2">
          The Navbar is integrated into this hero section.
        </p>
      </div>
    </section>
  );
}