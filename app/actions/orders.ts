"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { ORDER_STATUSES } from "@/lib/constants";
import { connectDB } from "@/lib/db";
import { OrderModel } from "@/lib/models/Order";

export async function updateOrderStatus(formData: FormData) {
  const user = await requireRole("seller", "admin");
  const orderId = String(formData.get("orderId") ?? "");
  const status = String(formData.get("status") ?? "");

  if (
    !orderId ||
    !ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])
  ) {
    return;
  }

  await connectDB();
  const order = await OrderModel.findById(orderId);
  if (!order) return;

  if (
    user.role === "seller" &&
    !order.items.some(
      (item: { sellerId?: unknown }) => String(item.sellerId) === user.id,
    )
  ) {
    return;
  }

  order.status = status as (typeof ORDER_STATUSES)[number];
  await order.save();

  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");
}
