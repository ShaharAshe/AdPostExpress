/**
 * Handles the logout page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.logoutPageHandle = (req, res, next) => {
    if(req.session.login) {
        req.session.login = false;
        res.render('logout', {title: 'Successful post', message: "You have logged out!"})
    }
    res.render('index', { title: 'Second Hand' });
};
