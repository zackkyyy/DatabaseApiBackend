const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const app = express()
const Mongoose =require('./dbHandlar/dbParser.js')





let mongoose = new Mongoose()
mongoose.connect()

app.listen(process.env.PORT || 8080)

