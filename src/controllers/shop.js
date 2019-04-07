/* Controllers => Shop */

const Product = require('../models/product');

const homePageController = (request, response) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/index', {
      products,
      hasProducts,
      path: '/',
      documentTitle: `Best Shop`,
    });
  });
};

const productsPageController = (request, response) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/products-list', { 
      products,
      hasProducts,
      path: '/products',
      documentTitle: `All Products | Best Shop`,
    });
  });
};

const cartPageController = (request, response) => {
  response.render('shop/cart', {
    path: '/cart',
    documentTitle: `My Cart | Best Shop`,
  });
};

const orderPageController = (request, response) => {
  response.render('shop/orders', {
    path: '/orders',
    documentTitle: `My Orders | Best Shop`,
  });
};

const checkoutPageController = (request, response) => {
  response.render('shop/checkout', {
    path: '/checkout',
    documentTitle: `Checkout | Best Shop`,
  });
};

module.exports = { 
  homePageController, 
  productsPageController, 
  cartPageController,
  orderPageController,
  checkoutPageController, 
};
