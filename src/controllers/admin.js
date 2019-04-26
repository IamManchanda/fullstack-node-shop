/* Controllers => Admin */

const Product = require('../models/product');

const addProductPageController = (request, response, next) => {
  response.render('admin/edit-product', { 
    path: '/admin/add-product',
    documentTitle: `Add a Product - Best Shop`,
  });
};

const adminProductsPageController = (request, response, next) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('admin/products', {
      products,
      hasProducts,
      path: '/admin/products',
      documentTitle: `My Products - Best Shop`,
    });
  });
};

const submittedProductPageController = (request, response, next) => {
  const { title, price, description } = request.body;
  const newProduct = new Product(title, price, description)
  newProduct.saveProduct();
  response.redirect('/');
};

const editProductPageController = (request, response, next) => {
  const { edit: editMode } = request.query;
  if (!editMode) {
    return response.redirect('/');
  }
  response.render('admin/edit-product', { 
    path: '/admin/edit-product',
    documentTitle: `Edit the Product - Best Shop`,
    editing: editMode,
  });
};

module.exports = { 
  addProductPageController, 
  editProductPageController,
  adminProductsPageController, 
  submittedProductPageController, 
};
