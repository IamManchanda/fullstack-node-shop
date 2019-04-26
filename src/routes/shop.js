/* Routes => Shop.js */

const express = require('express');
const bodyParser = require('body-parser');

const { 
  homePageController, 
  productsPageController,
  currentProductPageController,
  cartPageController,
  submitProductToCartPageController,
  deleteProductFromCartPageController,
  orderPageController,
  checkoutPageController, 
} = require('../controllers/shop');

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({ extended: false });
// GET
router.get('/', homePageController);
router.get('/products', productsPageController);
router.get('/products/:currentProductId', currentProductPageController);
router.get('/cart', cartPageController);
router.get('/orders', orderPageController);
router.get('/checkout', checkoutPageController);
// POST
router.post('/cart', urlencodedBodyParser, submitProductToCartPageController);
router.post('/delete-item-from-cart', urlencodedBodyParser, deleteProductFromCartPageController);

module.exports = router;
