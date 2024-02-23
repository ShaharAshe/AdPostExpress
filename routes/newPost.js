var express = require('express');
var router = express.Router();
const postController = require('../controllers/postControle');
const {postPageHandle} = require("../controllers/postControle");

/* GET home page. */
router.get('/', postController.postPageHandle);

module.exports = router;
