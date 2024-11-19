const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    address: {
        type: {
            building: String,
            coord: [Number, Number],
            street: String,
            zipcode: String
        }
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number
    }],
    name: {
        required: true,
        type: String
    }
});
module.exports = mongoose.model('Restaurant', restaurantSchema);