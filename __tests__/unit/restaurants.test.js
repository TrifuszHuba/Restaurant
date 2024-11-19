const RestaurantController = require("../../controllers/restaurant.controller");
const RestaurantModel = require("../../models/restaurant.model");
const httpMocks = require("node-mocks-http");
const newRestaurant = require("../mock-data/new-restaurant.json");

jest.mock("../../models/restaurant.model");
RestaurantModel.create = jest.fn();

let req, res, next;

restaurantId = "5eb3d668b31de5d588f4292a";
restaurant = {
  address: {
    type: {
      building: "123",
      coord: [40.7128, -74.006],
      street: "Main Street",
      zipcode: "10001",
    },
  },
  borough: "Manhattan",
  cuisine: "Italian",
  grades: [
    {
      date: "2024-11-19T00:00:00.000Z",
      grade: "A",
      score: 95,
    },
    {
      date: "2023-10-10T00:00:00.000Z",
      grade: "B",
      score: 85,
    },
  ],
  name: "Luigi's Italian Bistro",
  restaurant_id: "40356131",
};

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("RestaurantController.createRestaurant", () => {
  beforeEach(() => {
    req.body = newRestaurant;
  });
  it("should have a createRestaurant function", () => {
    expect(typeof RestaurantController.createRestaurant).toBe("function");
  });
  it("should call reastaurantModel.create", () => {
    RestaurantController.createRestaurant(req, res, next);
    expect(RestaurantModel.create).toHaveBeenCalledWith(newRestaurant);
  });
  it("should return 201 response code", () => {
    RestaurantController.createRestaurant(req, res, next);
    expect(res.statusCode).toBe(201);
  });
  it("should return json body in response", () => {
    RestaurantModel.create.mockReturnValue(newRestaurant);
    RestaurantController.createRestaurant(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });
});

describe("RestaurantController.getAllRestaurants", () => {
  it("should have a getAllRestaurants function", () => {
    expect(typeof RestaurantController.getRestaurantById).toBe("function");
  });
  it("should call restaurantModel.find", () => {
    RestaurantController.getAllRestaurants(req, res, next);
    expect(RestaurantModel.find).toHaveBeenCalled();
  });
  it("should return 200 response code and json body in response", async () => {
    const allRestaurants = [restaurant];
    RestaurantModel.find.mockResolvedValue(allRestaurants);

    await RestaurantController.getAllRestaurants(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(allRestaurants);
  });
  it("should call next with an error if RestaurantModel.find throws", async () => {
    const errorMessage = { message: "Database error" };
    RestaurantModel.find.mockRejectedValue(errorMessage);

    await RestaurantController.getAllRestaurants(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("RestaurantController.getRestaurantById", () => {
  it("should have a getRestaurantById function", () => {
    expect(typeof RestaurantController.getRestaurantById).toBe("function");
  });

  it("should call RestaurantModel.findById", async () => {
    RestaurantModel.findById = jest.fn().mockResolvedValue(restaurant); // Mock findById
    req.params.id = restaurantId;

    await RestaurantController.getRestaurantById(req, res, next);

    expect(RestaurantModel.findById).toHaveBeenCalledWith(restaurantId);
  });

  it("should return json body and 200 response code", async () => {
    RestaurantModel.findById = jest.fn().mockResolvedValue(restaurant);
    req.params.id = restaurantId;

    await RestaurantController.getRestaurantById(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(restaurant);
  });

  it("should handle errors in getRestaurantById", async () => {
    const errorMessage = { message: "Error finding restaurant" };
    RestaurantModel.findById = jest.fn().mockRejectedValue(errorMessage);
    req.params.id = restaurantId;

    await RestaurantController.getRestaurantById(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
