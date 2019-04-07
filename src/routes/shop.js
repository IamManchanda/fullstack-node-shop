/* Routes => Shop.js */

const express = require('express');

const { 
  homePageController, 
  productsPageController, 
  cartPageController,
  orderPageController,
  checkoutPageController, 
} = require('../controllers/shop');

const router = express.Router();
// GET
router.get('/', homePageController);
router.get('/products', productsPageController);
router.get('/cart', cartPageController);
router.get('/orders', orderPageController);
router.get('/checkout', checkoutPageController);

module.exports = router;
