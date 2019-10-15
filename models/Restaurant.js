const mongoose = require('mongoose');

let restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    tags : { type: String },
    owner : { type: Number }
 });

let Restaurant = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurant;