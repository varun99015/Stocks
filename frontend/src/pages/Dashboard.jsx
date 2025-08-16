import React from "react";
import Navbar from "../components/Navbar";
const mockUserStocks = [
  {
    symbol: "SPACEX",
    quantity: 10,
    avgPrice: 150,
    currentPrice: 175,
  },
  {
    symbol: "MARSINC",
    quantity: 25,
    avgPrice: 90,
    currentPrice: 85,
  },
  {
    symbol: "COSMOMINING",
    quantity: 5,
    avgPrice: 210,
    currentPrice: 240,
  },
];

const Dashboard = () => {
  const totalInvestment = mockUserStocks.reduce(
    (sum, stock) => sum + stock.quantity * stock.avgPrice,
    0
  );
  const currentValue = mockUserStocks.reduce(
    (sum, stock) => sum + stock.quantity * stock.currentPrice,
    0
  );

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Portfolio</h1>

      <div className="mb-6 p-4 bg-gray-900 rounded-xl shadow-xl">
        <div className="text-xl mb-2">Total Investment: ${totalInvestment.toFixed(2)}</div>
        <div className="text-xl">Current Value: ${currentValue.toFixed(2)}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto bg-gray-900 rounded-xl shadow-lg">
          <thead>
            <tr className="bg-gray-800 text-green-400 text-left">
              <th className="p-3">Symbol</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Avg. Price</th>
              <th className="p-3">Current Price</th>
              <th className="p-3">P/L</th>
            </tr>
          </thead>
          <tbody>
            {mockUserStocks.map((stock) => {
              const pl = (stock.currentPrice - stock.avgPrice) * stock.quantity;
              const plColor = pl >= 0 ? "text-green-400" : "text-red-400";

              return (
                <tr key={stock.symbol} className="border-b border-gray-700 hover:bg-gray-800 transition">
                  <td className="p-3">{stock.symbol}</td>
                  <td className="p-3">{stock.quantity}</td>
                  <td className="p-3">${stock.avgPrice.toFixed(2)}</td>
                  <td className="p-3">${stock.currentPrice.toFixed(2)}</td>
                  <td className={`p-3 font-bold ${plColor}`}>${pl.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div></>
  );
};

export default Dashboard;
