import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import path from 'path';
import { fileURLToPath } from 'url';

// --- ROUTE IMPORTS ---
import UserModel from "./models/Register.js"; 
import fictionalStockRoutes from "./routes/fictionalStocks.js";
import overviewRoutes from "./routes/overviewRoutes.js"; // You'll need this router
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- 1. SERVE THE REACT FRONTEND ---
// This serves the static files (HTML, CSS, JS) from your 'dist' folder
app.use(express.static(path.join(__dirname, 'dist')));

// --- 2. SETUP YOUR API ROUTES ---
const authenticateToken = (req, res, next) => {
const token = req.cookies.token;

  if (!token) return res.status(401).json({
    message: "Unauthorized"
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid Token"
    });
  }
};

app.post("/api/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const existingUser = await UserModel.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword
    });

    res.json({
      message: "Signup Successful",
      user
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

app.post("/api/login", async (req, res) => { // NOTE: The path is now /api/login
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "No Registered User" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect Password" });
    
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // --- COOKIE LOGIC IS NOW SIMPLER ---
    // No need to check for production, as it's always same-site
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'Lax', // Lax is the secure default for same-site
      secure: true // Use true if your Render service is on HTTPS (it is)
    });
    
    res.json({ status: "Success", message: "Logged in successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/profile", authenticateToken, async (req, res) => {
  res.json({
    name: req.user.name,
    id: req.user.id
  });
});

app.post('/api/logout', (req, res) => {
    // --- FIX: Define cookieOptions within the /logout route's scope ---
    const cookieOptions = {
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
        cookieOptions.sameSite = 'None';
        cookieOptions.secure = true;
    } else {
        cookieOptions.sameSite = 'Lax';
        cookieOptions.secure = false;
    }
    
    res.clearCookie('token', cookieOptions);
    // -----------------------------------------------------------------

    res.json({
        message: 'Logout successful'
    });
});

// app.use("/api/real-stocks", realStockRoutes); // For the Yahoo Finance data
app.use("/api/portfolio", authenticateToken, portfolioRoutes);
app.use('/api/stocks',stockRoutes);
app.use("/api/transactions", authenticateToken, transactionRoutes);

app.get("/stock/:symbol", async (req, res) => {
  const {
    symbol
  } = req.params;
  const {
    interval
  } = req.query;

  try {
    if (interval) {
      let range = "3mo";
      let freq = "1d";

      if (interval === "2y") {
        range = "2y";
        freq = "1wk";
      }

      const history = await yahooFinance.historical(symbol, {
        period1: new Date(Date.now() - (interval === "2y" ? 2 : 0.25) * 365 * 24 * 60 * 60 * 1000),
        interval: freq,
      });

      const cleaned = history.map((d) => ({
        date: d.date,
        close: d.close,
      }));

      res.json(cleaned);
    } else {
      const quote = await yahooFinance.quote(symbol);
      res.json(quote);
    }
  } catch (error) {
    console.error("Stock fetch error:", error);
    res.status(500).json({
      error: "Failed to fetch stock data"
    });
  }
});

app.get("/api/spacex/launches", async (req, res) => {
  try {
    // This function needs to be defined or imported for this route to work
    // const launches = await getSpaceXData(); 
    res.json({ message: "SpaceX data endpoint is active" }); // Placeholder response
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch SpaceX data"
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
