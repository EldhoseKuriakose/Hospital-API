//Importing required libraries
const express = require('express');
//Using express router
const router = express.Router();

//All routes
router.use('/doctors', require('./doctor'));
router.use('/patients', require('./patient'));
router.use('/reports', require('./report'));

//Exporting router
module.exports = router;