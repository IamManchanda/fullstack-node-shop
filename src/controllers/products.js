/* Controllers => Products */

const Product = require('../models/product');

const homePageController = (request, response) => {
  const products = Product.fetchAllProducts();
  response.render('shop', { 
    products,
    path: '/',
    documentTitle: `Harry's Shop`,
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
