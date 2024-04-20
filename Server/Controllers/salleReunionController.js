const SalleReunion = require('../Models/SalleReunion');
const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');



const createSalle = async (req, res) => {
  console.log(req.body)

  const salle = await SalleReunion.create(req.body);
  if (salle)
    return res.redirect('/ListSalleReunion');
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};


const getSalle = async (req, res) => {
  
  const salles = await SalleReunion.findOne({ _id : req.params.id})
  // console.log(salles)

  if (salles) 
    // return res.status(StatusCodes.OK).json({ salles });
    res.render('SalleReunion/ListSalleReunion', { list : salles,user });
  else
    // return res.status(StatusCodes.NOT_FOUND).json({ msg : 'there are no rooms' });
    res.render('SalleReunion/ListSalleReunion', { list : [] });


};


const getAllSalles = async (req, res) => {
  const token = req.cookies.token;
    let user = null;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      user = {
        userId: decodedToken.user._id,
        role: decodedToken.user.role
      };
    }
    console.log(user)
  const salles = await SalleReunion.find({ })
  // console.log(salles)

  if (salles) 
    // return res.status(StatusCodes.OK).json({ salles });
    res.render('SalleReunion/ListSalleReunion', { list : salles,user });
  else
    // return res.status(StatusCodes.NOT_FOUND).json({ msg : 'there are no rooms' });
    res.render('SalleReunion/ListSalleReunion', { list : [] });


};


const updateSalle = async (req, res) => {
  const { id: salleId } = req.params;
  const { capacite, equipements, disponibilite, num } = req.body;

  const salleReunion = await SalleReunion.findOne({ _id: salleId });

  if (!salleReunion) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No room with id ${salleId}`});
  }

  // checkPermissions(req.user, review.user);

  salleReunion.capacite = capacite;
  salleReunion.equipements = equipements;
  salleReunion.disponibilite = disponibilite;
  salleReunion.num = num;

  const UpdatedSalle = await salleReunion.save();
  if (UpdatedSalle)
  return res.redirect('/ListSalleReunion');
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
};

const deleteSalle = async (req, res) => {
  console.log("in delete")
  const { id: salleId } = req.params;
  console.log(salleId)
  try {
    const salle = await SalleReunion.findByIdAndDelete(salleId)
    res.redirect('/ListSalleReunion');
  } catch (error) {
    return res.status(404).json({ message: "false id" });
  }
  
};


module.exports = {
  createSalle,
  getAllSalles,
  updateSalle,
  deleteSalle,
};
