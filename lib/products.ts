import "server-only";

import { connectDB, isDbConfigured } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { DEMO_PRODUCTS } from "@/lib/demo-products";
import type { ProductDTO } from "@/lib/types";

type LeanProduct = {
  _id: unknown;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
  sellerId: unknown;
  sellerName: string;
  storeName?: string;
  createdAt?: Date;
};

type ProductQuery = {
  q?: string;
  category?: string;
  featured?: boolean;
  limit?: number;
  sellerId?: string;
};

function mapProduct(doc: LeanProduct): ProductDTO {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    price: doc.price,
    category: doc.category,
    image: doc.image,
    stock: doc.stock,
    featured: doc.featured,
    sellerId: String(doc.sellerId),
    sellerName: doc.sellerName,
    storeName: doc.storeName,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : undefined,
  };
}

function demoProducts({ q, category, featured, limit = 24 }: ProductQuery) {
  const query = q?.trim().toLowerCase();

  return DEMO_PRODUCTS.filter((product) => {
    if (featured && !product.featured) return false;
    if (category && product.category !== category) return false;
    if (query) {
      const haystack =
        `${product.name} ${product.description} ${product.storeName ?? ""} ${product.category}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  }).slice(0, limit);
}

export async function listProducts(options: ProductQuery = {}) {
  const { limit = 24 } = options;

  if (!isDbConfigured()) return demoProducts(options);

  try {
    await connectDB();

    const filter: Record<string, unknown> = {};
    if (options.featured) filter.featured = true;
    if (options.category) filter.category = options.category;
    if (options.sellerId) filter.sellerId = options.sellerId;

    if (options.q?.trim()) {
      const safe = options.q.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { storeName: { $regex: safe, $options: "i" } },
      ];
    }

    const docs = await ProductModel.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .limit(limit)
      .lean();

    return (docs as unknown as LeanProduct[]).map(mapProduct);
  } catch (error) {
    console.warn("Falling back to demo products:", error);
    return demoProducts(options);
  }
}

export async function getFeaturedProducts(limit = 4) {
  return listProducts({ featured: true, limit });
}

export async function getProductBySlug(slug: string): Promise<ProductDTO | null> {
  if (!isDbConfigured()) {
    return DEMO_PRODUCTS.find((product) => product.slug === slug) ?? null;
  }

  try {
    await connectDB();
    const doc = (await ProductModel.findOne({ slug }).lean()) as LeanProduct | null;
    if (!doc) return DEMO_PRODUCTS.find((product) => product.slug === slug) ?? null;
    return mapProduct(doc);
  } catch (error) {
    console.warn("Falling back to demo product:", error);
    return DEMO_PRODUCTS.find((product) => product.slug === slug) ?? null;
  }
}

export async function getProductById(id: string): Promise<ProductDTO | null> {
  if (id.startsWith("demo-")) {
    return DEMO_PRODUCTS.find((product) => product.id === id) ?? null;
  }

  if (!isDbConfigured()) return null;

  try {
    await connectDB();
    const doc = (await ProductModel.findById(id).lean()) as LeanProduct | null;
    return doc ? mapProduct(doc) : null;
  } catch {
    return null;
  }
}

export async function getProductsByIds(ids: string[]) {
  if (ids.length === 0) return [];

  if (!isDbConfigured()) {
    return ids
      .map((id) => DEMO_PRODUCTS.find((product) => product.id === id))
      .filter((product): product is ProductDTO => Boolean(product));
  }

  try {
    await connectDB();
    const docs = (await ProductModel.find({
      _id: { $in: ids },
    }).lean()) as unknown as LeanProduct[];
    const map = new Map(docs.map((doc) => [String(doc._id), mapProduct(doc)]));
    return ids
      .map((id) => map.get(id))
      .filter((product): product is ProductDTO => Boolean(product));
  } catch {
    return [];
  }
}

export async function getSellerProducts(sellerId: string) {
  if (!isDbConfigured()) return [];

  try {
    await connectDB();
    const docs = (await ProductModel.find({ sellerId })
      .sort({ createdAt: -1 })
      .lean()) as unknown as LeanProduct[];
    return docs.map(mapProduct);
  } catch {
    return [];
  }
}

export async function getProductRecord(id: string) {
  if (!isDbConfigured()) return null;

  try {
    await connectDB();
    return await ProductModel.findById(id).lean();
  } catch {
    return null;
  }
}

export async function listCategoriesWithCounts() {
  if (!isDbConfigured()) {
    const counts = new Map<string, number>();
    for (const product of DEMO_PRODUCTS) {
      counts.set(product.category, (counts.get(product.category) ?? 0) + 1);
    }
    return [...counts.entries()].map(([category, count]) => ({ category, count }));
  }

  try {
    await connectDB();
    const rows = await ProductModel.aggregate<{ _id: string; count: number }>([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return rows.map((row) => ({ category: row._id, count: row.count }));
  } catch {
    return [];
  }
}
