import { redirect } from "next/navigation";
import { DashboardNav } from "@/components/dashboard-nav";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");

  return (
    <div className="shell grid gap-7 py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 lg:py-12">
      <DashboardNav
        role={user.role}
        name={user.name}
        storeName={user.storeName}
      />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
