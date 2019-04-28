/* Models => Product */

const Cart = require('./cart');
const mysqlDb = require('../util/mysql-db');
const convertToKebabCase = require('../util/convertToKebabCase');

const Product = class {
  constructor(id, title, price, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = `https://placeimg.com/500/300/${convertToKebabCase(title)}`;
  }

  saveProduct() {
    
  }

  static deleteCurrentProductById(id) {
    
  }

  static fetchAllProducts() {
    return mysqlDb.execute('SELECT * FROM products');
  }

  static fetchCurrentProductById(id) {
    
  }
};

module.exports = Product;
