import { Blog } from "../models/blog.js";
import { User } from "../models/user.js";

export const getAllBlogsHandler = async (req, res) => {
  try {
    const allblogs = await Blog.find({});
    if (!allblogs) return res.send("NO BLOGS AVAILABLE");
    else return res.status(200).json({ success: "true", allblogs });
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const createBlogHandler = async (req, res) => {
  try {
    const result = await Blog.create({
      title: req.body.title,
      image: req.body.image,
      content: req.body.content,
      user: req.user,
    });
    return res.status(201).send("SUCCESSFULLY CREATED");
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const userBlogsHandler = async (req, res) => {
  try {
    const userid = req.user._id;
    const blogs = await Blog.find({ user: userid });

    return res.status(200).json({ success: "true", blogs });
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const editBlogHandler = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog)
      return res
        .status(404)
        .json({ success: "false", message: "No such blog found!" });

    const blogUser = blog.user.toString();

    if (req.user._id.toString() === blogUser) {
      const { title, image, content } = req.body;

      const updateObject = {};
      if (title) updateObject.title = title;
      if (image) updateObject.image = image;
      if (content) updateObject.content = content;

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateObject, {
        new: true,
      });
      return res.status(200).json({ success: "true", blog, updatedBlog });
    } else {
      return res.status(400).json({ success: "false", message: "Bad Request" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const deleteBlogHandler = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog)
      return res
        .status(404)
        .json({ success: "false", message: "No such blog found!" });

    const blogUser = blog.user.toString();

    if (req.user._id.toString() === blogUser) {
      await blog.deleteOne();
      return res
        .status(200)
        .json({ success: "true", message: "Blog Deleted Succesfully", blog });
    } else {
      return res.status(400).json({ success: "false", message: "Bad Request" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};

export const getBlogHandler = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById({ _id: blogId });
    if (!blog)
      return res
        .status(404)
        .json({ success: "false", message: "No such blog found!" });
    return res.status(200).json({ success: "true", blog });
  } catch (error) {
    return res
      .status(500)
      .json({ sucess: "false", message: "Server Error", error });
  }
};
