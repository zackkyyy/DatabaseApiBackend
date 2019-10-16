
var express = require('express')
var router = express.Router();

let Restaurant = require('../models/Restaurant')

router.route('/create').post(function (req, res) {
    //res.send('Restaurants')
    //console.log(req);
    let restaurant = new Restaurant();
    restaurant.name=req.body.name;
    restaurant.address=req.body.address;
    restaurant.description=req.body.description;
    restaurant.tags=req.body.tags;
    restaurant.owner=req.body.owner;

    restaurant.save((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('added')
          res.redirect('/')
         
        }
      });
    console.log(restaurant);
  })


module.exports = router;