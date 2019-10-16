const mongoose = require('mongoose')

let reviewSchema = new mongoose.Schema({
   userID: { type: Number, ref: 'users', required: true },
   restaurantID: { type: Number, ref: 'restaurants', required: true },
   rating: { type: mongoose.Types.Decimal128, required: true },
   text : { type: String, required: true }
},{timestamps:true})
let Review = mongoose.model('reviews', reviewSchema)
module.exports = Review