/* Routes => Shop.js */

const express = require('express')
const path = require('path');

const rootDir = require('../utils/path');
const products = require('./admin').products;

const router = express.Router();

router.get('/', function homePageMiddleware(request, response, next) {
  console.log({ products });
  response.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
