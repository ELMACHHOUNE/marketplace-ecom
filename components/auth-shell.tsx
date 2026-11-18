import Image from "next/image";
import type { ReactNode } from "react";

export function AuthShell({
  eyebrow,
  title,
  description,
  image,
  quote,
  author,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  quote: string;
  author: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid flex-1 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="flex items-center justify-center px-5 py-14 sm:px-8 lg:py-20">
        <div className="w-full max-w-md">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-4xl leading-[1.03] tracking-[-0.02em] text-ink sm:text-[2.9rem]">
            {title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-7">{footer}</div>}
        </div>
      </div>

      <div className="relative hidden min-h-[32rem] overflow-hidden lg:block">
        <Image
          src={image}
          alt=""
          fill
          sizes="50vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-olive-dark via-olive-dark/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <div className="max-w-md">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-gold-light">
              From the market
            </p>
            <blockquote className="mt-4 font-display text-2xl leading-snug text-cream xl:text-3xl">
              “{quote}”
            </blockquote>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-sand/80">
              {author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
