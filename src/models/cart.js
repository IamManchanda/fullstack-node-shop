/* Models => Product */
const fs = require('fs');
const path = require('path');

const cartFile = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');
const getCartData = (error, data) => !error ? JSON.parse(data) : { products: [], totalPrice: 0 };

const Cart = class {
  static addCurrentProduct(id, productPrice) {
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
      cart.totalPrice = Number(cart.totalPrice.toFixed(2));
      fs.writeFile(cartFile, JSON.stringify(cart), (error) => console.error(error));
    };
    fs.readFile(cartFile, doneSavingCart);
  }

  static deleteCurrentProduct(id, productPrice) {
    const doneDeletingCart = (error, data) => {
      if (error) return undefined;
      const cart = getCartData(error, data);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(p => p.id === id);
      if (!product) return undefined;
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= Number(productPrice) * productQty;
      updatedCart.totalPrice = Number(updatedCart.totalPrice.toFixed(2));
      fs.writeFile(cartFile, JSON.stringify(updatedCart), (error) => console.error(error));
    };
    fs.readFile(cartFile, doneDeletingCart);
  }

  static fetchAllProductsInCart(done) {
    const doneFetchingAllProductsInCart = (error, data) => {
      const cart = getCartData(error, data);
      return done(cart);
    };
    fs.readFile(cartFile, doneFetchingAllProductsInCart);
  }
};

module.exports = Cart;
