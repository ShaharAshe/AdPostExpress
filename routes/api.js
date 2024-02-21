var express = require('express');
var router = express.Router();
const db = require('../models');
const Sequelize = require("sequelize");

/* GET users listing. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Second Hand' });
});

router.get('/allData', (req, res) => {
    db.Post.findAll().then(data => {
        res.json(data);
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

router.get('/posts', (req, res) => {
    db.Post.findAll({
        where:{
            approve: 'yes',
        }
    }).then(data => {
        res.json(data);
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

router.put('/allData', (req, res) => {
    db.Post.update({"approve": req.body.approve}, {
        where: {
            id: req.body.postId,
        }
    })
        .catch((err) => {
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


router.delete('/allData', (req, res) => {
    db.Post.destroy({
        where:{
            id: req.body.postId,
        }
    })
        .catch((err) => {
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
