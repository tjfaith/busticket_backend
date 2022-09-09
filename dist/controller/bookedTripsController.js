"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookedTrip = exports.updateBookedTrip = exports.getSingleBookedTrip = exports.getDateBookings = exports.getBookedTrips = exports.createBookedTrip = void 0;
const short_uuid_1 = __importDefault(require("short-uuid"));
const uuid_1 = require("uuid");
const availableTripsModel_1 = require("../model/availableTripsModel");
const bookedTripsModel_1 = require("../model/bookedTripsModel");
const utils_1 = require("../utils/utils");
async function createBookedTrip(req, res) {
    const translator = (0, short_uuid_1.default)();
    const id = translator.fromUUID((0, uuid_1.v4)());
    try {
        // const verified = req.trip;
        const validationResult = utils_1.createBookedTripsSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message });
        }
        const record = await bookedTripsModel_1.BookedTripsInstance.create({
            id,
            ...req.body,
        });
        const updatedTrip = await availableTripsModel_1.AvailableTripsInstance.update({ bookingCount: req.body.bookingCount }, { where: { id: req.body.tripId } });
        res.status(201).json({
            message: 'You have successfully created a Bookedtrip',
            record,
            updatedTrip
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create Bookedtrip',
            route: '/create'
        });
    }
}
exports.createBookedTrip = createBookedTrip;
async function getBookedTrips(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await bookedTripsModel_1.BookedTripsInstance.findAndCountAll({
            where: {}, limit,
            include: [
                {
                    model: availableTripsModel_1.AvailableTripsInstance,
                    as: 'available_trips',
                }
            ]
        });
        return res.status(200).json({
            message: 'Retrieved  Bookedtrip successfully',
            products: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        });
    }
}
exports.getBookedTrips = getBookedTrips;
async function getDateBookings(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await bookedTripsModel_1.BookedTripsInstance.findAndCountAll({
            where: {}, limit
        });
        return res.status(200).json({
            message: 'Retrieved  Bookedtrip successfully',
            products: rows
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        });
    }
}
exports.getDateBookings = getDateBookings;
async function getSingleBookedTrip(req, res) {
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const trip = await bookedTripsModel_1.BookedTripsInstance.findOne({
            where: { id },
            include: [
                {
                    model: availableTripsModel_1.AvailableTripsInstance,
                    as: 'available_trips',
                }
            ]
        });
        if (!trip)
            return res.status(404).json({ message: "Booking with given ID not found" });
        res.status(200).json({ message: 'successfully gotten single Bookedtrip', trip: trip });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        });
    }
}
exports.getSingleBookedTrip = getSingleBookedTrip;
async function updateBookedTrip(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { passenger_name, passenger_email, passenger_phone, payment_status, booking_status } = req.body;
        const validateUpdate = utils_1.updateBookedTripsSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await bookedTripsModel_1.BookedTripsInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find Bookedtrip",
            });
        }
        const updatedTrip = await record.update({
            passenger_name,
            passenger_email,
            passenger_phone,
            payment_status,
            booking_status
        });
        return res.status(200).json({
            message: 'You have successfully updated Bookedtrip',
            record: updatedTrip
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'failed to update Bookedtrip',
            route: '/update/:id'
        });
    }
}
exports.updateBookedTrip = updateBookedTrip;
//Delete single Booked trip
async function deleteBookedTrip(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await bookedTripsModel_1.BookedTripsInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: 'cannot find bookedtrip'
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Bookedtrip deleted successfully',
            deletedRecord
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to delete Bookedtrip',
            route: '/delete/:id'
        });
    }
}
exports.deleteBookedTrip = deleteBookedTrip;
