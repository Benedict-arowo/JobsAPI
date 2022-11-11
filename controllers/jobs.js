const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const Jobs = require("../models/Job");
const User = require("../models/User");

const getJobs = async (req, res) => {
	const { id: userID } = req.user;
	// Gets all the jobs the current user has.
	// Sort by time they were updated, and time created.
	const jobs = await Jobs.find({ createdBy: userID }).sort(
		"-updatedAt -createdAt"
	);
	res.json({ count: jobs.length, jobs }).status(StatusCodes.OK);
};

const getJob = async (req, res) => {
	const { id: jobID } = req.params;
	// Gets jobs who matches the given id, and has been created by the current user.
	const job = await Jobs.findOne({ createdBy: req.user.id, _id: jobID });
	res.json({ job }).status(StatusCodes.OK);
};

const createJob = async (req, res) => {
	const job = await Jobs.create([{ ...req.body, createdBy: req.user.id }]);
	res.json(job[0]).status(StatusCodes.CREATED);
};

const editJob = async (req, res) => {
	const { id: jobID } = req.params;
	// Checks for jobs who matches the given id, and has been created by the current user.
	const job = await Jobs.findOneAndUpdate(
		{ _id: jobID, createdBy: req.user.id },
		req.body,
		{
			new: true,
			runValidators: true,
		}
	);
	// If it can't find the job. (A user trying to access another person's job or invalid ids)
	if (!job) {
		throw new BadRequestError(`No job with id ${jobID}`);
	}
	res.json({ job }).status(StatusCodes.OK);
};

const deleteJob = async (req, res) => {
	const { id: jobID } = req.params;
	// Checks for jobs who matches the given id, and has been created by the current user.
	const job = await Jobs.findOneAndDelete({
		_id: jobID,
		createdBy: req.user.id,
	});
	// If it can't find the job. (A user trying to access another person's job or invalid ids)
	if (!job) {
		throw new BadRequestError(`No job with id ${jobID}`);
	}

	res.json({ msg: "Success." }).status(StatusCodes.OK);
};

module.exports = { getJobs, getJob, createJob, editJob, deleteJob };
