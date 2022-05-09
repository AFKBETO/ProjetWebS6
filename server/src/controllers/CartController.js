const { User, Book, Cart, CartItem } = require('../database/models')
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
  async create (req, res) {
    try {
      const [cart] = Cart.findOrCreate({
        where: {
          id_user: req.id_user,
          status: 'pending'
        }
      })

      res.status(201).send(cart)
    } catch (err) {
      errorHandler(res, err, 'Cannot create new cart')
    }
  },
  async read (req, res) {
    try {
      const carts = Cart.findAll({
        where: {
          id_user: req.id_user
        }
      })
    } catch (err) {
      errorHandler(res, err, 'Cannot fetch carts')
    }
  }
}