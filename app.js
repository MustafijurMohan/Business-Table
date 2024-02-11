
const express = require('express')
const cors = require('cors')
const router = require('./src/routes/api')
const app = new express()


app.use(express.urlencoded({extends: true}))
app.use(express.json())
app.use(cors())

// Database Connection
require('./src/config/database')


// Router Configaration
app.use('/api/v1', router)


module.exports = app









