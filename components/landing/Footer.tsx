import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
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

  const getLayout = () => {
    if (viewport.isLandscape && viewport.height < 500)
      return "flex-row justify-between gap-2 py-1";
    if (viewport.isLandscape && viewport.height < 600)
      return "flex-row justify-between gap-3 py-2";
    if (viewport.isMobile && !viewport.isLandscape)
      return "flex-col gap-2 py-3";
    return "flex-row justify-between gap-4 py-4";
  };

  const getIconSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "h-3 w-3";
    if (viewport.isLandscape && viewport.height < 600) return "h-4 w-4";
    return "h-5 w-5";
  };

  const getLogoSize = () => {
    if (viewport.isLandscape && viewport.height < 500) return "compact-xs";
    if (viewport.isLandscape && viewport.height < 600) return "compact";
    if (viewport.isMobile && !viewport.isLandscape) return "compact";
    return "medium";
  };

  return (
    <footer
      className={`flex w-full items-center ${getLayout()} text-neutral-600`}
    >
      <div className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm">
        <span className="inline-flex rounded-full p-0.5">
          <Logo
            size="compact"
            scale={0.4}
            postWidth={0.9}
            dotWidth={0.9}
            bulbWidth={0.7}
            headWidth={1.7}
            headPos={-2}
            rayPos={-1.2}
            postMargin={30}
            headColor="#4b5563"
            postColor="#4b5563"
            bulbColor="#4b5563"
            rayColor="#4b5563"
            dotColor="#4b5563"
          />
        </span>
        <span>© {year} LindoCode Digital, Inc.</span>
      </div>

      <div className="flex items-center gap-3">
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
