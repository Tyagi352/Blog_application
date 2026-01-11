import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
  try {
    // Check Authorization header first
    const authHeader = req.headers.authorization;
    let token = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // fallback to cookie
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // attach user id to request
    req.user = { id: decoded.userId };

    // Optionally fetch user details and attach
    try {
      const user = await User.findById(decoded.userId).select("firstName lastName email");
      if (user) req.user.profile = user;
    } catch (e) {
      // ignore
    }

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
