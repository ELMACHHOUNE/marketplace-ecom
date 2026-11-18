"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Boxes,
  LayoutDashboard,
  LogOut,
  Package,
  PlusCircle,
  Store,
  Users,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import type { Role } from "@/lib/types";

const items = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
    roles: ["admin", "seller", "client"],
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: Package,
    roles: ["admin", "seller", "client"],
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Boxes,
    roles: ["admin", "seller"],
  },
  {
    href: "/dashboard/products/new",
    label: "Add product",
    icon: PlusCircle,
    roles: ["admin", "seller"],
  },
  {
    href: "/dashboard/users",
    label: "People",
    icon: Users,
    roles: ["admin"],
  },
];

const roleLabel: Record<Role, string> = {
  admin: "Administrator",
  seller: "Studio account",
  client: "Client account",
};

export function DashboardNav({
  role,
  name,
  storeName,
}: {
  role: Role;
  name: string;
  storeName?: string;
}) {
  const pathname = usePathname();
  const visible = items.filter((item) => item.roles.includes(role));

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-28 space-y-4">
          <div className="rounded-2xl border border-line bg-paper p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-olive font-display text-lg text-cream">
                {name.slice(0, 1).toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{name}</p>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.14em] text-gold">
                  {roleLabel[role]}
                </p>
              </div>
            </div>
            {storeName && (
              <p className="mt-3 truncate rounded-lg bg-olive/5 px-3 py-2 text-[0.65rem] font-semibold text-olive">
                {storeName}
              </p>
            )}
          </div>

          <nav className="rounded-2xl border border-line bg-paper p-2">
            {visible.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-olive text-cream"
                      : "text-ink/70 hover:bg-olive/5 hover:text-olive"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:bg-olive/5 hover:text-olive"
            >
              <Store className="size-4" />
              Storefront
            </Link>
          </nav>

          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-xl border border-line bg-paper px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="lg:hidden">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[...visible, { href: "/", label: "Store", icon: Store, roles: [] }].map(
            (item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-olive text-cream"
                      : "border border-line bg-paper text-ink/70"
                  }`}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </Link>
              );
            },
          )}
        </div>
      </div>
    </>
  );
}
