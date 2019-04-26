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
      fs.writeFile(cartFile, JSON.stringify(cart), (error) => console.error({ error }));
    };
    fs.readFile(cartFile, doneSavingCart);
  }

  static deleteCurrentProduct(id, productPrice) {
    const doneDeletingCart = (error, data) => {
      if (error) return undefined;
      const cart = getCartData(error, data);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find(p => p.id === id);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice -= Number(productPrice) * productQty;
      fs.writeFile(cartFile, JSON.stringify(updatedCart), (error) => console.error({ error }));
    };
    fs.readFile(cartFile, doneDeletingCart);
  }
};

module.exports = Cart;
