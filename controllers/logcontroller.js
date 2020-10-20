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

//Log POST endpoint (a.k.a. where I hit my roadblock that I could not overcome in time...posting via Postman results in "column "description" of relation "logs" does not exist"".....but why does it say "logs" and not "log"?  Where is it getting "logs" plural?  I've done an entire search of my server-side code for the word "logs", but came up with nothing.)
router.post('/log', (req, res) => {
    //res.send('here is the post')
    var describeField = req.body.log.description;
    var define = req.body.log.definition;
    var theResult = req.body.log.result;
    //var theOwner = req.body.log.owner_id;

    LogModel.create({
            description: describeField,
            definition: define,
            result: theResult
            //owner_id: theOwner
    }).then(
        function createSuccess(log) {
            res.json({
                log: log,
                message: 'created'
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
        // }).then(dataFromDatabase => {
        //     res.send('Data submitted successfully!')
        // })
});

module.exports = router;