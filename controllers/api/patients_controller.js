//Importing required libraries
const Doctor = require('../../models/doctors');
const Patient = require('../../models/patients');
const Report = require('../../models/reports');

//Registering Patient
module.exports.registerPatient = async (req, res) => {
    //If all required fields are not available
    if(!req.body.name || !req.body.phone){
        return res.status(404).json({
            message: "Fill the required fields name and phone number of patient"
        });
    }
    //If all required fields are available
    try {
        //Searching patient with phone number
        const patient = await Patient.findOne({phone: req.body.phone});
        //If patient found
        if(patient){
            return res.status(200).json({
                patient: patient
            });
        }
        //If patient not found search for doctor
        const doctor = await Doctor.findOne({_id: req.doctor});
        if(doctor){
            //If doctor found create patient
            const newPatient = await Patient.create({
                name: req.body.name,
                phone: req.body.phone,
                doctor: req.user
            });
            //Save patient to doctor model
            doctor.patients.push(newPatient);
            doctor.save();
            return res.status(200).json({
                patient: req.body.phone._id,
                message: "Patient registration successful"
            });
        }else{
            return res.status(404).json({
                message: "Doctor not found"
            });
        }
    } catch (err) {
        console.log("Internal server error in registering patient", err);
        return res.status(500).json({
            message: "Internal server error in registering patient"
        });
    }
}

//Create Report For Patient
module.exports.createReport = async (req, res) => {
    //If status not available
    if(!req.body.status){
        return res.status(404).json({
            message: "Required field(status) not found"
        });
    }
    try {
        //If status available and it is valid
        const report = Report.schema.path('status').enumValues.includes(req.body.status);
        if(report){
            //If report found
            const patient = await Patient.findOne({_id: req.params.id});
            if(patient){
                //If patient found
                const doctor = await Doctor.findOne({_id: req.user});
                if(doctor){
                    //If doctor found create new report
                    const newReport = await Report.create({
                        doctor: doctor,
                        patient: patient,
                        status: req.body.status
                    });

                    //Save report to patient model
                    patient.reports.push(newReport);
                    patient.save();
                    return res.status(200).json({
                        message: "Report created successfully",
                        report: {
                        doctor_name: doctor.name,
                        patient_name: patient.name,
                        status_of_report: req.body.status
                        }
                    });
                }else{
                    return res.status(404).json({
                        message: "Doctor Not Found"
                    });
                }
            }else{
                return res.status(404).json({
                    message: "Patient Not Found"
                });
            }
        }else{
            //Invalid status
            return res.status(406).json({
                message: "Invalid Status"
            });
        }
    } catch (err) {
        console.log("Internal server error in creating report", err);
        return res.status(500).json({
            message: "Internal server error in creating report"
        });
    }
}

//Get all reports of the patient
module.exports.allReports = async (req, res) => {
    try {
        const patient = await (await Patient.findOne({_id: req.params.id}))
                        .populate({path: 'reports', options: {sort: {createdAt: -1}},
                        populate: [{path: 'doctor', select: '_id name'},
                        {path: 'patient', select: '_id name'}]});
        if(patient){
            //If patient found, return reports of the patient
            return res.status(200).json({
                Patient_name: patient.name,
                Reports: patient.reports
            });
        }else{
            return res.status(404).json({
                message: "Patient Not Found"
            });
        }
    } catch (err) {
        console.log("Internal server error in getting reports", err);
        return res.status(500).json({
            message: "Internal server error in getting reports"
        });
    }
}