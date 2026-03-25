"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import clsx from "clsx";
import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

function getRadius(width: number, height: number) {
  const base = Math.min(width, height);

  if (width < 640) return Math.max(150, Math.min(240, base * 0.3));
  if (width < 1024) return Math.max(200, Math.min(340, base * 0.4));
  return Math.max(220, Math.min(420, base * 0.35));
}

export default function Carousel3D({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [radius, setRadius] = useState(220);
  const [isDesktop, setIsDesktop] = useState(false);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  const angleStep = useMemo(
    () => (projects.length ? 360 / projects.length : 0),
    [projects.length],
  );

  const currentRotation = -(activeIndex * angleStep);

  useEffect(() => {
    const updateMetrics = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setRadius(getRadius(width, height));
      setIsDesktop(width >= 1024);
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);

    return () => {
      window.removeEventListener("resize", updateMetrics);
    };
  }, []);

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
        scale: isActive ? (isDesktop ? 0.98 : 1.04) : 0.9,
        opacity: isActive ? 1 : 0.88,
        zIndex: isActive ? 10 : 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
    });
  }, [activeIndex, angleStep, currentRotation, radius, isDesktop]);

  return (
    <section
      className={clsx(
        "relative flex w-full flex-col items-center justify-center perspective-1500",
        "min-h-[50vh] lg:min-h-[55vh]",
      )}
    >
      <div className="relative flex h-[clamp(300px,38vh,460px)] w-[clamp(240px,24vw,320px)] items-center justify-center preserve-3d">
        {projects.map((project, index) => (
          <div
            key={project.slug}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className="absolute preserve-3d landscape:max-h-[600px]:m-[80px_50px_50px_50px]"
            style={{ margin: "10px" }}
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
