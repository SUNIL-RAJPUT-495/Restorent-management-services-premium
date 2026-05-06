import express from "express";
import {
  createBlog,
  getAllBlogsForAdmin,
  getPublishedBlogs,
} from "../../controllers/Super_Admin/blogController.js";
import { Super_Admin_authMiddleware } from "../../middlewares/Super_Admin_authMiddleware.js";

const blogRouter = express.Router();

blogRouter.post("/create", Super_Admin_authMiddleware, createBlog);
blogRouter.get("/admin/all", Super_Admin_authMiddleware, getAllBlogsForAdmin);
blogRouter.get("/public/all", getPublishedBlogs);

export default blogRouter;
