const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const joiValidation=require("../middlewares/joiValidation");
const createUserSchema=require("../schemas/createUserSchema");
const loginSchema=require("../schemas/loginSchema");
const authenticated=require("../middlewares/authentication");
const restrictTo = require("../middlewares/restrictTo");



// signup
router.post("/signup",joiValidation(createUserSchema), usersController.signUp);

//signin
router.post("/signin",joiValidation(loginSchema), usersController.signIn);

// get all users
router.get("/", authenticated, restrictTo("admin"), usersController.getAllUsers);

// get user by id
router.get("/:id", usersController.getUserById);

// update user
// put => replace user data
// patch => update part of user data
router.patch("/:id", usersController.updateUserById);

// delete user
router.delete("/:id", usersController.deleteUserById);

module.exports = router;
