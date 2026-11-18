import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

type SearchParams = Promise<{ next?: string }>;

export const metadata = {
  title: "Sign in",
  description: "Sign in to your Olea account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";

  const user = await getCurrentUser();
  if (user) redirect(safeNext);

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Good to see you again."
      description="Sign in to track orders, manage your studio, or pick up where you left off."
      image="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85"
      quote="The best things in my kitchen were made by someone whose name I know."
      author="Ines M. · Client since 2024"
    >
      <LoginForm next={safeNext} />
    </AuthShell>
  );
}
