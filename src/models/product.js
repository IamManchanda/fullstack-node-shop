/* Models => Product */
const products = [];

const Product = class {
  constructor(title) {
    this.title = title;
  }

  saveProduct() {
    products.push(this);
  }

  static fetchAllProducts() {
    return products;
  }
};

module.exports = Product;
