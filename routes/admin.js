var express = require('express');
var router = express.Router();

var app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.login !== undefined && req.session.login) {
        res.render('admin', { title: 'Login' });
    }
    else { // first time we access session.views
        res.render('login', { title: 'Login', message: '',err: false});
    }
});

module.exports = router;
