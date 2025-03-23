import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-8 mt-10 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold text-blue-600">TravelEase</h2>
          <p className="text-sm text-gray-600 mt-1">Your Journey, Our Responsibility!</p>
        </div>

        <ul className="flex gap-6 mt-4 md:mt-0">
          <li><a href="/about" className="text-gray-700 hover:text-blue-600 transition">About</a></li>
          <li><a href="/destinations" className="text-gray-700 hover:text-blue-600 transition">Destinations</a></li>
          <li><a href="/packages" className="text-gray-700 hover:text-blue-600 transition">Packages</a></li>
          <li><a href="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a></li>
        </ul>
      </div>

      <div className="text-center text-gray-600 text-sm mt-6">
        © {new Date().getFullYear()} TravelEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
