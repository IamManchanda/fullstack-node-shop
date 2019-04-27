/* App.js */

const express = require('express');
const path = require('path');

const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const { errorPageController } = require('./controllers/error');
const mysqlDb = require('./util/mysql-db');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views', 'pages'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

mysqlDb
  .execute('SELECT * FROM products')
  .then((result) => {
    console.log({ result });
  })
  .catch((error) => {
    console.error(error);
  });

app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.use(errorPageController);
app.listen(3000);
