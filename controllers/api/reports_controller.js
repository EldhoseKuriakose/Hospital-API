//Importing required libraries
const Report = require('../../models/reports');

//Get all reports by given status
module.exports.reportByStatus = async (req, res) => {
    try {
        const report = Report.schema.path('status').enumValues.includes(req.body.status);
        //If report found
        if(report){
            const reports = await Report.find({status: req.params.status})
                                        .sort({createdAt: -1})
                                        .populate({path: 'doctor', select: '_id name'})
                                        .populate({path: 'patient', select: '_id name'});
            if(reports.length == 0){
                //No reports with given status
                return res.status(200).json({
                    message: "No reports found with given status"
                });
            }
            //Return reports
            return res.status(200).json({
                status: req.params.status,
                reports: reports
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