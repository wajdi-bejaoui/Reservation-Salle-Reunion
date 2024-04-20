const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes')
const secretKey = process.env.JWT_SECRET;

const isTokenValid = ( token ) => jwt.verify(token, secretKey);


const authenticateUser = async (req, res, next) => {
  

  // check cookies
  const token = req.cookies.token;

  if (!token) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({msg:"Authentication invalid"}).status(StatusCodes.UNAUTHORIZED);
  }


  try {
    const payload = await isTokenValid(token);
    // console.log(payload)
    req.user = {
      id: payload.user.id,
      role: payload.user.role
    };

    next();
    // console.log("here")
  } catch (error) {
    // throw new CustomError.UnauthenticatedError('Authentication invalid');
    return res.json({error});
  }
};



module.exports = {
  authenticateUser,
};
