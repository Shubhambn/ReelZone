// lib/mongodb.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGO_URL) {
  throw new Error("Please add MONGO_URL to .env.local");
}

client = new MongoClient(uri, options);
clientPromise = client.connect();

export default clientPromise;
