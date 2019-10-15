const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const app = express()
const Mongoose =require('./dbHandlar/dbParser.js')
const userRoute = require("./routes/userRoute")


app.use(express.static(path.join(__dirname, 'public')))


let mongoose = new Mongoose()
mongoose.connect()


app.use('/user',userRoute)

app.listen(process.env.PORT || 8080)

