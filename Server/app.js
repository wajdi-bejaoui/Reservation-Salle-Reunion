require('dotenv').config();
require('express-async-errors');
const axios = require('axios');
const express = require("express");
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000



const app = express();
app.use(express.json());
app.set('view engine', 'ejs');

const authRoutes = require("./Routes/authRoutes")
const salleReunionRoutes = require("./Routes/salleReunionRoutes")
app.use('/auth',authRoutes)
app.use('/salleReunion',salleReunionRoutes)

app.get('/AddSalleReunion', (req, res) => {
    res.render('SalleReunion/AddSalleReunion');
});

app.get('/ListSalleReunion', (req, res) => {
    // res.render('SalleReunion/ListSalleReunion');
    axios.get('https://localhost:3000/ListSalleReunion')
  .then(response => {
    console.log('Response:', response.data);
    res.render('SalleReunion/ListSalleReunion', { list : response.SalleReunions });
  })
  .catch(error => {
    console.error('Error:', error);
  });
});



mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})

module.exports = app;