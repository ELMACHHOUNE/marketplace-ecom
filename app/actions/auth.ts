"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { createSession, destroySession } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { UserModel } from "@/lib/models/User";

export type AuthState =
  | {
      error?: string;
      fieldErrors?: Record<string, string>;
    }
  | undefined;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function safeNext(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  return "/dashboard";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function register(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = text(formData, "name");
  const email = text(formData, "email").toLowerCase();
  const password = text(formData, "password");
  const requestedRole = text(formData, "role");
  const role = requestedRole === "seller" ? "seller" : "client";
  const storeName = text(formData, "storeName");
  const next = safeNext(text(formData, "next"));

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2) fieldErrors.name = "Please enter your full name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (password.length < 8)
    fieldErrors.password = "Use at least 8 characters.";
  else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password))
    fieldErrors.password = "Include at least one letter and one number.";
  if (role === "seller" && storeName.length < 2)
    fieldErrors.storeName = "Give your studio or shop a name.";

  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };

  if (!isDbConfigured()) {
    return {
      error:
        "MongoDB is not configured yet. Add MONGODB_URI to .env.local and restart the server.",
    };
  }

  try {
    await connectDB();
  } catch {
    return {
      error:
        "Could not reach MongoDB Atlas. Check your connection string and network access list.",
    };
  }

  const existing = await UserModel.findOne({ email }).lean();
  if (existing) {
    return {
      fieldErrors: { email: "An account with this email already exists." },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    role,
    storeName: role === "seller" ? storeName : undefined,
  });

  await createSession({
    id: String(user._id),
    role: user.role,
    name: user.name,
    email: user.email,
  });

  redirect(next);
}

export async function login(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = text(formData, "email").toLowerCase();
  const password = text(formData, "password");
  const next = safeNext(text(formData, "next"));

  if (!email || !password) {
    return { error: "Enter your email and password to continue." };
  }

  if (!isDbConfigured()) {
    return {
      error:
        "MongoDB is not configured yet. Add MONGODB_URI to .env.local and restart the server.",
    };
  }

  try {
    await connectDB();
  } catch {
    return {
      error:
        "Could not reach MongoDB Atlas. Check your connection string and network access list.",
    };
  }

  const user = await UserModel.findOne({ email })
    .select("+password")
    .lean<{
      _id: unknown;
      name: string;
      email: string;
      password: string;
      role: "admin" | "seller" | "client";
    }>();

  if (!user) return { error: "Incorrect email or password." };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { error: "Incorrect email or password." };

  await createSession({
    id: String(user._id),
    role: user.role,
    name: user.name,
    email: user.email,
  });

  redirect(next);
}

export async function logout() {
  await destroySession();
  redirect("/");
}
