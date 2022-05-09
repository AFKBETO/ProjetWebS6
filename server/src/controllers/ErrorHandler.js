/*
this function embeds error status into the error message
*/

module.exports = {
  errorHandler(res, err, message) {
    const error = {
      status: 400,
      message: err.message
    }
    switch (err.name) {
      case 'SequelizeUniqueConstraintError':
        error.message = 'Duplicated creation.'
        break    
      case 'TokenExpiredError':
        error.status = 401
        error.message = 'Your session has expired.'
        break
      case 'InvalidRole':
      case 'UnauthorizedAction':
      case 'WrongLogin':
        error.status = 403
        break
      case 'UserNotFound':
        error.status = 404
        break
      case 'JsonWebTokenError':
        error.status = 500
        break
      default:
        break
    }
    res.status(error.status).send({
      error: `${message}: ${error.message}`
    })
  },
  errorType(errorName, errorMessage) {
    const e = new Error(errorMessage)
    e.name = errorName
    return e
  }
}