import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import yahooFinance from "yahoo-finance2";
import UserModel from "./models/Register.js"; 
import stockRoutes from "./routes/fictionalStocks.js";
import cookieParser from "cookie-parser";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "https://stocks-frontend-qy3l.onrender.com", // Your frontend URL
  credentials: true
}));
app.use(cookieParser())

const PORT = 5000;

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Correctly reads from cookies

  if (!token) return res.status(401).json({
    message: "Unauthorized"
  });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ Uses env secret
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid Token"
    });
  }
};

// ✅ User Signup - Hash Password Before Saving
app.post("/api/signup", async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    // Check if user already exists
    const existingUser = await UserModel.findOne({
      email
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    // ✅ Correctly Hash Password Before Storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User in Database
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
// ✅ User Login - Validate & Return Token
app.post("/login", async (req, res) => {
  const {
    email,
    password
  } = req.body;

  console.log('Login attempt for email:', email);
  console.log('Password received:', password);

  if (!email || !password) {
    console.log('Validation failed: email or password missing');
    return res.status(400).json({
      error: "Email and Password are required"
    });
  }

  try {
    const user = await UserModel.findOne({
      email
    });

    if (!user) {
      console.log('Login failed: user not found');
      return res.status(400).json({
        error: "No Registered User"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log('Login failed: incorrect password');
      return res.status(400).json({
        error: "Incorrect Password"
      });
    }

    // ✅ Generate JWT Token on Success
    const token = jwt.sign({
      id: user._id,
      name: user.name
    }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
    if (process.env.NODE_ENV === 'production') {
      cookieOptions.sameSite = 'None';
      cookieOptions.secure = true;
    } else {
      cookieOptions.sameSite = 'Lax';
      cookieOptions.secure = false; 
    }

    res.cookie('token', token, cookieOptions);
    
    res.json({
      status: "Success",
      message: "Logged in successful"
    });
  } catch (error) {
    console.error('Server error during login:', error.message);
    res.status(500).json({
      error: error.message
    });
  }
});
// ✅ Protected Route - Fetch User Profile
app.get("/api/profile", authenticateToken, async (req, res) => {
  res.json({
    name: req.user.name,
    id: req.user.id
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax', // match your login config
    secure: false // match your login config (true if using HTTPS)
  });
  res.json({
    message: 'Logout successful'
  });
});

app.use("/api/portfolio",authenticateToken, portfolioRoutes);

app.use("/Fictional-stock", stockRoutes);
app.use("/transactions",authenticateToken, transactionRoutes);

app.get("/stock/:symbol", async (req, res) => {
  const {
    symbol
  } = req.params;
  const {
    interval
  } = req.query; // Accepts "3m", "2y", etc.

  try {
    if (interval) {
      // Define range and frequency based on interval
      let range = "3mo";
      let freq = "1d";

      if (interval === "2y") {
        range = "2y";
        freq = "1wk"; // Weekly data for 2 years
      }

      const history = await yahooFinance.historical(symbol, {
        period1: new Date(Date.now() - (interval === "2y" ? 2 : 0.25) * 365 * 24 * 60 * 60 * 1000), // estimate
        interval: freq,
      });

      // Format and return relevant data
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
    // Copy the logic from getSpaceXData above
    const launches = await getSpaceXData(); // Move that function to a helper file and import here
    res.json(launches);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch SpaceX data"
    });
  }
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
