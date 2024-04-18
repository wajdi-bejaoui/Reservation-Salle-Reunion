const User = require("../Models/User")
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");
const express = require("express");
const { StatusCodes } = require('http-status-codes');
const { log } = require("util");
const path = require ("path");
const app = express();
const secretKey = process.env.JWT_SECRET;
// confi encodage data

// Middleware to check and validate JWT


 const register =  async (req, res) => {
     console.log("here sign up");
     console.log("tt", req.body);
     try {
         // Check if the email already exists in the database
         const existingUser = await User.findOne({ email: req.body.email });
         if (existingUser) {
             return res.json({ msg: 'E-mail already exists' });
         }

         // Create a new user
         const newUser = new User({
             email: req.body.email,
             password: req.body.password,
             username: req.body.userName,
             role:req.body.role,
         });
 
         // Save the user to the database
         await newUser.save();
      
         res.json({ msg: 'Registered successfully' });
     } catch (error) {
         console.error('Error during user registration:', error);
         res.json({ msg: 'Internal server error' });
     }
 };
 



const login = async (req, res) => {
    let user = req.body;

    // Check if the email exists
    const doc = await User.findOne({ email: user.email })
        // Email not found
        if (!doc) {
            return res.json({ msg: "Please check your Email" });
        }

        // Compare passwords
        const pwdResult = await doc.comparePassword(user.password);
        // Passwords do not match
        if (!pwdResult) {
            console.log("here")
            return res.json({ msg: "Please check your Password" }).status(StatusCodes.UNAUTHORIZED);
        }
        const token = jwt.sign({user : doc}, secretKey, { expiresIn: '24h' });

        res.cookie('token', token); 
        res.redirect('/reservation');

    
        // res.json({ msg: "Welcome", token: token });
}


module.exports = {
    register,
    login
  };
  