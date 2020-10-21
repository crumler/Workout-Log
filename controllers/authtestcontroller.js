var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var AuthTestModel = sequelize.import('../models/authtest');

//GET all items for single user
router.get('/getall', function (req, res) {
    var userid = req.user.id;

    AuthTestModel
        .findAll({
            where: { owner: userid }
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

//POST single item for single user
router.post('/create', function (req, res) {
    var owner = req.user.id;
    var authTestData = req.body.authtestdata.item;

    AuthTestModel   .create({
        authtestdata: authTestData,
        owner: owner
    })
    .then(function createSuccess(authtestdata) {
        res.json({
            authtestdata: authtestdata
        });
    },
    function createError(err) {
        res.send(500, err.message);
    }
    );
});

//GET single item for single user
router.get('/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
        findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

// DELETE item for single user
router.delete('/delete/:id', function(req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    AuthTestModel
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data){
                res.send("You have removed an item");
            },
            function deleteLogError(err) {
                res.send(500, err.message);
            }
        );
});


//UPDATE item for single user
router.put('/update/:id', function(req, res) {
    var data = req.params.id;
    var authtestdata = req.body.authtestdata.item;

    AuthTestModel
        .update({
            authtestdata: authtestdata
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    authtestdata: authtestdata
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

module.exports = router;