import express from "express";
import { createAvailableTrip, deleteTrip, getDayTrips, getSingleTrip, getTrips, updateTrip } from "../controller/tripController";
import { verifyToken } from "../middleware/auth";

const router = express.Router()

// ADD A NEW Trip
router.post('/create', verifyToken, createAvailableTrip);

/* GET all trips*/
router.get('/read', getTrips);

/* GET all trips for particular day*/
router.post('/read-day', getDayTrips);

//Get single trip
router.get('/read/:id', getSingleTrip)

//Update the trip
// router.patch('/update/:id', auth, updateTrip)
router.patch('/update/:id', verifyToken, updateTrip)

//Delete 
// router.delete('/delete/:id', auth, deleteTrip);
router.delete('/delete/:id', verifyToken, deleteTrip);



export default router