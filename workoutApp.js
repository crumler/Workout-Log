require('dotenv').config();

var express = require('express');
var app = express();
var main = require('./controllers/usercontroller');
var log = require('./controllers/logcontroller');
var sequelize = require('./db');

sequelize.sync();

app.use(express.json());

app.use(require('./middleware/headers'));

app.use('/user', main);
app.use('/log', log);


app.listen(3500, function() {
    console.log('Guess what?  WorkOut App is listening on 3500!')
});