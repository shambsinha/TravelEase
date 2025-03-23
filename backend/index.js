import express from 'express'
import dotenv from 'dotenv'

const app = express()
app.use(express.urlencoded({ extended : true }))
app.use(express.json())

app.listen(3000, ()=> {
    console.log(`Server is running at port no 3000`);
})