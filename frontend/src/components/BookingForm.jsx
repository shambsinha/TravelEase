import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const BookingForm = ({ tour, onClose, onBook }) => {
  const { getToken } = useAuth();
  const [numPeople, setNumPeople] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const handlePeopleChange = (e) => {
    const selectedPeople = parseInt(e.target.value);
    setNumPeople(selectedPeople);
    setTotalPrice(selectedPeople * parseInt(tour.price.replace('₹', ''))); // Calculate total
  };
  const handleBooking = async () => {
    try {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          packageId : tour.id,
          guests : numPeople,
          totalPrice,
          name,
          email,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Booking successful:", data);
        onBook();
      } else {
        const errorData = await response.json();
        console.error("Booking failed:", errorData.message);
      }
    } catch (err) {
      console.error("Error booking package:", err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleBooking();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Book: {tour.name}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full mb-3 p-2 border rounded"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            required
          />          
          <select
            className="w-full mb-3 p-2 border rounded"
            value={numPeople}
            onChange={handlePeopleChange}
            required
          >
            <option value="">Select Number of People</option>
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4">4 People</option>
            <option value="5">5 People</option>
            <option value="6">6 People</option>
            <option value="7">7 People</option>
            <option value="8">8 People</option>
            <option value="9">9 People</option>
            <option value="10">10 People</option>
          </select>
          {numPeople && (
            <div className="mt-4 p-3 border bg-gray-100 rounded-md">
              <p className="text-lg font-semibold">Booking Summary</p>
              <p>{numPeople} {numPeople === 1 ? "Person" : "People"}</p>
              <p className="font-bold text-xl text-blue-600">Total: ₹{totalPrice}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition mt-4"
          >
            Confirm Booking
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
