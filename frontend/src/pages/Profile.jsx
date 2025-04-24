// import { useEffect, useState } from "react";
// import { useAuth } from "@clerk/clerk-react";

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const { getToken } = useAuth();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = await getToken();
//       const response = await fetch("http://localhost:3000/api/user/profile", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setProfile(data);
//       } else {
//         console.error("Failed to fetch profile", response.status);
//       }
//     };

//     fetchProfile();
//   }, [getToken]);

//   return (
//     <div className="mt-20">
      
//       {profile ? (
//      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Profile</h2>
//       <div className="flex items-center space-x-4">
//         <img
//           src={profile.avatar}
//           alt="Profile"
//           className="w-20 h-20 rounded-full border"
//         />
//         <div>
//           <p className="text-lg font-medium">{profile.name}</p>
//           <p className="text-gray-600">{profile.email}</p>
//         </div>
//       </div>
//       <div className="mt-4">
//         <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
//         <p><strong>Address:</strong> {profile.address || "N/A"}</p>
//       </div>
//     </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;



import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

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

        // Convert "N/A" fields to empty strings for editing
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone === "N/A" ? "" : data.phone,
          address: data.address === "N/A" ? "" : data.address,
        });
      } else {
        console.error("Failed to fetch profile", response.status);
      }
    };

    fetchProfile();
  }, [getToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = await getToken();

    // If empty, set to "N/A" before sending to backend
    const cleanedData = {
      ...formData,
      phone: formData.phone.trim() || "N/A",
      address: formData.address.trim() || "N/A",
    };

    const response = await fetch("http://localhost:3000/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cleanedData),
    });

    if (response.ok) {
      const updated = await response.json();
      setProfile(updated);
      setEditMode(false);
    } else {
      console.error("Failed to update profile", response.status);
    }
  };

  if (!profile) return <p className="mt-20">Loading profile...</p>;

  return (
    <div className="mt-20 max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>

      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profile.avatar}
          alt="Profile"
          className="w-20 h-20 rounded-full border"
        />
        <div>
          {!editMode ? (
            <>
              <p className="text-lg font-medium">{profile.name}</p>
              <p className="text-gray-600">{profile.email}</p>
            </>
          ) : (
            <>
              <input
                className="block border p-1 mb-1 rounded w-full"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                className="block border p-1 rounded w-full"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {["phone", "address"].map((field) => (
          <div key={field}>
            <label className="font-medium capitalize block">{field}</label>
            {!editMode ? (
              <p className="text-gray-700">{profile[field] || "N/A"}</p>
            ) : (
              <input
                className="block border p-2 rounded w-full"
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
