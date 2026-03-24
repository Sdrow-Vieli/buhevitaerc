"use client";

import { useState } from "react";
import type { Project } from "@/lib/projects";
import "./coverflow.css";

type CoverItem = Project & {
  image: string;
  alt?: string;
  "card-title"?: string;
};

export default function CoverFlow({ covers }: { covers: CoverItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="coverflow-wrapper">
      {covers.map((cover, index) => {
        const offset = index - activeIndex;
        const isActive = index === activeIndex;

        return (
          <div
            key={cover.slug ?? index}
            className={`coverflow-card ${isActive ? "active" : ""}`}
            style={{
              backgroundImage: `url(${cover.image})`,
              transform: `translateX(${offset * 120}%) rotateY(${offset * 45}deg) scale(${isActive ? 1.5 : 0.9})`,
              zIndex: isActive ? 100 : 50 - Math.abs(offset),
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center",
            }}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveIndex(index);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={cover.alt || `cover-${index}`}
          >
            <span className="lm-project-title">
              {cover["card-title"] ?? cover.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
