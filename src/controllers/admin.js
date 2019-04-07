/* Controllers => Admin */

const Product = require('../models/product');

const addProductPageController = (request, response) => {
  response.render('admin/add-product', { 
    path: '/admin/add-product',
    documentTitle: `Add a Product - Harry's Shop`,
  });
};

const adminProductsPageController = (request, response) => {
  response.render('admin/products', {
    path: '/admin/products',
    documentTitle: `My Products - Harry's Shop`,
  });
};

const submittedProductPageController = (request, response) => {
  const { title, price, description } = request.body;
  const newProduct = new Product(title, price, description)
  newProduct.saveProduct();
  response.redirect('/');
};

module.exports = { 
  addProductPageController, 
  adminProductsPageController, 
  submittedProductPageController, 
};
