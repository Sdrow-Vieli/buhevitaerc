"use client";

import clsx from "clsx";

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

type BannerProps = {
  viewport: ViewportProps;
  textLeft?: string;
  textMiddle?: string;
  textRight?: string;
  accentColor?: string;
};
/* mxm */
export default function Banner({
  viewport,
  textLeft = "INNOVATE.",
  textMiddle = "BUILD.",
  textRight = "SCALE.",
  accentColor = "text-rose-600",
}: BannerProps) {
  const sectionClasses = clsx(
    "mx-auto w-full max-w-4xl px-2 py-2",
    viewport.isLandscape && viewport.height < 500 && "opacity-100",
    viewport.isMobile && !viewport.isLandscape && "px-3 py-3",
    viewport.isTablet && "px-4 py-3",
    viewport.width >= 1024 && "px-2 py-2",
  );

  const barClasses = clsx(
    "w-1 rounded-full bg-rose-600",
    viewport.isLandscape && viewport.height < 500 ? "h-10" : "h-14 sm:h-16",
  );

  const subtextClasses = clsx(
    "m-0 text-neutral-600",
    viewport.isMobile ? "text-xs" : "text-sm",
  );

  const textRowClasses = clsx(
    "flex items-center gap-x-3 gap-y-1",
    viewport.isMobile ? "flex-wrap" : "flex-wrap sm:flex-nowrap sm:gap-x-4",
  );

  const baseHeadline = "text-[clamp(1.1rem,3vw,2.25rem)] tracking-[0.12em]";

  const sideText = "font-medium text-neutral-700 opacity-90";
  const middleText = "font-black";

  return (
    <section className={sectionClasses}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={barClasses} />

        <div className="min-w-0">
          <p className={subtextClasses}>Elegant Simplicity</p>
          <div className={textRowClasses}>
            <span className={clsx(baseHeadline, sideText)}>{textLeft}</span>

            <span className={clsx(baseHeadline, middleText, accentColor)}>
              {textMiddle}
            </span>

            <span className={clsx(baseHeadline, sideText)}>{textRight}</span>
          </div>{" "}
        </div>
      </div>
    </section>
  );
}
