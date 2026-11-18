import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth-shell";
import { getCurrentUser } from "@/lib/auth";
import { RegisterForm } from "./register-form";

type SearchParams = Promise<{ role?: string; next?: string }>;

export const metadata = {
  title: "Join Olea",
  description:
    "Create a client account or open a studio and start selling handmade goods on Olea.",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { role, next } = await searchParams;
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const defaultRole = role === "seller" ? "seller" : "client";

  const user = await getCurrentUser();
  if (user) redirect(safeNext);

  return (
    <AuthShell
      eyebrow={defaultRole === "seller" ? "Open a studio" : "Join the market"}
      title={
        defaultRole === "seller"
          ? "Give your work a proper shelf."
          : "Collect things with a story."
      }
      description={
        defaultRole === "seller"
          ? "Publish pieces, manage stock and orders, and keep 85% of every sale. No listing fees, no monthly rent."
          : "Save makers, follow new drops, and check out in seconds. Your details stay on the server, always."
      }
      image="https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&w=1200&q=85"
      quote="I listed my first six pieces on a Sunday. By Wednesday, three were on their way to new homes."
      author="Amara Diallo · Terra & Loom"
    >
      <RegisterForm next={safeNext} defaultRole={defaultRole} />
    </AuthShell>
  );
}
