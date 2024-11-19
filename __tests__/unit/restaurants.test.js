const RestaurantController = require('../../controllers/restaurant.controller');
const RestaurantModel = require('../../models/restaurant.model');
const httpMocks = require('node-mocks-http')
const newRestaurant = require('../mock-data/new-restaurant.json')

RestaurantModel.create = jest.fn();

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = null;
});

describe('RestaurantController.createRestaurant', () => {
    beforeEach(() => {
        req.body = newRestaurant;
    });
    it('should have a createRestaurant function', () => {
        expect(typeof RestaurantController.createRestaurant).toBe('function');
    });
    it('should call reastaurantModel.create', () => {
        RestaurantController.createRestaurant(req, res, next)
        expect(RestaurantModel.create).toHaveBeenCalledWith(newRestaurant);
    });
    it('should return 201 response code', () => {
        RestaurantController.createRestaurant(req, res, next);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    });
    it('should return json body in response', () => {
        RestaurantModel.create.mockReturnValue(newRestaurant);
        RestaurantController.createRestaurant(req, res, next);
        expect(res._getJSONData()).toStrictEqual(newRestaurant);
    });
});