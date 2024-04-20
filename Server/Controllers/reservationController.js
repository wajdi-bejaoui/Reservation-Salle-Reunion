const Reservation = require('../Models/Reservation');
const SalleReunion = require('../Models/SalleReunion');
const User = require('../Models/User');

const { StatusCodes } = require('http-status-codes');




const createReservation = async (req, res) => {
  const {  date, start, end } = req.body;
  const salleReunionId = req.params.id;
const reservationExist = await Reservation.findOne({
    salleReunion: salleReunionId,
    date: date,
    $or: [
        { start: { $lt: end }, end: { $gt: start } },
        { start: { $eq: start }, end: { $eq: end } }
    ]
});

if (reservationExist) {
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'La salle de réunion est déjà réservée pour cette plage horaire' });
}

  const salle = await SalleReunion.findById(salleReunionId);
        if (!salle) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Salle de réunion non trouvée' });
        }

  if (start >= end) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'L\'heure de fin doit être > à l\'heure de début' });
  }

  currentDate = new Date();
  if (new Date(date) < currentDate) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'La date de réservation doit être supérieure ou égale à la date actuelle' });
  } else if (new Date(date) === currentDate || new Date(date) > currentDate) {
    const currentHour = currentDate.getHours();
    if (parseInt(start) < currentHour) {
     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'L\'heure de début de la réservation doit être supérieure à l\'heure actuelle' });
    }
  }

  console.log(req.user.id)

  req.body.salleReunion = salleReunionId
  req.body.user = req.user.id

  const reservation = await Reservation.create(req.body);
  if (reservation)
    // return res.status(StatusCodes.CREATED).json({ reservation });
    return res.redirect('/ListReservation');
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};



const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find({ user : req.user.id }).populate("salleReunion")

  if (reservations) 
    res.render('Reservation/MyReservation', { list : reservations });
  else
  res.render('Reservation/MyReservation', { list : [] });


};


const updateReservation = async (req, res) => {
  const { id: reservationId } = req.params;
//   const { capacite, equipements, disponibilite } = req.body;

  const reservation = await Reservation.findOne({ _id: reservationId });

  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No reservation with id ${reservationId}`});
  }

  const salleReunion = await SalleReunion.findOne({ _id: reservation.salleReunion });

  if (!salleReunion) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No room with id ${reservation.salleReunion}`});
  }

  if (req.body.start >= req.body.end) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'L\'heure de fin doit être > à l\'heure de début' });
  }

  currentDate = new Date();
  if (new Date(req.body.date) < currentDate) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'La date de réservation doit être supérieure ou égale à la date actuelle' });
  } else if (new Date(req.body.date) === currentDate || new Date(req.body.date) > currentDate) {
    const currentHour = currentDate.getHours();
    if (parseInt(req.body.start) < currentHour) {
     return res.status(StatusCodes.BAD_REQUEST).json({ message: 'L\'heure de début de la réservation doit être supérieure à l\'heure actuelle' });
    }
  }

  // checkPermissions(req.user, review.user);

  // reservation.salleReunion = req.body.salleReunion
  reservation.user = req.user.id
  reservation.start = req.body.start
  reservation.end = req.body.end
  reservation.date = req.body.date

  const UpdatedReservation = await reservation.save();
  if (UpdatedReservation)
    // return res.status(StatusCodes.OK).json({ salle : UpdatedReservation });
    return res.redirect('/ListReservation');
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
};

const deleteReservation = async (req, res) => {
  const { id: reservationId } = req.params;
  const reservation = await Reservation.findOne({ _id: reservationId });

  if (!reservation) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No reservationId with id ${reservationId}`});
  }
  // checkPermissions(req.user, review.user);
  try {
    const deleted = await Reservation.findByIdAndDelete(reservationId);
    return res.redirect('/ListReservation');
  }catch(error) {
    return res.json({ error });
  }
  
};


const calendrierReservation = async (req, res) => {
  const reservations = await Reservation.find({ salleReunion : req.params.id })

  if (reservations) 
    res.render('Reservation/CalendrierReservation', { list : reservations });
  else
  res.render('Reservation/CalendrierReservation', { list : [] });


};

module.exports = {
  createReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
  calendrierReservation,
  
};
