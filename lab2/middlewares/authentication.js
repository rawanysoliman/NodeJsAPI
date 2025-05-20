
const APIError = require("./apiError");
const jwt = require("jsonwebtoken");
const util = require("util");


//promisify jwt.sign
const jwtVerify = util.promisify(jwt.verify);

module.exports = async (req, res, next) => {
    //get token from header
    const token = req.headers.authorization;
    if (!token) {
        return next(new APIError("No token provided", 401));
      }
    //split token and get data
    const tokenData=token.split(" ")[1];
    //verify token
    const decoded = await jwtVerify(tokenData, process.env.JWTsecretKey);
    
    //This allows route handlers to access user info via req.user.
    req.user=decoded;


    next();
};


