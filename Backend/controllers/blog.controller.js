import Blog from "../models/blog.model.js";
import {uploader} from "../utils/cloudinary.js";

// ==============================
// CREATE BLOG
// ==============================
export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const userId = req.user?.id;

    if (!req.user || !userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    let uploadedImage = null;

    // Upload image if provided
    if (image) {
      const uploadRes = await uploader.upload(image, {
        folder: "blog_images",
      });

      uploadedImage = uploadRes?.secure_url || image;
    }

    const blog = new Blog({
      title,
      content,
      image: uploadedImage,
      author: userId,
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    console.error("Create blog error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==============================
// GET ALL BLOGS (with pagination)
// ==============================
export const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments();

    res.status(200).json({
      blogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
      hasMore: skip + blogs.length < totalBlogs,
    });
  } catch (error) {
    console.error("Get all blogs error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==============================
// GET SINGLE BLOG BY ID
// ==============================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "firstName lastName email"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Get blog by ID error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==============================
// UPDATE BLOG
// ==============================
export const updateBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Authorization
    if (!req.user || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this blog" });
    }

    if (title) blog.title = title;
    if (content) blog.content = content;

    if (image) {
      const uploadRes = await uploader.upload(image, {
        folder: "blog_images",
      });

      blog.image = uploadRes?.secure_url || image;
    }

    await blog.save();

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error("Update blog error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ==============================
// DELETE BLOG
// ==============================
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Authorization
    if (!req.user || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this blog" });
    }

    await blog.deleteOne();

    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
