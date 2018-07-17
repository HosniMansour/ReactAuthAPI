const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/TrustIT');

const app = express();

// MiddleWare

app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes

app.use('/users',require('./routes/users'));

// Start The Server

const port = process.env.PORT || '5000';
app.listen(port);
console.log('Server Listning at ' + port);