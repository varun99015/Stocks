import cron from "node-cron";
import Stock from "../models/Stock.js";
import { generateStockData } from "../utils/generateData.js";

const symbols = [
    "SPCE", "RKLB", "ASTR", "GALT", "THRX", 
    "SPACEX", "BLUEO", "ASTRA", "MAXR", "BOEINGS",
    "LUNARMIN", "MARSFORM", "ASTROFUEL", "STARLINK2", "GALCRED",
    "COSMOCOIN", "ORBITECH", "DEEPSPACE", "NOVAENG", "GRAVITYX",
    "SOLARSYNC", "CELESTIA", "TITANX", "ANDROMEDA", "NEBULACORP",
    "QUASAR", "EXOPLANE", "ZENITHSYS", "AETHERIND", "COSMOTRADE"
  ];  

// Run every hour
cron.schedule("0 * * * *", async () => {
  await generateStockData(symbols);
  console.log("✅ New stock data generated");

  // Delete old data beyond 5 years
  const cutoff = new Date(Date.now() - 5 * 365 * 24 * 60 * 60 * 1000);
  await Stock.deleteMany({ date: { $lt: cutoff } });
  console.log("🧹 Old stock data deleted (maintaining 5-year window)");
});
