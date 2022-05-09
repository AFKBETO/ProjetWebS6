const { Book } = require('../../src/database/models')

const books = [
  {
    name_book: '1984',
    url: 'https://images-na.ssl-images-amazon.com/images/I/81StSOpmkjL.jpg',
    quantity_book: 4
  },
  {
    name_book: 'Das Kapital',
    url: 'https://images-na.ssl-images-amazon.com/images/I/71yUG55s-CL.jpg',
    quantity_book: 2
  },
  {
    name_book: 'Happycratie',
    url: 'https://sp-ao.shortpixel.ai/client/to_webp,q_lossless,ret_img/https://catalog.2seasagency.com/wp-content/uploads/2018/04/HAPPYCRACY-e1534861029896-200x267.jpg',
    quantity_book: 6
  },
  {
    name_book: 'The Wealth of Nations',
    url: 'https://m.media-amazon.com/images/I/51zz0eUJNHL.jpg',
    quantity_book: 9
  },
  {
    name_book: 'Harry Potter',
    url: 'http://prodimage.images-bn.com/pimages/9780545139700_p0_v5_s1200x630.jpg',
    quantity_book: 7
  }
]

for (let book of books) {
  Book.create(book)
}

module.exports = books