const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema(
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
		time: {
			type: String,
			default: ""
		},
		description: {
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

module.exports = mongoose.models.Appointments || mongoose.model("Appointments", AppointmentsSchema);
