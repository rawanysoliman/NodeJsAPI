const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");


router.post("/", usersController.createUser);

// get all users
router.get("/", usersController.getAllUsers);

// get user by id
router.get("/:id", usersController.getUserById);

// update user
// put => replace user data
// patch => update part of user data
router.patch("/:id", usersController.updateUserById);

// delete user
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
