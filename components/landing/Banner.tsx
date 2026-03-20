import clsx from "clsx";

type BannerProps = {
  textLeft?: string;
  textMiddle?: string;
  textRight?: string;
  accentColor?: string;
};

export default function Banner({
  textLeft = "INNOVATE.",
  textMiddle = "BUILD.",
  textRight = "SCALE.",
  accentColor = "text-rose-600",
}: BannerProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-2 py-2 landscape:max-h-[500px]:opacity-100">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="h-14 w-1 rounded-full bg-rose-600 sm:h-16" />

        <div className="min-w-0">
          <p className="m-0 text-sm text-neutral-600">Elegant Simplicity</p>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-nowrap sm:gap-x-4">
            <span className="text-[clamp(1.1rem,3vw,2.25rem)] font-black tracking-[0.12em] text-neutral-900">
              {textLeft}
            </span>
            <span
              className={clsx(
                "text-[clamp(1.1rem,3vw,2.25rem)] font-black tracking-[0.12em]",
                accentColor,
              )}
            >
              {textMiddle}
            </span>
            <span className="text-[clamp(1.1rem,3vw,2.25rem)] font-black tracking-[0.12em] text-neutral-900">
              {textRight}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
