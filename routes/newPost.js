var express = require('express');
const Cookies = require('cookies');

var router = express.Router();

const keys = ['keyboard cat']

/* GET home page. */
router.get('/', function(req, res, next) {
    const cookies = new Cookies(req, res, { keys: keys })
    // Get the cookie
    const lastVisit = cookies.get('LastVisit')
    const EmailAdr = cookies.get('EmailAdr')

    if (!lastVisit && !EmailAdr)
        res.render('newPost', { title: 'New Post', firstVisit: true});
    else
        res.render('newPost', { title: 'New Post', firstVisit: false, date: lastVisit, email: EmailAdr});

});

module.exports = router;
