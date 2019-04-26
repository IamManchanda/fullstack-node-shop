/* Models => Product */
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

const cartFile = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
const getCartData = (error, data) => !error ? JSON.parse(data) : { products: [], totalPrice: 0 };

const Cart = class {
  static addProduct(id, productPrice) {
    const doneSavingCart = (error, data) => {
      const cart = getCartData(error, data);
      const existingProductInCartIndex = cart.products.findIndex(p => p.id === id);
      const existingProductInCart = cart.products[existingProductInCartIndex];
      let updatedProduct;
      if (existingProductInCart) {
        updatedProduct = { ...existingProductInCart };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductInCartIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += Number(productPrice);
      fs.writeFile(cartFile, JSON.stringify(cart), (error) => console.error({ error }));
    };
    fs.readFile(cartFile, doneSavingCart);
  }
};

module.exports = Cart;
