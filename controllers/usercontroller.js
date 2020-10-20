var express = require('express')
var router = express.Router()
var sequelize = require('../db');
var User = require('../models/user')(sequelize, require("sequelize"));  //USE THIS AND NOT "IMPORT"
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


//User/Register POST endpoint
router.post('/register', (req, res) => {
    var username = req.body.user.username;
    var pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)

    }).then(
        function createSuccess(user){

            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            
            res.json({
                user: user,
                message: 'created',
                sessionToken: token
            });
        })
    },
        function createError(err) {
            res.send(500, err.message);
});

//User/Login POST endpoint

router.post('/login', (req, res) => {
    User.findOne( { where: { username: req.body.user.username } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function (err, matches) {
                    if(matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({
                            user: user,
                            message: "Logged in successfully!",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "502: Incorrect password"});
                    }
                });
            } else {
                res.status(500).send({ error: "500: User does not exist"});
            }
        },
        function (err) {
            res.status(501).send({error: "501: Login failed"});
        }
    );
});


module.exports = router;