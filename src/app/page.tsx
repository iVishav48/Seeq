import Hero from "./_components/hero";
import AboutSection from "./_components/about";
import FeaturesSection from "./_components/features";
import TeamSection from "./_components/team";
import { SiteFooter } from "./_components/mainfooter";
import { Testimonials } from "./_components/testimonials";


export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <Testimonials/>
      <TeamSection />
      <SiteFooter/>
    </main>
  );
}