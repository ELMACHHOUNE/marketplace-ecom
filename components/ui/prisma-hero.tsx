import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ---------------- Organic torn-paper edge ---------------- */
/** Deterministic, hand-torn ridge: irregular heights, never a clean zigzag. */
const TEAR_PATH = (() => {
  const n = 72;
  let seed = 1337;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  let d = "M0 0 H1200 V6";
  for (let i = n; i >= 0; i--) {
    const x = (i / n) * 1200;
    const spike = rnd() < 0.18 ? 1.7 : 1;
    const y = 5 + (rnd() * 16 + Math.sin(i * 1.7) * 3) * spike;
    d += ` L${x.toFixed(1)} ${Math.min(27, y).toFixed(1)}`;
  }
  return d + " Z";
})();

function PaperTear({ className, fill }: { className?: string; fill: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 30"
      preserveAspectRatio="none"
      className={className}
    >
      <path d={TEAR_PATH} fill={fill} />
    </svg>
  );
}

/* ---------------- Imagery ---------------- */
const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
  detail:
    "https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=700&q=80",
};

const PROOF = ["120+ studios", "Small-batch only", "85% to the maker"];

/* ---------------- Hero ---------------- */
interface PrismaHeroProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const PrismaHero = ({
  eyebrow = "Independent makers · Considered goods",
  description = "Olea brings together ceramics, textiles and quiet objects from independent studios — each piece traceable to the hands that made it.",
  ctaLabel = "Explore the collection",
  ctaHref = "/products",
  secondaryCtaLabel = "Discover our story",
  secondaryCtaHref = "/about",
}: PrismaHeroProps) => {
  return (
    <section className="grain relative overflow-hidden bg-olive-dark text-cream">
      {/* soft light + texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-32 size-[32rem] rounded-full bg-gold/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 size-[26rem] rounded-full bg-olive-light/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
      />

      <div className="shell relative grid gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-28">
        {/* ---------- Copy ---------- */}
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow !text-gold-light before:!bg-gold-light">
            {eyebrow}
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.25rem)] leading-[0.94] tracking-[-0.03em] text-cream">
            Made by hand.
            <br />
            <span className="italic text-gold-light">Kept for years.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sand/85">
            {description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={ctaHref} className="btn-gold">
              {ctaLabel}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-cream/10"
            >
              {secondaryCtaLabel}
            </Link>
          </div>

          <ul className="mt-11 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-cream/15 pt-6">
            {PROOF.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-sand/75"
              >
                <span className="size-1.5 rounded-full bg-gold-light" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---------- Collage ---------- */}
        <div className="relative z-10 mx-auto mb-10 w-full max-w-md lg:mb-0 lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute inset-5 -rotate-3 rounded-[2rem] bg-cream/90"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-cream/20 shadow-2xl shadow-black/30">
            <Image
              src={HERO_IMAGES.main}
              alt="Hand-thrown ceramic vessels from an independent studio"
              fill
              priority
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/40 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-9 -left-5 w-32 -rotate-6 overflow-hidden rounded-2xl border-[6px] border-cream shadow-xl sm:w-40">
            <div className="relative aspect-square">
              <Image
                src={HERO_IMAGES.detail}
                alt="Woven textile detail"
                fill
                sizes="(min-width: 640px) 160px, 128px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -right-4 top-6 flex size-[5.5rem] rotate-6 flex-col items-center justify-center rounded-full bg-gold text-center text-olive-dark shadow-lg">
            <span className="font-display text-[1.3rem] leading-none">
              100%
            </span>
            <span className="mt-1 text-[0.5rem] font-bold uppercase tracking-[0.18em]">
              handmade
            </span>
          </div>
        </div>
      </div>

     
    </section>
  );
};

export { PrismaHero };
