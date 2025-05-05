// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const PackageDetails = () => {
//   const { id } = useParams();
//   const [tour, setTour] = useState(null);
//   const [tourDetails, setTourDetails] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const tourRes = await fetch("/tour.json");
//         const tourData = await tourRes.json();
//         const tourMatch = tourData.find(pkg => pkg.id === parseInt(id));
//         setTour(tourMatch);

//         const detailsRes = await fetch("/tourdetails.json");
//         const detailsData = await detailsRes.json();
//         const detailsMatch = detailsData.find(pkg => pkg.id === parseInt(id));
//         setTourDetails(detailsMatch?.days || []);
//       } catch (error) {
//         console.error("Error loading data:", error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   if (!tour) {
//     return <h2 className="text-center text-gray-500 mt-10">Package not found.</h2>;
//   }

//   return (
//     <div className="container mx-auto px-6 py-20">
//       {/* Main Package Info */}
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <img src={tour.image} alt={tour.name} className="w-full h-64 object-cover" />
//         <div className="p-6 text-center">
//           <h2 className="text-3xl font-bold text-blue-600">{tour.name}</h2>
//           <p className="text-md text-gray-600 mt-2">{tour.location}</p>
//         </div>
//       </div>

//       {/* Book Now Button */}
//       <div className="text-center mt-6">
//         <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
//           Book Now
//         </button>
//       </div>

//       {/* Daily Activity Plan */}
//       <h3 className="text-2xl font-semibold text-gray-800 text-center mt-12 mb-6">6-Day Tour Plan</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {tourDetails.map((day, index) => (
//           <div
//             key={index}
//             className="bg-white p-4 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition"
//           >
//             <h4 className="text-lg font-bold text-blue-500">Day {index + 1}</h4>
//             <p className="text-gray-700 mt-2">{day.activity}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PackageDetails;



import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookingForm from "../components/BookingForm"; // adjust path if needed

const PackageDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [tourDetails, setTourDetails] = useState([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tourRes = await fetch("/tour.json");
        const tourData = await tourRes.json();
        const tourMatch = tourData.find(pkg => pkg.id === parseInt(id));
        setTour(tourMatch);

        const detailsRes = await fetch("/tourdetails.json");
        const detailsData = await detailsRes.json();
        const detailsMatch = detailsData.find(pkg => pkg.id === parseInt(id));
        setTourDetails(detailsMatch?.days || []);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!tour) {
    return <h2 className="text-center text-gray-500 mt-10">Package not found.</h2>;
  }

  return (
    <div className="relative">
      {/* Blurred main content when modal open */}
      <div className={`container mx-auto px-6 py-20 transition ${isBookingOpen ? "blur-sm pointer-events-none" : ""}`}>
        {/* Main Package Info */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img src={tour.image} alt={tour.name} className="w-full h-64 object-cover" />
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-blue-600">{tour.name}
            <span className="text-yellow-600 ml-4 font-bold">{tour.price}</span>
            </h2>
            <p className="text-md text-gray-600 mt-2">{tour.location}</p>

          </div>
        </div>

        {/* Book Now or Booked */}
        <div className="text-center mt-6">
          {!isBooked ? (
            <button
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Now
            </button>
          ) : (
            <>
              <button
                disabled
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg"
              >
                Booked
              </button>
              <Link
                to="/bookings"
                className="ml-4 inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Go to Bookings
              </Link>
            </>
          )}
        </div>

        {/* Daily Activity Plan */}
        <h3 className="text-2xl font-semibold text-gray-800 text-center mt-12 mb-6">6-Day Tour Plan</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tourDetails.map((day, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 text-center hover:shadow-lg transition"
            >
              <h4 className="text-lg font-bold text-blue-500">Day {index + 1}</h4>
              <p className="text-gray-700 mt-2">{day.activity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && (
        <BookingForm
          tour={tour}
          onClose={() => setIsBookingOpen(false)}
          onBook={() => {
            setIsBookingOpen(false);
            setIsBooked(true);
          }}
        />
      )}
    </div>
  );
};

export default PackageDetails;