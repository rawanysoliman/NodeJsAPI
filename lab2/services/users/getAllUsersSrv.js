const User = require("../../models/users");

const getAllUsersSrv = async () => {
  const users = await User.find();

  return users;
};

module.exports = getAllUsersSrv;
