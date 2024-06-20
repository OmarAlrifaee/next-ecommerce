import mongoose from "mongoose";
export const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("mongoDB connected successfully");
    });
    connection.on("error", (err) => {
      console.log(
        `mongoDB connection error. Please make sure mongoDB is running ${err}`
      );
      process.exit();
    });
  } catch (error) {
    console.log("something went wronge");
    console.log(error);
  }
};