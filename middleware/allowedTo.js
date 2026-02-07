const appError = require("../utils/appError");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentuser.role)) {
      return next(
        appError.createError('this role is not authorized', 403)
      );
    }
    next();
  };
};
