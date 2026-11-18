"use client";

import { useActionState } from "react";
import { Check, Loader2, ShoppingBag } from "lucide-react";
import { addToCart, type CartActionState } from "@/app/actions/cart";

export function AddToCartForm({
  productId,
  stock,
  disabled = false,
}: {
  productId: string;
  stock: number;
  disabled?: boolean;
}) {
  const [state, action, pending] = useActionState<CartActionState, FormData>(
    addToCart,
    undefined,
  );

  const maxQty = Math.max(1, Math.min(stock, 10));
  const soldOut = stock < 1 || disabled;

  return (
    <div>
      <form action={action} className="flex flex-col gap-3 sm:flex-row">
        <input type="hidden" name="productId" value={productId} />

        <label className="sr-only" htmlFor="qty">
          Quantity
        </label>
        <select
          id="qty"
          name="qty"
          defaultValue="1"
          disabled={soldOut}
          className="h-[3.05rem] rounded-full border border-line bg-paper px-5 text-sm font-semibold text-ink focus:border-olive-light focus:outline-none disabled:opacity-50 sm:w-28"
        >
          {Array.from({ length: maxQty }, (_, index) => index + 1).map(
            (qty) => (
              <option key={qty} value={qty}>
                Qty {qty}
              </option>
            ),
          )}
        </select>

        <button
          type="submit"
          disabled={soldOut || pending}
          className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Adding
            </>
          ) : disabled ? (
            "Preview item"
          ) : soldOut ? (
            "Sold out"
          ) : state?.ok ? (
            <>
              <Check className="size-4" />
              Added to bag
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" />
              Add to bag
            </>
          )}
        </button>
      </form>

      {state?.error && (
        <p className="mt-3 rounded-xl bg-gold/10 px-4 py-3 text-xs leading-relaxed text-[#6b5217]">
          {state.error}
        </p>
      )}
      {state?.ok && state.message && (
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-olive">
          <Check className="size-3.5" /> {state.message}.{" "}
          <a href="/cart" className="underline underline-offset-2">
            View bag
          </a>
        </p>
      )}
    </div>
  );
}
