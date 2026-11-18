"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireRole } from "@/lib/auth";
import { CATEGORIES } from "@/lib/constants";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { slugify } from "@/lib/utils";

export type ProductFormState =
  | {
      error?: string;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function parseProduct(formData: FormData) {
  const name = text(formData, "name");
  const description = text(formData, "description");
  const category = text(formData, "category");
  const image = text(formData, "image");
  const price = Number(text(formData, "price"));
  const stock = Number(text(formData, "stock"));
  const featured = formData.get("featured") === "on";

  const fieldErrors: Record<string, string> = {};

  if (name.length < 3) fieldErrors.name = "Give the piece a name.";
  if (description.length < 20)
    fieldErrors.description = "Add at least 20 characters of description.";
  if (!CATEGORIES.includes(category as (typeof CATEGORIES)[number]))
    fieldErrors.category = "Choose a category.";
  if (!Number.isFinite(price) || price <= 0)
    fieldErrors.price = "Enter a price greater than zero.";
  if (!Number.isInteger(stock) || stock < 0)
    fieldErrors.stock = "Stock must be a whole number.";
  if (!/^https?:\/\/.+/.test(image))
    fieldErrors.image = "Use a full image URL (https://…).";

  const valid = Object.keys(fieldErrors).length === 0;

  return {
    valid,
    fieldErrors,
    data: {
      name,
      description,
      category,
      image,
      price: Math.round(price * 100) / 100,
      stock,
      featured,
    },
  };
}

async function uniqueSlug(name: string, ignoreId?: string) {
  const base = slugify(name) || "piece";
  let slug = base;
  let attempt = 1;

  while (true) {
    const existing = await ProductModel.findOne({ slug }).select("_id").lean();
    if (!existing || (ignoreId && String(existing._id) === ignoreId)) {
      return slug;
    }
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
}

export async function createProduct(
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const user = await requireRole("seller", "admin");
  const { valid, fieldErrors, data } = parseProduct(formData);
  if (!valid) return { fieldErrors };

  await connectDB();
  const slug = await uniqueSlug(data.name);

  await ProductModel.create({
    ...data,
    slug,
    sellerId: user.id,
    sellerName: user.name,
    storeName: user.storeName ?? `${user.name} Studio`,
  });

  revalidatePath("/products");
  revalidatePath("/dashboard/products");
  revalidatePath("/");
  revalidatePath("/", "layout");
  redirect("/dashboard/products");
}

export async function updateProduct(
  id: string,
  _state: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const user = await requireRole("seller", "admin");
  const { valid, fieldErrors, data } = parseProduct(formData);
  if (!valid) return { fieldErrors };

  await connectDB();
  const product = await ProductModel.findById(id);
  if (!product) return { error: "This product no longer exists." };

  if (user.role !== "admin" && String(product.sellerId) !== user.id) {
    return { error: "You can only edit your own products." };
  }

  product.set(data);
  if (product.name !== data.name) {
    product.slug = await uniqueSlug(data.name, id);
  }
  await product.save();

  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/dashboard/products");
  revalidatePath("/");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  const user = await requireRole("seller", "admin");
  await connectDB();

  const product = await ProductModel.findById(id).select("sellerId").lean();
  if (!product) return;

  if (user.role !== "admin" && String(product.sellerId) !== user.id) return;

  await ProductModel.deleteOne({ _id: id });
  revalidatePath("/products");
  revalidatePath("/dashboard/products");
  revalidatePath("/");
}
