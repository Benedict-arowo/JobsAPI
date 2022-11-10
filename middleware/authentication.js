require("dotenv").config();
const jwt = require("jsonwebtoken");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
	let userToken = req.headers.authorization;
	if (!userToken || !userToken.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Invalid Token");
	}
	userToken = userToken.split(" ")[1];

	try {
		const decoded = await jwt.verify(userToken, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		console.log(error);
		throw new UnauthenticatedError("Invalid Token");
	}
};

module.exports = auth;
