let express = require('express');
let router = express.Router();
const Sequelize = require('sequelize');
const db = require('../models');
const {DataTypes} = require("sequelize");

router.post('/', function(req, res, next) {
    res.render('successfulPost', { title: 'Second Hand' });
});

router.post('/add', (req, res) => {
    const {title, description, price, phone_number, email} = req.body; // req.body.firstName, req.body.lastName, req.body.phone
    let u = db.Post.build({title: title, description: description, price: price, phone: phone_number, email: email});

    return u.save()
        .then((post) => res.render('successfulPost', {title: 'Successful post', message: "The contact was added successfully!"}))
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