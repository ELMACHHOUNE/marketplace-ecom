import { Database, Terminal } from "lucide-react";

export function DbNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-gold/35 bg-gold/[0.07] p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
          <Database className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
            Setup required
          </p>
          <h3 className="mt-1 font-display text-2xl text-ink">
            Connect your MongoDB Atlas cluster
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            The storefront is running on curated preview data. Add your Atlas
            connection string to unlock accounts, carts, orders and the seller
            dashboard.
          </p>

          {!compact && (
            <>
              <ol className="mt-5 space-y-2 text-sm text-ink/80">
                <li>
                  <span className="font-semibold text-olive">1.</span> Create a
                  free cluster at{" "}
                  <a
                    href="https://www.mongodb.com/cloud/atlas"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-olive underline underline-offset-2"
                  >
                    MongoDB Atlas
                  </a>{" "}
                  and allow your IP.
                </li>
                <li>
                  <span className="font-semibold text-olive">2.</span> Copy the
                  driver connection string into{" "}
                  <code className="rounded bg-cream px-1.5 py-0.5 text-xs">
                    .env.local
                  </code>
                  .
                </li>
                <li>
                  <span className="font-semibold text-olive">3.</span> Run the
                  seed script to create demo accounts and products.
                </li>
              </ol>

              <div className="mt-5 overflow-hidden rounded-xl bg-olive-dark">
                <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-2 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-sand/60">
                  <Terminal className="size-3.5" /> .env.local
                </div>
                <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-cream">
                  <code>{`MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/olea?retryWrites=true&w=majority
SESSION_SECRET=your-long-random-secret`}</code>
                </pre>
              </div>

              <div className="mt-3 rounded-xl border border-line bg-paper px-4 py-3 font-mono text-xs text-olive">
                npm run seed
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
