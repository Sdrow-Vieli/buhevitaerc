"use client";

import "./logo.css";
import Logo from "./Logo";
import clsx from "clsx";

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

export default function CompanyName({ viewport }: { viewport: ViewportProps }) {
  const word = "LINDOCODE";
  const isViewportReady = viewport.width > 0 && viewport.height > 0;

  const getTextSize = () => {
    if (viewport.width <= 420) return "text-[1.65rem]";
    if (viewport.width <= 520) return "text-[1.85rem]";
    if (viewport.width <= 640) return "text-[2rem]";
    if (viewport.isLandscape && viewport.height < 500) return "text-[1.5rem]";
    if (viewport.isLandscape && viewport.height < 600) return "text-[1.8rem]";
    if (viewport.isMobile && !viewport.isLandscape) return "text-[2rem]";
    if (viewport.isTablet && viewport.isLandscape) return "text-[2.5rem]";
    return "text-[3rem]";
  };

  const getDigitalSize = () => {
    if (viewport.width <= 420) return "text-[0.95rem]";
    if (viewport.width <= 520) return "text-[1.1rem]";
    if (viewport.width <= 640) return "text-[1.2rem]";
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

  const getLogoConfig = () => {
    if (viewport.width <= 420) {
      return {
        size: "compact-xs" as const,
        scale: 0.62,
        postMargin: 30,
        headPos: -0.2,
        rayPos: 0.6,
      };
    }

    if (viewport.width <= 520) {
      return {
        size: "compact" as const,
        scale: 0.78,
        postMargin: 35,
        headPos: 0.05,
        rayPos: 0.75,
      };
    }

    if (viewport.width <= 640) {
      return {
        size: "compact-xs" as const,
        scale: 0.6,
        postMargin: 35,
        headPos: 0.3,
        rayPos: 1.2,
      };
    }

    if (viewport.width > 640 && viewport.height <= 600) {
      return {
        size: "compact-xs" as const,
        scale: 0.6,
        postMargin: 35,
        headPos: 0.3,
        rayPos: 1.2,
      };
    }

    if (viewport.isLandscape && viewport.height < 500) {
      return {
        size: "compact-xs" as const,
        scale: 0.58,
        postMargin: 10,
        headPos: -0.9,
        rayPos: -0.05,
      };
    }

    if (viewport.isLandscape && viewport.height < 600) {
      return {
        size: "compact" as const,
        scale: 0.76,
        postMargin: 16,
        headPos: 0.15,
        rayPos: 0.85,
      };
    }

    if (viewport.isMobile && !viewport.isLandscape && viewport.height > 600) {
      return {
        size: "medium" as const,
        scale: 1,
        postMargin: 45,
        headPos: 0.65,
        rayPos: 1.7,
      };
    }

    if (viewport.isMobile && !viewport.isLandscape) {
      return {
        size: "medium" as const,
        scale: 0.94,
        postMargin: 30,
        headPos: 0.9,
        rayPos: 1.7,
      };
    }

    return {
      size: "large" as const,
      scale: 1.1,
      postMargin: 40,
      headPos: 1,
      rayPos: 2,
    };
  };

  const getLogoNudge = () => {
    if (viewport.width <= 420) return "-mt-0.5";
    if (viewport.width <= 640) return "-mt-0.5";
    if (viewport.isLandscape && viewport.height < 500) return "-mt-1";
    if (viewport.isLandscape && viewport.height < 600) return "-mt-1";
    return "-mt-1";
  };

  if (!isViewportReady) {
    return (
      <header className="flex w-full flex-col items-center justify-center gap-2 py-2">
        <div className="company-name-skeleton-wrap">
          <div className="company-name-skeleton company-name-skeleton-main h-10 w-[230px] sm:h-12 sm:w-[310px]" />
        </div>
        <div className="company-name-skeleton-wrap">
          <div className="company-name-skeleton company-name-skeleton-sub h-4 w-[112px] sm:h-5 sm:w-[148px]" />
        </div>
      </header>
    );
  }

  const logoConfig = getLogoConfig();

  return (
    <header
      className={clsx(
        "company-name-enter flex w-full justify-center transition-all duration-300 ease-in-out",
        getLayout(),
      )}
    >
      <div
        className={clsx(
          "flex items-end justify-center font-black tracking-[0.06em] text-black",
          getTextSize(),
        )}
      >
        {word.split("").map((char, index) =>
          char === "I" ? (
            <span
              key="logo-i"
              className={clsx(
                "company-name-logo-pop mx-[0.04em] inline-flex items-end",
                getLogoNudge(),
              )}
              style={{ animationDelay: `${index * 45}ms` }}
            >
              <Logo
                size={logoConfig.size}
                scale={logoConfig.scale}
                postMargin={logoConfig.postMargin}
                headPos={logoConfig.headPos}
                rayPos={logoConfig.rayPos}
              />
            </span>
          ) : (
            <span
              key={index}
              className="company-name-letter inline-block"
              style={{ animationDelay: `${index * 45}ms` }}
            >
              {char}
            </span>
          ),
        )}
      </div>

      <div
        className={clsx(
          "company-name-digital font-bold tracking-[0.18em] text-black",
          getDigitalSize(),
        )}
      >
        DIGITAL™
      </div>
    </header>
  );
}
