"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/lib/models/Product";
import { UserModel } from "@/lib/models/User";
import { ROLES, type Role } from "@/lib/types";

export async function updateUserRole(formData: FormData) {
  const admin = await requireRole("admin");
  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");

  if (!userId || !ROLES.includes(role as Role)) return;
  if (userId === admin.id) return;

  await connectDB();
  await UserModel.updateOne({ _id: userId }, { $set: { role } });
  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
}

export async function deleteUser(formData: FormData) {
  const admin = await requireRole("admin");
  const userId = String(formData.get("userId") ?? "");

  if (!userId || userId === admin.id) return;

  await connectDB();
  await ProductModel.deleteMany({ sellerId: userId });
  await UserModel.deleteOne({ _id: userId });

  revalidatePath("/dashboard/users");
  revalidatePath("/products");
  revalidatePath("/dashboard");
}
