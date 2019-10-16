
var express = require('express')
var router = express.Router();
let User = require('../models/User')

router.route('/').get(function (req, res) {
    res.send('user route')
})


router.route('/create').post(function (req, res) {
    let user = new User()
    user.username = req.body.username 
    user.email = req.body.email
    user.role = req.body.role
    console.log(user)
    if (req.body.password.length < 6) {
        console.log("Password should be at least 6 letters")
        res.redirect('/signUp')
    } else {
        user.setPassword(req.body.password)
        user.save((err) => {
            if (err) {
                console.log('Username or email is already exist')
                  res.redirect('/create')
            } else {
                  res.redirect('/')
            }
        })
    }
})

router.route('/:user_id').get(function (req, res) {
    let id = req.params.user_id
    User.findById(id, function (err, user) {
        console.log('here')
        if(err){
            console.log(err)
        }else{
            res.json(user)

        }
    })
})


router.route('/update').post(function (req, res) {
    console.log(req.body)
    let id = req.body.user_id;
    console.log(id)
    User.findByIdAndUpdate(id, function (err, user) {
        user.username = req.body.newUsername
        user.email = req.body.newEmail
        user.setPassword(req.body.newPassword)
        console.log('herer')
        user.save((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('here')
                res.json(user)
            }
        })
    })
})

//extra routes in case needed for front end implementation
router.route('/getAll').get(function(req , res){
    User.find(function(err , listOfUsers){
        res.json(listOfUsers)
    })
})

router.route('/name/:name').get(function(req, rs){
    User.findOne({username : req.params.name}, function(req ,user){
        res.json(user)
    })
})

router.route('/email/:email').get(function(req,res){
    User.findOne({email:req.params.email} , function(err , user){
        res.json(user)
    })
})
// get latest added users 
// ******************************

// router.route('/latest').get(function(req,res){
//     //User.find().sort({'createdAt' :-1}).limit(2)
//     User.find({},{}, {sort :{
//         'createdAt' : -1
//     }} ,function(err , response){
//         console.log(response);
//        console.log('here')
//         res.json(response)
//     }).limit(3)
// })


module.exports = router;