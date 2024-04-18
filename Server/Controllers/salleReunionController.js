const SalleReunion = require('../Models/SalleReunion');
const User = require('../Models/User');

const { StatusCodes } = require('http-status-codes');



const createSalle = async (req, res) => {
  console.log(req.body)

  const salle = await SalleReunion.create(req.body);
  if (salle)
    return res.status(StatusCodes.CREATED).json({ salle });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};



const getAllSalles = async (req, res) => {
  const salles = await SalleReunion.find({ })
  // console.log(salles)

  if (salles) 
    // return res.status(StatusCodes.OK).json({ salles });
    res.render('SalleReunion/ListSalleReunion', { list : salles });
  else
    // return res.status(StatusCodes.NOT_FOUND).json({ msg : 'there are no rooms' });
    res.render('SalleReunion/ListSalleReunion', { list : [] });


};


const updateSalle = async (req, res) => {
  const { id: salleId } = req.params;
  const { capacite, equipements, disponibilite } = req.body;

  const salleReunion = await SalleReunion.findOne({ _id: salleId });

  if (!salleReunion) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No room with id ${salleId}`});
  }

  // checkPermissions(req.user, review.user);

  salleReunion.capacite = capacite;
  salleReunion.equipements = equipements;
  salleReunion.disponibilite = disponibilite;

  const UpdatedSalle = await salleReunion.save();
  if (UpdatedSalle)
    return res.status(StatusCodes.OK).json({ salle : UpdatedSalle });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
};

const deleteSalle = async (req, res) => {
  const { id: salleId } = req.params;

  const salle = await SalleReunion.findOne({ _id: salleId });

  if (!salle) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: `No salle with id ${salleId}`});
  }

  // checkPermissions(req.user, review.user);
  try {
    console.log(salle)

    await salle.remove();
  }catch(error) {
    res.json({ error });
  }
  res.status(StatusCodes.OK).json({ salle });
};


module.exports = {
  createSalle,
  getAllSalles,
  updateSalle,
  deleteSalle,
};
