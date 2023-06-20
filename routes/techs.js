const router = require("express").Router();
const Tech = require("../models/Techs");
const AvTech = require("../models/AvTechs")

//create Tech
router.post("/", async (req, res) => {
	const newTech = new Tech(req.body);
	try {
		const savedTech = await newTech.save();
		res.status(201).json(savedTech);
	} catch (err) {
		res.status(500).json(err);
	}
})

//read Techs
router.get("/:key", async (req, res) => {
	try {
		const techs = await Tech.find({ key: req.params.key });
		res.status(201).json(techs);
	} catch (err) {
		res.status(500).json(err);
	}
})

//update Tech
router.put("/:techId", async (req, res) => {
	try {
		const tech = await Tech.findById(req.params.techId);
		await tech.updateOne({ $set: req.body });
		res.status(200).json("the tech has been updated");
	} catch (err) {
		res.status(500).json(err);
	}
})

//delete Tech
router.delete("/:techId", async (req, res) => {
	try {
		const tech = await Tech.findById(req.params.techId);
		await tech.deleteOne();
		res.status(200).json("the tech has been deleted");
	} catch (err) {
		res.status(500).json(err);
	}
});

//pass to available
router.post("/:techId", async (req, res) => {
	try {
		const tech = await Tech.findById(req.params.techId);
		const newAvTech = new AvTech({
			key: tech.key,
			techname: tech.techname,
			address: tech.address
		});
		const savedAvTech = await newAvTech.save();
		res.status(201).json(savedAvTech);
	} catch (err) {
		res.status(500).json(err);
	}
});

//duplicar
router.post("/duplicate/:key", async (req, res) => {
	const techs = await Tech.find({ key: req.params.key });
	const newKey = crypto.randomUUID()

	let newTechs = []
	techs.map((app) => {
		newTechs.push({
			...app,
			key: newKey
		})
	})

	try {
		await Tech.insertMany(newTechs);
		res.status(201).json(newTechs);
	} catch (err) {
		res.status(500).json(err);
	}
})

async function duplicateTechs(key) {
	const techs = await Tech.find({ key: req.params.key });
	const newKey = crypto.randomUUID()

	let newTechs = []
	techs.map((app) => {
		newTechs.push({
			...app,
			key: newKey
		})
	})

	try {
		await Tech.insertMany(newTechs);
		console.log(newTechs);
	} catch (err) {
		console.log(err);
	}
}

module.exports = { duplicateTechs }
module.exports = router;