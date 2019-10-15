
var express = require('express')
var router = express.Router();
let User = require('../models/User')

router.route('/').get(function (req, res) {
    res.send('logIn')
  })


module.exports = router;