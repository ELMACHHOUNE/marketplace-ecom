export function TornEdge({
  className = "",
  fill = "var(--color-paper)",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      className={className}
    >
      <path
        d="M0 0H1200V18L1160 7 1120 21 1080 9 1040 25 1000 11 960 23 920 6 880 20 840 12 800 26 760 8 720 19 680 5 640 22 600 10 560 24 520 7 480 18 440 4 400 21 360 12 320 25 280 8 240 20 200 6 160 23 120 11 80 24 40 9 0 20Z"
        fill={fill}
      />
    </svg>
  );
}
