import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

const stats = [
  { value: "120+", label: "Independent makers" },
  { value: "38", label: "Countries shipped" },
  { value: "4.9", label: "Average rating" },
  { value: "85%", label: "Kept by makers" },
];

export function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 size-[34rem] rounded-full bg-olive/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 size-[30rem] rounded-full bg-gold/10 blur-3xl"
      />

      <div className="shell relative grid items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
        <div className="animate-fade-up">
          <p className="eyebrow">Independent makers · Considered goods</p>

          <h1 className="mt-6 max-w-xl font-display text-[2.9rem] leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.6rem]">
            Objects with a{" "}
            <span className="italic text-olive">story.</span>
            <br />
            Makers with a{" "}
            <span className="relative whitespace-nowrap">
              name.
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-2 left-0 w-full text-gold"
                fill="none"
              >
                <path
                  d="M2 8.5c40-5 78-6 108-6 34 0 70 2 108 6"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-[0.98rem] leading-relaxed text-muted sm:text-lg">
            A curated marketplace for ceramics, textiles, pantry staples and
            small-batch objects. Every piece is made by a verified independent
            studio — and every maker keeps the majority of the sale.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/products" className="btn-primary">
              Explore the market
              <ArrowRight className="size-4" />
            </Link>
            <Link href="/about" className="btn-outline">
              Meet the makers
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl text-olive">{stat.value}</p>
                <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[30rem] lg:mx-0 lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-x-4 bottom-8 top-16 rounded-[14rem_14rem_2rem_2rem] border border-gold/25"
          />

          <div className="relative aspect-[4/5] overflow-hidden rounded-[14rem_14rem_1.5rem_1.5rem] border border-line bg-sand/40 shadow-[0_40px_80px_-50px_rgba(34,38,26,0.5)]">
            <Image
              src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85"
              alt="Hand-thrown stoneware vessels on a potter's shelf"
              fill
              priority
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-olive-dark/70 to-transparent p-6 pt-20">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-sand">
                In the studio
              </p>
              <p className="mt-1 font-display text-xl text-cream">
                Terra & Loom · Lisbon
              </p>
            </div>
          </div>

          <div className="absolute -left-4 bottom-24 hidden w-44 overflow-hidden rounded-2xl border-4 border-cream shadow-xl sm:block">
            <div className="relative aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
                alt="A bottle of first harvest olive oil"
                fill
                sizes="11rem"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute -right-3 top-8 grid size-28 -rotate-6 place-items-center rounded-full border border-gold/40 bg-cream/95 text-center shadow-lg backdrop-blur sm:-right-6">
            <div>
              <Sparkles className="mx-auto size-4 text-gold" />
              <p className="mt-1 font-display text-sm leading-tight text-olive">
                Handpicked,
                <br />
                small batch
              </p>
              <p className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-muted">
                Since 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
