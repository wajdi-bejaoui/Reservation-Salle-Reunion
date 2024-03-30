require('dotenv').config();
require('express-async-errors');
const express = require("express");
const mongoose = require('mongoose');
const authRouter = require("./Routes/authRoutes")
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());


app.use('/auth',authRoutes)

mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})

module.exports = app;