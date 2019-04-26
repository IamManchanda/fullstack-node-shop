/* Controllers => Shop */

const Product = require('../models/product');
const Cart = require('../models/cart');

const homePageController = (request, response, next) => {
  Product.fetchAllProducts(function executeFetchingAllProducts(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/index', {
      products,
      hasProducts,
      path: '/',
      documentTitle: `Best Shop`,
    });
  });
};

const productsPageController = (request, response, next) => {
  Product.fetchAllProducts(function executeFetchingAllProducts(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/products-list', { 
      products,
      hasProducts,
      path: '/products',
      documentTitle: `All Products | Best Shop`,
    });
  });
};

const currentProductPageController = (request, response, next) => {
  const { currentProductId } = request.params;
  Product.fetchCurrentProductById(currentProductId, function executeFetchingCurrentProduct(currentProduct) {
    response.render('shop/product-detail', { 
      currentProduct,
      path: '/products',
      documentTitle: `${currentProduct.title} | Best Shop`,
    });
  });
};

const cartPageController = (request, response, next) => {
  response.render('shop/cart', {
    path: '/cart',
    documentTitle: `My Cart | Best Shop`,
  });
};

const orderPageController = (request, response, next) => {
  response.render('shop/orders', {
    path: '/orders',
    documentTitle: `My Orders | Best Shop`,
  });
};

const checkoutPageController = (request, response, next) => {
  response.render('shop/checkout', {
    path: '/checkout',
    documentTitle: `Checkout | Best Shop`,
  });
};

const submitToCartPageController = (request, response, next) => {
  const { currentProductId } = request.body;
  Product.fetchCurrentProductById(currentProductId, function executeFetchingCurrentProduct(currentProduct) {
    Cart.addCurrentProduct(currentProductId, currentProduct.price);
  });
  response.redirect('/cart');
};

module.exports = { 
  homePageController, 
  productsPageController,
  currentProductPageController,
  cartPageController,
  submitToCartPageController,
  orderPageController,
  checkoutPageController, 
};
