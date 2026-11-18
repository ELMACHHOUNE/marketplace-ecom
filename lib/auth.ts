import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import { connectDB, isDbConfigured } from "@/lib/db";
import { UserModel } from "@/lib/models/User";
import { SESSION_COOKIE } from "@/lib/constants";
import { ROLES, type CurrentUser, type Role } from "@/lib/types";

type SessionPayload = {
  userId: string;
  role: Role;
  name: string;
  email: string;
};

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET ??
    "olea-development-secret-please-set-SESSION_SECRET",
);

const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.includes(value as Role);
}

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

async function decrypt(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    if (
      typeof payload.userId !== "string" ||
      typeof payload.name !== "string" ||
      typeof payload.email !== "string" ||
      !isRole(payload.role)
    ) {
      return null;
    }
    return {
      userId: payload.userId,
      role: payload.role,
      name: payload.name,
      email: payload.email,
    };
  } catch {
    return null;
  }
}

export async function createSession(user: {
  id: string;
  role: Role;
  name: string;
  email: string;
}) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const token = await encrypt({
    userId: user.id,
    role: user.role,
    name: user.name,
    email: user.email,
  });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(token);
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

type LeanUser = {
  _id: unknown;
  name: string;
  email: string;
  role: Role;
  storeName?: string;
};

function mapUser(doc: LeanUser): CurrentUser {
  return {
    id: String(doc._id),
    name: doc.name,
    email: doc.email,
    role: doc.role,
    storeName: doc.storeName,
  };
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await getSession();
  if (!session) return null;

  const fallback: CurrentUser = {
    id: session.userId,
    name: session.name,
    email: session.email,
    role: session.role,
  };

  if (!isDbConfigured()) return fallback;

  try {
    await connectDB();
    const doc = (await UserModel.findById(session.userId)
      .lean()) as LeanUser | null;
    if (!doc) return null;
    return mapUser(doc);
  } catch {
    return fallback;
  }
});

export async function requireUser(): Promise<CurrentUser> {
  const session = await getSession();
  if (!session) redirect("/login");

  if (!isDbConfigured()) {
    throw new Error(
      "MongoDB is not configured. Add MONGODB_URI to .env.local and restart the server.",
    );
  }

  await connectDB();
  const doc = (await UserModel.findById(session.userId)
    .lean()) as LeanUser | null;

  if (!doc) {
    await destroySession();
    redirect("/login");
  }

  return mapUser(doc);
}

export async function requireRole(...roles: Role[]): Promise<CurrentUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) {
    redirect("/dashboard");
  }
  return user;
}
