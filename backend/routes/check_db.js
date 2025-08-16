import mongoose from 'mongoose';
import Stock from '../models/Stock.js';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI="mongodb+srv://varu99015:varun9901@cluster0.na2mkr0.mongodb.net/StockAppData";


async function checkDatabase() {
  if (!mongoURI) {
    console.error("MONGO_URI is not defined in your .env file.");
    return;
  }

  try {
    // Connect to MongoDB using the URI
    await mongoose.connect(mongoURI);
    console.log("✅ Successfully connected to MongoDB.");

    // Access the database object from the connection
    const db = mongoose.connection.db;

    // Get a list of all collection names in the database
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (collectionNames.length === 0) {
      console.log("No collections found in the database.");
      return;
    }

    console.log("\n📁 Found the following collections:");
    console.log(collectionNames);

    // Loop through each collection to print sample data
    for (const name of collectionNames) {
      // Skip system collections
      if (name.startsWith("system.")) {
        continue;
      }
      
      console.log(`\n--- Sample data from collection: "${name}" ---`);

      // Find a few sample documents
      const sampleDocs = await db.collection(name).find({}).limit(5).toArray();

      if (sampleDocs.length > 0) {
        console.log(sampleDocs);
      } else {
        console.log("This collection is empty.");
      }
    }

  } catch (error) {
    console.error("\n❌ Error connecting to or reading from the database:", error);
  } finally {
    // Disconnect after the operation is complete
    await mongoose.disconnect();
    console.log("\nDatabase connection closed.");
  }
}

// Run the function
checkDatabase();