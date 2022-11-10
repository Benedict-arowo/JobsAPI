const express = require("express");
const router = express.Router();
const { getJobs, getJob, createJob } = require("../controllers/jobs");

router.route("/").post(createJob).get(getJobs);
router.route("/:id").get(getJob);

module.exports = router;
