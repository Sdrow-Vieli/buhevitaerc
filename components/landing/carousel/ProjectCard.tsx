"use client";

import Image from "next/image";
import clsx from "clsx";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  active: boolean;
  onClick: () => void;
};

export default function ProjectCard({
  project,
  active,
  onClick,
}: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative h-[clamp(250px,35svh,440px)] w-[clamp(210px,58vw,340px)] cursor-pointer transition-all duration-500 ease-out sm:w-[clamp(230px,42vw,350px)] lg:w-[clamp(250px,28vw,360px)]",
        active ? "scale-100" : "scale-[0.95]",
      )}
    >
      <div
        className={clsx(
          "absolute inset-0 rounded-[1.1rem] transition-all duration-500",
          active ? "opacity-100 rotate-0" : "opacity-0 rotateY-180",
        )}
      >
        {/* FRONT - Detailed card (active only) */}
        <div className="flex h-full flex-col overflow-hidden rounded-[1.1rem] bg-white shadow-[0_18px_24px_rgba(0,0,0,0.7)]">
          <div className="relative h-[64%] w-full overflow-hidden rounded-t-[1.1rem] border-[4px] border-white bg-neutral-100 sm:border-[5px]">
            <Image
              src={project.image}
              alt={project.cardTitle}
              fill
              priority={active}
              sizes="(max-width: 639px) 58vw, (max-width: 1023px) 42vw, 360px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-2 flex justify-center px-2">
              <span className="inline-flex max-w-[90%] truncate rounded-full border border-rose-500 bg-white px-3 py-1 text-[clamp(0.72rem,2vw,1rem)] font-semibold text-black shadow-sm sm:px-4">
                {project.cardTitle}
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
            <div className="space-y-1">
              <p className="text-center text-[clamp(0.75rem,1.8vw,1rem)] font-medium leading-snug text-neutral-800">
                {project.description}
              </p>
              {project.cardSubtitle && (
                <p className="text-center text-[clamp(0.68rem,1.5vw,0.88rem)] text-neutral-500">
                  {project.cardSubtitle}
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 self-center">
              {project.icons.map((icon, idx) => (
                <Image
                  key={`${project.slug}-${idx}`}
                  src={icon.src}
                  alt={icon.alt}
                  width={icon.size}
                  height={icon.size}
                  className="h-auto w-auto max-h-8 max-w-8 sm:max-h-9 sm:max-w-9"
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={clsx(
          "absolute inset-0 rounded-[1.1rem] transition-all duration-500",
          active ? "opacity-0 -rotateY-180" : "opacity-100 rotate-0",
        )}
      >
        {/* BACK - Simple red card (inactive cards) */}
        <div className="flex h-full items-center justify-center rounded-[1.1rem] bg-red-600 shadow-[0_8px_12px_rgba(0,0,0,0.8)]">
          <span className="text-center text-white font-semibold text-lg px-4">
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}
