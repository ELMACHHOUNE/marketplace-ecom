import Link from "next/link";

export function Logo({
  tone = "dark",
  className = "",
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Olea home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <span
        className={`grid size-10 place-items-center rounded-full border ${
          tone === "light"
            ? "border-cream/30 bg-cream/10"
            : "border-olive/20 bg-olive/5"
        }`}
      >
        <svg
          viewBox="0 0 32 32"
          className="size-5"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M16 25c0-7 4-11.5 10-13-.5 7-4 11-10 13Z"
            fill={tone === "light" ? "#D8C9A8" : "#4F5B2A"}
          />
          <path
            d="M16 25c0-5-3-8.5-8-10 .7 5 3.2 8.5 8 10Z"
            fill="#B8892D"
          />
          <path
            d="M16 27V16"
            stroke={tone === "light" ? "#F5EFE3" : "#4F5B2A"}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.45rem] tracking-[0.18em] ${
            tone === "light" ? "text-cream" : "text-olive"
          }`}
        >
          OLEA
        </span>
        <span
          className={`mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.32em] ${
            tone === "light" ? "text-sand/80" : "text-muted"
          }`}
        >
          Marketplace
        </span>
      </span>
    </Link>
  );
}
