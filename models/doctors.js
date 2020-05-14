//Importing required libraries
const mongoose = require('mongoose');

//Creating Schema For Doctor
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }]
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);

//Exporting model Doctor
module.exports = Doctor;
