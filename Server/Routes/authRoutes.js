
    

const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const { register,login } = require('../Controllers/authController');


router.post('/signup', register);
router.post('/login', login);


module.exports = router; 