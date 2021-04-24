const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

router.post("/login", UserController.loginUser);
router.post("/signup", UserController.createUser);

module.exports = router;
