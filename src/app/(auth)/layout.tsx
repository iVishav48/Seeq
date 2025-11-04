import { Button } from "@/components/ui/button";
import { AnvilIcon } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* decorative glow background */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(1200px_600px_at_50%_-10%,rgba(250,204,21,0.20),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,204,21,0.08),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(250,204,21,0.06),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-10">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hover:bg-white/5">
            <img src="/logo.png" alt="logo" width={48} height={48} />
          </Button>
          <span className="text-2xl font-semibold tracking-tight uppercase">
            In
            <span className="text-yellow-400 drop-shadow-[0_0_14px_rgba(250,204,21,0.65)]">Sight</span>
          </span>
        </div>

        {children}
      </div>
    </div>
  );
}