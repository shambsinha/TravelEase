import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto py-20 px-6 md:px-12">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-bold text-center text-blue-600"
      >
        Discover <span className="text-yellow-500">TravelEase</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-lg text-center text-gray-700 mt-4 max-w-2xl mx-auto"
      >
        Your trusted travel partner for unforgettable journeys across the globe.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-semibold text-blue-500">🌎 Global Reach</h2>
          <p className="text-gray-600 mt-2">We connect you to breathtaking destinations worldwide.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-semibold text-yellow-500">💼 Custom Packages</h2>
          <p className="text-gray-600 mt-2">Tailored travel experiences to match your style and budget.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white shadow-lg rounded-xl p-6 text-center transform hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-semibold text-green-500">✈️ Hassle-Free Booking</h2>
          <p className="text-gray-600 mt-2">Seamless and secure travel bookings at your fingertips.</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800">
          Ready for your next adventure?
        </h3>
        <motion.a
          href="/packages"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mt-4 inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-500 transition"
        >
          Explore Packages
        </motion.a>
      </motion.div>
    </div>
  );
};

export default About;