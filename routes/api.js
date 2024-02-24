/**
 * Module dependencies.
 * @requires express
 */
var express = require('express');

/**
 * Express router to handle API routes.
 * @type {object}
 */
var router = express.Router();

/**
 * Controller dependencies.
 * @type {object}
 */
const apiController = require('../controllers/apiControle');
const indexController = require('../controllers/indexController');

/**
 * Routes for API endpoints.
 */

/**
 * GET request to render the index page.
 */
router.get('/', indexController.indexPageHandle);

/**
 * GET request to fetch all data.
 */
router.get('/allData', apiController.apiGetAllDataHandle);

/**
 * GET request to fetch approved posts.
 */
router.get('/posts', apiController.apiGetPostsHandle);

/**
 * PUT request to update all data.
 */
router.put('/allData', apiController.apiPutAllDataHandle);

/**
 * DELETE request to delete all data.
 */
router.delete('/allData', apiController.apiDeleteAllDataHandle);

module.exports = router;
