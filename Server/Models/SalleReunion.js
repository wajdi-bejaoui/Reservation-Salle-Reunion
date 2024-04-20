
const mongoose = require("mongoose");

// const equipementSchema = mongoose.Schema({
//         inventory : Number,
//         type :String,
// });

const salleReunionSchema = mongoose.Schema({
        capacite : Number,
        equipements : {
                type : [String],
                default : []
        },
        disponibilite :{
         type : Boolean,
         default : true,
        },
        num: Number
},
{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


// create SalleReunion model
const SalleReunion = mongoose.model("SalleReunion", salleReunionSchema);
// export fichier SalleReunion
module.exports = SalleReunion;