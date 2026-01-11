import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

// Protected
router.post("/", authenticate, createBlog);
router.put("/:id", authenticate, updateBlog);
router.delete("/:id", authenticate, deleteBlog);

export default router;
