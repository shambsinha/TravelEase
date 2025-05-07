import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Packages = lazy(() => import("./pages/Packages"));
const Contact = lazy(() => import("./pages/Contact"));
const Profile = lazy(() => import("./pages/Profile"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const BOOKINGS = lazy(() => import("./pages/Booking"));

const App = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/bookings" element={<BOOKINGS />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

export default App;
