//Importing required libraries
const express = require('express');

//Using express router
const router = express.Router();

//Importing reports_controller
const reportController = require('../../controllers/api/reports_controller');

//Routes through reports_controller API
router.get('/:status', reportController.reportByStatus);

//Exporting router
module.exports = router;