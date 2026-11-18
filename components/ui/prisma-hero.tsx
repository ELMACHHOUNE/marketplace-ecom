"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { CSSProperties } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={`${word}-${i}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: easeOutExpo }}
            className="relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] text-gold-light">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    segment.text.split(" ").forEach((word) => {
      if (word) words.push({ word, className: segment.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word.word}-${i}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.08, ease: easeOutExpo }}
          className={`inline-block ${word.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {word.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */
interface PrismaHeroProps {
  title?: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const PrismaHero = ({
  title = "Olea",
  eyebrow = "Independent makers · Considered goods",
  description =
    "A curated marketplace for ceramics, textiles, pantry staples and small-batch objects — every piece traceable to the hands that made it.",
  ctaLabel = "Explore the market",
  ctaHref = "/products",
  imageSrc = "/hero-bg.jpg",
  imageAlt = "A model in a camel trench coat beside a sculptural still life in a sunlit gallery",
}: PrismaHeroProps) => {
  return (
    <section className="px-2 pb-2 sm:px-3">
      <div className="relative h-[calc(100svh-7.75rem)] min-h-[36rem] w-full overflow-hidden rounded-[1.5rem] bg-olive-dark md:rounded-[2rem]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[30%_center] sm:object-center"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#1c2113]/95 via-[#1c2113]/45 to-transparent" />

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-6 sm:pb-7 md:px-10 md:pb-9">
          <div className="grid grid-cols-12 items-end gap-4">
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-display text-[32vw] font-light leading-[0.8] tracking-[-0.06em] text-cream [text-shadow:0_4px_32px_rgba(20,24,14,0.45)] sm:text-[30vw] md:text-[26vw] lg:text-[24vw] xl:text-[22vw]">
                <WordsPullUp text={title} showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: easeOutExpo,
                }}
                className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-light"
              >
                {eyebrow}
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: easeOutExpo,
                }}
                className="max-w-md text-xs leading-[1.55] text-sand/90 sm:text-sm md:text-base"
              >
                {description}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: easeOutExpo,
                }}
              >
                <Link
                  href={ctaHref}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-gold py-1 pl-5 pr-1 text-sm font-semibold text-[#2b2410] transition-all hover:gap-3 sm:text-base"
                >
                  {ctaLabel}
                  <span className="flex size-9 items-center justify-center rounded-full bg-olive-dark transition-transform group-hover:scale-110 sm:size-10">
                    <ArrowRight className="size-4 text-cream" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
