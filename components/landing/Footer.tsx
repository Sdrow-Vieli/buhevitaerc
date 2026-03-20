import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex w-full flex-col items-center justify-between gap-4 px-2 py-4 text-neutral-600 sm:flex-row">
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex rounded-full p-1">
          <Logo
            compact
            headColor="#4b5563"
            postColor="#4b5563"
            bulbColor="#4b5563"
            rayColor="#4b5563"
            dotColor="#4b5563"
          />
        </span>
        <span>© {year} LindoCode Digital, Inc.</span>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://www.linkedin.com/company/lindocode-digital-pty-ltd"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:scale-110"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </Link>

        <Link
          href="https://github.com/Lindocode-Digital"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-200 hover:scale-110"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </Link>
      </div>
    </footer>
  );
}
