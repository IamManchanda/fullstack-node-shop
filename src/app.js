/* App.js */

const express = require('express');
const path = require('path');

const shopRoutes = require('./routes/shop').router;
const adminRoutes = require('./routes/admin').router;

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pages'));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use(function errorPageMiddleware(request, response, next) {
  response.status(404).render('error', { 
    documentTitle: `Error 404 - Harry's Shop` 
  });
});

app.listen(3000);
