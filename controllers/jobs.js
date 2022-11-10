const { StatusCodes } = require("http-status-codes");
const Jobs = require("../models/Job");
const User = require("../models/User");

const getJobs = async (req, res) => {
	const { id: userID } = req.user;
	const jobs = await Jobs.find({ createdBy: userID });
	res.json({ count: jobs.length, jobs }).status(StatusCodes.OK);
};

const getJob = async (req, res) => {
	const { id: userID } = req.user;
	const { id: jobID } = req.params;
	const job = await Jobs.findOne({ createdBy: userID, _id: jobID });
	res.json(job).status(StatusCodes.OK);
};

const createJob = async (req, res) => {
	const job = Jobs.create({ ...req.body, createdBy: req.user.id });
	res.json(req.body).status(StatusCodes.CREATED);
};

module.exports = { getJobs, getJob, createJob };
