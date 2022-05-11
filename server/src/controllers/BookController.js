const { Book, Cart, CartItem } = require('../database/models')
const { errorHandler, errorType } = require('./ErrorHandler')

module.exports = {
  async parseBook(req, res, next) {
    try {
      const idBook = parseInt(req.params.id_book)

      if (isNaN(idBook)) {
        throw new Error('id_book must be a number')
      }

      req.id_book = idBook

      const book = await Book.findByPk(idBook)
      if (!book) {
        throw errorType('BookNotFound', 'Cannot find book')
      }

      req.book = book

      next()

    } catch (err) {
      errorHandler(res, err, 'Cannot parse book id')
    }

  },
  async create (req, res) {
    try {
      const book = await Book.create({
        name_book: req.body.name_book,
        url: req.body.url,
        quantity_book: req.body.quantity_book
      })
      res.status(201).send(book)
    } catch (err) {
      errorHandler(res, err, 'Cannot create book')
    }
  },
  async read (req, res) {
    try {
      const books = await Book.findAll()
      const results = []
      for (let book of books) {
        const result = {
          id_book: book.id_book,
          name_book: book.name_book,
          url: book.url,
          quantity_book: book.quantity_book
        }
        const sum = await Cart.sum('cartitems.quantity_cart', {
          include: {
            model: CartItem,
            where: {
              id_book: book.id_book
            }
          },
          where: {
            'status': 'borrowed'
          }
        })
        result['borrowedQty'] = sum
        results.push(result)
      }
      res.status(200).send(results)
    } catch (err) {
      errorHandler(res, err, 'Cannot fetch books')
    }
  },
  async update (req, res) {
    console.log(req.body)
    try {
      const data = {
        name_book: req.body.name_book,
        url: req.body.url,
        quantity_book: req.body.quantity_book
      }
      await Book.update(data, {
        where: {
          id_book: req.id_book
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot edit book details')
    }
  },
  async destroy (req, res) {
    try {
      await Book.destroy({
        where: {
          id_book: req.id_book
        }
      })
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot delete book')
    }
  }
}