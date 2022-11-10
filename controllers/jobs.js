const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
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

const deleteJob = async (req, res) => {
	const { id: jobID } = req.params;
	const job = await Jobs.findById(jobID);
	// Checks if the job does not belong to the user trying to delete it.
	if (job.createdBy != req.user.id) {
		throw new BadRequestError("You do not have the required permission.");
	}

	await Jobs.deleteOne(job);
	res.json({ msg: "Success." }).status(StatusCodes.OK);
};

module.exports = { getJobs, getJob, createJob, deleteJob };
