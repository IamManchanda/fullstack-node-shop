/* Models => Product */
const fs = require('fs');
const path = require('path');

const productFile = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const Product = class {
  constructor(title) {
    this.title = title;
  }

  saveProduct() {
    const doneReadingFile = (error, data) => {
      let products = [];
      if (!error) products = JSON.parse(data);
      products.push(this);
      fs.writeFile(productFile, JSON.stringify(products), function getWriteFileError(error) {
        console.error({ error });
      });
    };
    fs.readFile(productFile, doneReadingFile);
  }

  static fetchAllProducts(done) {
    const doneFetchingAllProducts = (error, data) => {
      if (error) done([]);
      else done(JSON.parse(data));
    };
    fs.readFile(productFile, doneFetchingAllProducts);
  }
};

module.exports = Product;
