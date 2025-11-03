import Hero from "./_components/hero";
import AboutSection from "./_components/about";
import FeaturesSection from "./_components/features";
import Footer from "./_components/footer";
import TeamSection from "./_components/team";

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center">
      <Hero />
      <AboutSection />
      <FeaturesSection />
      <TeamSection />
      <Footer />
    </main>
  );
}