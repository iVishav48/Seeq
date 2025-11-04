import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-black/40 py-16 backdrop-blur-xl z-35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="max-w-md space-y-5">
            <Link href="/" className="group flex items-center space-x-3">
              <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/5 soft-glow">
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/40 via-yellow-300/10 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90"></span>
                <Image src="/logo.png" width={30} height={30} alt="InSight Logo" className="relative z-10 opacity-90" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-2xl font-semibold uppercase tracking-wide gold-gradient-text drop-shadow">
                  InSight
                </span>
                <span className="text-xs font-medium tracking-[0.32em] text-slate-400">
                  Golden Ratio Studio
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-300">
              Craft perfectly balanced visuals with AI-guided golden ratio insights, overlays, and tailored storytelling.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs uppercase tracking-[0.35em] text-yellow-200/70">
              <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent"></span>
              <span>Design Better</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-slate-200">Navigate</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/" className="transition-colors hover:text-yellow-200">Home</Link>
              </li>
              <li>
                <Link href="#about" className="transition-colors hover:text-yellow-200">About</Link>
              </li>
              <li>
                <Link href="#pricing" className="transition-colors hover:text-yellow-200">Pricing</Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-yellow-200">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-slate-200">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <Link href="/services" className="transition-colors hover:text-yellow-200">Services</Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-yellow-200">Golden Ratio Calculator</Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-yellow-200">Launch Analyzer</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-slate-200">Stay in the loop</h3>
            <p className="text-sm text-slate-400">
              Join our creative circle for fresh golden ratio techniques and InSight feature drops.
            </p>
            <form className="space-y-3">
              <div className="accent-ring rounded-2xl bg-white/5 p-2 backdrop-blur">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-xl border border-transparent bg-black/20 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-yellow-200/70 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-lg shadow-yellow-500/25 transition-transform hover:-translate-y-[2px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 md:flex-row">
          <p>&copy; {new Date().getFullYear()} InSight. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="transition-colors hover:text-yellow-200">Privacy Policy</Link>
            <Link href="/terms-conditions" className="transition-colors hover:text-yellow-200">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
