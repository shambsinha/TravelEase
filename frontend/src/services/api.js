import axios from "axios";

// 🔹 Fetch Protected Data (Uses Clerk Authentication)
export const fetchData = async (getToken) => {
    try {
        const token = await getToken(); // Ensure we await the token
        if (!token) {
            console.error("❌ No token found - User may not be logged in.");
            return;
        }
        console.log("🔹 Sending Token:", token);

        const response = await fetch("http://localhost:5000/api/protected", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("✅ Response:", data);

        if (!response.ok) throw new Error(data.error || "Unauthorized");

        return data;
    } catch (error) {
        console.error("❌ Error accessing protected route:", error);
        throw error;
    }
};

// 🔹 Test Backend Connection (Basic Check)
export const testBackendConnection = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/auth/");
        console.log("✅ Backend Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error connecting to backend:", error);
        throw error;
    }
};