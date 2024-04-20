
const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const {
    createSalle,
    getAllSalles,
    updateSalle,
    deleteSalle,
  } = require('../Controllers/salleReunionController');
  const { authenticateUser } = require('../middleware/authentication');

  



router.post('/api/AddSalleReunion', createSalle);
router.delete('/api/DeleteSalleReunion/:id',authenticateUser, deleteSalle);
router.get('/ListSalleReunion',authenticateUser, getAllSalles);
router.post('/api/UpdateSalleReunion/:id',authenticateUser, updateSalle);

module.exports = router; 