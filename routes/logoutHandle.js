var express = require('express');
const Cookies = require("cookies");
const db = require('../models');
const Sequelize = require("sequelize");
var router = express.Router();
// const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.login) {
        req.session.login = false;
        res.render('logout', {title: 'Successful post', message: "You have logged out!"})
    }
    res.render('index', { title: 'Second Hand' });
});


module.exports = router;
