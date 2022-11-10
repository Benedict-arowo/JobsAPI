require("dotenv").config;
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
var bcrypt = require("bcryptjs");

const login = async (req, res) => {
	const { email, password } = req.body;
	// Checks if email and password has been provided.
	if (!email || !password) {
		throw new BadRequestError("Email and Password must be provided!");
	}

	const user = await User.findOne({ email: email });
	// Checks if user exists, and if not throws an error
	if (!user) {
		throw new UnauthenticatedError("Invalid Credientials");
	}

	// Checks if password matches with the one in the db, and if not throws an error.
	const pswdMatch = await user.comparePassword(req.body.password);
	if (!pswdMatch) {
		throw new UnauthenticatedError("Password does not match.");
	}

	token = user.genToken(); // Generates user token.
	res.json({
		user: {
			name: user.name,
			email: user.email,
		},
		token,
	});
};

const register = async (req, res) => {
	const user = await User.create(req.body);
	token = user.genToken();

	res.json({
		user: {
			name: user.name,
			email: user.email,
		},
		token,
	});
};

module.exports = { login, register };
