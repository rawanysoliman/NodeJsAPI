const User = require("../models/users");
const APIError = require("../middlewares/apiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
const crypto = require("crypto");

//promisify jwt.sign
const signToken = util.promisify(jwt.sign);

const signInSrv = async ({ email, password }) => {

    //find user in db
    const user = await User.findOne({ email });
    if (!user) {
        throw new APIError("Invalid email", 401);
    }

    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new APIError("Invalid password", 401);
    }

  //generate jwt token
  const token = await signToken(
    {userId: user._id,role:user.role },
      process.env.JWTsecretKey,
       { expiresIn: "1h" }
    );

    // const signedinUser=user.toObject();
    // delete signedinUser.password;
    // return signedinUser;

    return token;

};

module.exports = signInSrv;





// generateRandomText = (length) => {
//   return crypto.randomBytes(length).toString("hex");

// };
// const randomText=generateRandomText(64);
// console.log(randomText);

