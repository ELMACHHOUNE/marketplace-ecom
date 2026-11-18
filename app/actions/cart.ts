"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { readCart, writeCart } from "@/lib/cart";
import { connectDB, isDbConfigured } from "@/lib/db";
import { getProductById } from "@/lib/products";

export type CartActionState =
  | {
      ok?: boolean;
      error?: string;
      message?: string;
    }
  | undefined;

export async function addToCart(
  _state: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const productId = String(formData.get("productId") ?? "");
  const qty = Math.max(1, Math.min(20, Number(formData.get("qty") ?? 1)));

  if (!productId) return { error: "That product could not be found." };

  const product = await getProductById(productId);
  if (!product) return { error: "That product could not be found." };
  if (product.isDemo) {
    return {
      error:
        "This is a preview item. Connect MongoDB Atlas and run the seed script to start adding products.",
    };
  }
  if (product.stock < 1) return { error: "This piece is currently sold out." };

  const cart = await readCart();
  const existing = cart.find((line) => line.productId === productId);
  const nextQty = Math.min((existing?.qty ?? 0) + qty, product.stock, 20);

  if (existing) {
    existing.qty = nextQty;
  } else {
    cart.push({ productId, qty: nextQty });
  }

  await writeCart(cart);
  revalidatePath("/cart");
  revalidatePath("/", "layout");

  return { ok: true, message: "Added to your bag" };
}

export async function updateCartQuantity(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const qty = Math.max(0, Math.min(20, Number(formData.get("qty") ?? 0)));

  const cart = await readCart();
  const next = cart
    .map((line) =>
      line.productId === productId ? { ...line, qty } : line,
    )
    .filter((line) => line.qty > 0);

  await writeCart(next);
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeCartItem(formData: FormData) {
  const productId = String(formData.get("productId") ?? "");
  const cart = await readCart();
  await writeCart(cart.filter((line) => line.productId !== productId));
  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function checkout() {
  const session = await getSession();
  if (!session) redirect("/login?next=/cart");

  if (!isDbConfigured()) {
    redirect("/cart?error=MongoDB+is+not+configured+yet");
  }

  const cart = await readCart();
  if (cart.length === 0) redirect("/cart");

  try {
    await connectDB();
  } catch {
    redirect("/cart?error=Could+not+reach+the+database");
  }

  const { ProductModel } = await import("@/lib/models/Product");
  const { OrderModel } = await import("@/lib/models/Order");

  const products = await ProductModel.find({
    _id: { $in: cart.map((line) => line.productId) },
  }).lean();

  const items = cart
    .map((line) => {
      const product = products.find((doc) => String(doc._id) === line.productId);
      if (!product || product.stock < line.qty) return null;
      return {
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: line.qty,
        sellerId: product.sellerId,
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (items.length === 0) {
    redirect("/cart?error=Some+items+are+no+longer+available");
  }

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  await OrderModel.create({
    buyerId: session.userId,
    buyerName: session.name,
    buyerEmail: session.email,
    items,
    total,
    status: "paid",
  });

  for (const item of items) {
    await ProductModel.updateOne(
      { _id: item.productId, stock: { $gte: item.qty } },
      { $inc: { stock: -item.qty } },
    );
  }

  await writeCart([]);
  revalidatePath("/dashboard/orders");
  revalidatePath("/products");
  revalidatePath("/");

  redirect("/dashboard/orders?placed=1");
}
