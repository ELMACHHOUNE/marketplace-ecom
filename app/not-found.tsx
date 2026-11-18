import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <section className="shell flex flex-1 items-center py-20">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-olive/8 text-olive">
          <Compass className="size-6" />
        </span>
        <p className="mt-6 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-gold">
          404 · Off the shelf
        </p>
        <h1 className="mt-3 font-display text-4xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl">
          This piece has moved on.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          The page you were looking for is not here. The market, however, is full
          of things worth finding.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/products" className="btn-primary">
            Explore the market
            <ArrowRight className="size-4" />
          </Link>
          <Link href="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
