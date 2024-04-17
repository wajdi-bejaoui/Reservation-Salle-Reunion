
const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const {
    createReservation,
    getAllReservations,
    updateReservation,
    deleteReservation,
  } = require('../Controllers/reservationController');

  const { authenticateUser } = require('../middleware/authentication');
  



router.post('/', authenticateUser, createReservation);
router.delete('/:id',authenticateUser, deleteReservation);
router.get('/',authenticateUser, getAllReservations);
router.put('/:id',authenticateUser, updateReservation);

module.exports = router; 