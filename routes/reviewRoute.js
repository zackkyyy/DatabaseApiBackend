var express = require('express')
var router = express.Router();
let Review = require('../models/Review')
let User = require('../models/User')
let Restaurant = require('../models/Restaurant')

router.route('/').get(function (req, res) {
    res.send('review router')
})


router.route('/create').post(function(req,res){
    let review = new Review()
    review.userID = req.body.user_id 
    review.restaurantID = req.body.restaurant_id
    review.rating = req.body.rating
    review.text = req.body.reviewText

    Restaurant.findOne({id : req.body.restaurant_id} , function (err, restaurant){
    review.restaurantName = restaurant.name
    })

    User.findById(req.body.user_id , function (err, user){
        review.reviewe= user.username
    })

    review.save((err)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("review added succesfully")
            res.send("review added succesfully")
        }
    })
})
router.route('/latest').get(function(req,res){
    Review.find({},{}, {sort :{
        'createdAt' : -1
    }} ,function(err , response){
        res.json(response)
    }).limit(5)
    console.log("here")
})


router.route('/review/restaurant/:restaurant_id').get(function(req,res){
    let id = req.params.restaurant_id
    Review.find({restaurantID: id},function(err, list){
        res.json(list)
    })
})
  

router.route('/update').post(function (req, res) {
    console.log(req.body)
    let id = req.body.review_id;
    Review.findByIdAndUpdate(id, function (err, review) {
        review.userID = req.body.user_id
        review.restaurantID = req.body.restaurant_id
        review.rating = req.body.rating
        review.text = req.body.reviewText
        review.save((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('here')
                res.json(review)
            }
        })
    })
})

module.exports = router;