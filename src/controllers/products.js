/* Controllers => Products */

const Product = require('../models/product');

const homePageController = (request, response) => {
  Product.fetchAllProducts(function doneFetchingIntoPage(products) {
    const hasProducts = (products && products.length > 0);
    response.render('shop/products-list', { 
      products,
      hasProducts,
      path: '/',
      documentTitle: `Harry's Shop`,
      convertToKebabCase(title) {
        // Source: https://gist.github.com/thevangelist/8ff91bac947018c9f3bfaad6487fa149#gistcomment-2183914
        return title.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase();
      },
    });
  });
};

const addProductPageController = (request, response) => {
  response.render('admin/add-product', { 
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
