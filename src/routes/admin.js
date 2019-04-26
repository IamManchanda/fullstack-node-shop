/* Routes => Admin.js */

const express = require('express');
const bodyParser = require('body-parser');

const { 
  addProductPageController,
  editProductPageController,
  adminProductsPageController, 
  submittedProductPageController,
  updatedProductPageController,
  deleteProductPageController,
} = require('../controllers/admin');

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
// GET
router.get('/add-product', addProductPageController);
router.get('/edit-product/:currentProductId', editProductPageController);
router.get('/products', adminProductsPageController);
// POST
router.post('/add-product', urlencodedBodyParser, submittedProductPageController);
router.post('/edit-product', urlencodedBodyParser, updatedProductPageController);
router.post('/delete-product', urlencodedBodyParser, deleteProductPageController);

module.exports = router;
