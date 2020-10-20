var express = require('express')
var router = express.Router()
//var sequelize = require('../db');

router.get('/', function (req, res) {
    res.send('HEYY!  This is a test route!');
});

router.get('/about', function (req, res) {
    res.send('This is an about route!');
});

router.get('/contact', function (req, res) {
    res.send('Contact route here!');
});

module.exports = router;