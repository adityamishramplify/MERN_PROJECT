import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 

const mongoURI = process.env.MONGO_URI as string;
console.log("Mongo URI:", mongoURI); 

const connectToDatabase = async (): Promise<void> => {
  try {
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB server");

    const dbName = "TechnostacksProject";

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Failed to get database connection.");
    }

    const admin = db.admin();
    const databases = await admin.listDatabases();
    const dbExists = databases.databases.some(
      (db: { name: string }) => db.name === dbName
    );

    if (!dbExists) {
      await db.createCollection("TechnostacksProject");
      console.log(`Database '${dbName}' created`);
    } else {
      console.log(`Database '${dbName}' already exists`);
    }
  } catch (error) {
    console.error("Database connection error:", (error as Error).message);
  }
};

export default connectToDatabase;
