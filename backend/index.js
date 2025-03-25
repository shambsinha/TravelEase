import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
dotenv.config({ path: '.env'})

databaseConnection();
const app = express()
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.use("/api/users", userRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/destinations", destinationRoutes);
// app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port no ${process.env.PORT}`);
})