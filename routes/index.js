var express = require('express');
var router = express.Router();
const indexController = require('../controllers/indexConstrole');

/* GET home page. */
router.get('/', indexController.indexPageHandle);

module.exports = router;
