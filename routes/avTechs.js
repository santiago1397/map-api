const router = require("express").Router();
const AvTech = require("../models/AvTechs");
const Appointment = require("../models/Appointments")
var mongoose = require('mongoose');

//create avTech
router.post("/", async (req, res) => {
	const newAvTech = new AvTech(req.body);

	try {
		const savedAvTech = await newAvTech.save();
		res.status(201).json(savedAvTech);
	} catch (err) {
		res.status(500).json(err);
	}
})

//get all avTechs
router.get("/", async (req, res) => {

})

//read AvTechs
router.get("/:key", async (req, res) => {
	try {
		const avTechs = await AvTech.find({ key: req.params.key });
		const aux = []

		avTechs.forEach(async (item, index) => {
			const appts = await Appointment.find({ techname: item.id })

			const aux1 = item.currentJob.match(/[\x00-\x7F]/g)
			const aux2 = [...new Set(aux1)]
			let lmao
			if ((aux2.length === 1) && (aux2.includes(' ') || aux2.includes('\n'))) {
				aux.push({ ...item._doc, appts: appts })
			} else if ((aux2.length === 2) && (aux2.includes(' ') && aux2.includes('\n'))) {
				aux.push({ ...item._doc, appts: appts })
			} else if (item.currentJob == "") {
				aux.push({ ...item._doc, appts: appts })
			} else {
				aux.unshift({ ...item._doc, appts: appts })
			}
			console.log()

			if (aux.length === avTechs.length) {
				// we are done! :D
				res.status(200).json(aux);
			}
		})


	} catch (err) {
		res.status(500).json(err);
	}
})

//update avTech
router.put("/:avTechId", async (req, res) => {
	try {
		const avTech = await AvTech.findById(req.params.avTechId);
		await avTech.updateOne({ $set: req.body });
		res.status(200).json("the available tech has been updated");
	} catch (err) {
		res.status(500).json(err);
	}
})

//delete avtech
router.delete("/:avTechId", async (req, res) => {
	try {
		const avTech = await AvTech.findById(req.params.avTechId);
		await avTech.deleteOne();
		res.status(200).json("the available tech has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

//duplicar
router.post("/duplicate/:key", async (req, res) => {
	const avTech = await AvTech.find({ key: req.params.key });
	const newKey = crypto.randomUUID()

	let newAvTechs = []
	avTech.map((app) => {
		newAvTechs.push({
			...app,
			key: newKey
		})
	})

	try {
		await AvTech.insertMany(newAvTechs);
		res.status(201).json(newAvTechs);
	} catch (err) {
		res.status(500).json(err);
	}
})

async function duplicateAvTechs(key) {
	const avTech = await AvTech.find({ key: req.params.key });
	const newKey = crypto.randomUUID()

	let newAvTechs = []
	avTech.map((app) => {
		newAvTechs.push({
			...app,
			key: newKey
		})
	})

	try {
		await AvTech.insertMany(newAvTechs);
		console.log(newAvTechs);
	} catch (err) {
		console.log(err);
	}
}

module.exports = { duplicateAvTechs }
module.exports = router;