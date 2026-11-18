import Link from "next/link";
import { AtSign, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/newsletter-form";
import { CATEGORIES, SITE } from "@/lib/constants";

const columns = [
  {
    title: "Shop",
    links: CATEGORIES.slice(0, 5).map((category) => ({
      label: category,
      href: `/products?category=${encodeURIComponent(category)}`,
    })),
  },
  {
    title: "House",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Sell on Olea", href: "/register?role=seller" },
      { label: "The market", href: "/products" },
      { label: "Your account", href: "/dashboard" },
    ],
  },
  {
    title: "Care",
    links: [
      { label: "Shipping & returns", href: "/about#care" },
      { label: "Makers' handbook", href: "/about#makers" },
      { label: "Contact", href: `mailto:${SITE.email}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-olive-dark text-cream grain">
      <div className="shell relative">
        <div className="grid gap-10 border-b border-cream/10 py-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:py-16">
          <div>
            <p className="eyebrow !text-gold-light before:!bg-gold-light">
              The Sunday dispatch
            </p>
            <h2 className="mt-4 max-w-lg font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl">
              New makers, quiet objects, and one good story each week.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <NewsletterForm />
            <p className="mt-3 text-xs text-sand/60">
              No noise. Unsubscribe whenever you like.
            </p>
          </div>
        </div>

        <div className="grid gap-12 py-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/80">
              A marketplace for considered goods, made slowly by people whose
              names you can learn.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-sand/75">
              <p className="flex items-center gap-2.5">
                <MapPin className="size-4 text-gold-light" />
                {SITE.location}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-cream"
              >
                <Mail className="size-4 text-gold-light" />
                {SITE.email}
              </a>
              <p className="flex items-center gap-2.5">
                <AtSign className="size-4 text-gold-light" />
                @olea.market
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-display text-lg text-cream">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-sand/75 transition-colors hover:text-cream"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 py-6 text-[0.7rem] uppercase tracking-[0.16em] text-sand/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Olea Marketplace. Made with care.</p>
          <p className="flex items-center gap-4">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Apple Pay</span>
            <span className="text-gold-light">Secure checkout</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
