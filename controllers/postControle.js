/**
 * Module dependencies.
 */
const Cookies = require("cookies");

/**
 * Secret keys used for cookies.
 */
const keys = ['keyboard cat']

/**
 * Handles POST request to render the post page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.postPageHandle = (req, res, next) => {
    const cookies = new Cookies(req, res, { keys: keys });
    // Get the cookie
    const lastVisit = cookies.get('LastVisit');
    const EmailAdr = cookies.get('EmailAdr');

    if (!lastVisit && !EmailAdr)
        res.render('newPost', { title: 'New Post', firstVisit: true});
    else
        res.render('newPost', { title: 'New Post', firstVisit: false, date: lastVisit, email: EmailAdr});
};
