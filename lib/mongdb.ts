
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL!;
const options = {};

if (!uri) {
  throw new Error("Please add MONGO_URL to .env.local");
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
