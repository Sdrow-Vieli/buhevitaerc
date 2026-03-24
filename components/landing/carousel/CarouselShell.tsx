"use client";

import { Suspense, lazy, useState } from "react";
import { LayoutGrid, GalleryVerticalEnd } from "lucide-react";
import type { Project } from "@/lib/projects";
import CoverFlow from "./CoverFlow";

const Carousel3D = lazy(() => import("./Carousel3D"));

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

export default function CarouselShell({
  projects,
  viewport,
}: {
  projects: Project[];
  viewport: ViewportProps;
}) {
  const [viewMode, setViewMode] = useState<"cover" | "cards">("cover");

  return (
    <div className="carousel-shell">
      <div
        className="fixed top-5 right-5 z-[99999] flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 p-1.5 shadow-[0_8px_16px_rgba(0,0,0,0.25)] backdrop-blur-md"
        aria-label="View mode toggle"
        style={{
          marginTop: viewport.isMobile ? "5rem" : "",
        }}
      >
        <button
          type="button"
          onClick={() => setViewMode("cover")}
          aria-pressed={viewMode === "cover"}
          aria-label="Cover flow view"
          title="Cover flow view"
          className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-200 outline-none ${
            viewMode === "cover"
              ? "bg-rose-600 text-white shadow-[0_6px_18px_rgba(225,29,72,0.35)]"
              : "bg-white/10 text-black hover:bg-white/20"
          }`}
        >
          <GalleryVerticalEnd size={18} />
        </button>

        <button
          type="button"
          onClick={() => setViewMode("cards")}
          aria-pressed={viewMode === "cards"}
          aria-label="Cards view"
          title="Cards view"
          className={`grid h-11 w-11 place-items-center rounded-full transition-all duration-200 outline-none ${
            viewMode === "cards"
              ? "bg-rose-600 text-white shadow-[0_6px_18px_rgba(225,29,72,0.35)]"
              : "bg-white/10 text-black hover:bg-white/20"
          }`}
        >
          <LayoutGrid size={18} />
        </button>
      </div>

      <Suspense
        fallback={
          <div className="flex min-h-[320px] items-center justify-center text-sm text-neutral-500">
            Loading showcase...
          </div>
        }
      >
        {viewMode === "cover" ? (
          <CoverFlow covers={projects} viewport={viewport} />
        ) : (
          <Carousel3D projects={projects} viewport={viewport} />
        )}
      </Suspense>
    </div>
  );
}
