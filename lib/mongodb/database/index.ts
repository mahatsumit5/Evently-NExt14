import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI;
let cached = (global as any).mongoose || { conn: null, promise: null };
export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGO_URI) throw new Error("mongouri is missing");
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      dbName: "Evently",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
