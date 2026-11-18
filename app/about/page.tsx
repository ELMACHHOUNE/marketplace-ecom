import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Globe2,
  HeartHandshake,
  Leaf,
  PackageCheck,
  Recycle,
  Store,
} from "lucide-react";
import { PageIntro } from "@/components/page-intro";

export const metadata = {
  title: "Our story",
  description:
    "Olea is an independent marketplace built around named makers, disclosed materials and objects made to be kept.",
};

const stats = [
  { value: "120+", label: "Independent studios" },
  { value: "85%", label: "Kept by makers" },
  { value: "38", label: "Countries" },
  { value: "0", label: "Listing fees" },
];

const principles = [
  {
    icon: BadgeCheck,
    title: "Named makers",
    copy: "Every listing belongs to a real studio. We interview each maker and review every product before it goes live.",
  },
  {
    icon: Leaf,
    title: "Honest materials",
    copy: "Natural fibres, recycled metals, food-safe finishes. If we can't name what it is made from, it doesn't go up.",
  },
  {
    icon: PackageCheck,
    title: "Small batch",
    copy: "We sell what was made this season. No endless restocks, no drop-shipped lookalikes, no pretend scarcity.",
  },
  {
    icon: HeartHandshake,
    title: "Fair by default",
    copy: "Makers keep 85% of every sale. Our commission is published, and we never charge for listing.",
  },
  {
    icon: Recycle,
    title: "Low waste",
    copy: "Plastic-free packaging, carbon-balanced delivery, and objects designed to be repaired rather than replaced.",
  },
  {
    icon: Globe2,
    title: "Worth shipping",
    copy: "We favour slower logistics and consolidated orders over fast, wasteful delivery — and say so up front.",
  },
];

const chapters = [
  {
    number: "01",
    title: "A frustration",
    copy: "Olea began in a small kitchen in Lisbon, after a delivery of six “handmade” bowls arrived with a factory barcode on the base. The internet had made it easy to buy things, but almost impossible to know who made them.",
  },
  {
    number: "02",
    title: "A different shelf",
    copy: "We started with a single shelf of ceramics from two studios we knew personally. Every piece had a maker's name, a material list and a story. People wrote back to say it felt different — quieter, more considered.",
  },
  {
    number: "03",
    title: "A market, not a mall",
    copy: "Today Olea is a marketplace of more than a hundred studios across thirty-eight countries. We are still small on purpose: every maker is invited, every listing is read, and every object is something we would keep ourselves.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Our story"
        title="A marketplace built around makers."
        description="Olea exists to make the people behind objects visible. Not a mall, not an algorithm — a considered shelf, read by humans."
      >
        <Link href="/products" className="btn-primary shrink-0">
          Explore the market
          <ArrowRight className="size-4" />
        </Link>
      </PageIntro>

      <section className="border-b border-line">
        <div className="shell grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-4xl text-olive">{stat.value}</p>
              <p className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-sand/40">
              <Image
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1100&q=85"
                alt="A shelf of hand-thrown ceramic vessels"
                fill
                sizes="(min-width: 1024px) 32rem, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-2 max-w-[14rem] rounded-2xl bg-olive p-5 text-cream shadow-xl sm:-right-6">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-gold-light">
                Our promise
              </p>
              <p className="mt-2 font-display text-xl leading-snug">
                If we would not keep it, we will not list it.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="grid gap-4 border-b border-line pb-8 sm:grid-cols-[3rem_1fr]"
              >
                <span className="font-display text-sm text-gold">
                  {chapter.number}
                </span>
                <div>
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">
                    {chapter.title}
                  </h2>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {chapter.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper">
        <div className="shell py-16 lg:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow">What we stand for</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
              Six promises we publish.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Values are only useful when they cost something. These are the
              rules we hold ourselves to, even when a cheaper option exists.
            </p>
          </div>

          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-line bg-cream/60 p-6"
              >
                <span className="grid size-10 place-items-center rounded-full bg-olive/8 text-olive">
                  <principle.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-xl text-ink">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {principle.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="makers" className="shell scroll-mt-28 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">For makers</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl">
              A shelf, a studio, and your own name.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Opening a studio takes a few minutes. You publish your own pieces,
              manage stock and fulfilment, and keep the majority of every sale.
              We handle discovery, checkout and the awkward parts.
            </p>

            <ol className="mt-8 space-y-4">
              {[
                {
                  title: "Apply in minutes",
                  copy: "Create a studio account with your name and shop details.",
                },
                {
                  title: "List your first pieces",
                  copy: "Add photography, materials, price and stock. We review before publishing.",
                },
                {
                  title: "Ship and get paid",
                  copy: "Orders arrive in your dashboard. Update status as you pack.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-olive text-xs font-bold text-cream">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">
                      {step.copy}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <Link href="/register?role=seller" className="btn-primary mt-8">
              <Store className="size-4" />
              Open a studio account
            </Link>
          </div>

          <div className="rounded-[1.75rem] border border-line bg-paper p-6 sm:p-8">
            <p className="eyebrow">The maker handbook</p>
            <div className="mt-5 space-y-4">
              {[
                {
                  title: "Photography",
                  copy: "Natural daylight, a plain surface, and at least one detail shot. We can help with the rest.",
                },
                {
                  title: "Descriptions",
                  copy: "Write the way you talk in the studio. Materials, dimensions, care — and the story.",
                },
                {
                  title: "Fulfilment",
                  copy: "Aim to ship within four days. If something runs late, update the order status so buyers can see.",
                },
                {
                  title: "Pricing",
                  copy: "Price for your time. We charge 15% commission, and there are no listing or monthly fees.",
                },
              ].map((item) => (
                <div key={item.title} className="border-t border-line pt-4">
                  <h3 className="font-display text-lg text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {item.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="care" className="border-t border-line bg-paper scroll-mt-28">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Care</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04] tracking-[-0.02em] text-ink">
                Shipping, returns, and aftercare.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                If something arrives damaged or is not right, write to us. A
                human reads every message.
              </p>
              <a href="mailto:hello@olea.market" className="btn-outline mt-6">
                hello@olea.market
              </a>
            </div>

            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {[
                {
                  term: "Shipping",
                  detail:
                    "Free over $75. Orders ship within 2–4 working days, plastic-free and carbon-balanced.",
                },
                {
                  term: "Returns",
                  detail:
                    "30 days from delivery. Pieces must be unused and in their original packaging.",
                },
                {
                  term: "Made to last",
                  detail:
                    "Each listing notes care instructions. Repair guides are available for ceramics and textiles.",
                },
                {
                  term: "Buyer protection",
                  detail:
                    "Payments are held until dispatch is confirmed. If an order never ships, you are refunded in full.",
                },
              ].map((item) => (
                <div key={item.term} className="border-t border-line pt-4">
                  <dt className="font-display text-lg text-ink">{item.term}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-olive px-6 py-12 text-center text-cream sm:px-12">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
            Find something made by a person, for a person.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-sand/85">
            The shelf changes every week. Start with what catches your eye.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/products" className="btn-gold">
              Explore the market
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/register?role=seller"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/25 px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-cream transition-colors hover:bg-cream/10"
            >
              Sell on Olea
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
