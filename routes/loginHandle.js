var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginControle');

/* GET home page. */
router.get('/', loginController.loginPageHandle);
router.post('/', loginController.loginPostHandle);

module.exports = router;
