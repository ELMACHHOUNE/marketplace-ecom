import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  _oleaMongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalForMongoose._oleaMongoose ?? { conn: null, promise: null };

if (!globalForMongoose._oleaMongoose) {
  globalForMongoose._oleaMongoose = cached;
}

export function isDbConfigured() {
  return Boolean(
    MONGODB_URI &&
      !MONGODB_URI.includes("USERNAME") &&
      !MONGODB_URI.includes("CLUSTER") &&
      !MONGODB_URI.includes("PASSWORD"),
  );
}

export async function connectDB() {
  if (!isDbConfigured()) {
    throw new Error(
      "MONGODB_URI is not configured. Add your MongoDB Atlas connection string to .env.local.",
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 6000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}
