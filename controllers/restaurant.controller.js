const RestaurantModel = require("../models/restaurant.model");

exports.createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

exports.getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};

exports.getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await RestaurantModel.findById(req.params.id); // Await the find
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error); // Pass errors to the error-handling middleware
  }
};
