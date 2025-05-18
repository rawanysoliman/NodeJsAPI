const User = require("../../models/users");
const APIError = require("../../middlewares/apiError");

const createUserSrv = async ({ name, email, password, passwordConfirm }) => {
  if (!name || !email || !password || !passwordConfirm) {
    throw new APIError("missing user data", 400);
  }

  if (password !== passwordConfirm) {
    throw new APIError("passwords do not match", 400);
  }

  const user = await User.create({ name, email, password });

  return user;
};

module.exports = createUserSrv;
