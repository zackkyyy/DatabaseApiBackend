const mongoose = require('mongoose')
const Schema  = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

let reviewSchema = new mongoose.Schema({
   _id : Number,
   //userID: { type: Number, ref: 'users', required: true },
  // restaurantID: { type: Number, ref: 'restaurants', required: true },
   rating: { type: mongoose.Types.Decimal128, required: true },
   text : { type: String, required: true }
},{_id : false})
let Review = mongoose.model('reviews', reviewSchema)
module.exports = Review