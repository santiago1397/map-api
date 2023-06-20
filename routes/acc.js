const router = require("express").Router();
const Account = require("../models/Account");
const Appointment = require("../models/Appointments");
const Tech = require("../models/AvTechs");
const AvTech = require("../models/Techs");
const crypto = require('crypto');


//create acc
router.post("/", async (req, res) => {

  const found = await Account.find({key: req.body.key})

  try {
    if (found.length > 0) {
      res.status(202).json("user exists");
    }else{
      const newAcc = new Account(req.body);
      const savedAcc = await newAcc.save();
      res.status(201).json(savedAcc);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//validate key
router.get("/:key", async (req, res) => {
  try {
    const acc = await Account.find({ key: req.params.key });

    console.log(acc)
    if (acc[0]) {
      res.status(200).json(acc);
    }else{
      res.status(202).json("err");
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

//duplicate acc
router.post("/duplicate/:key", async (req, res) => {
  const newKey = crypto.randomUUID()
  const duplicate = new Account({
    key: newKey
  })

  const appointments = await Appointment.find({ key: req.params.key });
  const techs = await Tech.find({ key: req.params.key });
  const avTechs = await AvTech.find({ key: req.params.key });

  let newAppts = []
  appointments.map((app) => {
    newAppts.push({
      techname: app.techname,
      address: app.address,
      time: app.time,
      description: app.description,
      lat: app.lat,
      lon: app.lon,
      key: newKey
    })
  })

  let newTechs = []
  techs.map((app) => {
    newTechs.push({
      techname: app.techname,
      address: app.address,
      details: app.time,
      lat: app.lat,
      lon: app.lon,
      key: newKey
    })
  })

  let newAvTechs = []
  avTechs.map((app) => {
    newAvTechs.push({
      techname: app.techname,
      address: app.address,
      time: app.time,
      currentJob: app.currentJob,
      lat: app.lat,
      lon: app.lon,
      key: newKey
    })
  })

  try {
    await Appointment.insertMany(newAppts);
    await Tech.insertMany(newTechs);
    await AvTech.insertMany(newAvTechs);
    const savedAcc = await duplicate.save();
    res.status(201).json(savedAcc);
  } catch (err) {
    res.status(500).json(err);
  }

})


module.exports = router;