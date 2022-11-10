const express = require("express");
const router = express.Router();
const {
	login: loginController,
	register: registerController,
} = require("../controllers/auth");

router.route("/login").post(loginController);

router.route("/register").post(registerController);

module.exports = router;
