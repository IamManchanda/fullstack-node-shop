const express = require('express')

const router = express.Router();

router.use('/', function homePageMiddleware(request, response, next) {
  response.send('<h1>Hello Express World</h1>');
});

module.exports = router;
