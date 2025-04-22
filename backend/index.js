import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import cors from 'cors';
dotenv.config({ path: '.env'})

databaseConnection();
const app = express()
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
const corsOption = {
    origin: process.env.FRONTEND_URL,
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}
app.use(cors(corsOption));

// app.use("/api/users", userRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port no ${process.env.PORT}`);
})