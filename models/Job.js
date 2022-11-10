const express = require("express");
const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema(
	{
		company: {
			type: String,
			required: [true, "Please provide company name"],
			maxlength: 50,
		},
		position: {
			type: String,
			required: [true, "Please provide position"],
			maxlength: 100,
		},
		status: {
			type: String,
			enum: ["interview", "declined", "pending"],
			default: "pending",
		},
		createdBy: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide user"],
		},
	},
	{ timestamps: true }
);

// jobsSchema.pre("save", function () {
// 	this.createdBy = req.user.id;
// });

module.exports = mongoose.model("Jobs", jobsSchema);
