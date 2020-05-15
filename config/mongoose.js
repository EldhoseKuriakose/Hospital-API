//require library
const mongoose = require('mongoose');

//To fix all deprecation warnings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to the database
mongoose.connect('mongodb://localhost/HospitalAPI');


//acquire the connection to check if it is successful
const db = mongoose.connection;


//error in connecting to database
db.on('error', console.error.bind(console, 'error connecting to db'));


//up and running the print message
db.once('open', function(){
    console.log('Successfully connected to the database');
});

module.exports = db;