// src/App.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { GlitchBackground, StickerBomb, Marquee, HazardBar } from "./components/Retro";
import About from "./components/About";
import Events from "./components/Events";
import Officers from "./components/Officers";
import Resources from "./components/Resources";
import Join from "./components/Join";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-ink">
      <GlitchBackground />
      <StickerBomb />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Marquee text="AUTHORIZED TESTING ONLY // NO DUES // BRING A LAPTOP" />
        <About />
        <HazardBar />
        <Events />
        <Officers />
        <Resources />
        <Join />
      </main>

      <Footer />
    </div>
  );
}
