/**
 * Module dependencies.
 */
const Cookies = require("cookies");
const db = require("../models");
const Sequelize = require("sequelize");
const e = require("express");

/**
 * Handles errors and renders appropriate responses.
 * @param {Object} res - The response object.
 * @param {Error} err - The error object.
 */
const error_handle = (res, err) => {
    // Extensive error handling can be done here - you don't always need such a detailed error handling
    if (err instanceof Sequelize.ValidationError) {
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
    } else if (err instanceof Sequelize.DatabaseError) {
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
    } else {
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err} `});
    }
}

/**
 * Handles the form post add request.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.formPostAddHandle = (req, res, next) => {
    const keys = ['keyboard cat'];
    const cookies = new Cookies(req, res, { keys: keys });

    const {title, description, price, phone_number, email} = req.body;
    let u = db.Post.build({title: title, description: description, price: price, phone: phone_number, email: email});

    return u.save()
        .then((post) => {
            cookies.set('LastVisit', new Date().toISOString(), { signed: true, maxAge: 10*1000 });
            cookies.set('EmailAdr', email, { signed: true, maxAge: 10*1000 });

            res.render('successfulPost', {title: 'Successful post', message: "The contact was added successfully!"})
        })
        .catch((err) => {error_handle(res, err)})
};
