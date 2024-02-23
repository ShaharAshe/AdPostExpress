const db = require("../models");
const Sequelize = require("sequelize");

const error_handle = (res, err) => {
    // extensive error handling can be done here - you don't always need such a detailed error handling
    if (err instanceof Sequelize.ValidationError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
    if (err instanceof Sequelize.DatabaseError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
    res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err} `});
}

exports.loginPageHandle = (req, res, next) => {
    res.render('login', {title: 'Login', message: '', err: false});
};

exports.loginPostHandle = (req, res, next) => {
    const {login, password} = req.body;
    db.User.findOne({
        where: {login: login, password: password},
    }).then(user => {
        if (user) {
            req.session.login = true;
            res.render('admin', {title: 'Admin'});
        }
        req.session.login = false;
        res.render('login', {title: 'Login', message: 'Admin not found', err: true});
    }).catch(error_handle)
}