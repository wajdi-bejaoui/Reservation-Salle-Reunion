
const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const {
    createReservation,
    getAllReservations,
    updateReservation,
    deleteReservation,
    calendrierReservation,
    
  } = require('../Controllers/reservationController');

  const { authenticateUser } = require('../middleware/authentication');
  


router.post('/api/AddReservation/:id', authenticateUser, createReservation);
router.delete('/api/DeleteReservation/:id',authenticateUser, deleteReservation);
router.get('/ListReservation',authenticateUser, getAllReservations);
router.get('/calendrierReservation/:id',authenticateUser, calendrierReservation);
router.post('/api/UpdateReservation/:id',authenticateUser, updateReservation);

module.exports = router; 