import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Databse Connected Successfully");
    console.log("Connection name: ", mongoose.connection.name);
  } catch (error) {
    console.log("MongoDB connection Error ", error);
  }
};

export default connectDB;
