
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



router.post('/', createSalle);
router.delete('/', deleteSalle);
router.get('/', getAllSalles);
router.put('/', updateSalle);

module.exports = router; 