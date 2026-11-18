"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";

const END_PADDING = 12;

export type GarmentKind =
  | "tee"
  | "knit"
  | "hoodie"
  | "shirt"
  | "jacket"
  | "coat";

export type RailGarment = {
  id: string;
  name: string;
  description: string;
  kind?: GarmentKind;
  color?: string;
  trim?: string;
  image?: string;
  backImage?: string;
  sideImage?: string;
  tag?: string;
  details?: string[];
  swatch?: string;
  href?: string;
};

type Hanger = "brass" | "steel" | "wood" | "matte" | "none";

export type ClothingRailHeroLabels = {
  front: string;
  back: string;
  close: string;
  show: string;
};

export type ClothingRailHeroProps = React.ComponentProps<"section"> & {
  items?: RailGarment[];
  eyebrow?: string;
  heading?: string;
  title?: string;
  description?: string;
  caption?: string;
  action?: React.ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
  autoplay?: boolean;
  interval?: number;
  hanger?: Hanger;
  labels?: ClothingRailHeroLabels;
  onOpenChange?: (index: number | null) => void;
};

const defaultItems: RailGarment[] = [
  {
    id: "1",
    name: "Pleated wool trouser",
    description:
      "A high, clean waist and a leg that falls in one unbroken line. Cut from a dry Italian wool that holds its pleat and softens with wear.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/trouser-front.9f3964dc.png",
    backImage:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/trouser-back.cbbd7885.png",
    sideImage:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/trouser-side.e4b6b9b9.png",
    tag: "£240",
    details: ["Italian wool", "High rise", "Dry clean"],
    swatch: "#6a665c",
  },
  {
    id: "2",
    name: "Washed poplin shirt",
    description:
      "An oversized shirt with a low, soft collar and a curved hem. The poplin is washed twice so it arrives already supple, already familiar.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/shirt-front.f6e4b2ff.png",
    backImage:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/shirt-back.bbf33e8f.png",
    tag: "£110",
    details: ["Organic cotton", "Oversized", "Machine wash"],
    swatch: "#d9d3c6",
  },
  {
    id: "3",
    name: "Double-face wool coat",
    description:
      "Two faces, one seam. Hand-finished in a mill that has made this cloth for four generations. Unlined, so it moves with you.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/coat-front.e9c7d4a1.png",
    backImage:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/coat-back.c4b4f2a8.png",
    tag: "£480",
    details: ["Double-face wool", "Unlined", "Hand finished"],
    swatch: "#3f4038",
  },
  {
    id: "4",
    name: "Raw silk skirt",
    description:
      "Bias-cut and long enough to skim the floor. Raw silk keeps a quiet, irregular slub that catches the light without shine.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/skirt-front.8f6f2e1d.png",
    tag: "£195",
    details: ["Raw silk", "Bias cut", "Mid rise"],
    swatch: "#9a8e7a",
  },
  {
    id: "5",
    name: "Cashmere crew",
    description:
      "A spare crew neck in a heavy, two-ply cashmere. Ribbed at the cuff and hem, worked on old machines in the Scottish borders.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/knit-front.c2d5e7b4.png",
    tag: "£265",
    details: ["Two-ply cashmere", "Made in Scotland", "Hand wash"],
    swatch: "#b5a58d",
  },
  {
    id: "6",
    name: "Leather trench",
    description:
      "A trench in vegetable-tanned lambskin, belted and cut long. It starts stiff and ends up shaped like you.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/trench-front.a4e8c2f1.png",
    tag: "£780",
    details: ["Vegetable-tanned leather", "Belted", "Specialist clean"],
    swatch: "#4a3527",
  },
  {
    id: "7",
    name: "Wide linen short",
    description:
      "A generous, knee-length short in a heavyweight linen. Pressed once, then left to wrinkle exactly as it likes.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/short-front.bb8a4e2d.png",
    tag: "£95",
    details: ["Heavyweight linen", "Wide leg", "Machine wash cold"],
    swatch: "#a9a99a",
  },
  {
    id: "8",
    name: "Silk column dress",
    description:
      "A single length of silk, seamed only at the sides. The straps are narrow and adjustable; everything else is left alone.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/dress-front.d1c8f3a7.png",
    tag: "£310",
    details: ["Sandwashed silk", "Adjustable straps", "Dry clean"],
    swatch: "#8c7f6e",
  },
  {
    id: "9",
    name: "Belted wool blazer",
    description:
      "A soft shoulder, a long line and a self belt. Made in a small atelier in northern Portugal from deadstock wool.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/blazer-front.f2b6d9e3.png",
    tag: "£355",
    details: ["Deadstock wool", "Soft shoulder", "Self belt"],
    swatch: "#57574c",
  },
  {
    id: "10",
    name: "Cotton canvas tote",
    description:
      "A flat, unlined tote in a heavy cotton canvas. Two seams, one pocket, and handles long enough to go over a coat.",
    image:
      "https://cdn.21st.dev/elijah.brown/garment-rail/garments/tote-front.a7e3c5b9.png",
    tag: "£70",
    details: ["Cotton canvas", "Unlined", "Machine wash"],
    swatch: "#c8bda5",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

function useInView<T extends Element>(threshold = 0.18) {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Photo({
  item,
  side,
  hanger,
  dimmed,
  fit = "contain",
  className,
}: {
  item: RailGarment;
  side: "front" | "back" | "side";
  hanger?: Hanger;
  dimmed?: boolean;
  fit?: "contain" | "cover";
  className?: string;
}) {
  const src =
    side === "back"
      ? (item.backImage ?? item.image)
      : side === "side"
        ? (item.sideImage ?? item.image)
        : item.image;
  if (!src) {
    return (
      <div
        className={`absolute inset-0 grid place-items-center ${className ?? ""}`}
        aria-hidden="true"
      >
        <span className="grid size-16 place-items-center rounded-full bg-background/70 text-muted-foreground">
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 21h18M6 21V8l6-4 6 4v13M9 21v-8h6v8" />
          </svg>
        </span>
      </div>
    );
  }

  const top = hanger === "none" ? 0 : hanger ? 96 : 0;
  const height =
    hanger === "none" ? "100%" : hanger ? "calc(100% - 96px)" : "100%";

  return (
    <img
      src={src}
      alt={item.name}
      draggable={false}
      className={`absolute left-1/2 w-full -translate-x-1/2 ${
        fit === "cover" ? "object-cover" : "object-contain"
      } transition-opacity duration-300 ${
        dimmed ? "opacity-0" : "opacity-100"
      } ${className ?? ""}`}
      style={{ top: `${top}px`, height }}
    />
  );
}

function HangerIcon({ type }: { type: Hanger }) {
  if (type === "none") return null;
  const stroke = type === "wood" ? "#7b5b3a" : "#8b8b86";
  return (
    <svg
      viewBox="0 0 140 44"
      className="absolute left-1/2 top-[64px] h-11 w-[70%] -translate-x-1/2"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M70 3c0-4-3-6-6-6 4 0 6 3 6 7v13c0 6-4 10-10 10H12c-5 0-8 4-7 8 1 3 4 5 8 5h118c5 0 8-2 9-5 1-4-2-8-7-8H80c-6 0-10-4-10-10V7"
        stroke={stroke}
        strokeWidth={type === "brass" ? 2.4 : 3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={type === "steel" ? 0.72 : 0.9}
      />
    </svg>
  );
}

function Turn({
  children,
  angle,
  onClick,
  label,
  className,
}: {
  children: React.ReactNode;
  angle: number;
  onClick?: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group absolute bottom-0 left-1/2 top-0 z-30 w-full -translate-x-1/2 origin-bottom cursor-pointer touch-pan-y border-0 bg-transparent p-0 text-left outline-none ${className ?? ""}`}
      style={{
        transform: `translateX(-50%) rotate(${angle}deg)`,
        transition: "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {children}
    </button>
  );
}

function Rail({
  items,
  hanger,
  activeIndex,
  onActive,
  open,
  setOpen,
  autoplay,
  interval,
}: {
  items: RailGarment[];
  hanger: Hanger;
  activeIndex: number;
  onActive: (index: number) => void;
  open: number | null;
  setOpen: (value: number | null) => void;
  autoplay: boolean;
  interval: number;
}) {
  const [size, setSize] = React.useState({
    width: 0,
    height: 0,
    carousel: false,
  });
  const stage = React.useRef<HTMLDivElement | null>(null);
  const [live, setLive] = React.useState({
    index: 0,
    count: items.length,
  });

  React.useEffect(() => {
    const node = stage.current;
    if (!node) return;
    const update = () => {
      const width = node.clientWidth;
      const height = node.clientHeight;
      setSize({ width, height, carousel: width < 760 });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!size.carousel) stage.current?.scrollTo({ left: 0 });
  }, [size.carousel]);

  const count = Math.max(items.length, 1);
  const practicalMax = Math.max(200, size.width - END_PADDING * 2 - 40);
  const contentWidth = size.width
    ? size.carousel
      ? Math.min(practicalMax, Math.round(size.width * 0.62))
      : Math.min(280, Math.max(180, Math.round(size.width / 5.2)))
    : 0;

  const step = count > 1 ? contentWidth + (size.carousel ? 16 : 20) : 0;
  const railSpan = contentWidth + step * Math.max(0, count - 1);
  const totalSpan = railSpan + END_PADDING * 2;
  const offset = size.carousel
    ? clamp(
        activeIndex * step - (size.width - contentWidth) / 2,
        0,
        Math.max(0, totalSpan - size.width),
      )
    : 0;

  const liveIndex = clamp(live.index, 0, count - 1);
  const centerIndex = size.carousel ? 0 : liveIndex;
  const frontIndex = size.carousel ? activeIndex : liveIndex;

  React.useEffect(() => {
    if (!autoplay || open !== null || !size.carousel) return;
    let timer: ReturnType<typeof setTimeout>;
    const advance = () => {
      const next = (frontIndex + 1) % count;
      onActive(next);
      timer = setTimeout(advance, interval);
    };
    timer = setTimeout(advance, interval);
    return () => clearTimeout(timer);
  }, [autoplay, count, frontIndex, interval, onActive, open, size.carousel]);

  const startDrag = React.useRef({
    x: 0,
    scrollLeft: 0,
    active: false,
    moved: false,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startDrag.current = {
      x: event.clientX,
      scrollLeft: stage.current?.scrollLeft ?? 0,
      active: true,
      moved: false,
    };
  };
  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!startDrag.current.active) return;
    const delta = event.clientX - startDrag.current.x;
    if (Math.abs(delta) > 6) startDrag.current.moved = true;
    if (!size.carousel) {
      if (stage.current) {
        stage.current.scrollLeft = startDrag.current.scrollLeft - delta;
      }
      return;
    }
    if (Math.abs(delta) < 30) return;
    startDrag.current.active = false;
    if (delta > 0) onActive(Math.max(0, activeIndex - 1));
    else onActive(Math.min(count - 1, activeIndex + 1));
  };
  const handlePointerUp = () => {
    startDrag.current.active = false;
  };
  const handleScroll = () => {
    if (size.carousel || !stage.current || step <= 0) return;
    const index = clamp(
      Math.round(stage.current.scrollLeft / step),
      0,
      count - 1,
    );
    setLive({ index, count });
  };

  return (
    <div
      ref={stage}
      className="relative mx-auto flex h-[clamp(380px,54vh,560px)] w-full max-w-[1400px] items-end overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{
        touchAction: "pan-y",
        overflowX: size.carousel ? "hidden" : "auto",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onScroll={handleScroll}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[54%] bg-[linear-gradient(180deg,transparent,rgba(34,38,26,0.06))]"
      />

      <div
        className="relative z-10 flex h-full w-full items-end transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: size.carousel ? `translateX(${-offset}px)` : undefined,
        }}
      >
        <div
          className="relative flex shrink-0 items-end justify-center pb-20"
          style={{ width: `${totalSpan}px`, height: "100%" }}
        >
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[84px] z-0 h-3 rounded-full border-y border-[#8a8e86]/40 bg-[linear-gradient(180deg,#f8f8f4_0%,#9da29a_18%,#60645d_52%,#cfd1c9_72%,#6f736b_100%)] shadow-[0_7px_14px_rgba(34,38,26,0.18)]"
          />
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[96px] z-0 h-24 bg-[linear-gradient(90deg,transparent,rgba(34,38,26,0.08),transparent)] blur-md"
          />

          {items.map((item, index) => {
            const isCenter = size.carousel
              ? index === activeIndex
              : index === centerIndex;
            const relative = size.carousel
              ? index - activeIndex
              : index - centerIndex;
            const isVisible = size.carousel
              ? Math.abs(relative) <= 1
              : Math.abs(relative) <= Math.floor(count / 2);
            const front = index === frontIndex;
            const width = contentWidth;
            const left = END_PADDING + index * step;

            return (
              <div
                key={item.id}
                className="absolute bottom-24 top-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  left: `${left}px`,
                  width: `${width}px`,
                  opacity: isVisible ? 1 : 0,
                  zIndex: isCenter ? 20 : front ? 18 : 10,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                aria-hidden={!isVisible}
              >
                <div className="relative h-full w-full">
                  <Turn
                    label={`${item.name}${item.tag ? `, ${item.tag}` : ""}`}
                    angle={0}
                    onClick={() => {
                      if (startDrag.current.moved) {
                        startDrag.current.moved = false;
                        return;
                      }
                      if (size.carousel && !isCenter) {
                        onActive(index);
                      } else {
                        setOpen(index);
                      }
                    }}
                    className={isCenter ? "z-30" : "z-20"}
                  >
                    <div className="relative mx-auto h-full w-full max-w-[280px] overflow-hidden bg-transparent">
                      <Photo
                        item={item}
                        side="front"
                        hanger={hanger}
                        dimmed={false}
                        fit="contain"
                        className="z-10 transition-[opacity,transform] duration-500 group-hover:scale-[1.02] group-hover:opacity-0"
                      />
                      <Photo
                        item={item}
                        side="back"
                        hanger={hanger}
                        dimmed={false}
                        fit="contain"
                        className={`z-10 opacity-0 transition-[opacity,transform] duration-500 group-hover:scale-[1.02] group-hover:opacity-100 ${item.backImage ? "" : "scale-x-[-1]"}`}
                      />
                      <HangerIcon type={hanger} />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-[linear-gradient(180deg,transparent,rgba(20,24,14,0.88))] px-3 pb-3 pt-16 text-cream transition-opacity duration-300 group-hover:opacity-100">
                        <p className="truncate text-[0.72rem] font-semibold leading-tight">
                          {item.name}
                        </p>
                        <p className="mt-1 truncate text-[0.58rem] uppercase tracking-[0.14em] text-cream/70">
                          {item.tag}
                        </p>
                      </div>
                    </div>
                  </Turn>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 z-30 flex w-full max-w-[1400px] -translate-x-1/2 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            {String((size.carousel ? activeIndex : frontIndex) + 1).padStart(
              2,
              "0",
            )}
          </span>
          <span className="h-px w-8 bg-border" />
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/45">
            {String(count).padStart(2, "0")}
          </span>
        </div>

        {size.carousel ? (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onActive(Math.max(0, activeIndex - 1))}
              aria-label="Previous piece"
              className="grid size-8 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-foreground/40"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M10 3 5 8l5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => onActive(Math.min(count - 1, activeIndex + 1))}
              aria-label="Next piece"
              className="grid size-8 place-items-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur transition-colors hover:border-foreground/40"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="m6 3 5 5-5 5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setLive({ index, count });
                  stage.current?.scrollTo({
                    left: index * step,
                    behavior: "smooth",
                  });
                }}
                aria-label={`Show ${item.name}`}
                aria-pressed={index === centerIndex}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === centerIndex
                    ? "w-7 bg-foreground"
                    : "w-1.5 bg-foreground/25 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-px bg-border/60" />
    </div>
  );
}

const DEFAULT_LABELS: ClothingRailHeroLabels = {
  front: "Front",
  back: "Back",
  close: "Close",
  show: "Show",
};

function Detail({
  open,
  items,
  setOpen,
  labels = DEFAULT_LABELS,
}: {
  open: number | null;
  items: RailGarment[];
  setOpen: (value: number | null) => void;
  labels?: ClothingRailHeroLabels;
}) {
  const [side, setSide] = React.useState<"front" | "back" | "side">("front");
  const titleId = React.useId();
  const item = open === null ? null : items[open];

  React.useEffect(() => {
    if (open === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  if (item === null || open === null) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setOpen(null)}
    >
      <div
        className="animate-fade-up relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[2rem] bg-background shadow-2xl sm:rounded-[2rem] md:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative flex min-h-[42vh] flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.72),transparent_70%)] p-6 sm:min-h-[54vh] sm:p-10">
          <div className="relative h-[36vh] w-full max-w-[340px] sm:h-[48vh]">
            <Photo
              item={item}
              side={side}
              dimmed={false}
              className="!top-1/2 !h-auto !w-full -translate-y-1/2"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2">
              {(["front", "back", "side"] as const).map((value) => {
                const available =
                  value === "front"
                    ? Boolean(item.image)
                    : value === "back"
                      ? Boolean(item.backImage)
                      : Boolean(item.sideImage);
                if (!available) return null;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSide(value)}
                    className={`rounded-full border px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
                      side === value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background/80 text-muted-foreground hover:border-foreground/40"
                    }`}
                  >
                    {value === "side"
                      ? labels.show
                      : value === "front"
                        ? labels.front
                        : labels.back}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col justify-between gap-8 border-t border-border p-6 sm:p-8 md:w-[360px] md:border-l md:border-t-0">
          <div>
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow text-muted-foreground">Olea market</p>
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close details"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <p className="mt-8 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {item.tag ?? "One piece"}
            </p>
            <h2
              id={titleId}
              className="mt-3 font-display text-3xl leading-[1.08] tracking-[-0.02em] text-white sm:text-4xl"
            >
              {item.name}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/65 sm:text-base">
              {item.description}
            </p>

            {item.href ? (
              <Link
                href={item.href}
                onClick={() => setOpen(null)}
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                View piece
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : null}

            {item.details?.length ? (
              <dl className="mt-8 space-y-2 border-t border-border pt-5 text-xs">
                {item.details.map((detail) => (
                  <div
                    key={detail}
                    className="flex items-center justify-between gap-4"
                  >
                    <dt className="text-muted-foreground">Detail</dt>
                    <dd className="text-right font-medium text-foreground">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          <div className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
            {open + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ClothingRailHero({
  items = defaultItems,
  eyebrow = "The rail",
  heading,
  title = heading ?? "Quiet structure.",
  description = "A rail of few things, chosen slowly. Softly tailored layers in linen, wool and washed cotton — made to be reached for daily and kept for years.",
  caption = "Autumn / Winter 25",
  action,
  ctaLabel = "Shop the collection",
  ctaHref = "#",
  autoplay = false,
  interval = 3200,
  hanger = "brass",
  labels,
  onOpenChange,
  className,
  ...props
}: ClothingRailHeroProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setOpen] = React.useState<number | null>(null);
  const [ref] = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [heroRef, heroInView] = useInView<HTMLDivElement>(0.1);

  const safeIndex = Math.min(activeIndex, Math.max(0, items.length - 1));
  const setOpenIndex = React.useCallback(
    (index: number | null) => {
      setOpen(index);
      onOpenChange?.(index);
    },
    [onOpenChange],
  );

  return (
    <section
      ref={ref}
      className={`relative w-full overflow-hidden bg-[#090d21] text-white ${className ?? ""}`}
      {...props}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_58%),linear-gradient(180deg,transparent_65%,rgba(0,0,0,0.2))]" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 pb-6 pt-16 sm:px-8 sm:pt-20 lg:pt-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/60">
              {eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.04] tracking-[-0.025em] text-white sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              {description}
            </p>
          </div>

          {action ?? (
            <Link
              href={ctaHref}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#090d21] transition-colors hover:bg-white/90"
            >
              {ctaLabel}
              <svg
                viewBox="0 0 16 16"
                className="size-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          )}
        </div>

        <div ref={heroRef} className="relative">
          <Rail
            items={items}
            hanger={hanger}
            activeIndex={safeIndex}
            onActive={setActiveIndex}
            open={open}
            setOpen={setOpenIndex}
            autoplay={autoplay && heroInView && !reduced}
            interval={Math.max(900, interval)}
          />

          <div className="mt-4 flex items-center justify-between gap-4 text-[0.6rem] uppercase tracking-[0.18em] text-white/55">
            <span>{caption}</span>
            <span className="hidden sm:inline">
              Drag or tap a piece to look closer
            </span>
          </div>
        </div>
      </div>

      <Detail
        key={open ?? "closed"}
        open={open}
        items={items}
        setOpen={setOpenIndex}
        labels={labels}
      />
    </section>
  );
}
