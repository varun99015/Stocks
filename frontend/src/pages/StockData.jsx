import React, { useState, useEffect } from "react";
import axios from "axios";

const StockData = ({ symbol }) => {
  const [stock, setStock] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_REACT_URL}/stock/${symbol}`)
      .then((response) => setStock(response.data))
      .catch((error) => console.error("Error fetching stock data:", error));
  }, [symbol]);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      {stock ? (
        <div>
          <h2 className="text-lg font-bold">{stock.shortName} ({stock.symbol})</h2>
          <p className="text-green-500 text-xl">${stock.regularMarketPrice}</p>
          <p className={stock.regularMarketChange >= 0 ? "text-green-600" : "text-red-600"}>
            {stock.regularMarketChange >= 0 ? "▲" : "▼"} {stock.regularMarketChange.toFixed(2)} ({stock.regularMarketChangePercent.toFixed(2)}%)
          </p>
        </div>
      ) : (~
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockData;
