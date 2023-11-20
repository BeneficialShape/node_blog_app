import express, { Router } from "express";

import {
  createBlogHandler,
  userBlogsHandler,
  getAllBlogsHandler,
  editBlogHandler,
  deleteBlogHandler,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/all", getAllBlogsHandler);

router.post("/create", createBlogHandler);

router.get("/myblogs", userBlogsHandler);

router.route("/myblogs/:blogId").put(editBlogHandler).delete(deleteBlogHandler);

export default router;
