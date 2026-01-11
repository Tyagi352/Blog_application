import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// =============================
// REGISTER CONTROLLER
// =============================
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("Request Body:", req.body);

    // 1️⃣ Validation checks
    if (!firstName || !lastName || !email || !password) {
      console.log("Validation Error: All fields are required");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailCheck) {
      console.log("Validation Error: Invalid email format");
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Validation Error: User already exists");
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (password.length < 6) {
      console.log("Validation Error: Password must be at least 6 characters");
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    // 2️⃣ Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 3️⃣ Create and save new user (await required)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    console.log("User Created:", newUser._id);

    // 4️⃣ Send response (ensure return to stop function)
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("Error in user controller", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// =============================
// LOGIN CONTROLLER
// =============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        token,
      });
  } catch (error) {
    console.log("Error in login controller", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

// =============================
// LOGOUT CONTROLLER
// =============================
export const logout = async (_, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
