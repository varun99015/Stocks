import React from "react";
import { Routes, Route } from "react-router-dom";
//import Navbar from "../components/Navbar";
import Explore from "./Explore";
import Stocks from "./Stocks";
import SpaceX from "./SpaceX";
import Profile from "../components/Profile";
import Dashboard from "./Dashboard";
import Footer from "../components/Footer";

const MainHome = () => {
  return (
    <div>
      {/* Routes for Dashboard, Stocks, etc. */}
      <Routes>
        <Route path="explore" element={<Explore />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="stocks" element={<Stocks />} />
        <Route path="spacex" element={<SpaceX />} />
        <Route path="profile" element={<Profile />} />
        <Route path="footer" element={<Footer/>} />
      </Routes>
    </div>
  );
};

export default MainHome;
