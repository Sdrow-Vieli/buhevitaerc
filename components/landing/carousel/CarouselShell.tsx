"use client";

import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects";

const Carousel3D = dynamic(() => import("./Carousel3D"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center text-sm text-neutral-500">
      Loading showcase...
    </div>
  ),
});

export default function CarouselShell({ projects }: { projects: Project[] }) {
  return <Carousel3D projects={projects} />;
}
