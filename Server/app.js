require('dotenv').config();
require('express-async-errors');
const axios = require('axios');
const express = require("express");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const SalleReunion = require('./Models/SalleReunion')
const Reservation = require('./Models/Reservation')
const MONGODB_URI = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.use(cookieParser());

const authRoutes = require("./Routes/authRoutes")
const salleReunionRoutes = require("./Routes/salleReunionRoutes")
const reservationRoutes = require("./Routes/ReservationRoutes")
app.use('/',authRoutes)
app.use('/',salleReunionRoutes)
app.use('/',reservationRoutes)

app.get('/AddSalleReunion', (req, res) => {
    res.render('salleReunion/AddSalleReunion');
});

app.get('/UpdateSalleReunion/:id', async (req, res) => {
    const salle = await SalleReunion.findOne({_id : req.params.id});
    console.log(salle)
  if (salle)
    res.render('salleReunion/UpdateSalleReunion', { salle });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'doesnt exist' });
    
});

app.get('/UpdateReservation/:id', async (req, res) => {
    const reservation = await Reservation.findOne({_id : req.params.id});
    console.log(reservation)
  if (reservation)
    res.render('Reservation/updateReservation', { reservation });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'doesnt exist' });
    
});


app.get('/AddReservationForm/:id', async (req, res) => {
    const salle = await SalleReunion.findOne({ _id : req.params.id})
    console.log("salle",req.params.id)
  
    if (salle) 
       res.render('reservation/AddReservation', { salle });
    else
    res.render('reservation/AddReservation', { salle : [] });
    
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

// app.get('/ListSalleReunion', (req, res) => {
//     // res.render('SalleReunion/ListSalleReunion');
//     axios.get('https://localhost:3000/ListSalleReunion')
//   .then(response => {
//     console.log('Response:', response.data);
//     res.render('SalleReunion/ListSalleReunion', { list : response.SalleReunions });
//   })
//   .catch(error => {
//     console.error('Error:');
//   });
// });



mongoose.connect(MONGODB_URI).then(()=>{
    console.log('connected to MongoDb');
    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}`)
    })
}).catch((err) =>{
    console.error('Error connecting to mongodb:',err.message)
})

module.exports = app;