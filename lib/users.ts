import "server-only";

import { connectDB, isDbConfigured } from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import type { AdminUserDTO, Role } from "@/lib/types";

type LeanUser = {
  _id: unknown;
  name: string;
  email: string;
  role: Role;
  storeName?: string;
  createdAt?: Date;
};

export async function listUsers(): Promise<AdminUserDTO[]> {
  if (!isDbConfigured()) return [];

  try {
    await connectDB();
    const docs = (await UserModel.find({})
      .sort({ createdAt: -1 })
      .lean()) as unknown as LeanUser[];

    return docs.map((doc) => ({
      id: String(doc._id),
      name: doc.name,
      email: doc.email,
      role: doc.role,
      storeName: doc.storeName,
      createdAt: doc.createdAt
        ? new Date(doc.createdAt).toISOString()
        : new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function countUsers() {
  if (!isDbConfigured()) return 0;

  try {
    await connectDB();
    return await UserModel.countDocuments({});
  } catch {
    return 0;
  }
}
