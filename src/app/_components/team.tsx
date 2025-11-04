"use client";
import React from "react";
import { CometCard } from "./comet-card";
import {
    ArrowRight,
    Camera, 
    Palette, 
    Brain,
    Check,
    Circle,
    ImageIcon,
    LayoutDashboard,
    LineChart,
    Sparkles, Bolt, Compass, Target, Telescope, Users, Heart, Code,
  } from "lucide-react";

type IconKey = "camera" | "palette" | "brain" | "lineChart" | "code" | "users";

const iconMap: Record<IconKey, React.ReactNode> = {
  camera: <Camera className="h-4 w-4" />,
  palette: <Palette className="h-4 w-4" />,
  brain: <Brain className="h-4 w-4" />,
  lineChart: <LineChart className="h-4 w-4" />,
  code: <Code className="h-4 w-4" />,
  users: <Users className="h-4 w-4" />,
};

type Member = {
  name: string;
  skillA: string;
  skillB: string;
  icon: IconKey;
  image?: string;
};

export default function TeamSection() {
  // Edit these three members directly in code
  const members: Member[] = [
    {
      name: "Vishavjit Singh",
      skillA: "Studio Lead",
      skillB: "Backend Architect",
      icon: "lineChart",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1280&auto=format&fit=crop",
    },
    {
      name: "Sohraab Singh Dhillon",
      skillA: "Lead Developer",
      skillB: "Experienced Designer",
      icon: "code",
      image:
        "/soh.png",
    },
    {
      name: "Harkirtan Singh",
      skillA: "Documentation Lead",
      skillB: "Community Manager",
      icon: "users",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1280&auto=format&fit=crop",
    },
  ];

  return (
    <section id="team" className="relative mx-auto w-full max-w-6xl px-6 py-20">
      <h3 className="mb-10 text-center text-2xl font-semibold text-white sm:text-3xl">Our Team</h3>

      <div className="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m, idx) => (
          <CometCard key={m.name + idx}>
            <button
              type="button"
              className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border border-yellow-400/20 bg-gradient-to-br from-yellow-500/10 via-yellow-400/5 to-yellow-300/0 p-2 shadow-[0_0_32px_rgba(250,204,21,0.06)] md:my-20 md:p-4"
              aria-label={`View ${m.name}`}
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/4] w-full">
                  <img
                    loading="lazy"
                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                    alt={`${m.name} background`}
                    src={m.image}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                  {/* subtle golden tint overlay */}
                  <div className="absolute inset-0 rounded-[16px] bg-gradient-to-t from-yellow-500/12 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-[16px] ring-1 ring-inset ring-yellow-400/15" />
                  <div className="pointer-events-none absolute inset-0 flex items-end justify-center gap-2 p-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
                      {iconMap[m.icon]}
                      <span>{m.skillA}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
                      {iconMap[m.icon]}
                      <span>{m.skillB}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                <div className="text-xs">{m.name}</div>
                <div className="text-xs text-gray-300 opacity-50">#{idx + 1}</div>
              </div>
            </button>
          </CometCard>
        ))}
      </div>
    </section>
  );
}


