import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";


import tajMahal from "/public/assets/images/tajmahal.jpg";
import tokyo from "/public/assets/images/tokyo.jpg";
import paris from "/public/assets/images/parisgateway.jpg";
import rome from "/public/assets/images/tajmahal.jpg";
import newYork from "/public/assets/images/tajmahal.jpg";
import sydney from "/public/assets/images/tajmahal.jpg";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const allPackages = [
  { id: 1, name: "Taj Mahal Splendor", image: tajMahal, location: "India" },
  { id: 2, name: "Paris Gateway", image: paris, location: "France" },
  { id: 3, name: "Tokyo Adventure", image: tokyo, location: "Japan" },
  { id: 4, name: "Rome Highlights", image: rome, location: "Italy" },
  { id: 5, name: "New York City Vibes", image: newYork, location: "USA" },
  { id: 6, name: "Sydney Escapade", image: sydney, location: "Australia" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(()=>{
    axios.get(`${backendUrl}/api`).then((response)=>{
      console.log('this is main page');
    })
  })

  const filteredPackages = allPackages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Slideshow */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
      >
        {allPackages.map((pkg) => (
          <SwiperSlide key={pkg.id}>
            <div className="w-full h-full flex justify-center items-center">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search by destination..."
          className="w-full md:w-1/2 p-3 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 text-center mt-12 mb-8">Top Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

export default Home;