var express = require('express');
var router = express.Router();
const db = require('../models');
const Sequelize = require("sequelize");
const createError = require("http-errors");

var app = express();


/* GET users listing. */
router.get('/', (req, res) => {
    res.render('index', { title: 'Second Hand' });
});

router.get('/allData', (req, res, next) => {
    if (req.session.login) {
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
    } else
        next(createError(401))
});


router.get('/posts', (req, res, next) => {
    db.Post.findAll({
        where:{
            approve: 'yes',
        }
    }).then(data => {
        res.json(data); // 403 code
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

router.put('/allData', (req, res, next) => {
    if (req.session.login) {
        db.Post.update({"approve": req.body.approve}, {
            where: {
                id: req.body.postId,
            }
        }).then(() => res.json([]))
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
    } else
        next(createError(401))
});

router.delete('/allData', (req, res, next) => {
    if (req.session.login) {
        db.Post.destroy({
            where: {
                id: req.body.postId,
            }
        })
            .then(() => res.json([]))
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
    } else
        next(createError(401))
});

module.exports = router;
