import type { ReactNode } from "react";

export function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted">
          {label}
        </p>
        {icon && (
          <span className="grid size-8 place-items-center rounded-full bg-olive/8 text-olive">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 font-display text-3xl text-ink">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
