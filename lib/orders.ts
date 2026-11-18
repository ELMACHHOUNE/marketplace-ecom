import "server-only";

import { Types } from "mongoose";
import { connectDB, isDbConfigured } from "@/lib/db";
import { OrderModel } from "@/lib/models/Order";
import { ProductModel } from "@/lib/models/Product";
import { UserModel } from "@/lib/models/User";
import type {
  CurrentUser,
  DashboardStats,
  OrderDTO,
  OrderItemDTO,
} from "@/lib/types";

type LeanOrder = {
  _id: unknown;
  buyerId: unknown;
  buyerName: string;
  buyerEmail: string;
  items: {
    productId: unknown;
    name: string;
    image: string;
    price: number;
    qty: number;
    sellerId: unknown;
  }[];
  total: number;
  status: string;
  createdAt?: Date;
};

function mapOrder(doc: LeanOrder): OrderDTO {
  return {
    id: String(doc._id),
    buyerId: String(doc.buyerId),
    buyerName: doc.buyerName,
    buyerEmail: doc.buyerEmail,
    total: doc.total,
    status: doc.status,
    items: doc.items.map(
      (item): OrderItemDTO => ({
        productId: String(item.productId),
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.qty,
        sellerId: String(item.sellerId),
      }),
    ),
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : new Date().toISOString(),
  };
}

export async function getOrdersFor(user: CurrentUser, limit = 40) {
  if (!isDbConfigured()) return [];

  try {
    await connectDB();

    const filter: Record<string, unknown> = {};
    if (user.role === "seller") filter["items.sellerId"] = user.id;
    if (user.role === "client") filter.buyerId = user.id;

    const docs = (await OrderModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean()) as unknown as LeanOrder[];

    return docs.map(mapOrder);
  } catch {
    return [];
  }
}

export async function getOrderById(id: string) {
  if (!isDbConfigured()) return null;

  try {
    await connectDB();
    const doc = (await OrderModel.findById(id).lean()) as LeanOrder | null;
    return doc ? mapOrder(doc) : null;
  } catch {
    return null;
  }
}

export async function getDashboardData(user: CurrentUser): Promise<{
  stats: DashboardStats;
  orders: OrderDTO[];
}> {
  const orders = await getOrdersFor(user, 8);

  if (!isDbConfigured()) {
    return {
      stats: { users: 0, products: 0, orders: 0, revenue: 0 },
      orders: [],
    };
  }

  try {
    await connectDB();

    const products =
      user.role === "client"
        ? 0
        : await ProductModel.countDocuments(
            user.role === "seller" ? { sellerId: user.id } : {},
          );

    let revenue = 0;
    let relevantOrders = 0;

    if (user.role === "seller") {
      const allOrders = (await OrderModel.find({
        "items.sellerId": user.id,
      }).lean()) as unknown as LeanOrder[];
      relevantOrders = allOrders.length;
      revenue = allOrders.reduce((sum, order) => {
        return (
          sum +
          order.items
            .filter((item) => String(item.sellerId) === user.id)
            .reduce((lineSum, item) => lineSum + item.price * item.qty, 0)
        );
      }, 0);
    } else if (user.role === "admin") {
      const allOrders = (await OrderModel.find({}).lean()) as unknown as LeanOrder[];
      relevantOrders = allOrders.length;
      revenue = allOrders.reduce((sum, order) => sum + order.total, 0);
    } else {
      const ownOrders = (await OrderModel.find({
        buyerId: user.id,
      }).lean()) as unknown as LeanOrder[];
      relevantOrders = ownOrders.length;
      revenue = ownOrders.reduce((sum, order) => sum + order.total, 0);
    }

    const userCount =
      user.role === "admin" ? await UserModel.countDocuments({}) : 0;

    return {
      stats: {
        users: userCount,
        products: user.role === "client" ? 0 : products,
        orders: relevantOrders,
        revenue,
      },
      orders,
    };
  } catch {
    return {
      stats: { users: 0, products: 0, orders: 0, revenue: 0 },
      orders: [],
    };
  }
}

export async function getSellerRevenue(sellerId: string) {
  if (!isDbConfigured()) return 0;

  try {
    await connectDB();
    const rows = await OrderModel.aggregate<{ total: number }>([
      { $unwind: "$items" },
      { $match: { "items.sellerId": new Types.ObjectId(sellerId) } },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ["$items.price", "$items.qty"] } },
        },
      },
    ]);
    return rows[0]?.total ?? 0;
  } catch {
    return 0;
  }
}
