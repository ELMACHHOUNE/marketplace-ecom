import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const values = [
  {
    number: "01",
    title: "Makers first",
    copy: "Studios keep 85% of every sale. We publish our commission, plainly.",
  },
  {
    number: "02",
    title: "Small batch",
    copy: "We list what was actually made this season, not endlessly restocked.",
  },
  {
    number: "03",
    title: "Built to keep",
    copy: "Natural materials, repairable objects, and packaging without plastic.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="border-y border-line bg-paper">
      <div className="shell grid items-center gap-14 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:py-28">
        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="absolute -left-3 -top-3 h-full w-full rounded-[1.75rem] border border-gold/35"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sand/50">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85"
              alt="Amara Diallo, founder of Terra & Loom"
              fill
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-3 max-w-[15rem] rounded-2xl bg-olive p-5 text-cream shadow-[0_24px_48px_-24px_rgba(34,38,26,0.6)] sm:-right-8">
            <p className="font-display text-lg leading-snug">
              “We only list what we would keep in our own homes.”
            </p>
            <p className="mt-3 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-light">
              Amara Diallo · Founder
            </p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Our story</p>
          <h2 className="mt-5 max-w-xl font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
            A slower way to shop, built around people.
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Olea began with a simple frustration: the internet makes it easy to
            buy things, but almost impossible to know who made them. So we built
            a marketplace where every listing belongs to a named studio, every
            material is disclosed, and every object is chosen by a human.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            Today we work with more than a hundred independent makers across
            ceramics, textiles, pantry and jewellery — small teams who care
            about the long life of the things they make.
          </p>

          <div className="mt-9 space-y-5">
            {values.map((value) => (
              <div
                key={value.number}
                className="flex gap-4 border-t border-line pt-5"
              >
                <span className="font-display text-sm text-gold">
                  {value.number}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">
                    {value.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-outline mt-9">
            Read the full story
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
