/**
 * Module dependencies.
 * @requires express
 */
var express = require('express');

/**
 * Express router to handle index routes.
 * @type {object}
 */
var router = express.Router();

/**
 * Controller dependencies.
 * @type {object}
 */
const indexController = require('../controllers/indexController');

/**
 * Route for GET request to render the home page.
 */
router.get('/', indexController.indexPageHandle);

module.exports = router;
