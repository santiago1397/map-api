const express = require('express');
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const techsRoute = require("./routes/techs")
const accRoute = require("./routes/acc")
const avTechsRoute = require("./routes/avTechs")
const apptsRoute = require("./routes/appts")
const cors = require('cors');

dotenv.config()

async function connect() {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
}

connect();

const app = express()



//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());


app.use("/api/acc", accRoute)
app.use("/api/techs", techsRoute)
app.use("/api/avtechs", avTechsRoute)
app.use("/api/appts", apptsRoute)

app.get("/", (req, res) => {
    res.send("Welcome to tech-map api")
})

app.listen(process.env.PORT || 8800, () => {
    console.log("Backend server is running on port", process.env.PORT || 8800)
})