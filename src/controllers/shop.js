/* Controllers => Shop */

const Product = require('../models/product');

const homePageController = (request, response) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/index', {
      products,
      hasProducts,
      path: '/',
      documentTitle: `Harry's Shop`,
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
      documentTitle: `All Products | Harry's Shop`,
    });
  });
};

const cartPageController = (request, response) => {
  response.render('shop/cart', {
    path: '/cart',
    documentTitle: `My Cart | Harry's Shop`,
  });
};

const checkoutPageController = (request, response) => {
  response.render('shop/checkout', {
    path: '/checkout',
    documentTitle: `Checkout | Harry's Shop`,
  });
};

module.exports = { 
  homePageController, 
  productsPageController, 
  cartPageController, 
  checkoutPageController, 
};
