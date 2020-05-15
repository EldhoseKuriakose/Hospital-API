//Importing required libraries
const Report = require('../../models/reports');

//Get all reports by given status
module.exports.reportByStatus = async (req, res) => {
    try {
        const report = await Report.schema.path('status').enumValues.includes(req.query.status);
        //If report found
        if(report){
            const reports = await Report.find({status: req.query.status})
                                        .sort({createdAt: -1})
                                        .populate('doctor')
                                        .populate('patient');
            if(reports.length == 0){
                //No reports with given status
                return res.status(200).json({
                    message: "No reports found with given status"
                });
            }
            let answer = [];
            // Getting Doctor And Patient Details
            for (let i = 0; i < reports.length; i++) {
                let patient = {};
                patient.name = reports[i].patient.name;
                patient.phone = reports[i].patient.phone;
                answer.push({
                    doctor: reports[i].doctor.name,
                    patient: patient
                });
            }
            //Return reports
            return res.status(200).json({
                message: "Reports with status " + req.query.status,
                reports: answer
            });
        }else{
            return res.status(406).json({
                message: "Invalid Status"
            });
        }
    } catch (err) {
        console.log("Internal server error in getting report", err);
        return res.status(500).json({
            message: "Internal server error in getting report"
        });
    }
}