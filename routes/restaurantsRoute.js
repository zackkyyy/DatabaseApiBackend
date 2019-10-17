
var express = require('express')
var router = express.Router();

let Restaurant = require('../models/Restaurant')
let User = require('../models/User')


function getOwnerName(id){
    var name ="";
    User.findById(id, (err , user)=>{
       name =  user.username
       return name
    })
}

router.route('/hey').get(function(req,res){
    console.log(getOwnerName(1))
})

router.route('/create').post(function (req, res) {

    let restaurant = new Restaurant();
    restaurant.name=req.body.name;
    restaurant.address=req.body.address;
    restaurant.description=req.body.description;
    var category =req.body.category;
    categories = category.replace(/\s/g, '');
    restaurant.tags = categories.split(',');


    User.findById(req.body.user_id, (err , user)=>{
        restaurant.ownerName =  user.username
     }).then(
        restaurant.save((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log('added')
              res.send(restaurant)
             
            }
          })
     )

})

router.route('/id/:restaurant_id').get(function (req, res) {
    let id2 = req.params.restaurant_id;
    console.log(req.params.restaurant_id)
    console.log(req.params.restaurant_id)
    Restaurant.findOne({id:id2}, function (err, restaurant) {
        console.log(restaurant);
        res.json(restaurant)
    })
})

router.route("/update").post(function (req, res) {
    console.log(req.body)
    let id = req.body.restaurant_id;
    console.log(id)
    Restaurant.findOne({id,id}, function (err, restaurant) {
        console.log("found a restaurant");
        restaurant.name=req.body.name;
        restaurant.description=req.body.description;
        restaurant.tags=(req.body.category).replace(/\s/g, '').split(",");
        restaurant.owner=req.body.user_id;
        console.log('herer')
        restaurant.save((err) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Updated Restaurant')
                res.json(restaurant)
            }
        })
    })
})




router.route('/name/:name').get(function(req , res){
    Restaurant.findOne({name: req.params.name}, function(err, restaurant){
        res.json(restaurant)
    })
})

router.route('/getAll').get(function(req , res){
    Restaurant.find({ }, function(err, restaurant){
        res.json(restaurant)
    })
})


router.route('/category/:tag').get(function(req , res){
    Restaurant.findOne({tags: req.params.tag }, function(err, restaurant){
        res.json(restaurant)
    })
})

router.route('/owner/:user_id').get(function(req ,res ){
    Restaurant.find({owner: req.params.user_id}, function(err , listOfRestaurants){
        res.json(listOfRestaurants)
    })
})

module.exports = router;