"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { login, type AuthState } from "@/app/actions/auth";

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );

  return (
    <div>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        {state?.error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {state.error}
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="field"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
            >
              Password
            </label>
            <span className="text-[0.62rem] text-muted">
              Secured with bcrypt
            </span>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="field"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Signing in
            </>
          ) : (
            <>
              Sign in <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 rounded-xl border border-line bg-paper p-4">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted">
          Seeded demo accounts
        </p>
        <div className="mt-2.5 space-y-1 font-mono text-[0.7rem] leading-relaxed text-ink/75">
          <p>admin@olea.market · Admin1234!</p>
          <p>seller@olea.market · Seller1234!</p>
          <p>client@olea.market · Client1234!</p>
        </div>
        <p className="mt-2 text-[0.62rem] text-muted">
          Available after running <code className="text-olive">npm run seed</code>.
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        New to Olea?{" "}
        <Link
          href={`/register${next !== "/dashboard" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-semibold text-olive underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
