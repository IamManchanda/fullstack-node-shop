/* Controllers => Products */

const products = [];

const homePageController = (request, response) => {
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
  products.push({ title });
  response.redirect('/');
};

module.exports = { homePageController, addProductPageController, submittedProductPageController };
