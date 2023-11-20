import mongoose from "mongoose";

const connectMongoDB = async (URL) => {
  return await mongoose.connect(URL);
};

export default connectMongoDB;
