
var express = require('express')
var router = express.Router();
let User = require('../models/User')
let Review = require('../models/Review')

router.route('/').get(function (req, res) {
    res.send('user route')
})

router.route('/deleteAll').get(function(req , res){
    User.deleteMany().then(
        res.send('deleted')
    )
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



router.route('/id/:user_id').get(function (req, res) {
    User.findOne({id:req.body.user_id}, function (err, user) {
        res.json(user)
  })
 
})

router.route('/logIn').post(function(req,res){
    let username = req.body.username
    let password = req.body.password

    User.findOne({username: username}, function(err , user){
        if(err){
            console.log('user is not exist')
        }
        else{

            if(!user.validPassword(password)){
                console.log("Wrong password")
            }else{
                req.session.user = username
                req.session.loggedin = true
                res.send("logged in by " + username )
            }
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
    User.find({}, function(err , listOfUsers){
        res.json(listOfUsers)
    })
})

router.route('/name/:name').get(function(req, res){
    User.findOne({username : req.params.name}, function(err ,user){
        console.log(req.params)
        res.json(user)
    })
})

router.route('/email/:email').get(function(req,res){
    User.findOne({email:req.params.email} , function(err , user){
        res.json(user)
    })
})


function getAllUserReview(id){
    Review.find({user_id : id }, function(req,listOfReviews){
        return listOfReviews
    })
}
router.route('/reviews/:id').get(function(req, res){
   res.json(getAllUserReview(id))
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