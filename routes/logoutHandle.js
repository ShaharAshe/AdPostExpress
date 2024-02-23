var express = require('express');
var router = express.Router();
const logoutController = require('../controllers/logoutControle');

/* GET home page. */
router.get('/', logoutController.logoutPageHandle);

module.exports = router;
