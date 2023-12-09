import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const conncetionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
      //   `mongodb+srv://devanshkc69:devanshk@cluster0.pizd9tt.mongodb.net/${DB_NAME}`
    );
    // MONGODB_URI;
    console.log(
      `MongoDB connected DB Host  :${conncetionInstance.connection.host}`
    );
  } catch (error) {
    console.log("error from Database about connection :", error);
    process.exit(1);
    // throw error;
  }
};

export default connectDB;
