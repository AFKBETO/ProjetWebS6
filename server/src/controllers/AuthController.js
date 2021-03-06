const { User } = require('../database/models')
const jwt = require('jsonwebtoken')
const config = require('../database/config/config')
const bcrypt = require('bcrypt')
const { errorHandler, errorType } = require('./ErrorHandler')

function jwtSignUser(user) {
  const ONE_HOUR = 60 * 60
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_HOUR
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profile: 'student'
      })
      res.status(200).send({
        message: 'Your registration is successful.'
      })
    }
    catch (err) {
      errorHandler(res, err, 'Error')
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        throw errorType('WrongLogin', 'Email and/or password incorrect.')
      }
      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid) {
        throw errorType('WrongLogin', 'Email and/or password incorrect.')
      }
      const userdata = {
        id_user: user.id_user,
        profile: user.profile
      }
      const token = jwtSignUser(userdata)
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
      }).status(200).send({
        username: user.username,
        profile: user.profile
      })
    }
    catch (err) {
      errorHandler(res, err, 'Invalid login information')
    }
  },
  async logout (req, res) {
    res.clearCookie('token').status(200).send()
  }
}