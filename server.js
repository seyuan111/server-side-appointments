const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = 5100;
const PatientModel = require("./Models/Patients")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.Mongo_Data)
    .then(() => console.log("You have successfully connected to Mongodb"))
    .catch(() => console.log("There was an issue connecting to Mongodb"))

app.get('/', (req,res) => {
    PatientModel.find({})
    .then(patients => res.json(patients))
    .catch(err => res.json(err))
})

app.get('/updateAppointment/:id', (req,res) => {
    const id = req.params.id;
    PatientModel.findById({_id:id})
    .then(patients => res.json(patients))
    .catch(err => res.json(err))
})

app.put("/updatePatient/:id", (req,res) => {
    const id = req.params.id;
    PatientModel.findByIdAndUpdate({_id:id}, {name: req.body.name, phone: req.body.phone, email: req.body.email, date: req.body.date, time: req.body.time})
    .then(patients => res.json(patients))
    .catch(err => res.json(err))
})

app.delete("/deleteAppointment/:id", (req,res) => {
    const id = req.params.id;
    PatientModel.findByIdAndDelete({_id:id})
    .then(patients => res.json(patients))
    .catch(err => res.json(err))
})

app.post("/createAppointment", (req,res) => {
    PatientModel.create(req.body)
    .then(patients => res.json(patients))
    .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})