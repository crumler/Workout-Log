var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var LogModel = sequelize.import('../models/log');

//Log GET endpoint
router.get('/', (req, res) => {
    res.send("Entryway")
});

router.get('/log', (req, res) => {
    res.send("Log GET Test successful")
});

//Log POST endpoint (a.k.a. where I hit my roadblock that I could not overcome in time)
router.post('/log', (req, res) => {
    //res.send('here is the post')
    var describeField = req.body.log.description;
    var define = req.body.log.definition;
    var theResult = req.body.log.result;
    //var theOwner = req.body.log.owner_id;

    LogModel
        .create({
            description: describeField,
            definition: define,
            result: theResult
            //owner_id: theOwner
        }).then(dataFromDatabase => {
            res.send('Data submitted successfully!')
        })
});

module.exports = router;