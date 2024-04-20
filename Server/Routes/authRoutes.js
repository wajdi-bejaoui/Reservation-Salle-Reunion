
    

const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const { register,login,logout } = require('../Controllers/authController');


router.post('/api/signup', register);
router.post('/api/signin', login);
router.get('/logout', logout);


module.exports = router; 