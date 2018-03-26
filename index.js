const express = require('express');
const keys = require('./config/keys');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('./routes/User');

// declare a new express app
const app = express();
//setting for body parsing the data from URL

// set the app parameters for handling DATA from form
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// declare a new mongoose object for mongodb connection

mongoose.connect(keys.mongodb.dbURI);
mongoose.Promise = global.Promise;

// load routes

app.use('/api/users', User);

//testing the root App

app.get('/', (req, res) => {
  res.send('test');
});

// assign a port to the express app
const PORT = process.env.PORT || 80;
// set the new app to listen on specfic Port

app.listen(PORT);
