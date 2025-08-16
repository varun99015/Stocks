import React, { useState, useEffect } from 'react';
import Chart from './Chart';
import { 
  Rocket, Satellite, Moon, Orbit, 
  SpaceHelmet, SolarPanel, Atom, BlackHole,
  SatelliteDish, Radiation, Alien 
} from "lucide-react";
import { spaceStocks } from './spaceData'; // Import your dataset

const FictionalStock = () => {
  const [selectedStock, setSelectedStock] = useState(spaceStocks[0]); // Default to first stock
  const [price, setPrice] = useState(204.87);
  const [priceHistory, setPriceHistory] = useState([]);

  // Simulate price fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = (Math.random() * 4 - 2); // -2% to +2%
      const newPrice = price * (1 + fluctuation/100);
      setPrice(newPrice);
      setPriceHistory(prev => [...prev.slice(-29), newPrice]); // Keep last 30 prices
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [price]);

  // Calculate daily change
  const dailyChange = priceHistory.length > 1 
    ? ((price - priceHistory[0]) / priceHistory[0] * 100).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-cyan-300 font-mono p-8">
      {/* Animated starfield background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Header with stock selector */}
      <div className="relative z-10 text-center mb-10">
        <div className="flex justify-center items-center space-x-4 mb-4">
          <select 
            onChange={(e) => setSelectedStock(spaceStocks.find(s => s.symbol === e.target.value))}
            className="bg-gray-900 border border-cyan-500 text-cyan-300 px-4 py-2 rounded-lg"
          >
            {spaceStocks.map(stock => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.name}
              </option>
            ))}
          </select>
          <div className="text-cyan-400">
            {React.cloneElement(selectedStock.icon, { size: 32 })}
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-widest">{selectedStock.name}</h1>
        <p className="text-sm text-cyan-400">Intergalactic Stock Exchange</p>
      </div>

      {/* Stock Summary */}
      <div className="relative z-10 grid md:grid-cols-2 gap-10 mb-10">
        {/* Left Panel: Price Info */}
        <div className="space-y-4 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-cyan-200 flex items-center">
            <Atom className="mr-2" /> Quantum Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-cyan-400">📈 Current Price:</p>
              <p className="text-green-400 font-bold text-xl">Ξ{price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-cyan-400">📉 Daily Change:</p>
              <p className={dailyChange >= 0 ? "text-green-400" : "text-red-400"}>
                {dailyChange >= 0 ? '+' : ''}{dailyChange}%
              </p>
            </div>
            <div>
              <p className="text-cyan-400">🪐 Market Cap:</p>
              <p>Ξ{(price * 5.8).toFixed(1)} Billion</p>
            </div>
            <div>
              <p className="text-cyan-400">🌌 52-Week Range:</p>
              <p>Ξ{(price * 0.6).toFixed(2)} - Ξ{(price * 1.3).toFixed(2)}</p>
            </div>
          </div>
          
          {/* Sci-fi market indicators */}
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-300 mb-2">Market Anomalies</h3>
            <div className="flex space-x-4 text-xs">
              <div className="flex items-center">
                <Radiation size={16} className="mr-1 text-yellow-400" />
                <span>Solar Flares: {Math.floor(Math.random() * 5) + 1}/5</span>
              </div>
              <div className="flex items-center">
                <Alien size={16} className="mr-1 text-purple-400" />
                <span>Xeno-Diplomacy: Stable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Description */}
        <div className="space-y-4 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-cyan-200 flex items-center">
            <SpaceHelmet className="mr-2" /> Corporate Dossier
          </h2>
          <p>{selectedStock.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-cyan-400">🏛️ Headquarters:</p>
              <p>{selectedStock.headquarters}</p>
            </div>
            <div>
              <p className="text-cyan-400">🚀 Key Project:</p>
              <p className="text-cyan-200">{selectedStock.keyProject}</p>
            </div>
          </div>
          
          {/* Sci-fi corporate status */}
          <div className="mt-4 pt-4 border-t border-cyan-800">
            <h3 className="text-cyan-300 mb-2">Galactic Status</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                Warp Drive: {Math.random() > 0.3 ? '✔️ Certified' : '⚠️ Testing'}
              </span>
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                AI Council: {Math.random() > 0.5 ? 'Approved' : 'Reviewing'}
              </span>
              <span className="px-2 py-1 bg-cyan-900 bg-opacity-50 rounded-full text-xs">
                Xenobio Rating: AA{Math.floor(Math.random() * 3) + 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Chart with sci-fi elements */}
      <div className="relative z-10 border border-cyan-500 p-6 rounded-2xl shadow-lg bg-opacity-10 bg-cyan-900 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-cyan-200 flex items-center">
            <BlackHole className="mr-2" /> Quantum Price Flux
          </h2>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-cyan-900 bg-opacity-50 rounded-lg text-xs">
              24H
            </button>
            <button className="px-3 py-1 bg-cyan-900 bg-opacity-50 rounded-lg text-xs">
              7D
            </button>
            <button className="px-3 py-1 bg-cyan-900 bg-opacity-50 rounded-lg text-xs">
              1Y
            </button>
            <button className="px-3 py-1 bg-cyan-900 bg-opacity-70 rounded-lg text-xs">
              All Time
            </button>
          </div>
        </div>
        <Chart symbol={selectedStock.symbol} priceHistory={priceHistory} />
        
        {/* Anomaly markers */}
        <div className="flex justify-between mt-2 text-xs text-cyan-400">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
            <span>Wormhole Event</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
            <span>Solar Storm</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span>Alien Treaty</span>
          </div>
        </div>
      </div>

      {/* Sci-fi news ticker */}
      <div className="relative z-10 mt-10 overflow-hidden">
        <div className="border border-cyan-500 p-3 rounded-lg bg-gray-900 bg-opacity-50">
          <div className="flex items-center space-x-4">
            <SatelliteDish className="text-yellow-400" />
            <div className="whitespace-nowrap animate-marquee">
              {[
                `🚀 ${selectedStock.name} awarded Ceres Mining Contract`,
                `⚠️ Solar winds affecting ${selectedStock.symbol} supply lines`,
                `👽 First alien customer orders ${selectedStock.keyProject}`,
                `⚡ Quantum computing breakthrough boosts ${selectedStock.sector} sector`,
                `🌑 ${selectedStock.symbol} establishes lunar research facility`
              ].join(' ••• ')}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};

export default FictionalStock;