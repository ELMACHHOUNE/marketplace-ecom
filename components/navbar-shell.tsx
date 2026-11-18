"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { logout } from "@/app/actions/auth";
import { Logo } from "@/components/logo";
import type { Role } from "@/lib/types";

type NavUser = {
  name: string;
  role: Role;
} | null;

const roleLabel: Record<Role, string> = {
  admin: "Admin",
  seller: "Seller",
  client: "Client",
};

const links = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "Our story" },
  { href: "/register?role=seller", label: "Sell on Olea" },
];

export function NavbarShell({
  user,
  cartCount,
}: {
  user: NavUser;
  cartCount: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <>
      <div className="bg-olive-dark text-cream">
        <div className="shell flex items-center justify-center gap-3 py-2.5 text-center text-[0.62rem] font-semibold uppercase tracking-[0.22em]">
          <span className="size-1.5 rounded-full bg-gold" />
          Free shipping over $75
          <span className="hidden text-sand/50 sm:inline">·</span>
          <span className="hidden text-sand/90 sm:inline">
            Handmade by independent makers
          </span>
          <span className="hidden text-sand/50 md:inline">·</span>
          <span className="hidden text-sand/90 md:inline">30-day returns</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line/80 bg-cream/90 backdrop-blur-md">
        <div className="shell flex h-[4.75rem] items-center justify-between gap-4">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-olive/10 text-olive"
                    : "text-ink/75 hover:bg-olive/5 hover:text-olive"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <form
              action="/products"
              className="relative hidden xl:block"
              role="search"
            >
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
              <input
                name="q"
                placeholder="Search the market"
                aria-label="Search products"
                className="h-9 w-44 rounded-full border border-line bg-paper/70 pl-9 pr-3 text-xs text-ink placeholder:text-muted/80 focus:border-olive-light focus:outline-none focus:ring-2 focus:ring-olive/10"
              />
            </form>

            <Link
              href="/cart"
              aria-label={`Bag with ${cartCount} items`}
              className="relative grid size-10 place-items-center rounded-full text-olive transition-colors hover:bg-olive/10"
            >
              <ShoppingBag className="size-[1.15rem]" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-[1.15rem] place-items-center rounded-full bg-gold px-1 text-[0.6rem] font-bold text-[#2b2410]">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-1.5 sm:flex">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-line bg-paper/70 py-1 pl-1 pr-3 transition-colors hover:border-olive/30"
                >
                  <span className="grid size-8 place-items-center rounded-full bg-olive text-xs font-bold text-cream">
                    {user.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="max-w-[7.5rem] truncate text-xs font-semibold text-ink">
                      {user.name.split(" ")[0]}
                    </span>
                    <span className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-gold">
                      {roleLabel[user.role]}
                    </span>
                  </span>
                </Link>
                <form action={logout}>
                  <button
                    type="submit"
                    aria-label="Sign out"
                    className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-olive/10 hover:text-olive"
                  >
                    <LogOut className="size-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link href="/login" className="btn-ghost">
                  Sign in
                </Link>
                <Link href="/register" className="btn-primary !px-4 !py-2.5">
                  Join Olea
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full text-olive transition-colors hover:bg-olive/10 lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="border-t border-line bg-paper px-5 pb-6 pt-4 shadow-[0_24px_48px_-24px_rgba(34,38,26,0.35)] lg:hidden"
          >
            <form
              action="/products"
              role="search"
              className="relative mb-4"
              onSubmit={() => setOpen(false)}
            >
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                name="q"
                placeholder="Search the market"
                aria-label="Search products"
                className="field !rounded-full !pl-10"
              />
            </form>

            <nav className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3 text-sm font-medium text-ink/85"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-5 flex flex-col gap-2.5">
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl bg-olive/5 p-3"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-olive text-xs font-bold text-cream">
                      {user.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold">
                        {user.name}
                      </span>
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-gold">
                        {roleLabel[user.role]} account
                      </span>
                    </span>
                    <LayoutDashboard className="size-4 text-olive" />
                  </Link>
                  <form action={logout}>
                    <button
                      type="submit"
                      onClick={() => setOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-semibold text-muted"
                    >
                      <LogOut className="size-4" /> Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="btn-outline w-full"
                  >
                    <UserRound className="size-4" /> Sign in
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="btn-primary w-full"
                  >
                    Join Olea
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
