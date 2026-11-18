import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { AddToCartForm } from "@/components/add-to-cart-form";
import { ProductCard } from "@/components/product-card";
import {
  getFeaturedProducts,
  getProductBySlug,
  listProducts,
} from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Piece not found" };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  let related = (
    await listProducts({ category: product.category, limit: 5 })
  )
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  if (related.length === 0) {
    related = (await getFeaturedProducts(4))
      .filter((item) => item.id !== product.id)
      .slice(0, 3);
  }

  return (
    <>
      <div className="border-b border-line bg-paper">
        <div className="shell flex items-center gap-2 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
          <Link href="/products" className="transition-colors hover:text-olive">
            The market
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="transition-colors hover:text-olive"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="truncate text-ink/70">{product.name}</span>
        </div>
      </div>

      <section className="shell py-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sand/40">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(min-width: 1024px) 44rem, 90vw"
                className="object-cover"
              />
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-cream/90 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-olive backdrop-blur">
                  {product.category}
                </span>
                {product.isDemo && (
                  <span className="rounded-full bg-olive/85 px-3.5 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur">
                    Preview
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, label: "Ships in 2–4 days" },
                { icon: RotateCcw, label: "30-day returns" },
                { icon: ShieldCheck, label: "Secure checkout" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-line bg-paper px-2 py-3"
                >
                  <item.icon className="mx-auto size-4 text-olive" />
                  <p className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pt-4">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-gold">
              {product.storeName ?? product.sellerName}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-[1.03] tracking-[-0.02em] text-ink sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-4">
              <p className="font-display text-3xl text-olive">
                {formatPrice(product.price)}
              </p>
              <span className="h-4 w-px bg-line" />
              <span
                className={`text-xs font-semibold ${
                  product.stock > 0 ? "text-olive" : "text-red-700"
                }`}
              >
                {product.stock > 0
                  ? `${product.stock} in stock`
                  : "Currently sold out"}
              </span>
            </div>

            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-8">
              <AddToCartForm
                productId={product.id}
                stock={product.stock}
                disabled={Boolean(product.isDemo)}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive text-sm font-bold text-cream">
                  {(product.storeName ?? product.sellerName)
                    .slice(0, 1)
                    .toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-lg text-ink">
                      {product.storeName ?? product.sellerName}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full bg-olive/10 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-olive">
                      <BadgeCheck className="size-3" /> Verified
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Independent studio led by {product.sellerName}. Each piece is
                    made in small batches, so slight variation is part of the
                    character.
                  </p>
                </div>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-muted">Materials</dt>
                <dd className="text-right text-ink/80">
                  Natural, responsibly sourced
                </dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-muted">Made in</dt>
                <dd className="text-right text-ink/80">Small-batch studio</dd>
              </div>
              <div className="flex justify-between gap-6 py-3">
                <dt className="text-muted">Care</dt>
                <dd className="text-right text-ink/80">
                  Wipe clean; avoid harsh detergents
                </dd>
              </div>
            </dl>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-olive"
            >
              <ArrowLeft className="size-3.5" /> Back to the market
            </Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper">
          <div className="shell py-16">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow">More to discover</p>
                <h2 className="mt-3 font-display text-3xl text-ink">
                  From the same shelf
                </h2>
              </div>
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="btn-outline !px-5 !py-2.5"
              >
                See all {product.category}
              </Link>
            </div>
            <div className="mt-9 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ProductCard key={item.id} product={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
