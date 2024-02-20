var express = require('express');
const Cookies = require("cookies");
const db = require('../models');
const Sequelize = require("sequelize");
var router = express.Router();
// const bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Second Hand' });
});

router.post('/', (req, res) => {
    const {login, password} = req.body;
    db.User.findOne({
        where: {login: login, password: password},
    }).then(user => {
        if (user) {
            req.session.login = true;
            req.session.userName = login;
            req.session.userPassword = password;
            res.render('admin', {title: 'Admin'});
        }
        else{
            req.session.login = false;
            res.render('login', {title: 'Login', message: 'Admin not found', err: true});
        }
    }).catch((err) => {
        // extensive error handling can be done here - you don't always need such a detailed error handling
        if (err instanceof Sequelize.ValidationError) {
            res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
        } else if (err instanceof Sequelize.DatabaseError) {
            res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
        } else {
            res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err} `});
        }
    })
});

module.exports = router;
