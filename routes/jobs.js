const express = require("express");
const router = express.Router();
const {
	getJobs,
	getJob,
	createJob,
	editJob,
	deleteJob,
} = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);
router.route("/:id").get(getJob).patch(editJob).delete(deleteJob);

module.exports = router;
