/* Routes => Shop.js */

const express = require('express')
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/', function homePageMiddleware(request, response, next) {
  response.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
