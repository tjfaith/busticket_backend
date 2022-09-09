"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tripController_1 = require("../controller/tripController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// ADD A NEW Trip
router.post('/create', auth_1.verifyToken, tripController_1.createAvailableTrip);
/* GET all trips*/
router.get('/read', tripController_1.getTrips);
/* GET all trips for particular day*/
router.post('/read-day', tripController_1.getDayTrips);
//Get single trip
router.get('/read/:id', tripController_1.getSingleTrip);
//Update the trip
// router.patch('/update/:id', auth, updateTrip)
router.patch('/update/:id', auth_1.verifyToken, tripController_1.updateTrip);
//Delete 
// router.delete('/delete/:id', auth, deleteTrip);
router.delete('/delete/:id', auth_1.verifyToken, tripController_1.deleteTrip);
exports.default = router;
