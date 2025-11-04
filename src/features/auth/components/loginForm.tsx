"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Rocket,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import Image from "next/image";

function useMagnetic() {
  const ref = useRef<HTMLButtonElement | null>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${relX * 0.08}px, ${relY * 0.08}px)`;
  }
  function onMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }
  return { ref, onMouseMove, onMouseLeave } as const;
}

const features = [
  {
    icon: Sparkles,
    text: "AI-Powered Analysis",
    description: "Discover hidden patterns in your visuals"
  },
  {
    icon: Zap,
    text: "Lightning Fast",
    description: "Process images in seconds"
  },
  {
    icon: Shield,
    text: "Secure & Private",
    description: "Your data stays protected"
  },
  {
    icon: Rocket,
    text: "Advanced Tools",
    description: "Professional-grade features"
  },
];

export function LoginForm() {
  const router = useRouter();
  const googleButton = useMagnetic();

  const onSubmit = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex w-full flex-col items-center gap-4 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold sm:text-5xl lg:text-6xl"
        >
          <div className="ml-3">Welcome to{" "}</div>
          <div className="flex items-center justify-center gap-3">
            <span className="relative inline-block bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">
               InSight
            </span>
          </div>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-2xl text-lg text-white/70"
        >
          Where Art Meets Algorithm. Discover the hidden symmetry within visual chaos.
        </motion.p>
      </motion.div>

      {/* Side by Side Layout: Features on Left, Auth Card on Right */}
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        {/* Left Side - Features Grid 2x2 */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full grid-cols-2 gap-3 lg:w-auto"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isZap = feature.icon === Zap;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-yellow-400/30 hover:bg-white/10"
              >
                <div className="mb-3 flex flex-col items-center gap-3 text-center">
                  <div className="relative rounded-lg bg-yellow-400/10 p-2.5">
                    <motion.div
                      animate={isZap ? {
                        rotate: [0, 15, -15, 15, 0],
                        scale: [1, 1.1, 1, 1.1, 1],
                      } : {
                        rotate: [0, 360],
                      }}
                      transition={
                        isZap
                          ? {
                            duration: 0.5,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: "easeInOut",
                          }
                          : {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }
                      }
                    >
                      <Icon className="h-5 w-5 text-yellow-400" />
                    </motion.div>
                    {isZap && (
                      <motion.div
                        className="absolute inset-0 rounded-lg bg-yellow-400/20"
                        animate={{
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 0.3,
                          repeat: Infinity,
                          repeatDelay: 2,
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{feature.text}</h3>
                    <p className="mt-1 text-xs text-white/60">{feature.description}</p>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 rounded-lg bg-yellow-400/5 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Right Side - Login Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full lg:w-auto"
        >
          <Card className="w-full border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <CardHeader className="space-y-3 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                
                <CardTitle className="text-3xl font-semibold tracking-tight">
                  Welcome back
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <CardDescription className="text-base text-white/70">
                  Sign in to continue your journey
                </CardDescription>
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="space-y-6"
              >
                <Button
                  ref={googleButton.ref}
                  onMouseMove={googleButton.onMouseMove}
                  onMouseLeave={googleButton.onMouseLeave}
                  variant="outline"
                  className="group relative w-full cursor-pointer border-white/15 bg-black/20 text-white transition-all hover:border-yellow-400/40 hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                  type="button"
                  onClick={onSubmit}
                >
                  <svg
                    className="mr-3 h-5 w-5 transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-medium">Continue with Google</span>
                  <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  <span className="absolute inset-0 -z-10 rounded-md bg-yellow-400/10 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
                </Button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="space-y-3"
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white/5 px-2 text-white/50">Access the Algorithm 🔐</span>
                    </div>
                  </div>

                  <div className="text-center text-xs text-white/50">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                      Privacy Policy
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Trust Indicators - Below both sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60"
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-yellow-400" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-yellow-400" />
          <span>Free forever plan</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-yellow-400" />
          <span>Instant access</span>
        </div>
      </motion.div>
    </div>
  );
}
