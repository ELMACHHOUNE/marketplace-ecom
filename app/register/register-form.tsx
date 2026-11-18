"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
  ShoppingBag,
  Store,
} from "lucide-react";
import { register, type AuthState } from "@/app/actions/auth";

const roles = [
  {
    value: "client" as const,
    title: "I'm shopping",
    copy: "Follow makers and collect pieces you love.",
    icon: ShoppingBag,
  },
  {
    value: "seller" as const,
    title: "I'm a maker",
    copy: "Open a studio, list work and keep 85% of sales.",
    icon: Store,
  },
];

export function RegisterForm({
  next,
  defaultRole,
}: {
  next: string;
  defaultRole: "client" | "seller";
}) {
  const [role, setRole] = useState<"client" | "seller">(defaultRole);
  const [state, action, pending] = useActionState<AuthState, FormData>(
    register,
    undefined,
  );

  const errors = state?.fieldErrors ?? {};

  return (
    <div>
      <form action={action} className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <input type="hidden" name="role" value={role} />

        {state?.error && (
          <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs leading-relaxed text-red-700">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            {state.error}
          </div>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          {roles.map((option) => {
            const active = role === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value)}
                aria-pressed={active}
                className={`rounded-xl border p-3.5 text-left transition-colors ${
                  active
                    ? "border-olive bg-olive/[0.07]"
                    : "border-line bg-paper hover:border-olive/30"
                }`}
              >
                <span
                  className={`inline-grid size-8 place-items-center rounded-full ${
                    active ? "bg-olive text-cream" : "bg-olive/8 text-olive"
                  }`}
                >
                  <option.icon className="size-4" />
                </span>
                <span className="mt-2.5 block text-sm font-semibold text-ink">
                  {option.title}
                </span>
                <span className="mt-0.5 block text-[0.7rem] leading-snug text-muted">
                  {option.copy}
                </span>
              </button>
            );
          })}
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
          >
            Full name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            placeholder="Amara Diallo"
            className="field"
          />
          {errors.name && (
            <p className="mt-1 text-[0.68rem] text-red-700">{errors.name}</p>
          )}
        </div>

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
          {errors.email && (
            <p className="mt-1 text-[0.68rem] text-red-700">{errors.email}</p>
          )}
        </div>

        {role === "seller" && (
          <div>
            <label
              htmlFor="storeName"
              className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
            >
              Studio name
            </label>
            <input
              id="storeName"
              name="storeName"
              placeholder="Terra & Loom"
              className="field"
            />
            {errors.storeName && (
              <p className="mt-1 text-[0.68rem] text-red-700">
                {errors.storeName}
              </p>
            )}
          </div>
        )}

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-[0.62rem] font-bold uppercase tracking-[0.14em] text-ink/70"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            placeholder="At least 8 characters"
            className="field"
          />
          {errors.password ? (
            <p className="mt-1 text-[0.68rem] text-red-700">{errors.password}</p>
          ) : (
            <p className="mt-1 text-[0.62rem] text-muted">
              Use 8+ characters with at least one letter and one number.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Creating account
            </>
          ) : (
            <>
              {role === "seller" ? "Open my studio" : "Create account"}
              <ArrowRight className="size-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href={`/login${next !== "/dashboard" ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-semibold text-olive underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
