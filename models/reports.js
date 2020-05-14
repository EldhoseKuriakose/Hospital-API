//Importing required libraries
const mongoose = require('mongoose');

//Creating Schema For Report
const reportSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    }
}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

//Exporting model report
module.exports = Report;