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

//GET all logs for single user
router.get('/log', function (req, res) {
    var userid = req.user.id;

    LogModel
        .findAll({
            where: { owner_id: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});



//Log POST endpoint (a.k.a. where I hit my roadblock that I could not overcome in time...posting via Postman results in "column "description" of relation "logs" does not exist"".....but why does it say "logs" and not "log"?  Where is it getting "logs" plural?  I've done an entire search of my server-side code for the word "logs", but came up with nothing.)
router.post('/log', (req, res) => {
    //res.send('here is the post')
    var describeField = req.body.log.description;
    var define = req.body.log.definition;
    var theResult = req.body.log.result;
    var theOwner = req.user.id;

    LogModel.create({
            description: describeField,
            definition: define,
            result: theResult,
            owner_id: theOwner
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

});

// /log/:id GET

// UPDATE endpoint
router.put('/log/update/:id', function (req, res) {
    let theOwner = req.user.id;
    let data = req.params.id;
    let description = req.body.log.description;
    let definition = req.body.log.definition;
    let result = req.body.log.result;

    LogModel.update({
        description: description,
        definition: definition,
        result: result
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            res.json({
                description: description,
                definition: definition,
                result: result               
            });
        },
        function updateError(err) {
            res.send(500, err.message);
        }
    )
});


// DELETE endpoint
router.delete('/log/delete/:id', (req, res) => {
    let theOwner = req.user.id;
    let data = req.params.id;

    LogModel.destroy({
        where: {id: data, owner_id: theOwner}
    }).then(
        function deleteSuccess(data) {
            res.json({
                data: data,
                message: 'deleted'
            });
        },
        function createError(err) {
            res.send(404, err.message);
        }
    );
});

module.exports = router;