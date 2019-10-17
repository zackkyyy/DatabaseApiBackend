var express = require('express')
var router = express.Router();
let reviewsCollection = require('../models/Review')
let User = require('../models/User')
let Restaurant = require('../models/Restaurant')

router.route('/').get(function (req, res) {
    res.send('review router')
})


router.route('/create').post(function(req,res){
    let review = new reviewsCollection()
    review.userID = req.body.user_id 
    review.restaurantID = req.body.restaurant_id
    review.rating = req.body.rating
    review.text = req.body.reviewText
    
    User.findById(req.body.user_id, (err, user) => {
        if (err || !user) {
            console.log('this user id is not exist')
        } else {
            review.reviewer = user.username
        }
    }).then(
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
    reviewsCollection.find({},{}, {sort :{
        'createdAt' : -1
    }} ,function(err , response){
        res.json(response)
    }).limit(5)
    console.log("here")
})


router.route('/review/restaurant/:restaurant_id').get(function(req,res){
    let id = req.params.restaurant_id
    reviewsCollection.find({restaurantID: id},function(err, list){
        res.json(list)
    })
})
  

router.route('/deleteAll').get(function(req , res){
    reviewsCollection.deleteMany().then(
        res.send('deleted')
    )
})

router.route('/update').post(function (req, res) {
    console.log(req.body)
    let id = req.body.review_id;
    reviewsCollection.findByIdAndUpdate(id, function (err, review) {
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