
    

const express = require('express');
const router = express.Router();

const path = require ("path");
const app = express();

const { register,login } = require('../Controllers/authController');
// const { deleteUser,getUserById ,updateUser} = require('../controllers/userController');


router.post('/signup', register);
router.post('/login', login);
// router.delete('/delete', deleteUser);
// router.get('/getUserById/:id', getUserById);
// router.put('/updateUser', updateUser);

// router.get('/logout', logout);

module.exports = router; 