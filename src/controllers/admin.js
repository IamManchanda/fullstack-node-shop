/* Controllers => Admin */

const Product = require('../models/product');

const addProductPageController = (request, response, next) => {
  response.render('admin/edit-product', { 
    path: '/admin/add-product',
    documentTitle: `Add a Product - Best Shop`,
  });
};

const editProductPageController = (request, response, next) => {
  const { edit: editMode } = request.query;
  if (!editMode) return response.redirect('/');
  const { currentProductId } = request.params;
  Product.fetchCurrentProductById(currentProductId, function executeFetchingCurrentProduct(currentProduct) {
    if (!currentProduct) return response.redirect('/');
    response.render('admin/edit-product', { 
      path: '/admin/edit-product',
      documentTitle: 'Edit the Product - Best Shop',
      editMode,
      currentProduct,
    });
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
  const newProduct = new Product(null, title, price, description)
  newProduct.saveProduct();
  response.redirect('/');
};

const updatedProductPageController = (request, response, next) => {
  const { currentProductId: id, title, price, description } = request.body;
  const updatedProduct = new Product(id, title, price, description)
  updatedProduct.saveProduct();
  response.redirect('/admin/products');
};

const deleteProductPageController = (request, response, next) => {
  const { currentProductId: id } = request.body;
  Product.deleteCurrentProductById(id);
  response.redirect('/admin/products');
};

module.exports = { 
  addProductPageController, 
  editProductPageController,
  adminProductsPageController, 
  submittedProductPageController,
  updatedProductPageController,
  deleteProductPageController,
};
