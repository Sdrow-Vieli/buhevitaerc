import Logo from "./Logo";

export default function CompanyName() {
  const word = "LINDOCODE";

  return (
    <header className="flex min-h-[18vh] flex-col items-center justify-center pt-2 sm:min-h-[20vh] lg:min-h-[22vh] landscape:max-h-[500px]:min-h-[16vh] landscape:max-h-[500px]:flex-row">
      <div className="flex items-center gap-[0.08em] text-[clamp(2rem,6vw,3.5rem)] font-black tracking-[0.08em] text-black">
        {word
          .split("")
          .map((char, index) =>
            char === "I" ? (
              <Logo key="logo-i" className="mx-1" />
            ) : (
              <span key={index}>{char}</span>
            ),
          )}
      </div>

      <div className="mt-2 text-[clamp(1.3rem,3.5vw,4.5rem)] tracking-[0.12em] text-black landscape:max-h-[500px]:ml-4 landscape:max-h-[500px]:mt-3">
        DIGITAL™
      </div>
    </header>
  );
}
