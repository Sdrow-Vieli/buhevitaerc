import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import clsx from "clsx";
import Logo from "./Logo";

interface ViewportProps {
  isMobile: boolean;
  isTablet: boolean;
  isLandscape: boolean;
  height: number;
  width: number;
}

export default function Footer({ viewport }: { viewport: ViewportProps }) {
  const year = new Date().getFullYear();

  const isColumnLayout = viewport.isMobile && !viewport.isLandscape;

  const getLayout = () => {
    if (viewport.isLandscape && viewport.height < 500)
      return "flex-row justify-between gap-2 py-1";
    if (viewport.isLandscape && viewport.height < 600)
      return "flex-row justify-between gap-3 py-2";
    if (isColumnLayout) return "flex-col py-3";
    return "flex-row justify-between gap-4 py-4";
  };

  const getIconSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "h-3 w-3";
    if (viewport.isLandscape && viewport.height < 600) return "h-4 w-4";
    return "h-5 w-5";
  };

  return (
    <footer
      className={clsx(
        "flex w-full text-neutral-600",
        getLayout(),
        isColumnLayout ? "items-center gap-3" : "items-center",
      )}
    >
      {/* COPYRIGHT */}
      <div
        className={clsx(
          "flex items-center gap-2 text-xs sm:gap-3 sm:text-sm",
          isColumnLayout
            ? "order-2 mt-auto justify-center text-center w-full"
            : "order-1",
        )}
      >
        <span className="inline-flex rounded-full p-0.5">
          <Logo
            size="compact"
            scale={0.4}
            postWidth={0.9}
            dotWidth={1.5}
            bulbWidth={0.7}
            headWidth={2.3}
            headPos={-1.7}
            rayPos={-0.7}
            postMargin={33}
            headColor="#4b5563"
            postColor="#4b5563"
            bulbColor="#4b5563"
            rayColor="#4b5563"
            dotColor="#4b5563"
          />
        </span>
        <span>© {year} LindoCode Digital, Inc.</span>
      </div>

      {/* ICONS */}
      <div
        className={clsx(
          "flex items-center gap-3",
          isColumnLayout ? "order-1 justify-center w-full" : "order-2",
        )}
      >
        <Link
          href="https://www.linkedin.com/company/lindocode-digital-pty-ltd"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:scale-110"
          aria-label="LinkedIn"
        >
          <Linkedin className={getIconSize()} />
        </Link>

        <Link
          href="https://github.com/Lindocode-Digital"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:scale-110"
          aria-label="GitHub"
        >
          <Github className={getIconSize()} />
        </Link>
      </div>
    </footer>
  );
}
