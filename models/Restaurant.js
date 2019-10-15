const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

let restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    tags : { type: Array, required: true },
    owner : { type: Schema.Types.ObjectId, ref: 'users' }
 });

let Restaurant = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurant;