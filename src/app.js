/* App.js */

const express = require('express');
const path = require('path');

const shopRoutes = require('./routes/shop').router;
const adminRoutes = require('./routes/admin').router;
const errorPageController = require('./controllers/error').errorPageController;

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use(errorPageController);
app.listen(3000);
