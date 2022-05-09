const express = require('express')
const router = express.Router()
const AC = require('./controllers/AuthController')
const AP = require('./policies/AuthPolicies')
const VC = require('./controllers/VerifyController')
const BC = require('./controllers/BookController')

router
    .post('/register', AP.register, AC.register)
    .post('/login', AC.login)

router
    .get('/books', VC.jwtVerifyUser, BC.read)
    .post('/books', VC.jwtVerifyUser, VC.adminChecker, BC.create)
    .put('/books/:id_book', VC.jwtVerifyUser, VC.adminChecker, BC.parseBook, BC.update)
    .delete('/books/:id_book', VC.jwtVerifyUser, VC.adminChecker, BC.parseBook, BC.destroy)
module.exports = router