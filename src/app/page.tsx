import HeroSection from "./_components/herosection";
import { CometCard } from "../components/ui/comet-card";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <HeroSection />
      <div className="my-10 md:my-20">
        <CometCard>
          <button
            type="button"
            className="flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:p-4"
            aria-label="View invite F7RA"
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
                  alt="Invite background"
                  src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                    opacity: 1,
                  }}
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="select-none px-3 text-center text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] text-sm md:text-lg font-semibold tracking-widest">
                    TEAM CODE BLOODED
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
              <div className="text-xs">Comet Invitation</div>
              <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
            </div>
          </button>
        </CometCard>
      </div>
    </main>
  );
}
