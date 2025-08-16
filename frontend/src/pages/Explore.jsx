import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Rocket, Satellite, Banknote, Gem, Globe } from "lucide-react";
import Footer from "../components/Footer";
const Explore = () => {
  const navigate = useNavigate();

  // Sci-fi category headers with icons
  const categories = [
    {
      name: "TRAVEL",
      icon: <Rocket className="text-cyan-400" />,
      stocks: ["SPCE", "RKLB", "ORBITX", "JUPITERJET", "DEEPSKY", "ASTROFUEL", "NEBULA"],
      type: "spaceStocks"
    },
    {
      name: "SATELLITES",
      icon: <Satellite className="text-purple-400" />,
      stocks: ["MAXAR", "STARLINK", "SPACEDRIVE", "DEEPSKY"],
      type: "satelliteStocks"
    },
    {
      name: "FINANCE",
      icon: <Banknote className="text-yellow-400" />,
      stocks: ["GALAXYCREDIT", "COSMOCOIN", "SATURNBANK", "PLUTOGOLD"],
      type: "spaceFinanceStocks"
    },
    {
      name: "MINING",
      icon: <Gem className="text-orange-400" />,
      stocks: ["GALT", "ASTROFUEL", "QUASAR", "METEORX", "COSMOMINING"],
      type: "miningStocks"
    },
    {
      name: "COLONIZATION",
      icon: <Globe className="text-green-400" />,
      stocks: ["THRX", "LUNARMINING", "MARSINC", "NEBULA", "MARSFOOD", "ASTROWATER", "EXOGROWTH", "NEOSTOCK"],
      type: "colonizationStocks"
    }
  ];

  return (
    <>
    <div className="bg-black text-cyan-100 min-h-screen">
      <Navbar />
      
      {/* Animated starfield background */}
      <div className="fixed inset-0 overflow-hidden opacity-20 -z-10">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8">
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <div className="flex items-center mb-4 border-b border-cyan-800 pb-2">
              <div className="mr-3">
                {category.icon}
              </div>
              <h1 className="text-2xl font-bold text-cyan-300 tracking-wider">
                {category.name}
              </h1>
            </div>

            <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
              {category.stocks.map((symbol) => (
                <div
                  key={symbol}
                  onClick={() => navigate(`/f_stock/${category.type}/${encodeURIComponent(symbol)}`)}
                  className="inline-block w-64 h-44 rounded-lg mx-3 cursor-pointer transition-all duration-300
                    bg-gradient-to-br from-gray-900 to-gray-800 border border-cyan-900
                    hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20
                    group relative overflow-hidden"
                >
                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/starfield.png')] opacity-10 group-hover:opacity-20 transition-opacity" />
                  
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 border border-cyan-800 rounded-lg group-hover:border-cyan-400 transition-all" />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.1)_0%,_transparent_70%)]" />

                  <div className="relative z-10 h-full flex flex-col justify-between p-4">
                    <h2 className="text-2xl font-mono font-bold text-cyan-300 tracking-wider">
                      {symbol}
                    </h2>
                    {/* <div className="text-xs text-cyan-400 opacity-80 font-mono mt-auto">
                      CLICK TO ANALYZE
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Explore;