"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import clsx from "clsx";
import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

function getRadius(viewport: ViewportProps) {
  const base = Math.min(viewport.width, viewport.height);

  if (viewport.width < 640) return Math.max(150, Math.min(240, base * 0.3));
  if (viewport.width < 1024) return Math.max(200, Math.min(340, base * 0.4));
  return Math.max(220, Math.min(420, base * 0.35));
}

export default function Carousel3D({
  projects,
  viewport,
}: {
  projects: Project[];
  viewport: ViewportProps;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(220);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const angleStep = useMemo(
    () => (projects.length ? 360 / projects.length : 0),
    [projects.length],
  );

  const currentRotation = -(activeIndex * angleStep);

  useEffect(() => {
    setRadius(getRadius(viewport));
  }, [viewport]);

  useEffect(() => {
    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const angle = index * angleStep + currentRotation;
      const radians = (Math.PI / 180) * angle;
      const x = radius * Math.sin(radians);
      let z = radius * Math.cos(radians);

      if (index !== activeIndex) z -= 60;

      const isActive = index === activeIndex;

      gsap.to(item, {
        x,
        z,
        rotateY: angle,
        scale: isActive ? (viewport.width >= 1024 ? 0.98 : 1.04) : 0.9,
        opacity: isActive ? 1 : 0.88,
        zIndex: isActive ? 10 : 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });
  }, [activeIndex, angleStep, currentRotation, radius]);
  const getSectionHeight = () => {
    if (viewport.isLandscape && viewport.height < 600) return "min-h-[45vh]";
    if (viewport.width >= 1024) return "min-h-[55vh]";
    return "min-h-[50vh]";
  };
  return (
    <section
      className={clsx(
        "relative flex w-full flex-col items-center justify-center perspective-1500",
        getSectionHeight(),
      )}
    >
      <div className="relative flex h-[clamp(300px,38vh,460px)] w-[clamp(240px,24vw,320px)] items-center justify-center preserve-3d">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="absolute preserve-3d"
            style={{
              margin:
                viewport.height <= 600 && viewport.isLandscape
                  ? "80px 50px 50px 50px"
                  : "10px",
            }}
          >
            <ProjectCard
              project={project}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
