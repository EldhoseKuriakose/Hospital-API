//Importing required libraries
const express = require('express');

//Using express router
const router = express.Router();
//Importing doctors_controller
const doctorController = require('../../controllers/api/doctors_controller');

//Routes through doctors_controller API
router.post('/register', doctorController.register);
router.post('/login', doctorController.login);

//Exporting router
module.exports = router;