import mongoose from "mongoose";

// Blog Schema
const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // name of the collections of the users
    required: true,
  },
});

// database model
export const Blog = mongoose.model("blogs", BlogSchema);
