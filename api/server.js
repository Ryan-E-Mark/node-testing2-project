const express = require('express')

const carRouter = require('./cars/cars-router.js')

const server = express()

server.use(express.json())

server.use('/api/cars', carRouter)

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        prodMessage: "OOPS Something is obviously wrong"
    })
})

module.exports = server