import { getCurrentUser } from "@/lib/auth";
import { getCartCount } from "@/lib/cart";
import { NavbarShell } from "@/components/navbar-shell";

export async function Navbar() {
  const [user, cartCount] = await Promise.all([getCurrentUser(), getCartCount()]);

  return (
    <NavbarShell
      user={user ? { name: user.name, role: user.role } : null}
      cartCount={cartCount}
    />
  );
}
