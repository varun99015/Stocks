import express from "express";
import mongoose from "mongoose";

const router = express.Router();

const stockSchema = new mongoose.Schema({
  symbol: String,
  date: { type: Date, index: true },
  price: Number,
});
stockSchema.index({ symbol: 1, date: 1 }, { unique: true });

const getStartDateFromInterval = (interval) => {
  const start = new Date(); // Use the current date as the reference point
  switch (interval) {
    case "5y": start.setFullYear(start.getFullYear() - 5); break;
    case "1y": start.setFullYear(start.getFullYear() - 1); break;
    case "6m": start.setMonth(start.getMonth() - 6); break;
    case "3m": start.setMonth(start.getMonth() - 3); break;
    case "1m": start.setMonth(start.getMonth() - 1); break;
    case "1w": start.setDate(start.getDate() - 7); break;
    case "1d": start.setDate(start.getDate() - 1); break;
    default: start.setFullYear(start.getFullYear() - 5);
  }
  return start;
};

// This function remains the same.
const getGroupingFormat = (interval) => {
  switch (interval) {
    case '1d':
    case '1w':
      return "%Y-%m-%dT%H:00:00"; 
    default:
      return "%Y-%m-%d";
  }
};

router.get("/:symbol", async (req, res) => {
  const { symbol } = req.params;
  const { interval = "5y" } = req.query;

  try {
    const collectionName = `fx_${symbol.toLowerCase()}_prices`;
    const StockModel = mongoose.models[collectionName] || mongoose.model(collectionName, stockSchema);

    const startDate = getStartDateFromInterval(interval);
    const groupingFormat = getGroupingFormat(interval);

    const stockData = await StockModel.aggregate([
      {
        // CHANGE 2: The query now fetches all data from the start date up to the present.
        $match: {
          date: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: groupingFormat, date: "$date" } },
          price: { $avg: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          date: { $toDate: "$_id" },
          price: { $round: ["$price", 2] },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    if (stockData.length === 0) {
      return res.status(404).json({ message: `No data found for symbol ${symbol}` });
    }

    res.json(stockData);
  } catch (err) {
    console.error(`Error fetching data for ${symbol}:`, err);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

export default router;
