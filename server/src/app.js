const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const apiRouter = require('./api')
const { sequelize } = require('./database/models')
const config = require('./database/config/config')

const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/', apiRouter)

sequelize.sync()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  })

console.log("Hello")