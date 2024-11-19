const RestaurantModel = require('../models/restaurant.model');

exports.createRestaurant = (req, res, next) => {
    const restaurant = RestaurantModel.create(req.body);
    res.status(201).json(restaurant);
}