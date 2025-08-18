import { useState, useEffect } from "react";
import sound from '../assets/space-beep.mp3'

function BuySellForm({ symbol }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio(sound) : null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [audio]);

  const playSound = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(e => console.log("Audio play failed:", e));
    }
  };

  const handleTransaction = async (type) => {

    if (!symbol) {
      setTransactionStatus({
        success: false,
        message: "TRANSMISSION FAILED",
        details: "No stock symbol selected."
      });
      return;
    }

    setIsLoading(true);
    setTransactionStatus(null);
    playSound();

    try {
      const res = await fetch(`https://stocks-backend-fdcd.onrender.com/transactions/${type}`, {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          symbol: symbol, 
          quantity: quantity,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        let errorData = {};
        try {
          errorData = JSON.parse(text);
        } catch (e) {
          throw new Error(text || 'Galactic Market rejected the order.');
        }
        throw new Error(errorData.message || 'Galactic Market rejected the order.');
      }

      const data = await res.json();
      
      setTransactionStatus({
        success: true,
        message: `${type.toUpperCase()} ORDER CONFIRMED`,
        details: data.message || `Traded ${quantity} shares of ${symbol}`
      });
      
      document.dispatchEvent(new CustomEvent('galactic-transaction', {
        detail: { type, symbol, quantity }
      }));

    } catch (err) {
      console.error("Quantum link failure:", err);
      setTransactionStatus({
        success: false,
        message: `TRANSMISSION FAILED`,
        details: err.message || `Unable to reach Galactic Market Network`
      });
    } finally {
      setIsLoading(false);
    }
  };

  // FIX: Disable buttons if the symbol is missing or if a transaction is in progress.
  const isButtonDisabled = isLoading || !symbol;

  return (
    <div className="space-trading-interface">
      <div className="quantum-input-group">
        <input
          type="number"
          value={quantity}
          min={1}
          max={10000}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)) || 1)}
          className="stellar-input"
          placeholder="QUANTUM UNITS"
        />
        <span className="input-unit">QTY</span>
      </div>

      <div className="tactical-buttons">
        <button
          onClick={() => handleTransaction("buy")}
          disabled={isButtonDisabled}
          className={`warp-button buy ${isLoading ? 'warp-active' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation">ENGAGING WARP DRIVE...</span>
          ) : (
            <>
              <span className="icon">↑</span>
              <span>ACQUIRE STOCKS</span>
              <span className="subtext">(CREDITS WILL BE DEDUCTED)</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleTransaction("sell")}
          disabled={isButtonDisabled}
          className={`warp-button sell ${isLoading ? 'warp-active' : ''}`}
        >
          {isLoading ? (
            <span className="pulse-animation">INITIATING SELL PROTOCOL...</span>
          ) : (
            <>
              <span className="icon">↓</span>
              <span>LIQUIDATE ASSETS</span>
              <span className="subtext">(CREDITS WILL BE DEPOSITED)</span>
            </>
          )}
        </button>
      </div>

      {transactionStatus && (
        <div className={`transmission-feedback ${transactionStatus.success ? 'success' : 'error'}`}>
          <div className="holographic-display">
            <div className="transmission-header">
              {transactionStatus.success ? '✓' : '✗'} {transactionStatus.message}
            </div>
            <div className="transmission-details">
              {transactionStatus.details}
            </div>
            <div className="stellar-coordinates">
              TX-ID: {Math.random().toString(36).substring(2, 15).toUpperCase()}
            </div>
          </div>
        </div>
      )}
      <style jsx="true">{`
        .space-trading-interface {
          border: 1px solid #0fa;
          border-radius: 4px;
          padding: 1.5rem;
          background: rgba(0, 20, 30, 0.8);
          box-shadow: 0 0 20px rgba(0, 255, 170, 0.2);
          font-family: 'Segment7Standard', monospace;
        }
        .quantum-input-group { position: relative; margin-bottom: 1.5rem; }
        .stellar-input { width: 100%; padding: 0.8rem 1rem 0.8rem 3rem; background: #011; border: 1px solid #0fa; color: #0fa; font-size: 1.2rem; letter-spacing: 1px; border-radius: 4px; }
        .input-unit { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: #0fa; opacity: 0.7; }
        .tactical-buttons { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .warp-button { padding: 1rem; border: none; border-radius: 4px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; cursor: pointer; transition: all 0.3s ease; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 80px; }
        .warp-button.buy { background: linear-gradient(135deg, #0a3, #0fa); color: #011; }
        .warp-button.sell { background: linear-gradient(135deg, #f05, #f70); color: #011; }
        .warp-button:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0, 255, 170, 0.4); }
        .warp-button:disabled { opacity: 0.7; cursor: not-allowed; }
        .warp-active { animation: warp-pulse 1.5s infinite; }
        @keyframes warp-pulse { 0% { opacity: 1; } 50% { opacity: 0.7; } 100% { opacity: 1; } }
        .pulse-animation { animation: text-pulse 1s infinite; }
        @keyframes text-pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .icon { font-size: 1.5rem; margin-bottom: 0.3rem; }
        .subtext { font-size: 0.7rem; opacity: 0.8; margin-top: 0.3rem; }
        .transmission-feedback { margin-top: 1.5rem; animation: appear 0.5s ease; }
        @keyframes appear { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .holographic-display { padding: 1rem; border-radius: 4px; background: rgba(0, 10, 20, 0.9); border: 1px solid; font-family: 'Courier New', monospace; }
        .success .holographic-display { border-color: #0fa; box-shadow: 0 0 10px rgba(0, 255, 170, 0.3); }
        .error .holographic-display { border-color: #f05; box-shadow: 0 0 10px rgba(255, 0, 85, 0.3); }
        .transmission-header { font-weight: bold; margin-bottom: 0.5rem; color: #fff; }
        .transmission-details { color: #aaa; margin-bottom: 0.5rem; }
        .stellar-coordinates { font-size: 0.7rem; color: #666; font-style: italic; }
      `}</style>
    </div>
  );
}

export default BuySellForm;
