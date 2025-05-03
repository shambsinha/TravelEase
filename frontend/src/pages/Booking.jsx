// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Booking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch bookings from the API
//     axios
//       .get("") // Adjust URL as needed based on your API route
//       .then((response) => {
//         setBookings(response.data); // assuming data is an array of bookings
//       })
//       .catch((err) => {
//         setError("Failed to fetch bookings.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // If there are no bookings, show a message
//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="container mx-auto px-6 py-20">
//       <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">My Bookings</h2>

//       {error && <p className="text-red-500">{error}</p>}

//       {bookings.length === 0 ? (
//         <div className="text-center">
//           <p className="text-xl text-gray-600">No bookings yet.</p>
//           <Link to="/packages">
//             <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
//               Explore Packages
//             </button>
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {bookings.map((booking) => (
//             <div
//               key={booking._id}
//               className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
//             >
//               <img
//                 src={booking.packageImage}
//                 alt={booking.packageName}
//                 className="w-full h-48 object-cover rounded-lg"
//               />
//               <h3 className="text-xl font-semibold text-blue-600 mt-4">{booking.packageName}</h3>
//               <p className="text-sm text-gray-500 mt-2">{booking.location}</p>
//               <p className="text-lg font-bold text-yellow-500 mt-2">{booking.price}</p>
//               <p className="text-sm text-gray-600 mt-4">{booking.date}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;
/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = await getToken();
        const response = await axios.get("http://localhost:3000/api/packages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [getToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">My Bookings</h2>

      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">No bookings yet.</p>
          <Link to="/packages">
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
              Explore Packages
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            >
              <img
                src={booking.packageImage}
                alt={booking.packageName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold text-blue-600 mt-4">{booking.packageName}</h3>
              <p className="text-sm text-gray-500 mt-2">{booking.location}</p>
              <p className="text-lg font-bold text-yellow-500 mt-2">{booking.price}</p>
              <p className="text-sm text-gray-600 mt-4">{booking.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booking;
*/
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const Booking = () => {
  const [packageIds, setPackageIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("/tour.json")
      .then((res) => setPackages(res.data))
    const fetchUserPackages = async () => {
      try {
        const token = await getToken();
        const response = await axios.get("http://localhost:3000/api/packages", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPackageIds(response.data.packageIds || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPackages();
  }, [getToken]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">My Bookings</h2>

      {error && <p className="text-red-500">{error}</p>}

      {packageIds.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">No bookings yet.</p>
          <Link to="/packages">
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition">
              Explore Packages
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageIds.map((id, index) => {
            const matchedPackage = packages.find((pkg) => pkg.id === id); // match based on _id
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                {matchedPackage ? (
                  <>
                    <img
                      src={matchedPackage.image}
                      alt={matchedPackage.packageName}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <h3 className="text-xl font-semibold text-blue-600 mt-4">
                      {matchedPackage.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">{matchedPackage.location}</p>
                  </>
                ) : (
                  <p className="text-gray-600">Package details not found.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Booking;