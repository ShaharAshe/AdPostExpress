exports.adminPageHandle = (req, res, next) => {
    if (req.session.login !== undefined && req.session.login)
        res.render('admin', { title: 'Login' });
    res.render('login', { title: 'Login', message: '',err: false});
};