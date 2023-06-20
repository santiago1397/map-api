const router = require("express").Router();
const Appointment = require("../models/Appointments");

//create appointment
router.post("/", async (req, res) => {
	const newApp = new Appointment(req.body);
	try {
		const savedApp = await newApp.save();
		res.status(201).json(savedApp);
	} catch (err) {
		res.status(500).json(err);
	}
})

//read appointments
router.get("/:id", async (req, res) => {
	try {
		const techAppointments = await Appointment.find({ key: req.body.key, id: req.params.id });
		res.status(201).json(techAppointments);
	} catch (err) {
		res.status(500).json(err);
	}
})

//update appt
router.put("/:apptId", async (req, res) => {
	try {
		const appt = await Appointment.findById(req.params.apptId);
		const newappt = await appt.updateOne({ $set: req.body });
		res.status(200).json(newappt);
	} catch (err) {
		res.status(500).json(err);
	}
})

//delete appt
router.delete("/:apptId", async (req, res) => {
	try {
		const appt = await Appointment.findById(req.params.apptId);
		await appt.deleteOne();
		res.status(200).json("the post has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

//duplicar
router.post("/duplicate/:key", async (req, res) => {
	const appointments = await Appointment.find({ key: req.params.key });
	const newKey = crypto.randomUUID()

	let newAppts = []
	appointments.map((app) => {
		newAppts.push({
			...app,
			key: newKey
		})
	})

	try {
		await Appointment.insertMany(newAppts);
		res.status(201).json(newAppts);
	} catch (err) {
		res.status(500).json(err);
	}
})

async function duplicateAppointments(key, newKey) {
	const appointments = await Appointment.find({ key: key });

	let newAppts = []
	appointments.map((app)=>{
		newAppts.push({
			techname: app.techname,
			address: app.address,
			time: app.time,
			description: app.description,
			key: newKey 
		})
	})

	try {
		await Appointment.insertMany(newAppts);
		console.log(newAppts);
	} catch (err) {
		console.log(err)
	}
	
	return
}

module.exports = { duplicateAppointments }
module.exports = router;