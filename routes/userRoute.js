
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




    router.route('/:user_id').get(function(req,res ){
     let id = req.params.user_id
     console.log(req.params.user_id)
     User.findById(id, function(err, user){
        res.json(user)
     })
  })


  router.route('/update').post(function(req, res){
    console.log(req.body)
    let id = req.body.user_id;
    console.log(id)
    User.findByIdAndUpdate(id , function(err , user){
            user.username = req.body.newUsername
            user.email =req.body.newEmail
            user.setPassword (req.body.newPassword)
            console.log('herer')
            user.save((err) =>{
                if(err){
                    console.log(err);}
                else{
                    console.log('here')
                    res.json(user)
                } 
            })
    })
  })


  "{\n\t\"user_id\": 1,\n\t\"username\": \"newUsername\",\n\t\"email\": \"newEmail\",\n\t\"password\": \"newPassword\",\n\t\"role\": 2\n}"
module.exports = router;