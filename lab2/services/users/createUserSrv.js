const User = require("../../models/users");
const APIError = require("../../middlewares/apiError");
const bcrypt = require("bcrypt");

//remove validation bec it is done in validation middleware
//must hash password and save it in db after user is created
const createUserSrv = async ({ name, email, password, role }) => {
  const saltRounds = parseInt(process.env.saltRounds);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role, 
  });

  // remove password from response
  const createdUser = user.toObject();
  delete createdUser.password;
  return createdUser;
};


module.exports = createUserSrv;


