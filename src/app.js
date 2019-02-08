/* App.js */

const express = require('express');
const path = require('path');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(function errorPageMiddleware(request, response, next) {
  response.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.listen(3000);
