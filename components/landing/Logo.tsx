import clsx from "clsx";

type LogoSize = "compact-xs" | "compact" | "medium" | "large";

type LogoProps = {
  className?: string;
  size?: LogoSize;
  headColor?: string;
  postColor?: string;
  bulbColor?: string;
  dotColor?: string;
  rayColor?: string;
};

export default function Logo({
  className,
  size = "medium",
  headColor = "#111111",
  postColor = "#111111",
  bulbColor = "#111111",
  dotColor = "#dc2626",
  rayColor = "#111111",
}: LogoProps) {
  // Size mapping
  const dimensions = {
    "compact-xs": {
      width: 18,
      height: 34,
      postHeight: 20,
      bulbSize: 4,
      rayLength: 6,
    },
    compact: {
      width: 22,
      height: 42,
      postHeight: 25,
      bulbSize: 5,
      rayLength: 8,
    },
    medium: {
      width: 28,
      height: 54,
      postHeight: 31,
      bulbSize: 7,
      rayLength: 10,
    },
    large: {
      width: 34,
      height: 66,
      postHeight: 38,
      bulbSize: 8,
      rayLength: 12,
    },
  };

  const dims = dimensions[size];

  return (
    <span
      className={clsx(
        "relative inline-flex items-end justify-center",
        className,
      )}
      style={{ width: dims.width, height: dims.height }}
      aria-hidden="true"
    >
      {/* Bulb */}
      <span
        className="absolute rounded-full"
        style={{
          bottom: dims.postHeight - dims.bulbSize / 2,
          width: dims.bulbSize,
          height: dims.bulbSize,
          backgroundColor: bulbColor,
        }}
      />

      {/* Post */}
      <span
        className="absolute"
        style={{
          bottom: 0,
          width: dims.width * 0.12,
          height: dims.postHeight,
          backgroundColor: postColor,
        }}
      />

      {/* Left Ray */}
      <span
        className="absolute"
        style={{
          bottom: dims.postHeight + dims.rayLength * 0.3,
          left: dims.width * 0.2,
          width: dims.width * 0.08,
          height: dims.rayLength,
          backgroundColor: rayColor,
          transform: "rotate(40deg)",
          transformOrigin: "bottom center",
        }}
      />

      {/* Center Ray */}
      <span
        className="absolute"
        style={{
          bottom: dims.postHeight + dims.rayLength * 0.4,
          width: dims.width * 0.08,
          height: dims.rayLength,
          backgroundColor: rayColor,
        }}
      />

      {/* Right Ray */}
      <span
        className="absolute"
        style={{
          bottom: dims.postHeight + dims.rayLength * 0.3,
          right: dims.width * 0.2,
          width: dims.width * 0.08,
          height: dims.rayLength,
          backgroundColor: rayColor,
          transform: "rotate(-40deg)",
          transformOrigin: "bottom center",
        }}
      />
    </span>
  );
}
