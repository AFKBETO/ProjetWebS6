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