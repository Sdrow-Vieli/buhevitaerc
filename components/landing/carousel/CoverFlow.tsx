"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import "./CoverFlow.css";

type CoverItem = Project & {
  image: string;
  alt?: string;
  "card-title"?: string;
};

type CoverFlowProps = {
  covers: CoverItem[];
};

export default function CoverFlow({ covers }: CoverFlowProps) {
  const router = useRouter();
  const navigatingRef = useRef(false);

  const centeredIndex = useMemo(() => {
    if (!covers.length) return 0;
    return Math.floor(covers.length / 2);
  }, [covers.length]);

  const [activeIndex, setActiveIndex] = useState(centeredIndex);

  function moveItemToCenteredIndex<T>(items: T[], targetIndex: number) {
    if (!items.length) return items;

    const centered = Math.floor(items.length / 2);
    const next = [...items];
    const [item] = next.splice(targetIndex, 1);
    next.splice(centered, 0, item);
    return next;
  }

  const isInternalLink = (link: string) => link.startsWith("/");

  const navigateToLink = (link?: string) => {
    if (!link || navigatingRef.current) return;

    navigatingRef.current = true;

    if (isInternalLink(link)) {
      router.push(link);
      return;
    }

    window.location.assign(link);
  };

  const handleCardAction = (index: number, link?: string) => {
    if (index === activeIndex) {
      navigateToLink(link);
      return;
    }

    setActiveIndex(index);
  };

  const reorderedCards = moveItemToCenteredIndex(covers, 0);

  return (
    <div className="coverflow-wrapper">
      {reorderedCards.map((cover, index) => {
        const offset = index - activeIndex;
        const isActive = index === activeIndex;
        const key = cover.slug ?? String(index);

        return (
          <div
            key={key}
            className={`coverflow-card ${isActive ? "active" : ""} loaded`}
            style={{
              transform: `translateX(${offset * 120}%) rotateY(${offset * 45}deg) scale(${isActive ? 1.5 : 0.9})`,
              zIndex: isActive ? 100 : 50 - Math.abs(offset),
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
              alignItems: "center",
              cursor: isActive && cover.link ? "pointer" : "default",
            }}
            onClick={() => handleCardAction(index, cover.link)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCardAction(index, cover.link);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={cover.alt || `cover-${index}`}
            aria-pressed={isActive}
          >
            <div className="coverflow-card-media">
              <img
                src={cover.image}
                alt={cover.alt || cover["card-title"] || cover.title}
                className="coverflow-card-image is-visible"
                draggable={false}
                loading="lazy"
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
