import express from "express";
import { createBookedTrip, deleteBookedTrip, getBookedTrips, getSingleBookedTrip, updateBookedTrip } from "../controller/bookedTripsController";

const router = express.Router()

// ADD A NEW Trip
router.post('/create', createBookedTrip);

/* GET all trips*/
router.get('/read', getBookedTrips);

//Get single trip
router.get('/read/:id', getSingleBookedTrip)

//Update the trip
// router.patch('/update/:id', auth, updateTrip)
router.patch('/update/:id', updateBookedTrip)

//Delete 
// router.delete('/delete/:id', auth, deleteTrip);
router.delete('/delete/:id', deleteBookedTrip);

export default router