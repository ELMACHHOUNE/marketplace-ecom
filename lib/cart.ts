import "server-only";

import { cookies } from "next/headers";
import { CART_COOKIE } from "@/lib/constants";
import type { CartLine } from "@/lib/types";

export async function readCart(): Promise<CartLine[]> {
  const raw = (await cookies()).get(CART_COOKIE)?.value;
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (line): line is CartLine =>
          typeof line?.productId === "string" &&
          typeof line?.qty === "number" &&
          line.qty > 0,
      )
      .map((line) => ({
        productId: line.productId,
        qty: Math.min(Math.floor(line.qty), 99),
      }));
  } catch {
    return [];
  }
}

export async function writeCart(lines: CartLine[]) {
  const cookieStore = await cookies();
  const clean = lines.filter((line) => line.qty > 0);

  if (clean.length === 0) {
    cookieStore.delete(CART_COOKIE);
    return;
  }

  cookieStore.set(CART_COOKIE, JSON.stringify(clean), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCartCount() {
  const lines = await readCart();
  return lines.reduce((total, line) => total + line.qty, 0);
}
