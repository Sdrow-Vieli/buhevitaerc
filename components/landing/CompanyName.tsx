"use client";

import "./logo.css";
import Logo from "./Logo";

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

export default function CompanyName({ viewport }: { viewport: ViewportProps }) {
  const word = "LINDOCODE";

  const getTextSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "text-[1.5rem]";
    if (viewport.isLandscape && viewport.height < 600) return "text-[1.8rem]";
    if (viewport.isMobile && !viewport.isLandscape) return "text-[2rem]";
    if (viewport.isTablet && viewport.isLandscape) return "text-[2.5rem]";
    return "text-[3rem]";
  };

  const getDigitalSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "text-[1rem]";
    if (viewport.isLandscape && viewport.height < 600) return "text-[1.2rem]";
    if (viewport.isMobile && !viewport.isLandscape) return "text-[1.3rem]";
    if (viewport.isTablet && viewport.isLandscape) return "text-[1.8rem]";
    return "text-[2rem]";
  };

  const getLayout = () => {
    if (viewport.isLandscape && viewport.height < 500) {
      return "flex-row items-center gap-2";
    }
    if (viewport.isLandscape && viewport.height < 600) {
      return "flex-row items-center gap-3";
    }
    if (viewport.isMobile && !viewport.isLandscape) {
      return "flex-col items-center gap-1";
    }
    if (viewport.isTablet && viewport.isLandscape) {
      return "flex-row items-center gap-4";
    }
    return "flex-col items-center gap-2";
  };

  const getLogoSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "compact-xs";
    if (viewport.isLandscape && viewport.height < 600) return "compact";
    if (viewport.isMobile && !viewport.isLandscape) return "medium";
    return "large";
  };

  const getLogoNudge = () => {
    if (viewport.isLandscape && viewport.height < 500) return "-mt-1";
    if (viewport.isLandscape && viewport.height < 600) return "-mt-1";
    return "-mt-1";
  };

  return (
    <header
      className={`
        flex ${getLayout()} justify-center w-full
        transition-all duration-300 ease-in-out
      `}
    >
      <div
        className={`
          flex items-end justify-center
          ${getTextSize()}
          font-black tracking-[0.06em] text-black
        `}
      >
        {word.split("").map((char, index) =>
          char === "I" ? (
            <span
              key="logo-i"
              className={`mx-[0.04em] inline-flex items-end ${getLogoNudge()}`}
            >
              <Logo size={getLogoSize()} />{" "}
            </span>
          ) : (
            <span key={index} className="inline-block">
              {char}
            </span>
          ),
        )}
      </div>

      <div
        className={`
          ${getDigitalSize()}
          font-bold tracking-[0.18em] text-black
        `}
      >
        DIGITAL™
      </div>
    </header>
  );
}
