import mongoose from "mongoose";

export default function ConnectDB() {
  try {
    mongoose
      .connect(process.env.MONGODB_URI as string)
      .then((res) => console.log("DB has been connected"));
  } catch (error) {
    console.error(error);
  }
}

