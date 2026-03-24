"use client";

import { useEffect, useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import "./coverflow.css";

type CoverItem = Project & {
  image: string;
  alt?: string;
  "card-title"?: string;
};

export default function CoverFlow({ covers }: { covers: CoverItem[] }) {
  const centeredIndex = useMemo(() => {
    if (!covers.length) return 0;
    return Math.floor(covers.length / 2);
  }, [covers.length]);

  const [activeIndex, setActiveIndex] = useState(centeredIndex);
  const [loadedMap, setLoadedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setActiveIndex(centeredIndex);
  }, [centeredIndex]);

  useEffect(() => {
    covers.forEach((cover, index) => {
      const key = cover.slug ?? String(index);

      const img = new window.Image();
      img.src = cover.image;
      img.onload = () => {
        setLoadedMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
      };
      img.onerror = () => {
        setLoadedMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
      };
    });
  }, [covers]);
  function moveItemToCenteredIndex<T>(items: T[], targetIndex: number) {
    if (!items.length) return items;

    const centeredIndex = Math.floor(items.length / 2);
    const next = [...items];
    const [item] = next.splice(targetIndex, 1);
    next.splice(centeredIndex, 0, item);
    return next;
  }

  const reorderedCards = moveItemToCenteredIndex(covers, 0);

  return (
    <div className="coverflow-wrapper">
      {reorderedCards.map((cover, index) => {
        const offset = index - activeIndex;
        const isActive = index === activeIndex;
        const key = cover.slug ?? String(index);
        const isLoaded = !!loadedMap[key];

        return (
          <div
            key={key}
            className={`coverflow-card ${isActive ? "active" : ""} ${!isLoaded ? "loading" : "loaded"}`}
            style={{
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
            <div className="coverflow-card-media">
              <img
                src={cover.image}
                alt={cover.alt || cover["card-title"] || cover.title}
                className={`coverflow-card-image ${isLoaded ? "is-visible" : ""}`}
                draggable={false}
              />
            </div>

            <span className="lm-project-title">
              {cover["card-title"] ?? cover.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
