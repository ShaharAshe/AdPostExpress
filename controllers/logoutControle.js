exports.logoutPageHandle = (req, res, next) => {
    if(req.session.login) {
        req.session.login = false;
        res.render('logout', {title: 'Successful post', message: "You have logged out!"})
    }
    res.render('index', { title: 'Second Hand' });
};