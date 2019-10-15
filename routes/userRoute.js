
var express = require('express')
var router = express.Router();
let User = require('../models/User')

router.route('/').get(function (req, res) {
    res.send('')
  })

  
router.route('/create').post(function (req, res) {
    let user = new User()
    user.username = 'Zacky ' //req.body.username
    user.email = "emailzzzz "//req.body.email
    user.role = "1" // req.body.role
    console.log(user)
    if ( 7< 6) {    /*req.body.password.length */
        console.log("invalid password")
      res.redirect('/signUp')
    } else {
      user.setPassword("pass")  //req.body.password
      user.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('added')
          res.redirect('/')
         
        }
        console.log('hhhere')
      })
      console.log('here')
    }
  })

module.exports = router;