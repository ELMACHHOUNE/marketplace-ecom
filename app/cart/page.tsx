import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import { checkout, removeCartItem, updateCartQuantity } from "@/app/actions/cart";
import { PageIntro } from "@/components/page-intro";
import { getCurrentUser } from "@/lib/auth";
import { readCart } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { getProductsByIds } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

type SearchParams = Promise<{ error?: string }>;

export const metadata = {
  title: "Your bag",
};

export default async function CartPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;
  const [lines, user] = await Promise.all([readCart(), getCurrentUser()]);
  const products = await getProductsByIds(lines.map((line) => line.productId));

  const items = lines
    .map((line) => {
      const product = products.find((item) => item.id === line.productId);
      if (!product) return null;
      return {
        product,
        qty: line.qty,
        lineTotal: product.price * line.qty,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 8;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <>
        <PageIntro
          eyebrow="Your bag"
          title="Nothing gathered yet."
          description="Your bag is waiting for something worth keeping."
        />
        <section className="shell py-16 lg:py-24">
          <div className="mx-auto max-w-xl rounded-[1.75rem] border border-dashed border-olive/25 bg-paper px-6 py-14 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/8 text-olive">
              <ShieldCheck className="size-6" />
            </span>
            <h2 className="mt-6 font-display text-3xl text-ink">
              An empty shelf is full of possibility.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted">
              Browse the market and add a piece from a verified maker. Your bag
              is kept for thirty days.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">
                Explore the market
                <ArrowRight className="size-4" />
              </Link>
              <Link href="/about" className="btn-outline">
                Meet the makers
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageIntro
        eyebrow="Your bag"
        title="A few good things."
        description="Small-batch pieces are reserved when you check out. Every order ships plastic-free."
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {items.reduce((sum, item) => sum + item.qty, 0)} items
        </p>
      </PageIntro>

      <section className="shell py-10 lg:py-14">
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error.replaceAll("+", " ")}
          </div>
        )}

        {remaining > 0 && (
          <div className="mb-8 rounded-2xl border border-gold/30 bg-gold/[0.07] p-4">
            <div className="flex items-center justify-between gap-4 text-xs font-semibold text-[#6b5217]">
              <span className="flex items-center gap-2">
                <Truck className="size-4" />
                You&apos;re {formatPrice(remaining)} away from free shipping.
              </span>
              <span>{Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%</span>
            </div>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-gold/20">
              <div
                className="h-full rounded-full bg-gold"
                style={{
                  width: `${Math.min(
                    100,
                    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr] lg:items-start">
          <div className="divide-y divide-line rounded-2xl border border-line bg-paper">
            {items.map(({ product, qty, lineTotal }) => (
              <div key={product.id} className="flex gap-4 p-4 sm:p-5">
                <Link
                  href={`/products/${product.slug}`}
                  className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-sand/40 sm:size-28"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="7rem"
                    className="object-cover"
                  />
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[0.58rem] font-bold uppercase tracking-[0.16em] text-muted">
                        {product.storeName ?? product.sellerName}
                      </p>
                      <Link
                        href={`/products/${product.slug}`}
                        className="mt-1 block truncate font-display text-lg text-ink hover:text-olive"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-muted">
                        {product.category} · {formatPrice(product.price)} each
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-olive">
                      {formatPrice(lineTotal)}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                    <form
                      action={updateCartQuantity}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="productId" value={product.id} />
                      <label
                        htmlFor={`qty-${product.id}`}
                        className="sr-only"
                      >
                        Quantity for {product.name}
                      </label>
                      <input
                        id={`qty-${product.id}`}
                        name="qty"
                        type="number"
                        min={1}
                        max={Math.min(product.stock, 20)}
                        defaultValue={qty}
                        className="h-9 w-16 rounded-full border border-line bg-cream px-3 text-center text-xs font-semibold focus:border-olive-light focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-olive underline underline-offset-4"
                      >
                        Update
                      </button>
                    </form>

                    <form action={removeCartItem}>
                      <input type="hidden" name="productId" value={product.id} />
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-muted transition-colors hover:text-red-700"
                      >
                        <Trash2 className="size-3.5" /> Remove
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="rounded-2xl border border-line bg-paper p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl text-ink">Order summary</h2>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="font-semibold text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="font-semibold text-ink">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-display text-2xl text-olive">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              {user ? (
                <form action={checkout}>
                  <button type="submit" className="btn-primary w-full">
                    <LockKeyhole className="size-4" />
                    Place order · {formatPrice(total)}
                  </button>
                </form>
              ) : (
                <Link href="/login?next=/cart" className="btn-primary w-full">
                  <LockKeyhole className="size-4" />
                  Sign in to check out
                </Link>
              )}
              <p className="mt-3 text-center text-[0.62rem] leading-relaxed text-muted">
                Secure checkout. By ordering you agree to our 30-day return
                policy.
              </p>
            </div>

            <div className="mt-6 space-y-2.5 border-t border-line pt-5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-muted">
              <p className="flex items-center gap-2">
                <ShieldCheck className="size-3.5 text-olive" /> Verified makers
                only
              </p>
              <p className="flex items-center gap-2">
                <Truck className="size-3.5 text-olive" /> Plastic-free packaging
              </p>
            </div>

            <Link
              href="/products"
              className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-olive"
            >
              <ArrowLeft className="size-3.5" /> Continue shopping
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
