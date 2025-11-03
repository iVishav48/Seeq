"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";



const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
} as const;

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-neutral-900 dark:text-white hover:text-black dark:hover:text-neutral-200"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg flex justify-center space-x-8 px-10 py-4"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </a>
  );
};

export const Navbar = ({ className = "" }: { className?: string }) => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className={`flex w-full items-center justify-center ${className}`}>
      <Menu setActive={setActive}>
        <MenuItem item="Home" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-2">
            <HoveredLink href="#">Overview</HoveredLink>
            <HoveredLink href="#features">Features</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="Golden Ratio Calculator" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-3">
            <ProductItem
              title="Starter"
              description="Get going quickly"
              href="#starter"
              src="/vercel.svg"
            />
            <ProductItem
              title="Pro"
              description="For growing teams"
              href="#pro"
              src="/next.svg"
            />
          </div>
        </MenuItem>
        <MenuItem item="Image Analysis" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-2">
            <HoveredLink href="#company">Company</HoveredLink>
            <HoveredLink href="#careers">Careers</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="Pricing" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-2">
            <HoveredLink href="#company">Company</HoveredLink>
            <HoveredLink href="#careers">Careers</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="Services" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-2">
            <HoveredLink href="#company">Company</HoveredLink>
            <HoveredLink href="#careers">Careers</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem item="About" active={active} setActive={setActive}>
          <div className="grid grid-cols-1 gap-2">
            <HoveredLink href="#company">Company</HoveredLink>
            <HoveredLink href="#careers">Careers</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};
