import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import { requireAuth } from "@clerk/clerk-sdk-node";
import User from "./models/User.js";
import cors from 'cors';
dotenv.config({ path: '.env'})
import {clerkMiddleware} from './config/clerkAuth.js';
import Clerk from "@clerk/clerk-sdk-node";

databaseConnection();
const app = express()
const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true,
}
app.use(cors(corsOption));
app.use(express.json())
app.use(clerkMiddleware);
// app.use("/api/user", userRoutes);
app.use(express.urlencoded({ extended : true }))

app.get('/api',(req,res)=>{
    console.log(process.env.FRONTEND_URL);
    console.log('welcome to home page');
    res.send('main api route');
})


app.get("/api/user/profile", async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const clerkUser = await Clerk.users.getUser(clerkId);
    const email = clerkUser.emailAddresses[0]?.emailAddress || "";
    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim();

    let user = await User.findOne({ clerkId });

    if (!user) {
      const role = email === "admin@example.com" ? "admin" : "customer";
      user = new User({ clerkId, name, email, role });
      await user.save();
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// app.use("/api/packages", packageRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port no ${process.env.PORT}`);
})