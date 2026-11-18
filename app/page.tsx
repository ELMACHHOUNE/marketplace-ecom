import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Leaf,
  PackageCheck,
} from "lucide-react";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { ProductCard } from "@/components/product-card";
import { getFeaturedProducts, listCategoriesWithCounts } from "@/lib/products";
import { CATEGORIES } from "@/lib/constants";

const promises = [
  {
    icon: BadgeCheck,
    title: "Verified makers",
    copy: "Every studio is interviewed and every listing is reviewed before it goes live.",
  },
  {
    icon: Leaf,
    title: "Materials, disclosed",
    copy: "Natural fibres, recycled metals and food-safe finishes — written on every page.",
  },
  {
    icon: PackageCheck,
    title: "Packed with care",
    copy: "Plastic-free packaging, carbon-balanced delivery and a 30-day return window.",
  },
];

export default async function Home() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(4),
    listCategoriesWithCounts(),
  ]);

  const categoryCounts = new Map(
    categories.map((entry) => [entry.category, entry.count]),
  );

  return (
    <>
      <Hero />

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

      <section className="shell py-20 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">The weekly edit</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
              Objects worth keeping.
            </h2>
          </div>
          <Link href="/products" className="btn-outline shrink-0">
            Shop all pieces
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-11 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <p className="mt-11 rounded-2xl border border-line bg-paper p-8 text-sm text-muted">
            The shelves are being restocked. Check back soon, or browse the full
            market.
          </p>
        )}
      </section>

      <AboutSection />

      <section className="shell py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Olea</p>
          <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            Fewer things. Better made.
          </h2>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-3">
          {promises.map((promise) => (
            <div
              key={promise.title}
              className="rounded-2xl border border-line bg-paper p-7 transition-colors hover:border-olive/25"
            >
              <span className="grid size-11 place-items-center rounded-full bg-olive/8 text-olive">
                <promise.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-ink">
                {promise.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {promise.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-20 lg:pb-24">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-olive px-6 py-12 text-cream sm:px-12 lg:px-16 lg:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-80 rounded-full border border-gold/25"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 left-1/3 size-72 rounded-full bg-gold/10 blur-2xl"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow !text-gold-light before:!bg-gold-light">
                For makers
              </p>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.03] tracking-[-0.02em] sm:text-5xl">
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
