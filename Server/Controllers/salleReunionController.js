const SalleReunion = require('../Models/SalleReunion');
const User = require('../Models/User');

const { StatusCodes } = require('http-status-codes');



const createSalle = async (req, res) => {
  console.log(req.body)


  req.body.user = req.user.id;
  const salle = await SalleReunion.create(req.body);
  if (salle)
    return res.status(StatusCodes.CREATED).json({ salle });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};



const getAllSalles = async (req, res) => {
  const salles = await SalleReunion.find({ })

  if (salles) 
    return res.status(StatusCodes.OK).json({ salles });
  else
    return res.status(StatusCodes.NOT_FOUND).json({ msg : 'there are no rooms' });


};


const updateSalle = async (req, res) => {
  const { id: salleId } = req.params;
  const { capacite, equipements, disponibilite } = req.body;

  const doc = await SalleReunion.findOne({ _id: salleId },{ new: true });

  if (!doc) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `No room with id ${salleId}`});
  }

  // checkPermissions(req.user, review.user);

  doc.capacite = capacite;
  doc.equipements = equipements;
  doc.disponibilite = disponibilite;

  const UpdatedSalle = await doc.save();
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
