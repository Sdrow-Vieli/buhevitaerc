"use client";

import { useState, useEffect } from "react";
import CompanyName from "./CompanyName";
import Banner from "./Banner";
import Footer from "./Footer";
import CarouselShell from "./carousel/CarouselShell";
import { projects } from "@/lib/projects";

export default function LandingPage() {
  const [viewport, setViewport] = useState({
    isMobile: false,
    isTablet: false,
    isLandscape: false,
    height: 0,
    width: 0,
  });

  useEffect(() => {
    const updateViewport = () => {
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      const width = window.innerWidth;
      const height = window.innerHeight;

      setViewport({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isLandscape,
        height,
        width,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("orientationchange", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("orientationchange", updateViewport);
    };
  }, []);

  const getLayoutClasses = () => {
    if (viewport.isLandscape && viewport.height < 500) return "py-1 px-2 gap-1";

    if (viewport.isLandscape && viewport.height < 600) return "py-2 px-3 gap-2";

    if (viewport.isMobile && !viewport.isLandscape) return "py-3 px-4 gap-3";

    if (viewport.isTablet && viewport.isLandscape) return "py-4 px-6 gap-4";
    return "py-6 px-8 gap-6";
  };

  const getCarouselHeight = () => {
    if (viewport.isLandscape && viewport.height < 500) return "min-h-[55vh]";
    if (viewport.isLandscape && viewport.height < 600) return "min-h-[58vh]";
    if (viewport.isMobile && !viewport.isLandscape) return "min-h-[48vh]";
    if (viewport.isTablet && viewport.isLandscape) return "min-h-[52vh]";
    return "min-h-[55vh]";
  };

  return (
    <main className="relative min-h-screen-dynamic w-full bg-[transparent] overflow-hidden">
      <div
        className={`
        mx-auto flex h-full min-h-screen-dynamic w-full  flex-col
        ${getLayoutClasses()}
      `}
      >
        {/* Header - Company Name */}
        <div className="flex-shrink-0">
          <CompanyName viewport={viewport} />
        </div>

        {/* Main Content - Carousel */}
        <div
          className={`flex-1 flex items-center justify-center ${getCarouselHeight()}`}
        >
          <CarouselShell projects={projects} viewport={viewport} />
        </div>

        {/* Banner */}
        <div className="flex-shrink-0">
          <Banner viewport={viewport} />
        </div>

        {/* Footer */}
        <div className="flex-shrink-0">
          <Footer viewport={viewport} />
        </div>
      </div>
    </main>
  );
}
