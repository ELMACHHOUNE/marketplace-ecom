import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2, Package } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/orders";
import { DbNotice } from "@/components/db-notice";
import { StatusPill } from "@/components/status-pill";
import { getCurrentUser } from "@/lib/auth";
import { ORDER_STATUSES } from "@/lib/constants";
import { isDbConfigured } from "@/lib/db";
import { getOrdersFor } from "@/lib/orders";
import { formatDate, formatPrice } from "@/lib/utils";

type SearchParams = Promise<{ placed?: string }>;

export const metadata = {
  title: "Orders",
};

export default async function DashboardOrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { placed } = await searchParams;
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/orders");

  const configured = isDbConfigured();
  const orders = configured ? await getOrdersFor(user) : [];
  const staff = user.role === "admin" || user.role === "seller";

  return (
    <div className="space-y-7">
      <header>
        <p className="eyebrow">Orders</p>
        <h1 className="mt-4 font-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl">
          {user.role === "client"
            ? "Things on their way."
            : user.role === "seller"
              ? "Orders for your studio."
              : "Every order, in one place."}
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          {user.role === "client"
            ? "Track what you have ordered and revisit the makers behind each piece."
            : "Pack with care, update fulfilment status, and keep buyers in the loop."}
        </p>
      </header>

      {placed === "1" && (
        <div className="flex items-start gap-3 rounded-xl border border-olive/25 bg-olive/[0.07] px-4 py-3 text-sm text-olive">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
          <p>
            Order placed. The maker has been notified and your pieces are being
            prepared.
          </p>
        </div>
      )}

      {!configured ? (
        <DbNotice />
      ) : orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-olive/25 bg-paper px-6 py-16 text-center">
          <Package className="mx-auto size-7 text-muted/60" />
          <h2 className="mt-4 font-display text-2xl text-ink">No orders yet.</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {user.role === "client"
              ? "Once you place an order it will appear here with its fulfilment status."
              : "Orders containing your pieces will appear here as buyers check out."}
          </p>
          <Link href="/products" className="btn-primary mt-6">
            Browse the market
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const items =
              user.role === "seller"
                ? order.items.filter((item) => item.sellerId === user.id)
                : order.items;
            const total =
              user.role === "seller"
                ? items.reduce((sum, item) => sum + item.price * item.qty, 0)
                : order.total;

            return (
              <article
                key={order.id}
                className="overflow-hidden rounded-2xl border border-line bg-paper"
              >
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-0.5 text-[0.68rem] text-muted">
                      {formatDate(order.createdAt)}
                      {staff ? ` · ${order.buyerName} · ${order.buyerEmail}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={order.status} />
                    <p className="font-display text-xl text-olive">
                      {formatPrice(total)}
                    </p>
                  </div>
                </header>

                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li
                      key={`${order.id}-${item.productId}`}
                      className="flex items-center gap-4 px-5 py-3.5"
                    >
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-sand/40">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="3rem"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-ink">
                          {item.name}
                        </p>
                        <p className="text-[0.68rem] text-muted">
                          {formatPrice(item.price)} × {item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-olive">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </li>
                  ))}
                </ul>

                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-cream/40 px-5 py-3.5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-muted">
                    {items.length} {items.length === 1 ? "piece" : "pieces"} ·
                    packed plastic-free
                  </p>

                  {staff ? (
                    <form
                      action={updateOrderStatus}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="orderId" value={order.id} />
                      <select
                        name="status"
                        defaultValue={order.status}
                        aria-label="Order status"
                        className="h-9 rounded-full border border-line bg-paper px-3 text-xs font-semibold capitalize focus:border-olive-light focus:outline-none"
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        type="submit"
                        className="rounded-full bg-olive px-3.5 py-2 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-olive-dark"
                      >
                        Update
                      </button>
                    </form>
                  ) : (
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-olive">
                      Secure payment received
                    </span>
                  )}
                </footer>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
