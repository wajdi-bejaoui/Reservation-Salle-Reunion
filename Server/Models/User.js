//import mongoose
const bcrypt = require ("bcrypt");
const mongoose = require("mongoose");
const jwt = require ("jsonwebtoken");

const userSchema = mongoose.Schema({
        fullname:{
         type:String,
        },
        password : String,
        email:{
         type : String,
         unique:true
        },
        role : {
         type: String,
         enum: ['admin', 'user'],
         default: 'user',
        },
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


userSchema.pre('save', async function () {
        this.password = await bcrypt.hash(this.password, 10);
      })

      
userSchema.methods.comparePassword = async function (canditatePassword) {
        const pwdResult = bcrypt.compareSync(canditatePassword, this.password);
        return pwdResult
      }


// create user model
const User = mongoose.model("User", userSchema);
// export fichier user
module.exports = User;