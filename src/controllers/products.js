/* Controllers => Products */

const Product = require('../models/product');

const homePageController = (request, response) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop', { 
      products,
      hasProducts,
      path: '/',
      documentTitle: `Harry's Shop`,
    });
  });
};

const addProductPageController = (request, response) => {
  response.render('add-product', { 
    path: '/admin/add-product',
    documentTitle: `Add a Product - Harry's Shop`,
  });
};

const submittedProductPageController = (request, response) => {
  const { title } = request.body;
  const newProduct = new Product(title)
  newProduct.saveProduct();
  response.redirect('/');
};

module.exports = { homePageController, addProductPageController, submittedProductPageController };
