export const SITE = {
  name: "Olea",
  tagline: "A marketplace for considered goods",
  description:
    "An independent marketplace for handmade ceramics, textiles, pantry staples and small-batch goods from verified makers.",
  email: "hello@olea.market",
  location: "Lisbon · Marrakech · Online",
};

export const CATEGORIES = [
  "Ceramics",
  "Textiles",
  "Pantry",
  "Jewelry",
  "Home",
  "Beauty",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
] as const;

export const SESSION_COOKIE = "olea_session";
export const CART_COOKIE = "olea_cart";
export const FREE_SHIPPING_THRESHOLD = 75;
