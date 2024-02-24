var express = require('express');
var router = express.Router();
const apiController = require('../controllers/apiControle');
const indexController = require('../controllers/indexController');

/* GET users listing. */
router.get('/', indexController.indexPageHandle);
router.get('/allData', apiController.apiGetAllDataHandle);
router.get('/posts',apiController.apiGetPostsHandle);
router.put('/allData', apiController.apiPutAllDataHandle);
router.delete('/allData', apiController.apiDeleteAllDataHandle);

module.exports = router;
