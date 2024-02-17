var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Second Hand' });
});
router.post('/', function(req, res, next) {
  res.render('index', { title: 'Second Hand' });
});

module.exports = router;
