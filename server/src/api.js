const express = require('express')
const router = express.Router()
const AC = require('./controllers/AuthController')
const AP = require('./policies/AuthPolicies')
const VC = require('./controllers/VerifyController')
const BC = require('./controllers/BookController')
const CC = require('./controllers/CartController')

router
  .post('/register', AP.register, AC.register)
  .post('/login', AC.login)
  .post('/logout', AC.logout)

router
  .get('/books', VC.jwtVerifyUser, BC.read)
  .post('/books', VC.jwtVerifyUser, VC.adminChecker, BC.create)
  .put('/books/:id_book',
    VC.jwtVerifyUser,
    VC.adminChecker,
    BC.parseBook,
    BC.update
  )
  .delete('/books/:id_book',
    VC.jwtVerifyUser,
    VC.adminChecker,
    BC.parseBook,
    BC.destroy
  )

router
  .get('/carts', VC.jwtVerifyUser, CC.read)
  .get('/carts/all', VC.jwtVerifyUser, VC.adminChecker, CC.readAll)
  .put('/carts', VC.jwtVerifyUser, CC.getPendingCart, CC.create)
  .post('/carts/books/:id_book',
    VC.jwtVerifyUser,
    CC.getPendingCart,
    BC.parseBook,
    CC.changeCartItem
  )
  .put('/carts/validate',
    VC.jwtVerifyUser,
    CC.getPendingCart,
    CC.updateStatus
  )
  .put('/carts/:id_cart',
    VC.jwtVerifyUser,
    VC.adminChecker,
    CC.parseCart,
    CC.updateCartStatus
  )
  .delete('/carts',
    VC.jwtVerifyUser,
    CC.getPendingCart,
    CC.deleteCart
  )
  .delete('/carts/books/:id_book',
    VC.jwtVerifyUser,
    CC.getPendingCart,
    BC.parseBook,
    CC.deleteCartItem
  )
module.exports = router