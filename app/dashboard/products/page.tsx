import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Boxes, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { DbNotice } from "@/components/db-notice";
import { getCurrentUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { getSellerProducts, listProducts } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

export const metadata = {
  title: "Products",
};

export default async function DashboardProductsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/products");
  if (user.role === "client") redirect("/dashboard");

  const configured = isDbConfigured();
  const products = configured
    ? user.role === "admin"
      ? await listProducts({ limit: 200 })
      : await getSellerProducts(user.id)
    : [];

  return (
    <div className="space-y-7">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">
            {user.role === "admin" ? "Marketplace catalogue" : "Your studio"}
          </p>
          <h1 className="mt-4 font-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl">
            Products
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            {user.role === "admin"
              ? "Every listing on the market. Edit details, adjust stock, or remove pieces."
              : "The pieces on your shelf. Keep descriptions, stock and photography up to date."}
          </p>
        </div>
        <Link href="/dashboard/products/new" className="btn-primary shrink-0">
          <Plus className="size-4" />
          New product
        </Link>
      </header>

      {!configured ? (
        <DbNotice />
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-olive/25 bg-paper px-6 py-16 text-center">
          <Boxes className="mx-auto size-7 text-muted/60" />
          <h2 className="mt-4 font-display text-2xl text-ink">
            Your shelf is empty.
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Add your first piece to appear in the market. You can update pricing
            and stock at any time.
          </p>
          <Link href="/dashboard/products/new" className="btn-primary mt-6">
            <Plus className="size-4" /> Add your first piece
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-paper">
          <div className="hidden grid-cols-[minmax(0,2.2fr)_0.8fr_0.7fr_0.6fr_0.7fr] gap-4 border-b border-line px-5 py-3 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-muted md:grid">
            <span>Piece</span>
            <span>Category</span>
            <span>Price</span>
            <span>Stock</span>
            <span className="text-right">Actions</span>
          </div>

          <ul className="divide-y divide-line">
            {products.map((product) => (
              <li
                key={product.id}
                className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,2.2fr)_0.8fr_0.7fr_0.6fr_0.7fr] md:items-center md:px-5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-sand/40">
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="3.5rem"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/products/${product.slug}`}
                      className="block truncate text-sm font-semibold text-ink hover:text-olive"
                    >
                      {product.name}
                    </Link>
                    <p className="truncate text-[0.65rem] text-muted">
                      {user.role === "admin"
                        ? (product.storeName ?? product.sellerName)
                        : product.slug}
                      {product.featured ? " · Featured" : ""}
                    </p>
                  </div>
                </div>

                <span className="text-xs text-muted md:text-sm">
                  <span className="md:hidden">Category: </span>
                  {product.category}
                </span>
                <span className="text-sm font-semibold text-olive">
                  {formatPrice(product.price)}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    product.stock === 0 ? "text-red-700" : "text-ink/70"
                  }`}
                >
                  {product.stock === 0 ? "Sold out" : `${product.stock} left`}
                </span>

                <div className="flex items-center gap-2 md:justify-end">
                  <Link
                    href={`/dashboard/products/${product.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-olive transition-colors hover:border-olive/40"
                  >
                    <Pencil className="size-3" /> Edit
                  </Link>
                  <form action={deleteProduct.bind(null, product.id)}>
                    <ConfirmSubmit
                      message={`Remove "${product.name}" from the market?`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted transition-colors hover:border-red-200 hover:text-red-700"
                    >
                      <Trash2 className="size-3" /> Delete
                    </ConfirmSubmit>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
