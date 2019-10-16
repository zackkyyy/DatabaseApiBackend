const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const app = express()
const Mongoose =require('./dbHandlar/dbParser.js')
const userRoute = require("./routes/userRoute")
const reviewRoute = require("./routes/reviewRoute")
const dotenv = require('dotenv');

const restaurantsRoute = require("./routes/restaurantsRoute")
app.use(bodyParser.urlencoded({ extended: false }))

dotenv.config();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


let mongoose = new Mongoose()
mongoose.connect()

app.get('/' , function( req , res){
    res.send("Main page")
})

app.use('/user',userRoute)
app.use('/review',reviewRoute)
app.use("/restaurant",restaurantsRoute)
app.listen(process.env.PORT )

