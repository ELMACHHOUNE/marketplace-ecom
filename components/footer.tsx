"use client";

import PushpinTearFooter, {
  type FooterColumn,
  type IconLink,
} from "@/components/ui/pushpin-tear-footer";
import { SITE } from "@/lib/constants";

function OleaMark() {
  return (
    <svg
      viewBox="0 0 44 28"
      className="tpf-mark"
      aria-hidden="true"
      fill="none"
    >
      <circle cx="22" cy="14" r="12" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M22 21c0-5.6 3.2-9.2 8-10.4-.4 5.6-3.2 8.8-8 10.4Z"
        fill="currentColor"
      />
      <path
        d="M22 21c0-4-2.4-6.8-6.4-8 .56 4 2.56 6.8 6.4 8Z"
        fill="#D8B26B"
      />
      <path
        d="M22 22.5V11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="33" cy="5.5" r="1.6" fill="#D8B26B" className="tpf-mark-dot" />
    </svg>
  );
}

const socials: IconLink[] = [
  { icon: "ig", label: "Instagram", href: "#" },
  { icon: "x", label: "X", href: "#" },
  { icon: "linkedin", label: "LinkedIn", href: "#" },
  { icon: "github", label: "GitHub", href: "#" },
];

const columns: FooterColumn[] = [
  {
    title: "shop",
    links: [
      { label: "All pieces", href: "/products" },
      { label: "Ceramics", href: "/products?category=Ceramics" },
      { label: "Textiles", href: "/products?category=Textiles" },
      { label: "Pantry", href: "/products?category=Pantry" },
    ],
    cta: { label: "browse.", href: "/products" },
  },
  {
    title: "house",
    links: [
      { label: "Our story", href: "/about" },
      { label: "Sell on Olea", href: "/register?role=seller" },
      { label: "Your account", href: "/dashboard" },
    ],
    cta: { label: "talk.", href: `mailto:${SITE.email}` },
  },
];

const sideLinks: IconLink[] = [
  { icon: "shield", label: "privacy", href: "/privacy" },
  { icon: "doc", label: "terms", href: "/terms" },
];

export function Footer() {
  return (
    <PushpinTearFooter
      brand="olea."
      name="Olea Marketplace"
      logoHref="/"
      logo={<OleaMark />}
      socials={socials}
      email={SITE.email}
      newsletter={{ label: "The Sunday dispatch", placeholder: "your@email" }}
      status={{ label: "welcoming new makers", href: "/register?role=seller" }}
      mark="EST. LISBON"
      timeZone="Europe/Lisbon"
      timeLabel="LIS"
      columns={columns}
      chat={{ label: "say hi", href: `mailto:${SITE.email}` }}
      sideLinks={sideLinks}
      copyright={`© ${new Date().getFullYear()} Olea Marketplace`}
      credit="made with care"
      handle={{ label: "@olea.market", href: "/about" }}
      sheet="#4f5b2a"
      paper="#fbf8f1"
      sheetInk="#f5efe3"
      paperInk="#22261a"
      seed={12}
    />
  );
}
