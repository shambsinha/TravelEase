import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    axios.get("/api/user/profile")
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user data:", error));
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar || "https://via.placeholder.com/150"} 
          alt="Profile" 
          className="w-20 h-20 rounded-full border" 
        />
        <div>
          <p className="text-lg font-medium">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        <p><strong>Address:</strong> {user.address || "N/A"}</p>
      </div>
    </div>
  );
};

export default Profile;
