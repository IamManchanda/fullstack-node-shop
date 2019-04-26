/* Models => Product */

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const convertToKebabCase = require('../util/convertToKebabCase');

const productFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsData = (error, data) => !error ? JSON.parse(data) : [];

const Product = class {
  constructor(title, price, description) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = `https://placeimg.com/500/300/${convertToKebabCase(title)}`;
  }

  saveProduct() {
    this.id = uuid.v4();
    const doneSavingProduct = (error, data) => {
      const products = getProductsData(error, data);
      products.push(this);
      fs.writeFile(productFile, JSON.stringify(products), (error) => console.error({ error }));
    };
    fs.readFile(productFile, doneSavingProduct);
  }

  static fetchAllProducts(done) {
    const doneFetchingAllProducts = (error, data) => done(getProductsData(error, data));
    fs.readFile(productFile, doneFetchingAllProducts);
  }

  static findCurrentProductById(id, done) {
    const doneFetchingCurrentProduct = (error, data) => {
      const products = getProductsData(error, data);
      const product = products.find(p => p.id === id);
      return done(product);
    };
    fs.readFile(productFile, doneFetchingCurrentProduct);
  }
};

module.exports = Product;
