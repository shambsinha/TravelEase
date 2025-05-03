import React from "react";
import { useParams } from "react-router-dom";

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

const PackageDetails = () => {
  const { id } = useParams();
  const packageDetails = allPackages.find(pkg => pkg.id === parseInt(id));

  if (!packageDetails) {
    return <h2 className="text-center text-gray-500 mt-10">Package not found.</h2>;
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={packageDetails.image} alt={packageDetails.name} className="w-full h-64 object-cover" />
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">{packageDetails.name}</h2>
          <p className="text-lg text-gray-600 mt-2">{packageDetails.description}</p>
          <p className="text-xl font-bold text-yellow-500 mt-4">{packageDetails.price}</p>
          <p className="text-sm text-gray-500">Location: {packageDetails.location}</p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;