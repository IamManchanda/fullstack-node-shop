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
  Cart.fetchAllProductsInCart(function executeFetchingAllProductsInCart(cart) {
    Product.fetchAllProducts(products => {
      const cartProductsData = [];
      for (const product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        if (cartProductData) {
          const qty = cartProductData.qty;
          cartProductsData.push({ product, qty });
        }
      }
      const hasProductsDataInCart = (cartProductsData && cartProductsData.length > 0);
      response.render('shop/cart', {
        cartProductsData,
        hasProductsDataInCart,
        path: '/cart',
        documentTitle: `My Cart | Best Shop`,
      });
    });
  });
};

const submitProductToCartPageController = (request, response, next) => {
  const { currentProductId } = request.body;
  Product.fetchCurrentProductById(currentProductId, function executeFetchingCurrentProduct(currentProduct) {
    Cart.addCurrentProduct(currentProductId, currentProduct.price);
  });
  response.redirect('/cart');
};

const deleteProductFromCartPageController = (request, response, next) => {
  const { currentCartProductId } = request.body;
  Product.fetchCurrentProductById(currentCartProductId, function executeFetchingCurrentProduct(currentProduct) {
    Cart.deleteCurrentProduct(currentCartProductId, currentProduct.price);
  });
  response.redirect('/cart');
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

module.exports = { 
  homePageController, 
  productsPageController,
  currentProductPageController,
  cartPageController,
  submitProductToCartPageController,
  deleteProductFromCartPageController,
  orderPageController,
  checkoutPageController, 
};
