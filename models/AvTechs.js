const mongoose = require("mongoose");

const AvTechsSchema = new mongoose.Schema(
	{
		key: {
			type: String,
			default: ""
		},
		techname: {
			type: String,
			default: ""
		},
		address: {
			type: String,
			default: ""
		},
		currentJob:{
			type: String,
			default: ""
		},
		lat: {
			type: String,
			default: ""
		},
		lon: {
			type: String,
			default: ""
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.models.AvTech || mongoose.model("AvTech", AvTechsSchema);