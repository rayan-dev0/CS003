import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectDatabase = () => {
    try {
        mongoose.connect(MONGODB_URI as string).then(() => {
            console.log("MongoDB Connected!");
        })
    } catch (error) {
        console.error("Failed to connect to DB", error);   
    }
}

export default connectDatabase;