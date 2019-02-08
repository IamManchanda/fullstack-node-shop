/* Routes => Admin.js */

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({
  extended: false,
});

router.get('/add-product', function addProductPageMiddleware(request, response, next) {
  response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', urlencodedBodyParser, function submittedProductPageMiddleware(request, response, next) {
  console.log(request.body);
  response.redirect('/');
});

module.exports = router;
