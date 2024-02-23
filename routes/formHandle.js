let express = require('express');
let router = express.Router();
const formController = require('../controllers/formControle');
const indexController = require('../controllers/indexConstrole');

router.get('/', indexController.indexPageHandle);
router.post('/add', formController.formPostAddHandle);
router.get('/add', indexController.indexPageHandle);

module.exports = router;