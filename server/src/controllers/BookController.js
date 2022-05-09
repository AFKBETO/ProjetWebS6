const { Book } = require('../database/models')
const { errorHandler, errorType } = require('./ErrorHandler')

module.exports = {
  async parseBook(req, res, next) {
    try {
      const bookId = parseInt(req.params.id_book)

      if (isNaN(bookId)) {
        throw errorType('ParseInt error', 'id_book must be a number')
      }

      req.id_book = bookId
      const book = await Book.findByPk(bookId)

      if (!book) {
        throw errorType('BookNotFound', `Cannot find book with id ${bookId}`)
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
        quantity: req.body.quantity
      })
      res.status(200).send(book)
    } catch (err) {
      errorHandler(res, err, 'Cannot create book')
    }
  },
  async read (req, res) {
    try {
      const books = await Book.findAll()
      res.status(200).send(books)
    } catch (err) {
      errorHandler(res, err, 'Cannot fetch books')
    }
  },
  async update (req, res) {
    try {
      const data = {
        name_book: req.data.name_book,
        url: req.data.url,
        quantity: req.data.quantity
      }
      await Book.update(data, {
        where: {
          id_book: req.id_book
        }
      })
      req.book.
      res.status(204).send()
    } catch (err) {
      errorHandler(res, err, 'Cannot edit book details')
    }
  },
  async delete (req, res) {
    try {
      await Book.delete({
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