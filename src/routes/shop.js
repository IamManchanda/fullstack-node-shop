/* Routes => Shop.js */

const express = require('express');

const { 
  homePageController, 
  productsPageController,
  currentProductPageController,
  cartPageController,
  orderPageController,
  checkoutPageController, 
} = require('../controllers/shop');

const router = express.Router();
// GET
router.get('/', homePageController);
router.get('/products', productsPageController);
router.get('/products/:currentProductId', currentProductPageController);
router.get('/cart', cartPageController);
router.get('/orders', orderPageController);
router.get('/checkout', checkoutPageController);

module.exports = router;
