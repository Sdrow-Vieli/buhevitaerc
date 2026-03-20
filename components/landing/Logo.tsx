import clsx from "clsx";

type LogoProps = {
  className?: string;
  compact?: boolean;
  headColor?: string;
  postColor?: string;
  bulbColor?: string;
  dotColor?: string;
  rayColor?: string;
};
export default function Logo({
  className,
  compact = false,
  headColor = "#111111",
  postColor = "#111111",
  bulbColor = "#111111",
  dotColor = "#dc2626",
  rayColor = "#111111",
}: LogoProps) {
  const scale = compact ? 0.75 : 1;

  return (
    <span
      className={clsx(
        "relative inline-flex items-end justify-center",
        className,
      )}
      style={{ width: 28 * scale, height: 54 * scale }}
      aria-hidden="true"
    >
      <span
        className="absolute rounded-full"
        style={{
          bottom: 23 * scale,
          width: 7 * scale,
          height: 7 * scale,
          backgroundColor: bulbColor,
        }}
      />

      <span
        className="absolute"
        style={{
          bottom: 0,
          width: 3 * scale,
          height: 31 * scale,
          backgroundColor: postColor,
        }}
      />

      <span
        className="absolute"
        style={{
          bottom: 39 * scale,
          left: 3 * scale,
          width: 2 * scale,
          height: 10 * scale,
          backgroundColor: rayColor,
          transform: "rotate(40deg)",
          transformOrigin: "bottom center",
        }}
      />

      <span
        className="absolute"
        style={{
          bottom: 42 * scale,
          width: 2 * scale,
          height: 10 * scale,
          backgroundColor: rayColor,
        }}
      />

      <span
        className="absolute"
        style={{
          bottom: 39 * scale,
          right: 3 * scale,
          width: 2 * scale,
          height: 10 * scale,
          backgroundColor: rayColor,
          transform: "rotate(-40deg)",
          transformOrigin: "bottom center",
        }}
      />
    </span>
  );
}
