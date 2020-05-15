//Importing required libraries
const Doctor = require('../../models/doctors');
const jwt = require('jsonwebtoken');
const secretKey = "Az12Eb4Tk5Ty";

//Registration of doctor
module.exports.register = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        //If all required fields are not available
        return res.status(404).json({
            message: "Fill required fields name, email, password"
        });
    }
    //If required fields are available
    try {
        const doctor = await Doctor.findOne({email: req.body.email});
        if(doctor){
            //If email already registered
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        //Creating account for doctor
        Doctor.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        //Registration successful
        return res.status(200).json({
            message: "Doctor Registration Successful",
            data: {
                name: req.body.name,
                email: req.body.email
            }
        });
    } catch (err) {
        //Internal server error
        console.log("Internal server error in registering doctor", err);
        return res.status(500).json({
            message: "Internal server error in registering doctor"
        });
    }
}

//Doctors login
module.exports.login = async(req, res) => {
    //If all required fields are not available
    if(!req.body.email || !req.body.password){
        return res.status(404).json({
            message: "Fill the required fields email & password"
        });
    }
    //If required fields are available
    try {
        const doctor = await Doctor.findOne({email: req.body.email});
        //If email is found and password is correct
        if(doctor && req.body.password === doctor.password){
            //Generate token
            const token = jwt.sign({_id: doctor.id, email: doctor.email}, secretKey, {expiresIn: '1h'});
            //Login Successful
            return res.status(200).json({
                message: "Login Successful",
                token: token
            });
        }else{
            //If email/password is incorrect
            return res.status(406).json({
                message: "Invalid email/password"
            });
        }
    } catch (err) {
        //Internal server error
            console.log('Internal server error in signing in doctor', err);
            return res.status(500).json({
                message: "Internal server error in signing in doctor"
            });
    }
}