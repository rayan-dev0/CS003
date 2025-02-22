import { connect } from "mongoose";

const connectDatabase = async (): Promise<void> => {
    try {
        const DB_URI = process.env.MONGODB_URI;
        await connect(DB_URI as string);
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("Failed to connect to database", error);
    }
}

export default connectDatabase;