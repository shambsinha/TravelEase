import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Importing Images
import tajMahal from "/public/assets/images/tokyo.jpg";
import paris from "/public/assets/images/tokyo.jpg";
import tokyo from "/public/assets/images/tokyo.jpg";
import rome from "/public/assets/images/tokyo.jpg";
import newYork from "/public/assets/images/tokyo.jpg";
import sydney from "/public/assets/images/tokyo.jpg";

// Package Data
const allPackages = [
  { id: 1, name: "Taj Mahal Splendor", image: tajMahal, price: "₹1499", location: "India", description: "Explore the iconic Taj Mahal & Agra Fort." },
  { id: 2, name: "Paris Gateway", image: paris, price: "₹2499", location: "France", description: "Visit the Eiffel Tower & Louvre Museum." },
  { id: 3, name: "Tokyo Adventure", image: tokyo, price: "₹2799", location: "Japan", description: "Experience Tokyo's culture & shopping." },
  { id: 4, name: "Rome Highlights", image: rome, price: "₹2199", location: "Italy", description: "Explore the Colosseum & Vatican City." },
  { id: 5, name: "New York City Vibes", image: newYork, price: "₹2999", location: "USA", description: "See Times Square & Central Park." },
  { id: 6, name: "Sydney Escapade", image: sydney, price: "₹2399", location: "Australia", description: "Enjoy Bondi Beach & Opera House." },
];

const Packages = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtered packages based on search input
  const filteredPackages = allPackages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-blue-600"
      >
        Our Travel <span className="text-yellow-500">Packages</span>
      </motion.h1>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search by destination..."
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img src={pkg.image} alt={pkg.name} className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-blue-600">{pkg.name}</h3>
                <p className="text-gray-600">{pkg.description}</p>
                <p className="text-lg font-bold text-yellow-500 mt-2">{pkg.price}</p>
                <p className="text-sm text-gray-500">{pkg.location}</p>
                <Link to={`/packages/${pkg.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">No packages found. Try another search.</p>
        )}
      </div>
    </div>
  );
};

export default Packages;
