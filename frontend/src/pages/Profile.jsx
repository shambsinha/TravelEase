import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error("Failed to fetch profile", response.status);
      }
    };

    fetchProfile();
  }, [getToken]);

  return (
    <div>
      <h2>Profile</h2>
      {profile ? (
     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <div className="flex items-center space-x-4">
        <img
          src={profile.avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          <p className="text-lg font-medium">{profile.name}</p>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
        <p><strong>Address:</strong> {profile.address || "N/A"}</p>
      </div>
    </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;