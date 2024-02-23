const db = require("../models");
const Sequelize = require("sequelize");
const createError = require("http-errors");

const error_handle = (res, err) => {
    // extensive error handling can be done here - you don't always need such a detailed error handling
    if (err instanceof Sequelize.ValidationError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Invalid input: ${err}`});
    if (err instanceof Sequelize.DatabaseError)
        res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Database error: ${err}`});
    res.render('unsuccessfulPost', {title: 'Unsuccessful post', message: `Unexpected error: ${err} `});
}

exports.apiGetAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.findAll().then(data => {
            res.json(data);
        }).catch(error_handle)
    } else
        next(createError(401))
};

exports.apiPutAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.update({"approve": req.body.approve}, {
            where: {
                id: req.body.postId,
            }
        }).then(() => res.json([]))
            .catch(error_handle)
    } else
        next(createError(401))
}

exports.apiDeleteAllDataHandle = (req, res, next) => {
    if (req.session.login) {
        db.Post.destroy({
            where: {
                id: req.body.postId,
            }
        }).then(() => res.json([]))
        .catch(error_handle)
    } else
        next(createError(401))
}

exports.apiGetPostsHandle = (req, res, next) => {
    db.Post.findAll({
        where:{
            approve: 'yes',
        }
    }).then(data => {
        res.json(data);
    }).catch(error_handle)
}