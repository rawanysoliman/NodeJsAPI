const APIError = require("./apiError");

//function that takes roles as a rest parameter and checks if the user has the role
const restricTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new APIError("Forbidden", 403);
      }
      next();
    };
  };
  
  module.exports = restricTo;