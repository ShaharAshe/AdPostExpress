/**
 * Module dependencies.
 */
const db = require("../models");
const Sequelize = require("sequelize");

/**
 * Handles errors and renders appropriate responses.
 * @param {Object} res - The response object.
 * @param {Error} err - The error object.
 */
const error_handle = (res, err) => {
    // Extensive error handling can be done here - you don't always need such a detailed error handling
    if (err instanceof Sequelize.ValidationError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
    if (err instanceof Sequelize.DatabaseError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
    res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err} `});
}

/**
 * Renders the login page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.loginPageHandle = (req, res, next) => {
    res.render('login', {title: 'Login', message: '', err: false});
};

/**
 * Handles the login post request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.loginPostHandle = (req, res, next) => {
    const {login, password} = req.body;
    db.User.findOne({
        where: {login: login.trim(), password: password},
    }).then(user => {
        if (user) {
            req.session.login = true;
            res.render('admin', {title: 'Admin'});
        }
        req.session.login = false;
        res.render('login', {title: 'Login', message: 'Admin not found', err: true});
    }).catch((err) => {error_handle(res, err)})
}
