const User = require("../../models/users");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");

const updateUserByIdSrv = async (id, name) => {
  if (!isValidObjectId(id)) {
    throw new APIError("Invalid Id", 400);
  }

  const user = await User.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true }
  );
  if (!user) {
    throw new APIError("user not found", 404);
  }

  return user;
};

module.exports = updateUserByIdSrv;
