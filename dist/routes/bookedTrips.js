"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookedTripsController_1 = require("../controller/bookedTripsController");
const router = express_1.default.Router();
// ADD A NEW Trip
router.post('/create', bookedTripsController_1.createBookedTrip);
/* GET all trips*/
router.get('/read', bookedTripsController_1.getBookedTrips);
//Get single trip
router.get('/read/:id', bookedTripsController_1.getSingleBookedTrip);
//Update the trip
// router.patch('/update/:id', auth, updateTrip)
router.patch('/update/:id', bookedTripsController_1.updateBookedTrip);
//Delete 
// router.delete('/delete/:id', auth, deleteTrip);
router.delete('/delete/:id', bookedTripsController_1.deleteBookedTrip);
exports.default = router;
