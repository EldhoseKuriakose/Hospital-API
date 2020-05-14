//Importing required libraries
const mongoose = require('mongoose');

//Creating Schema For Patients
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

//Exporting model Patient
module.exports = Patient;