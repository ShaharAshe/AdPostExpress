/**
 * Module dependencies.
 * @requires express
 */
let express = require('express');

/**
 * Express router to handle form routes.
 * @type {object}
 */
let router = express.Router();

/**
 * Controller dependencies.
 * @type {object}
 */
const formController = require('../controllers/formControle');
const indexController = require('../controllers/indexController');

/**
 * Routes for form handling.
 */

/**
 * GET request to render the index page.
 */
router.get('/', indexController.indexPageHandle);

/**
 * POST request to add form data.
 */
router.post('/add', formController.formPostAddHandle);

/**
 * GET request to render the index page (for add form).
 */
router.get('/add', indexController.indexPageHandle);

module.exports = router;
