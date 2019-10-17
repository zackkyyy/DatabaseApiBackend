var express = require('express')
var router = express.Router();
let Review = require('../models/Review')
let User = require('../models/User')
let Restaurant = require('../models/Restaurant')

router.route('/').get(function (req, res) {
    res.send('review router')
})

function getname(id){
    var restaurantName;
 Restaurant.findOne({id : req.body.restaurant_id} , function (err, restaurant){
    restaurantName = restaurant.name
    })
    return restaurantName;
}
router.route('/create').post(function(req,res){
    let review = new Review()
    review.userID = req.body.user_id 
    review.restaurantID = req.body.restaurant_id
    review.rating = req.body.rating
    review.text = req.body.reviewText
    
    User.findById(req.body.user_id , function (err, user){
    console.log(user.username)
     review.reviewer= user.username
    }).then(
    Restaurant.findOne({id : req.body.restaurant_id} , function (err, restaurant){
        console.log(restaurant.name)
     review.restaurantName = restaurant.name
        })
    ).then(
        review.save((err)=>{
            if (err) {
                console.log(err)
            } else {
                console.log("review added succesfully")
                res.send(review)
            }
        })
    )

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