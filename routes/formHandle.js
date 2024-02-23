let express = require('express');
let router = express.Router();
const Sequelize = require('sequelize');
const db = require('../models');
const {DataTypes} = require("sequelize");
const Cookies = require('cookies')

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Second Hand' });
});

router.post('/add', (req, res) => {
    const keys = ['keyboard cat']
    const cookies = new Cookies(req, res, { keys: keys })

    const {title, description, price, phone_number, email} = req.body; // req.body.firstName, req.body.lastName, req.body.phone
    let u = db.Post.build({title: title, description: description, price: price, phone: phone_number, email: email});

    return u.save()
        .then((post) => {
            cookies.set('LastVisit', new Date().toISOString(), { signed: true, maxAge: 10*1000 });
            cookies.set('EmailAdr', email, { signed: true, maxAge: 10*1000 });

            res.render('successfulPost', {title: 'Successful post', message: "The contact was added successfully!"})
        })
        .catch((err) => {
            // extensive error handling can be done here - you don't always need such a detailed error handling
            if (err instanceof Sequelize.ValidationError) {
                res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
            } else if (err instanceof Sequelize.DatabaseError) {
                res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
            } else {
                res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err}`});
            }
        })
});

router.get('/add', (req, res) => {
    res.redirect('/'); // redirect to the home page
});

module.exports = router;