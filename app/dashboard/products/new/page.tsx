import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createProduct } from "@/app/actions/products";
import { DbNotice } from "@/components/db-notice";
import { ProductForm } from "@/app/dashboard/product-form";
import { getCurrentUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";

export const metadata = {
  title: "New product",
};

export default async function NewProductPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/products/new");
  if (user.role === "client") redirect("/dashboard");

  return (
    <div className="space-y-7">
      <header>
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-olive"
        >
          <ArrowLeft className="size-3.5" /> Back to products
        </Link>
        <h1 className="mt-4 font-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl">
          Add a new piece
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Write it the way you would describe it in the studio — materials,
          process, and the small marks that make it yours.
        </p>
      </header>

      {!isDbConfigured() ? (
        <DbNotice />
      ) : (
        <ProductForm action={createProduct} />
      )}
    </div>
  );
}
