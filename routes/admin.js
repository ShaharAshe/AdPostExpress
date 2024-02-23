var express = require('express');
var router = express.Router();
const adminController = require('../controllers/adminControle');

/* GET home page. */
router.get('/', adminController.adminPageHandle);

module.exports = router;