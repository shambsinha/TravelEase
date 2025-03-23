import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center text-blue-600"
      >
        Contact <span className="text-yellow-500">Us</span>
      </motion.h1>

      <div className="text-center mt-6 text-gray-700">
        <p>Email: <a href="mailto:support@traveease.com" className="text-blue-500 hover:underline">support@traveease.com</a></p>
        <p>Phone: <a href="tel:+911234567890" className="text-blue-500 hover:underline">+91 123 456 7890</a></p>
        <p>Address: Chitkara University, Himachal Pradesh, India</p>
      </div>

      <div className="mt-10 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Send Us a Message</h2>
        <form className="mt-6 space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" />
          <textarea placeholder="Your Message" rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"></textarea>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-500 transition"
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;