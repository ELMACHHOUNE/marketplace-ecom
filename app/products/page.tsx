import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { CATEGORIES } from "@/lib/constants";
import { listCategoriesWithCounts, listProducts } from "@/lib/products";
import { toRailGarments } from "@/lib/rail";

type SearchParams = Promise<{ q?: string; category?: string }>;

export const metadata = {
  title: "The market",
  description:
    "Browse handmade ceramics, textiles, pantry staples, jewellery and small-batch goods from independent makers.",
};

function buildHref({
  q,
  category,
}: {
  q?: string;
  category?: string;
}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q, category } = await searchParams;
  const [products, categories] = await Promise.all([
    listProducts({ q, category, limit: 48 }),
    listCategoriesWithCounts(),
  ]);

  const counts = new Map(
    categories.map((entry) => [entry.category, entry.count]),
  );

  return (
    <>
      <PageIntro
        eyebrow="The market"
        title="Considered goods from independent studios."
        description="A living shelf of what makers are producing right now — searchable, filterable, and small-batch by design."
      />

      <section className="shell py-10 lg:py-14">
        <div className="flex flex-col gap-5 rounded-2xl border border-line bg-paper p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <form action="/products" className="relative w-full lg:max-w-sm">
            {category && <input type="hidden" name="category" value={category} />}
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder="Search pieces, materials or studios"
              aria-label="Search pieces"
              className="field !rounded-full !py-2.5 !pl-11"
            />
          </form>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            <SlidersHorizontal className="mr-1 hidden size-4 shrink-0 text-muted sm:block" />
            <Link
              href={buildHref({ q })}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                !category
                  ? "bg-olive text-cream"
                  : "bg-cream text-ink/70 hover:text-olive"
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((item) => (
              <Link
                key={item}
                href={buildHref({ q, category: item })}
                className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                  category === item
                    ? "bg-olive text-cream"
                    : "bg-cream text-ink/70 hover:text-olive"
                }`}
              >
                {item}
                <span className="ml-1.5 opacity-60">{counts.get(item) ?? 0}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-baseline justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
            {category ? ` · ${category}` : ""}
            {q ? ` · “${q}”` : ""}
          </p>
          {(q || category) && (
            <Link
              href="/products"
              className="text-xs font-semibold text-olive underline underline-offset-4"
            >
              Clear filters
            </Link>
          )}
        </div>

      </section>

      {products.length > 0 ? (
        <ClothingRailHero
          items={toRailGarments(products)}
          eyebrow="On the rail"
          title={`${products.length} ${products.length === 1 ? "piece" : "pieces"}, chosen slowly.`}
          description="Drag the rail to browse the whole shelf. Tap any piece to look closer, then open its page to add it to your basket."
          caption={category ?? q ? "Filtered selection" : "Every maker, every piece"}
          ctaLabel="Clear filters"
          ctaHref="/products"
          hanger="none"
          autoplay={false}
          className="border-t border-line"
        />
      ) : (
        <section className="shell pb-16 lg:pb-24">
          <div className="rounded-2xl border border-dashed border-olive/25 bg-paper px-6 py-16 text-center">
            <p className="font-display text-2xl text-ink">
              Nothing on this shelf yet.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Try another category or search term — or start your own studio and
              be the first to list here.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/products" className="btn-outline">
                Browse everything
              </Link>
              <Link href="/register?role=seller" className="btn-primary">
                Become a maker
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
