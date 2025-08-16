import React, { useState } from "react";
import StockData from "./StockData";
import StockChart from "../components/StockChart";
import Navbar from "../components/Navbar";

const Stocks = () => {
  const [symbol, setSymbol] = useState("SPCE"); // Default: Virgin Galactic

  return (
    <>
    <Navbar/>
    <div className="p-5">
      <h1 className="text-2xl font-bold">Galactic Stock Market 🚀</h1>
      
      {/* Stock Selector */}
      <select onChange={(e) => setSymbol(e.target.value)} className="p-2 border rounded-lg">
        <option value="SPCE">Virgin Galactic (SPCE)</option>
        <option value="RKLB">Rocket Lab (RKLB)</option>
        <option value="BA">Boeing (BA)</option>
      </select>

      {/* Stock Data & Chart */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <StockData symbol={symbol} />
        <StockChart symbol={symbol} />
      </div>
    </div></>
  );
};

export default Stocks;
