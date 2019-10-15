const mongoose = require('mongoose')
let reviewSchema = new mongoose.Schema({
   userID: { type: Schema.ObjectId, ref: 'users', required: true },
   restaurantID: { type: Schema.ObjectId, ref: 'restaurants', required: true },
   rating: { type: Number, required: true },
   text : { type: String, required: true }
})
let Review = mongoose.model('reviews', reviewSchema)
module.exports = Review