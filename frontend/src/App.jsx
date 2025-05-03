import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import PackageDetails from "./pages/PackageDetails";
import BOOKINGS from "./pages/Booking";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bookings" element={<BOOKINGS />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
