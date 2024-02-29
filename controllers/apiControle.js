/**
 * Module dependencies.
 * @requires ../models
 * @requires sequelize
 * @requires http-errors
 */
const db = require("../models");
const Sequelize = require("sequelize");
const createError = require("http-errors");

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
 * Handles GET request to fetch all data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.apiGetAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.findAll().then(data => {
            res.json(data);
        }).catch(error_handle)
    } else
        next(createError(401))
};

/**
 * Handles PUT request to update all data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.apiPutAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.update({"approve": req.body.approve}, {
            where: {
                id: req.body.postId,
            }
        }).then((data) => res.json(data))
            .catch(error_handle)
    } else
        next(createError(401))
}

/**
 * Handles DELETE request to delete all data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.apiDeleteAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.destroy({
            where: {
                id: req.body.postId,
            }
        }).then((data) => res.json(data))
        .catch(error_handle)
    } else
        next(createError(401))
}

/**
 * Handles GET request to fetch approved posts.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.apiGetPostsHandle = (req, res, next) => {
    db.Post.findAll({
        where:{
            approve: 'yes',
        }
    }).then(data => {
        res.json(data);
    }).catch(error_handle)
}
