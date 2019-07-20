const express = require('express'),
      app = express(),
      port = 3000,
      bodyParser = require('body-parser'),
      router = require('./routes/test'),
      mongoose = require('mongoose'); //Import mongoose module..
/** ---support parsing of application/json type post data--- */
app.use(bodyParser.json());
/** ---support parsing of application/x-www-form-urlencoded post data--- */
app.use(bodyParser.urlencoded({ extended: true}));

/**---connect monngo connection--- */
const mongoDb = 'mongodb://localhost:27017/hotelBooking';
mongoose.connect(mongoDb, function( error) {
    if(error) throw error;
    console.log("Successfull connected");
});
const db = mongoose.connection;
/**---Bind connection to error event (to get notification of connection errors)--- */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/', router);
/*** ----allow access allow origin---- */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    next();
  });


/** -------create a port------- */
app.listen(port , () => {
    console.log('sever port number is ', port);
})

module.exports = router;