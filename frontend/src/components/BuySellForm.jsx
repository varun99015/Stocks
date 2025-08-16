import { useState } from "react";

function BuySellForm({ stockId, symbol }) {
  const [quantity, setQuantity] = useState(1);

  const handleTransaction = async (type) => {
    try {
      const res = await fetch(`https://stocks-backend-fdcd.onrender.com/api/${type}`, {
        method: "POST",
        credentials: "include", // important for cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stockId, quantity }),
      });

      const data = await res.json();
      alert(data.message || `${type} completed`);
    } catch (err) {
      console.error(err);
      alert(`${type} failed`);
    }
  };

  return (
    <div className="mt-4 space-y-2">
      <input
        type="number"
        value={quantity}
        min={1}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="text-black px-3 py-1 rounded mr-2 w-24"
        placeholder="Qty"
      />
      <button
        onClick={() => handleTransaction("buy")}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        Buy
      </button>
      <button
        onClick={() => handleTransaction("sell")}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sell
      </button>
    </div>
  );
}

export default BuySellForm;
