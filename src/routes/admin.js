/* Routes => Admin.js */

const express = require('express');
const bodyParser = require('body-parser');

const { 
  addProductPageController, 
  adminProductsPageController, 
  submittedProductPageController,
} = require('../controllers/admin');

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
// GET
router.get('/add-product', addProductPageController);
router.get('/products', adminProductsPageController);
// POST
router.post('/add-product', urlencodedBodyParser, submittedProductPageController);

module.exports = router;
