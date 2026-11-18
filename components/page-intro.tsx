import type { ReactNode } from "react";

export function PageIntro({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-paper">
      <div className="shell py-12 sm:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-3xl font-display text-4xl leading-[1.02] tracking-[-0.02em] text-ink sm:text-5xl">
              {title}
            </h1>
            {description && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
