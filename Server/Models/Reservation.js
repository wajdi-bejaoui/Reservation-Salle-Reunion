
const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
        start : Date,
        end : Date,
        salleReunion: {
            type: mongoose.Schema.ObjectId,
            ref: 'SalleReunion',
            required: true,
          },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
          },
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


// create reservation model
const Reservation = mongoose.model("Reservation", reservationSchema);
// export fichier reservation
module.exports = Reservation;