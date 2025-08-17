import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@bugbusters.hvomh8t.mongodb.net/?retryWrites=true&w=majority&appName=BugBusters`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
    return client.db("Hack_Puebla_Syntax");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

export { connectToDatabase, client }