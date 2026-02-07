const jwt = require('jsonwebtoken');
const appError = require("../utils/appError");

const verfiytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(
      appError.createError(
        'You are not logged in, please login first',
        401
      )
    );
  }

  const token = authHeader.split(' ')[1];

  const currentuser = jwt.verify(token, process.env.JWT_SECRET);
  req.currentuser = currentuser;

  next();
};

module.exports = verfiytoken;
