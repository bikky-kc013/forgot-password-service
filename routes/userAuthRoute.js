const express = require("express");
const userAuthRouter  = express.Router();
const { addUser, forgetUsers, resetPassword } = require("../controllers/userAuth");

userAuthRouter.post("/register",addUser);
userAuthRouter.post("/forgot", forgetUsers);
userAuthRouter.post("/resetpassword", resetPassword);


module.exports = { userAuthRouter };
