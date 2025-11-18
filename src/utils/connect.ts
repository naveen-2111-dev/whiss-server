import { MongoClient, ServerApiVersion } from "mongodb";
import { configDotenv } from "dotenv";

configDotenv();

const URI = process.env.MONGODB;

const client = new MongoClient(URI!, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const ConnectDb = async () => {
    try {
        await client.connect();
        return client;
    } catch {
        throw new Error("Could not connect to database");
    }
}

export const getCollection = async (collectionName: string) => {
    const db = (await ConnectDb()).db("Whiss");
    return db.collection(collectionName);
}