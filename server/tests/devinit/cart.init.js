const { Cart, CartItem } = require('../../src/database/models')

const carts = [
  {
    id_cart: 1,
    id_user: 1,
    status: 'pending'
  },
  {
    id_cart: 2,
    id_user: 1,
    status: 'borrowed'
  },
  {
    id_cart: 3,
    id_user: 2,
    status: 'returned'
  },
  {
    id_cart: 4,
    id_user: 2,
    status: 'borrowed'
  }
]

const cartItems = [{
    id_cartitem: 1,
    id_cart: 1,
    id_book: 3,
    quantity_cart:2
  },
  {
    id_cartitem: 2,
    id_cart: 2,
    id_book: 1,
    quantity_cart:1
  },
  {
    id_cartitem: 3,
    id_cart: 2,
    id_book: 4,
    quantity_cart: 2
  },
  {
    id_cartitem: 4,
    id_cart: 3,
    id_book: 5,
    quantity_cart: 3
  },
  {
    id_cartitem: 5,
    id_cart: 4,
    id_book: 1,
    quantity_cart: 2
  },
  {
    id_cartitem: 6,
    id_cart: 4,
    id_book: 4,
    quantity_cart: 2
  }
]

for (let cart of carts) {
  Cart.findOrCreate({
    where: cart
  })
}

for (let cartItem of cartItems) {
  CartItem.findOrCreate({
    where: cartItem
  })
}

module.exports = carts
