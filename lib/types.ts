export const ROLES = ["admin", "seller", "client"] as const;

export type Role = (typeof ROLES)[number];

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  storeName?: string;
};

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
  sellerId: string;
  sellerName: string;
  storeName?: string;
  createdAt?: string;
  isDemo?: boolean;
};

export type CartLine = {
  productId: string;
  qty: number;
};

export type CartItem = {
  product: ProductDTO;
  qty: number;
  lineTotal: number;
};

export type OrderItemDTO = {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
  sellerId: string;
};

export type OrderDTO = {
  id: string;
  buyerId: string;
  buyerName: string;
  buyerEmail: string;
  total: number;
  status: string;
  items: OrderItemDTO[];
  createdAt: string;
};

export type DashboardStats = {
  users: number;
  products: number;
  orders: number;
  revenue: number;
};

export type AdminUserDTO = {
  id: string;
  name: string;
  email: string;
  role: Role;
  storeName?: string;
  createdAt: string;
};
