
var express = require('express')
var router = express.Router();
let User = require('../models/Restuarants')

router.route('/').get(function (req, res) {
    res.send('Restaurants')
  })


module.exports = router;