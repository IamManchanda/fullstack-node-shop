/* Models => Product */
const fs = require('fs');
const path = require('path');

const productFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const getProducts = (error, data) => !error ? JSON.parse(data) : [];

const Product = class {
  constructor(title) {
    this.title = title;
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
