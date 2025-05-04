import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
import userRoutes from './routes/userRoutes.js'
import packageRoutes from './routes/packageRoutes.js'
import cors from 'cors';
dotenv.config({ path: '.env'})
import {clerkMiddleware} from './config/clerkAuth.js';

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
app.use(express.urlencoded({ extended : true }))

app.get('/api',(req,res)=>{
    console.log(process.env.FRONTEND_URL);
    console.log('welcome to home page');
    res.send('main api route');
})
app.use("/api/user",userRoutes);
app.use("/api/packages", packageRoutes);
// app.use("/api/booking", bookingRoutes);
// app.use("/api/reviews", reviewRoutes);

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port no ${process.env.PORT}`);
})