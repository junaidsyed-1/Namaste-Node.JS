import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <>
      <div className="flex-grow">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Body;
