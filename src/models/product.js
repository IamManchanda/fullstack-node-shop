/* Models => Product */

const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const Cart = require('./cart');
const convertToKebabCase = require('../util/convertToKebabCase');

const productFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProductsData = (error, data) => !error ? JSON.parse(data) : [];

const Product = class {
  constructor(id, title, price, description) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.imageUrl = `https://placeimg.com/500/300/${convertToKebabCase(title)}`;
  }

  saveProduct() {
    const doneSavingProduct = (error, data) => {
      const products = getProductsData(error, data);
      if (this.id) {
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(productFile, JSON.stringify(updatedProducts), (error) => console.error({ error }));
      } else {
        this.id = uuid.v4();
        products.push(this);
        fs.writeFile(productFile, JSON.stringify(products), (error) => console.error({ error }));
      }
    };
    fs.readFile(productFile, doneSavingProduct);
  }

  static deleteCurrentProductById(id) {
    const doneFetchingCurrentProduct = (error, data) => {
      const products = getProductsData(error, data);
      const updatedProducts = products.filter(p => p.id !== id);
      const productToBeDeleted = products.find(p => p.id === id);
      fs.writeFile(productFile, JSON.stringify(updatedProducts), (error) => {
        console.error({ error });
        if (!error) {
          Cart.deleteCurrentProduct(id, productToBeDeleted.price);
        }
      });
    };
    fs.readFile(productFile, doneFetchingCurrentProduct);
  }

  static fetchAllProducts(done) {
    const doneFetchingAllProducts = (error, data) => done(getProductsData(error, data));
    fs.readFile(productFile, doneFetchingAllProducts);
  }

  static fetchCurrentProductById(id, done) {
    const doneFetchingCurrentProduct = (error, data) => {
      const products = getProductsData(error, data);
      const product = products.find(p => p.id === id);
      return done(product);
    };
    fs.readFile(productFile, doneFetchingCurrentProduct);
  }
};

module.exports = Product;
