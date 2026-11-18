import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Package,
  Receipt,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react";
import { DbNotice } from "@/components/db-notice";
import { StatCard } from "@/components/stat-card";
import { StatusPill } from "@/components/status-pill";
import { getCurrentUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { getDashboardData } from "@/lib/orders";
import type { Role } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/utils";

const roleCopy: Record<
  Role,
  { label: string; title: string; blurb: string }
> = {
  admin: {
    label: "Marketplace admin",
    title: "The whole market, at a glance.",
    blurb:
      "Oversee studios, products and orders. Promote makers to admin or seller, and keep the shelves in order.",
  },
  seller: {
    label: "Studio dashboard",
    title: "Your studio, at a glance.",
    blurb:
      "Track what is selling, restock low pieces, and keep the details of your listings sharp.",
  },
  client: {
    label: "Client account",
    title: "Your collection starts here.",
    blurb:
      "Follow your orders, revisit pieces you love, and keep your details safe in one place.",
  },
};

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  const configured = isDbConfigured();
  const { stats, orders } = await getDashboardData(user);
  const copy = roleCopy[user.role];
  const firstName = user.name.split(" ")[0];

  const revenueLabel =
    user.role === "seller"
      ? "Studio revenue"
      : user.role === "admin"
        ? "Gross volume"
        : "Total spent";

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow">{copy.label}</p>
        <h1 className="mt-4 font-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl">
          {firstName ? `Good to see you, ${firstName}.` : copy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          {copy.blurb}
        </p>
      </header>

      {!configured ? (
        <DbNotice />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {user.role === "admin" && (
              <StatCard
                label="People"
                value={String(stats.users)}
                hint="Clients, sellers & admins"
                icon={<Users className="size-4" />}
              />
            )}
            {user.role !== "client" && (
              <StatCard
                label="Products"
                value={String(stats.products)}
                hint={user.role === "seller" ? "Your live pieces" : "On the market"}
                icon={<Boxes className="size-4" />}
              />
            )}
            <StatCard
              label="Orders"
              value={String(stats.orders)}
              hint={user.role === "client" ? "Placed by you" : "All time"}
              icon={<Package className="size-4" />}
            />
            <StatCard
              label={revenueLabel}
              value={formatPrice(stats.revenue)}
              hint={user.role === "seller" ? "Your 85% share, previewed" : "All time"}
              icon={<Receipt className="size-4" />}
            />
            {user.role === "client" && (
              <StatCard
                label="Marketplace"
                value="120+"
                hint="Independent studios"
                icon={<Store className="size-4" />}
              />
            )}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-2xl border border-line bg-paper">
              <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                <h2 className="font-display text-xl text-ink">Recent orders</h2>
                <Link
                  href="/dashboard/orders"
                  className="inline-flex items-center gap-1.5 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-olive"
                >
                  View all <ArrowUpRight className="size-3.5" />
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="px-5 py-12 text-center">
                  <Package className="mx-auto size-6 text-muted/60" />
                  <p className="mt-3 font-display text-xl text-ink">
                    No orders yet.
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {user.role === "client"
                      ? "Your first order will appear here."
                      : "New orders will appear here as they come in."}
                  </p>
                  <Link href="/products" className="btn-outline mt-5">
                    Browse the market
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-line">
                  {orders.slice(0, 6).map((order) => {
                    const visibleItems =
                      user.role === "seller"
                        ? order.items.filter(
                            (item) => item.sellerId === user.id,
                          )
                        : order.items;
                    const visibleTotal =
                      user.role === "seller"
                        ? visibleItems.reduce(
                            (sum, item) => sum + item.price * item.qty,
                            0,
                          )
                        : order.total;

                    return (
                      <li
                        key={order.id}
                        className="flex flex-wrap items-center justify-between gap-3 px-5 py-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink">
                            #{order.id.slice(-6).toUpperCase()}
                          </p>
                          <p className="mt-0.5 text-[0.68rem] text-muted">
                            {formatDate(order.createdAt)} ·{" "}
                            {visibleItems.length}{" "}
                            {visibleItems.length === 1 ? "piece" : "pieces"}
                            {user.role !== "client"
                              ? ` · ${order.buyerName}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <StatusPill status={order.status} />
                          <p className="text-sm font-semibold text-olive">
                            {formatPrice(visibleTotal)}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section className="rounded-2xl border border-line bg-paper p-5">
              <h2 className="font-display text-xl text-ink">Quick actions</h2>
              <div className="mt-4 space-y-2.5">
                {user.role === "client" && (
                  <>
                    <QuickLink
                      href="/products"
                      label="Explore the market"
                      icon={<ShoppingBag className="size-4" />}
                    />
                    <QuickLink
                      href="/dashboard/orders"
                      label="Track your orders"
                      icon={<Package className="size-4" />}
                    />
                    <QuickLink
                      href="/register?role=seller"
                      label="Apply to sell"
                      icon={<Store className="size-4" />}
                    />
                  </>
                )}

                {user.role === "seller" && (
                  <>
                    <QuickLink
                      href="/dashboard/products/new"
                      label="Add a new piece"
                      icon={<Boxes className="size-4" />}
                    />
                    <QuickLink
                      href="/dashboard/products"
                      label="Manage your shelf"
                      icon={<Store className="size-4" />}
                    />
                    <QuickLink
                      href="/dashboard/orders"
                      label="Fulfil orders"
                      icon={<Package className="size-4" />}
                    />
                  </>
                )}

                {user.role === "admin" && (
                  <>
                    <QuickLink
                      href="/dashboard/users"
                      label="Manage people & roles"
                      icon={<Users className="size-4" />}
                    />
                    <QuickLink
                      href="/dashboard/products"
                      label="Review all products"
                      icon={<Boxes className="size-4" />}
                    />
                    <QuickLink
                      href="/dashboard/orders"
                      label="Oversee orders"
                      icon={<Package className="size-4" />}
                    />
                  </>
                )}
              </div>

              <div className="mt-5 rounded-xl bg-olive/[0.06] p-4">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-olive">
                  {user.role === "seller"
                    ? "Keep 85% of every sale"
                    : user.role === "admin"
                      ? "Roles at a glance"
                      : "A note on making"}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {user.role === "seller"
                    ? "Your payout preview is included in the revenue figure above. Listing is free — we only earn when you do."
                    : user.role === "admin"
                      ? "Admins oversee the market and roles. Sellers manage their own studio. Clients shop, track orders and can apply to sell."
                      : "Every piece is made by a named studio. If you make things too, you can open a studio account at any time."}
                </p>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-cream/60 px-4 py-3 text-sm font-medium text-ink/80 transition-colors hover:border-olive/30 hover:text-olive"
    >
      <span className="flex items-center gap-2.5">
        <span className="text-olive">{icon}</span>
        {label}
      </span>
      <ArrowRight className="size-3.5 text-muted" />
    </Link>
  );
}
