/* App.js */

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(function errorPageMiddleware(request, response, next) {
  response
    .status(404)
    .send('<h1>Page not found</h1>');
});

app.listen(3000);
