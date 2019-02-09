/* Routes => Shop.js */

const express = require('express')

const products = require('./admin').products;

const router = express.Router();

router.get('/', function homePageMiddleware(request, response, next) {
  response.render('shop', { 
    products, path: '/', 
    documentTitle: `Harry's Shop` 
  });
});

module.exports = { router };
