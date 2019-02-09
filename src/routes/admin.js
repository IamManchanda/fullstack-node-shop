/* Routes => Admin.js */

const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({
  extended: false,
});

const products = [];

router.get('/add-product', function addProductPageMiddleware(request, response, next) {
  response.render('add-product', { 
    path: '/admin/add-product', 
    documentTitle: `Add a Product - Harry's Shop` 
  });
});

router.post('/add-product', urlencodedBodyParser, function submittedProductPageMiddleware(request, response, next) {
  const { title } = request.body;
  products.push({ title });
  response.redirect('/');
});

module.exports = { router, products };
