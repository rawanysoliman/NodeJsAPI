const User = require("../../models/users");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");


const deleteUserByIdSrv = async (id) => {
  if (!isValidObjectId(id)) {
    throw new APIError("Invalid Id", 400);
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    throw new APIError("user not found", 404);
  }

  return;
};

module.exports = deleteUserByIdSrv;
