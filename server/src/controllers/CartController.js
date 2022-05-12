const { User, Book, Cart, CartItem, sequelize } = require('../database/models')
const { errorHandler, errorType } = require('./ErrorHandler')

module.exports = {
  async parseCart (req, res, next) {
    try {
      const idCart = parseInt(req.params.id_cart)

      if (isNaN(idCart)) {
        throw new Error('id_cart must be a number')
      }

      req.id_cart = idCart
      
      next()
    } catch (err) {
      errorHandler(res, err, 'Cannot parse cart id')
    }
  },
  async getPendingCart (req, res, next) {
    try {
      const [cart, create] = await Cart.findOrCreate({
        include: {
          model: CartItem
        },
        where: {
          id_user: req.id_user,
          status: 'pending'
        }
      })
      
      req.cart = cart
      next()
    } catch (err) {
      errorHandler(res, err, 'Cannot get pending cart')
    }
  },
  async create (req, res, next) {
    try {
      res.status(201).send(req.cart)
    } catch (err) {
      errorHandler(res, err, 'Cannot create new cart')
    }
  },
  async read (req, res) {
    try {
      console.log(req.id_user)
      const carts = await Cart.findAll({
        include: {
          model: CartItem
        },
        where: {
          id_user: req.id_user
        }
      })
      res.status(200).send(carts)
    } catch (err) {
      errorHandler(res, err, 'Cannot fetch carts')
    }
  },
  async changeCartItem (req, res) {
    try {
      const sum = await Cart.sum('cartitems.quantity_cart', {
        include: {
          model: CartItem,
          where: {
            id_book: req.id_book
          }
        },
        where: {
          'status': 'borrowed'
        }
      })
      const [cartItem, create] = await CartItem.findOrCreate({
        where: {
          id_cart: req.cart.id_cart,
          id_book: req.id_book
        },
        defaults: {
          quantity_cart: 0
        }
      })
      if (req.body.increment) {
        if (req.book.quantity_book - sum - cartItem.quantity_cart > 0) {
          cartItem.quantity_cart += 1
          await cartItem.save()
        }
      } else {
        cartItem.quantity_cart -= 1
        await cartItem.save()
        if (cartItem.quantity_cart <= 0) {
          await cartItem.destroy()
          res.status(200).send({
            idBook: cartItem.id_book,
            cartItem: null
          })
          return
        }
      }
      res.status(200).send({
        idBook: cartItem.id_book,
        cartItem: cartItem
      })
    } catch (err) {
      errorHandler(res, err, 'Cannot add item to cart')
    }
  },
  async updateStatus (req, res) {
    try {
      await Cart.update({
        status: 'borrowed'
      }, {
        where: {
          id_cart: req.cart.id_cart
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot update cart')
    }
  },
  async updateCartStatus (req, res) {
    try {
      await Cart.update({
        status: req.body.status
      }, {
        where: {
          id_cart: req.id_cart
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot update cart')
    }
  },
  async deleteCart(req, res) {
    try {
      await Cart.destroy({
        where: {
          id_cart: req.cart.id_cart
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot delete item from cart')
    }
  },
  async deleteCartItem(req, res) {
    try {
      await CartItem.destroy({
        where: {
          id_cart: req.cart.id_cart,
          id_book: req.id_book
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot delete item from cart')
    }
  }
}