const mongoose = require("mongoose");

const TechsSchema = new mongoose.Schema(
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
		details: {
			type:String,
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

module.exports = mongoose.models.Tech || mongoose.model("Tech", TechsSchema);