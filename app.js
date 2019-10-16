const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const app = express()
const Mongoose =require( './DbHandlar/dbParser')
const userRoute = require("./routes/userRoute")
const reviewRoute = require("./routes/reviewRoute")
const dotenv = require('dotenv');
const session = require('express-session');

const restaurantsRoute = require("./routes/restaurantsRoute")
app.use(bodyParser.urlencoded({ extended: false }))

dotenv.config();
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


// cross Origin problem to access routes from any domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
let mongoose = new Mongoose()
mongoose.connect()

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'serversessionfortask25',
  secret: 'thisisasecret',
  saveUninitialized: false,   //created and not modified sessions
  resave: false,              //if the request has no changes on the session
  cookie: {
    secure : false,
    maxAge : 1000 * 60 * 60 * 1,
    httpOnly: true        //http only so the clinet script cannot mess with it
  }
  
}))

// flash messages for session
app.use(function (req, res, next) {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
       delete req.session.flash
    }
    if (req.session.loggedin) {
      res.locals.loggedin = req.session.loggedin  
    }
    next()
  })
  app.use(function (req, res, next) {
    res.locals.session = req.session
    next()
    })

app.get('/' , function( req , res){
    res.send("Main page")
})

app.use('/user',userRoute)
app.use('/review',reviewRoute)
app.use("/restaurant",restaurantsRoute)
app.listen(process.env.PORT )

