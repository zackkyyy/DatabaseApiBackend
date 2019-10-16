const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let restaurantSchema = new mongoose.Schema({
    id : {type:Number  , unique :true},
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    tags : { type: Array, required: true },
    owner : { type: Number, ref: 'users' }
 },{timestamps:true});

 restaurantSchema.plugin(AutoIncrement, {inc_field: 'id'});
let Restaurant = mongoose.model('restaurants', restaurantSchema);
module.exports = Restaurant;