import Link from "next/link";
import {
  ArrowRight,
  Cookie,
  Database,
  Eye,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Privacy policy",
  description:
    "What Olea collects, why we collect it and the choices you have about your data.",
};

const sections = [
  {
    id: "collect",
    icon: Database,
    title: "What we collect",
    body: "When you register we store your name, email address, role and, for sellers, a studio name and bio. Orders keep the buyer's name and email plus the items purchased. Your cart is held in a small cookie so it survives a refresh. We do not collect payment card details in this demo.",
  },
  {
    id: "use",
    icon: Eye,
    title: "How we use it",
    body: "Account data lets you sign in and manage a studio. Order data lets makers fulfil purchases and lets you see your own history. We use the cart cookie only to remember what you added. We do not sell personal data or hand it to advertisers.",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: "Cookies",
    body: "Olea sets two cookies: a signed session cookie that keeps you logged in, and a cart cookie that holds your basket. Both are HTTP-only where possible and expire after seven days or when you clear them. There are no tracking or advertising cookies on this site.",
  },
  {
    id: "sharing",
    icon: ShieldCheck,
    title: "Who can see it",
    body: "Makers see only the buyer details attached to their own order lines, and admins see orders to resolve problems. Passwords are hashed with bcrypt and never stored in plain text. We do not share your details with third parties except where the law requires it.",
  },
  {
    id: "security",
    icon: Lock,
    title: "Storage and security",
    body: "Data is stored in a MongoDB Atlas cluster and sessions are signed with a secret held on the server. Access to dashboard pages is checked on the server, not just in the interface. No system is perfectly secure, so please use a unique password and tell us if you spot anything unusual.",
  },
  {
    id: "rights",
    icon: Mail,
    title: "Your choices",
    body: "You can ask for a copy of your data, ask us to correct it, or ask us to delete your account by writing to the address below. Unsubscribing from the Sunday dispatch takes one click on any newsletter message, and leaving the site clears the practical traces we hold.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy policy."
        description="A short account of the data behind a small marketplace. Last updated 20 November 2026."
      >
        <Link href="/terms" className="btn-outline shrink-0">
          Terms of service
          <ArrowRight className="size-4" />
        </Link>
      </PageIntro>

      <section className="shell py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">On this page</p>
            <nav className="mt-5 flex flex-col gap-1" aria-label="Privacy sections">
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
              <ShieldCheck className="size-5 text-gold" />
              <p className="mt-3 text-sm font-medium text-ink">Data requests</p>
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
