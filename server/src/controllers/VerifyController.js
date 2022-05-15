const jwt = require('jsonwebtoken')
const config = require('../database/config/config')
const { errorHandler, errorType } = require('./ErrorHandler')

module.exports = {
  jwtVerifyUser (req, res, next) {
    try {
    console.log(req.cookies.token)
    const token = req.cookies.token
    if (token) {
        const decoded = jwt.verify(token, config.authentication.jwtSecret)
        req.id_user = decoded.id_user
        req.profile = decoded.profile
        next()
      }
      if (!token) {
        throw errorType('NoToken','Token not found.')
      }
    } catch (err) {
      errorHandler(res, err, 'User verification error')
    }
  },
  adminChecker (req, res, next) {
    if (req.profile === 'admin') {
      next()
    } else {
      errorHandler(res, errorType('UnauthorizedAction', 'Insufficient authorization'), 'Forbidden')
    }
  }
}