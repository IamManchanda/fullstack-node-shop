/* Models => Product */
const fs = require('fs');
const path = require('path');

const convertToKebabCase = require('../util/convertToKebabCase');

const productFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProducts = (error, data) => !error ? JSON.parse(data) : [];

const Product = class {
  constructor(title, price, description) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = `https://placeimg.com/500/300/${convertToKebabCase(title)}`;
  }

  saveProduct() {
    const doneSavingProduct = (error, data) => {
      const products = getProducts(error, data);
      products.push(this);
      fs.writeFile(productFile, JSON.stringify(products), (error) => console.error({ error }));
    };
    fs.readFile(productFile, doneSavingProduct);
  }

  static fetchAllProducts(done) {
    const doneFetchingAllProducts = (error, data) => done(getProducts(error, data));
    fs.readFile(productFile, doneFetchingAllProducts);
  }
};

module.exports = Product;
