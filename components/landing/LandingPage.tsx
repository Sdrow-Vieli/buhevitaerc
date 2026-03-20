import CompanyName from "./CompanyName";
import Banner from "./Banner";
import Footer from "./Footer";
import CarouselShell from "./carousel/CarouselShell";
import { projects } from "@/lib/projects";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-white">
      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-4 pt-4 sm:px-6 lg:px-8">
        <CompanyName />

        <div className="flex-1">
          <CarouselShell projects={projects} />
        </div>

        <Banner
          textLeft="INNOVATE."
          textMiddle="BUILD."
          textRight="SCALE."
          accentColor="text-rose-600"
        />

        <Footer />
      </section>
    </main>
  );
}
