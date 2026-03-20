"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";

const Carousel3D = dynamic(() => import("./Carousel3D"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[320px] items-center justify-center text-sm text-neutral-500">
      Loading showcase...
    </div>
  ),
});

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
  return <Carousel3D projects={projects} viewport={viewport} />;
}
