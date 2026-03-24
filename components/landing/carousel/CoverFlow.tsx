"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import "./coverflow.css";

type CoverItem = Project & {
  image: string;
  alt?: string;
  "card-title"?: string;
};

export default function CoverFlow({ covers }: { covers: CoverItem[] }) {
  const router = useRouter();
  const navigatingRef = useRef(false);

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
    let cancelled = false;
    const images: HTMLImageElement[] = [];

    covers.forEach((cover, index) => {
      const key = cover.slug ?? String(index);
      const img = new window.Image();
      images.push(img);

      const markLoaded = () => {
        if (cancelled) return;
        setLoadedMap((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
      };

      img.onload = markLoaded;
      img.onerror = markLoaded;
      img.src = cover.image;
    });

    return () => {
      cancelled = true;
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [covers]);

  useEffect(() => {
    const resetNavigationFlag = () => {
      navigatingRef.current = false;
    };

    window.addEventListener("pageshow", resetNavigationFlag);
    return () => {
      window.removeEventListener("pageshow", resetNavigationFlag);
    };
  }, []);

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
