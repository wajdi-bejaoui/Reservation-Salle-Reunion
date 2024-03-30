const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes')

const isTokenValid = ( token ) => jwt.verify(token, "your-secret-key");


const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  }
//
  // // check cookies
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  if (!token) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({msg:"Authentication invalid"}).status(StatusCodes.UNAUTHORIZED);
  }


  try {

    const payload = await isTokenValid(token);


    req.user = {
      id: payload.id,
      role: payload.role
    };

    next();
  } catch (error) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({error});
  }
};



module.exports = {
  authenticateUser,
};
