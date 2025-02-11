import mongoose from "mongoose";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI || "mongodb+srv://muazpbt:lMLxGHpdRq773vME@ecommerce-cluster.d7abr.mongodb.net";

const connectDatabase = () => {
    try {
        mongoose.connect(MONGODB_URI).then(() => {
            console.log("MongoDB Connected!");
        })
    } catch (error) {
        console.error("Failed to connect to DB", error);   
    }
}

export default connectDatabase;