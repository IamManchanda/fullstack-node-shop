/* Models => Product */

const Cart = require('./cart');
const mysqlDb = require('../util/mysql-db');
const convertToKebabCase = require('../util/convertToKebabCase');

const Product = class {
  constructor(id, title, price, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = `https://placeimg.com/500/300/${convertToKebabCase(title)}`;
  }

  saveProduct() {
    return mysqlDb.execute(
      'INSERT INTO products (title, price, description, imageUrl) VALUES(?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageUrl],   
    );
  }

  static deleteCurrentProductById(id) {
    
  }

  static fetchAllProducts() {
    return mysqlDb.execute('SELECT * FROM products');
  }

  static fetchCurrentProductById(id) {
    return mysqlDb.execute(
      'SELECT * FROM products WHERE products.id = ?',
      [id],
    );
  }
};

module.exports = Product;
