exports.indexPageHandle = (req, res, next) => {
    res.render('index', { title: 'Second Hand' });
};