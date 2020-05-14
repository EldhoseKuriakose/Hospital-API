//Importing required libraries
const express = require('express');
const authenticationMiddleware = require('../../config/authentication-middleware');

//Using express router
const router = express.Router();

//Importing patients_controller
const patientController = require('../../controllers/api/patients_controller');

//Routes through patients_controller API
router.post('/register', authenticationMiddleware.authenticate, patientController.registerPatient);
router.post('/:id/create_report', authenticationMiddleware.authenticate, patientController.createReport);
router.get('/:id/all_reports', authenticationMiddleware.authenticate, patientController.allReports);

//Exporting router
module.exports = router;
