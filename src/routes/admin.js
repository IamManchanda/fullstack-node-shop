/* Routes => Admin.js */

const express = require('express');
const bodyParser = require('body-parser');

const { addProductPageController, submittedProductPageController } = require('../controllers/products');

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
router.get('/add-product', addProductPageController);
router.post('/add-product', urlencodedBodyParser, submittedProductPageController);

module.exports = router;
