const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema(
	{
		key: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.models.Account || mongoose.model("Account", AccountSchema);
