import express from 'express'
import dotenv from 'dotenv'
import databaseConnection from './config/database.js'
dotenv.config({ path: '.env'})

databaseConnection();
const app = express()
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.listen(process.env.PORT, ()=> {
    console.log(`Server is running at port no ${process.env.PORT}`);
})