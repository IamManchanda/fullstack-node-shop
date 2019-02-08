const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router();
const urlencodedBodyParser = bodyParser.urlencoded({
  extended: false,
});

router.get('/add-product', function addProductPageMiddleware(request, response, next) {
  response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.5.3/css/foundation.min.css"/>
      <title>Add a Product</title>
    </head>
    <body>
      <div class="grid-container fluid">
        <div class="grid-x grid-padding-x grid-padding-y">
          <div class="cell">
            <h1>Add a Product</h1>
            <form action="/admin/add-product" method="POST">
              <div class="grid-x">
                <div class="cell medium-10">
                  <input type="text" name="product-name" />
                </div>
                <div class="cell medium-2">
                  <button class="button expanded" type="submit">Add Product</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
    </html>
  `);
});

router.post('/add-product', urlencodedBodyParser, function submittedProductPageMiddleware(request, response, next) {
  console.log(request.body);
  response.redirect('/');
});

module.exports = router;
