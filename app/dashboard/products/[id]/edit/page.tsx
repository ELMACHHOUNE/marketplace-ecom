import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { updateProduct } from "@/app/actions/products";
import { DbNotice } from "@/components/db-notice";
import { ProductForm } from "@/app/dashboard/product-form";
import { getCurrentUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { getProductById } from "@/lib/products";

type Params = Promise<{ id: string }>;

export const metadata = {
  title: "Edit product",
};

export default async function EditProductPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=/dashboard/products/${id}/edit`);
  if (user.role === "client") redirect("/dashboard");

  if (!isDbConfigured()) {
    return (
      <div className="space-y-7">
        <h1 className="font-display text-3xl text-ink">Edit product</h1>
        <DbNotice />
      </div>
    );
  }

  const product = await getProductById(id);
  if (!product) notFound();
  if (user.role !== "admin" && product.sellerId !== user.id) {
    redirect("/dashboard/products");
  }

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
          Edit “{product.name}”
        </h1>
        <p className="mt-2 text-sm text-muted">
          Changes go live on the market as soon as you save.
        </p>
      </header>

      <ProductForm
        action={updateProduct.bind(null, id)}
        submitLabel="Save changes"
        initial={{
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          image: product.image,
          featured: product.featured,
        }}
      />
    </div>
  );
}
