const express = require('express')
const router = express.Router()
const AuthController = require('./controllers/AuthController')
const AuthPolicies = require('./policies/AuthPolicies')

router
    .post('/register', AuthPolicies.register, AuthController.register)
    .post('/login', AuthController.login)


module.exports = router