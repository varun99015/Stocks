import express from 'express';
import UserModel from '../models/Register.js';
import StockModel from '../models/Stock.js'; // You need to have this model file
const router = express.Router();

// Middleware injected from main file
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

// 🔹 BUY
router.post('/buy', authenticateToken, async (req, res) => {
  const { stockId, quantity } = req.body;
  try {
    const user = await UserModel.findById(req.user.id);
    const stock = await StockModel.findById(stockId);
    const currentPrice = stock.price;
    const totalCost = quantity * currentPrice;

    let holding = user.portfolio.find(item => item.stockId.equals(stockId));
    if (holding) {
      const totalQty = holding.quantity + quantity;
      const totalValue = (holding.avgBuyPrice * holding.quantity) + totalCost;
      holding.avgBuyPrice = totalValue / totalQty;
      holding.quantity = totalQty;
    } else {
      user.portfolio.push({ stockId, quantity, avgBuyPrice: currentPrice });
    }

    user.transactions.push({ stockId, type: 'buy', quantity, price: currentPrice });
    await user.save();

    res.json({ message: 'Buy successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Buy failed' });
  }
});

// 🔹 SELL
router.post('/sell', authenticateToken, async (req, res) => {
  const { stockId, quantity } = req.body;
  try {
    const user = await UserModel.findById(req.user.id);
    const stock = await StockModel.findById(stockId);
    const currentPrice = stock.price;

    const holding = user.portfolio.find(item => item.stockId.equals(stockId));
    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock to sell' });
    }

    holding.quantity -= quantity;
    if (holding.quantity === 0) {
      user.portfolio = user.portfolio.filter(item => !item.stockId.equals(stockId));
    }

    user.transactions.push({ stockId, type: 'sell', quantity, price: currentPrice });
    await user.save();

    res.json({ message: 'Sell successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Sell failed' });
  }
});

// 🔹 GET PORTFOLIO
router.get('/portfolio', authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate('portfolio.stockId');

    const portfolioData = user.portfolio.map(item => {
      const currentPrice = item.stockId.price;
      const invested = item.avgBuyPrice * item.quantity;
      const currentValue = currentPrice * item.quantity;
      const profitLoss = currentValue - invested;

      return {
        symbol: item.stockId.symbol,
        quantity: item.quantity,
        avgBuyPrice: item.avgBuyPrice,
        currentPrice,
        currentValue,
        profitLoss
      };
    });

    res.json({ portfolio: portfolioData });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch portfolio' });
  }
});

export default router;
