const express = require('express')
const router = express.Router()
const AuthController = require('./controllers/AuthController')
const AuthPolicy = require('./policies/AuthPolicies')

router
    .post('/register', AuthPolicy.register, AuthController.register)
    .post('/login', AuthController.login)


module.exports = router