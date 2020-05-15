//Importing libraries
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/api/index');
const port  = 8000;
const db = require('./config/mongoose');

//Creating app from express
const app = express();

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

//use express router
app.use('/', router);


//Server listening to port
app.listen(port, function(err){
    if(err){
        console.log(`Error:, ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});