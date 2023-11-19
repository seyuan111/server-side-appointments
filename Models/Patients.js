const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    date: String,
    time: String
})

const PatientModel = mongoose.model('posts', PatientSchema)
module.exports = PatientModel