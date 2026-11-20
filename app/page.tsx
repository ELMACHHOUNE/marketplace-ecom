import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PrismaHero } from "@/components/ui/prisma-hero";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { AboutSection } from "@/components/about-section";
import { TornEdge } from "@/components/torn-edge";
import {
  getFeaturedProducts,
  listCategoriesWithCounts,
  listProducts,
} from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";
import { toRailGarments } from "@/lib/rail";

export default async function Home() {
  const [featured, latest, categories] = await Promise.all([
    getFeaturedProducts(10),
    listProducts({ limit: 10 }),
    listCategoriesWithCounts(),
  ]);

  const seen = new Set<string>();
  const editProducts = [...featured, ...latest]
    .filter((product) => {
      if (seen.has(product.id)) return false;
      seen.add(product.id);
      return true;
    })
    .slice(0, 10);

  const categoryCounts = new Map(
    categories.map((entry) => [entry.category, entry.count]),
  );

  return (
    <>
      <PrismaHero />

      <section className="border-y border-line bg-paper/70">
        <div className="shell flex flex-wrap items-center gap-2.5 py-5">
          <span className="mr-2 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-muted">
            Shop by
          </span>
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-2 text-xs font-semibold text-ink/80 transition-colors hover:border-olive/30 hover:text-olive"
            >
              {category}
              <span className="text-[0.6rem] text-muted transition-colors group-hover:text-gold">
                {categoryCounts.get(category) ?? 0}
              </span>
            </Link>
          ))}
          <Link
            href="/products"
            className="ml-auto hidden items-center gap-1.5 text-xs font-semibold text-olive sm:inline-flex"
          >
            View everything <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </section>

      {editProducts.length > 0 ? (
        <ClothingRailHero
          items={toRailGarments(editProducts)}
          eyebrow="The weekly edit"
          title="Objects worth keeping."
          description="A slowly changing rail of small-batch pieces from independent studios — ceramics, textiles, pantry staples and quiet objects made to be used every day."
          caption="Curated this week"
          ctaLabel="Shop all pieces"
          ctaHref="/products"
          hanger="wood"
          autoplay={editProducts.length > 3}
          interval={4200}
          className="border-y border-line"
        />
      ) : (
        <section className="shell py-20 lg:py-24">
          <p className="eyebrow">The weekly edit</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            Objects worth keeping.
          </h2>
          <p className="mt-11 rounded-2xl border border-line bg-paper p-8 text-sm text-muted">
            The shelves are being restocked. Check back soon, or browse the full
            market.
          </p>
        </section>
      )}

      <AboutSection />

      <section className="grain relative mt-20 bg-olive-dark text-cream">
        <TornEdge className="absolute inset-x-0 top-0 z-10 h-8 w-full" />
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-80 rounded-full border border-gold/25"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-gold/10 blur-2xl"
        />

        <div className="shell relative py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow !text-gold-light before:!bg-gold-light">
                For makers
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
                Your work deserves a better shelf.
              </h2>
              <p className="mt-5 max-w-xl leading-relaxed text-sand/85">
                Open a studio account in minutes. Publish your pieces, manage
                stock and orders, and keep 85% of every sale. No listing fees,
                no monthly rent.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/register?role=seller" className="btn-gold">
                  Open a studio
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/about#makers"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-cream/10"
                >
                  Maker handbook
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                <p className="font-display text-4xl text-gold-light">85%</p>
                <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand/70">
                  Kept by the maker
                </p>
              </div>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                <p className="font-display text-4xl text-gold-light">0</p>
                <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand/70">
                  Listing fees
                </p>
              </div>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                <p className="font-display text-4xl text-gold-light">120+</p>
                <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand/70">
                  Studios onboard
                </p>
              </div>
              <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                <p className="font-display text-4xl text-gold-light">38</p>
                <p className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-sand/70">
                  Countries reached
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
