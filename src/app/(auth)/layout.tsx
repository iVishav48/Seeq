import { Button } from "@/components/ui/button";
import { AnvilIcon } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col min-h-screen items-center justify-center gap-4">
    <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon"><AnvilIcon className="size-5!" /></Button>
        <span className="text-2xl font-semibold tracking-tight uppercase">Project Name {/* TODO: add project name */}</span>
    </div>
    {children}
    </div>;
}