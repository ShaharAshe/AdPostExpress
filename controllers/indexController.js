/**
 * Renders the index page.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.indexPageHandle = (req, res, next) => {
    res.render('index', { title: 'Second Hand' });
};
