var express = require('express');
var router = express.Router();

var app = express();



/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session.login) {
        console.log("aa")
        res.render('admin', { title: 'Login' });
    }
    else { // first time we access session.views
        console.log("bb")
        res.render('login', { title: 'Login' });

    }
});

module.exports = router;
