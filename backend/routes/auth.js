import express, { Router } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from "../models/Register.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/api/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // ✅ Correctly Hash Password Before Storing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Save User in Database
      const user = await UserModel.create({ name, email, password: hashedPassword });
  
      res.json({ message: "Signup Successful", user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password are required" });
    }
  
    try {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "No Registered User" });
      }
  
      // ✅ Correctly Compare Hashed Password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Incorrect Password" });
      }
  
      // ✅ Generate JWT Token on Success
      const token = jwt.sign({ id: user._id, name: user.name },process.env.JWT_SECRET,{ expiresIn: '1d' });
  
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // ✅ HTTPS-only in prod
        sameSite: 'Strict', // ✅ Prevents CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res.json({ status: "Success", message: "Logged in successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  export default router;