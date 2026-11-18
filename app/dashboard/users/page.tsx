import { redirect } from "next/navigation";
import { ShieldCheck, Trash2, Users } from "lucide-react";
import { deleteUser, updateUserRole } from "@/app/actions/users";
import { ConfirmSubmit } from "@/components/confirm-submit";
import { DbNotice } from "@/components/db-notice";
import { getCurrentUser } from "@/lib/auth";
import { isDbConfigured } from "@/lib/db";
import { ROLES, type Role } from "@/lib/types";
import { listUsers } from "@/lib/users";
import { formatDate, initials } from "@/lib/utils";

export const metadata = {
  title: "People",
};

const roleStyles: Record<Role, string> = {
  admin: "bg-gold/15 text-[#6b5217]",
  seller: "bg-olive/10 text-olive",
  client: "bg-line/60 text-muted",
};

export default async function DashboardUsersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard/users");
  if (user.role !== "admin") redirect("/dashboard");

  const configured = isDbConfigured();
  const users = configured ? await listUsers() : [];
  const counts = users.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.role] = (acc[entry.role] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-7">
      <header>
        <p className="eyebrow">People & roles</p>
        <h1 className="mt-4 font-display text-3xl leading-[1.04] tracking-[-0.02em] text-ink sm:text-4xl">
          The people behind the market.
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          Promote a client to seller, make a seller an admin, or remove an
          account. Only admins can change roles.
        </p>
      </header>

      {!configured ? (
        <DbNotice />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {ROLES.map((role) => (
              <div
                key={role}
                className="rounded-2xl border border-line bg-paper p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-muted">
                    {role}s
                  </p>
                  {role === "admin" ? (
                    <ShieldCheck className="size-4 text-gold" />
                  ) : (
                    <Users className="size-4 text-olive" />
                  )}
                </div>
                <p className="mt-2 font-display text-3xl text-ink">
                  {counts[role] ?? 0}
                </p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-paper">
            <div className="hidden grid-cols-[minmax(0,2fr)_0.9fr_0.7fr_0.7fr] gap-4 border-b border-line px-5 py-3 text-[0.58rem] font-bold uppercase tracking-[0.16em] text-muted md:grid">
              <span>Person</span>
              <span>Role</span>
              <span>Joined</span>
              <span className="text-right">Account</span>
            </div>

            <ul className="divide-y divide-line">
              {users.map((person) => {
                const isSelf = person.id === user.id;
                return (
                  <li
                    key={person.id}
                    className="grid gap-4 px-4 py-4 md:grid-cols-[minmax(0,2fr)_0.9fr_0.7fr_0.7fr] md:items-center md:px-5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-olive/10 text-xs font-bold text-olive">
                        {initials(person.name)}
                      </span>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 truncate text-sm font-semibold text-ink">
                          {person.name}
                          {isSelf && (
                            <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.5rem] font-bold uppercase tracking-[0.1em] text-[#6b5217]">
                              You
                            </span>
                          )}
                        </p>
                        <p className="truncate text-[0.68rem] text-muted">
                          {person.email}
                        </p>
                        {person.storeName && (
                          <p className="truncate text-[0.62rem] text-gold">
                            {person.storeName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      {isSelf ? (
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-[0.12em] ${roleStyles[person.role]}`}
                        >
                          {person.role}
                        </span>
                      ) : (
                        <form
                          action={updateUserRole}
                          className="flex items-center gap-1.5"
                        >
                          <input type="hidden" name="userId" value={person.id} />
                          <select
                            name="role"
                            defaultValue={person.role}
                            aria-label={`Role for ${person.name}`}
                            className="h-8 rounded-full border border-line bg-cream px-2.5 text-[0.68rem] font-semibold capitalize focus:border-olive-light focus:outline-none"
                          >
                            {ROLES.map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                          <button
                            type="submit"
                            className="rounded-full bg-olive px-2.5 py-1.5 text-[0.55rem] font-bold uppercase tracking-[0.08em] text-cream transition-colors hover:bg-olive-dark"
                          >
                            Save
                          </button>
                        </form>
                      )}
                    </div>

                    <span className="text-xs text-muted">
                      {formatDate(person.createdAt)}
                    </span>

                    <div className="md:text-right">
                      {isSelf ? (
                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-muted/70">
                          Protected
                        </span>
                      ) : (
                        <form action={deleteUser}>
                          <input type="hidden" name="userId" value={person.id} />
                          <ConfirmSubmit
                            message={`Delete ${person.name}'s account and products? This cannot be undone.`}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-muted transition-colors hover:border-red-200 hover:text-red-700"
                          >
                            <Trash2 className="size-3" /> Remove
                          </ConfirmSubmit>
                        </form>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
