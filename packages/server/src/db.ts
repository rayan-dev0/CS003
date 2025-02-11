import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const DB_URI = process.env.MONGODB_URI || "mongodb+srv://cognivos:qYyZdCpB3SUAmGZw@cs003-db.sfge6.mongodb.net";

export const connectDatabase = async () => {
    try {
        if(mongoose.connection.readyState === 1) {
            console.log("🔁 Connection Established");
            return;
        }
        await mongoose.connect(`${DB_URI}`);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Failed to connect to database: " + error);
        process.exit(1);
    }
}