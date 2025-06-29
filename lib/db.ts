import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL!;

if (!MONGO_URL) {
  throw new Error("Missing MONGO_URL in environment variables.");
}

let cached = global.mongoose as {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function ConnectionwithDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  const opts = {
    bufferCommands: true,
    maxPoolSize: 10,
  };

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL, opts).then(() => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
