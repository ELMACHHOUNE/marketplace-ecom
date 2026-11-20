import Link from "next/link";
import { ArrowRight, FileText, Mail, Scale, ShoppingBag, Store } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Terms of service",
  description:
    "The terms that govern buying, selling and using the Olea marketplace.",
};

const sections = [
  {
    id: "agreement",
    icon: Scale,
    title: "Agreement",
    body: "By browsing Olea, creating an account or placing an order you agree to these terms. If you do not agree, please stop using the marketplace. We may update this document as the market changes and will note the date of any revision below.",
  },
  {
    id: "accounts",
    icon: Store,
    title: "Accounts and studios",
    body: "You must give accurate information when you register and keep your login details secure. Seller accounts may list only goods you made or are authorised to sell, and must describe materials, dimensions and provenance honestly. We review listings before publication and may remove any that mislead buyers.",
  },
  {
    id: "orders",
    icon: ShoppingBag,
    title: "Orders and payment",
    body: "An order is formed when checkout completes. Prices are shown in the listing currency and include the items and any shipping stated at checkout. Checkout in this demo is simulated: no payment provider is connected and no money is taken. In a live deployment, payment would be captured only after the terms shown at checkout are accepted.",
  },
  {
    id: "fulfilment",
    icon: FileText,
    title: "Fulfilment and returns",
    body: "Makers aim to dispatch within four working days and to update order status as they go. Buyers have thirty days from delivery to request a return of an unused item in its original packaging. Made-to-order pieces and perishable pantry goods are excluded unless they arrive damaged or not as described.",
  },
  {
    id: "conduct",
    icon: Scale,
    title: "Acceptable use",
    body: "Do not scrape the catalogue, interfere with the site, upload unlawful material, impersonate another maker or use the marketplace to sell counterfeit goods. We may suspend an account that breaks these rules, and we will always try to explain why before doing so.",
  },
  {
    id: "liability",
    icon: FileText,
    title: "Liability and contact",
    body: "Olea is a demo marketplace provided as is. To the extent permitted by law, we are not liable for indirect losses arising from its use. Questions about these terms are welcome at the address below, and a human reads every message.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of service."
        description="The plain-language rules for buying, selling and spending time on Olea. Last updated 20 November 2026."
      >
        <Link href="/privacy" className="btn-outline shrink-0">
          Privacy policy
          <ArrowRight className="size-4" />
        </Link>
      </PageIntro>

      <section className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">On this page</p>
            <nav className="mt-5 flex flex-col gap-1" aria-label="Terms sections">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-olive/5 hover:text-olive"
                >
                      {section.title}
                </a>
              ))}
            </nav>
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
              <Mail className="size-5 text-gold" />
              <p className="mt-3 text-sm font-medium text-ink">Questions?</p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-1 block break-all text-sm text-muted underline decoration-line underline-offset-4 hover:text-olive"
              >
                {SITE.email}
              </a>
            </div>
          </aside>

          <div className="space-y-11">
            {sections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-line pt-7 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive/8 text-olive">
                    <section.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 font-display text-2xl text-ink sm:text-3xl">
                  {section.title}
                    </h2>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                      {section.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
