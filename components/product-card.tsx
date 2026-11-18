import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductDTO } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: ProductDTO;
  index?: number;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col"
      aria-label={`${product.name} by ${product.storeName ?? product.sellerName}`}
    >
      <div className="relative h-96 overflow-hidden rounded-[1.25rem] bg-sand/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
          priority={index < 2}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="rounded-full bg-cream/90 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-olive backdrop-blur">
            {product.category}
          </span>
          {product.isDemo && (
            <span className="rounded-full bg-olive/85 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-cream backdrop-blur">
              Preview
            </span>
          )}
        </div>

        {product.stock === 0 && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] text-cream">
            Sold out
          </span>
        )}

        <span className="absolute bottom-3 right-3 grid size-9 translate-y-2 place-items-center rounded-full bg-cream/95 text-olive opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-muted">
            {product.storeName ?? product.sellerName}
          </p>
          <h3 className="mt-1 truncate font-display text-[1.15rem] leading-snug text-ink transition-colors group-hover:text-olive">
            {product.name}
          </h3>
        </div>
        <p className="shrink-0 text-sm font-semibold text-olive">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
