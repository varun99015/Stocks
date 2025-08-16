import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandNavbar from "./components/Navbar";
import Explore from "./pages/Explore";
import Stocks from "./pages/Stocks";
import SpaceX from "./pages/SpaceX";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./pages/home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import MainHome from "./pages/MainHome";
import Features from "./components/Features";
import Dashboard from "./pages/Dashboard";
import FXSTOCK1 from "./FictionalStockDataPages/FXSTOCK1";
import DynamicStock from "./FictionalStockDataPages/DynamicStock";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/*" element={<MainHome />} />
        <Route path="/navbar" element = {<Navbar />}/>
        <Route path="/explore" element={<Explore />} />
        <Route path="fstock" element={<FXSTOCK1/>}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/spacex" element={<SpaceX />} />
        <Route path="/register" element={<Signup />} />
        <Route path='/feature' element= {<Features/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landnavbar" element={<LandNavbar />} />
        <Route path="/f_stock/:type/:symbol" element={<DynamicStock />} />
        <Route path="footer" element={<Footer/>}/>
      </Routes>
    </Router>
  );
};

export default App;
