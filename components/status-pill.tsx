const styles: Record<string, string> = {
  pending: "bg-gold/15 text-[#6b5217]",
  paid: "bg-olive/10 text-olive",
  shipped: "bg-blue-500/10 text-blue-700",
  delivered: "bg-emerald-500/10 text-emerald-700",
  cancelled: "bg-red-500/10 text-red-700",
};

export function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.14em] ${
        styles[status] ?? "bg-line/50 text-muted"
      }`}
    >
      {status}
    </span>
  );
}
