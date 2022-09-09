"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrip = exports.updateTrip = exports.getSingleTrip = exports.getDayTrips = exports.getTrips = exports.createAvailableTrip = void 0;
const short_uuid_1 = __importDefault(require("short-uuid"));
const uuid_1 = require("uuid");
const availableTripsModel_1 = require("../model/availableTripsModel");
const bookedTripsModel_1 = require("../model/bookedTripsModel");
const utils_1 = require("../utils/utils");
async function createAvailableTrip(req, res) {
    const translator = (0, short_uuid_1.default)();
    const id = translator.fromUUID((0, uuid_1.v4)());
    console.log("@tripController 11:=");
    try {
        console.log("@tripController 14:=");
        const validationResult = utils_1.createTripsSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const record = await availableTripsModel_1.AvailableTripsInstance.create({
            id,
            ...req.body,
        });
        return res.status(201).json({
            message: "You have successfully created a trip",
            record,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed to create trip",
            route: "/create",
        });
    }
}
exports.createAvailableTrip = createAvailableTrip;
async function getTrips(req, res) {
    try {
        const limit = req.query?.limit;
        const { count, rows } = await availableTripsModel_1.AvailableTripsInstance.findAndCountAll({
            where: {},
            limit,
            order: [["createdAT", "DESC"]],
        });
        return res.status(200).json({
            message: "Retrieved trip successfully",
            trips: rows,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed to retrieve trip",
            route: "/read ",
        });
    }
}
exports.getTrips = getTrips;
async function getDayTrips(req, res) {
    try {
        const { from, destination, date } = req.body;
        const limit = req.query?.limit;
        const { count, rows } = await availableTripsModel_1.AvailableTripsInstance.findAndCountAll({
            where: { from, destination, date },
            limit,
            order: [["createdAT", "DESC"]],
        });
        return res.status(200).json({
            message: "Retrieved required trips successfully",
            trips: rows,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to retrieve trip",
            route: "/read ",
        });
    }
}
exports.getDayTrips = getDayTrips;
async function getSingleTrip(req, res) {
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const trip = await availableTripsModel_1.AvailableTripsInstance.findOne({
            where: { id },
            include: [
                {
                    // includes the user that has the product
                    model: bookedTripsModel_1.BookedTripsInstance,
                    attributes: [
                        "id",
                        "passenger_name",
                        "passenger_email",
                        "passenger_phone",
                    ],
                    as: "booked_trips",
                },
            ],
        });
        if (!trip)
            return res.status(404).json({ message: "trip with given ID not found" });
        return res
            .status(200)
            .json({ message: "successfully gotten single trip", trip: trip });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to retrieve trip",
            route: "/read ",
        });
    }
}
exports.getSingleTrip = getSingleTrip;
async function updateTrip(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { from, destination, date, seatCount, price } = req.body;
        const validateUpdate = utils_1.updateTripsSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res
                .status(400)
                .json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await availableTripsModel_1.AvailableTripsInstance.findOne({
            where: { id },
            order: [["createdAT", "DESC"]],
        });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find todo",
            });
        }
        const updatedTrip = await record.update({
            from,
            destination,
            date,
            seatCount,
            price,
        });
        return res.status(200).json({
            message: "You have successfully updated trip",
            record: updatedTrip,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "failed to update trip",
            route: "/update/:id",
        });
    }
}
exports.updateTrip = updateTrip;
//Delete single Product
async function deleteTrip(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await availableTripsModel_1.AvailableTripsInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: "cannot find trip",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: "Trip deleted successfully",
            deletedRecord,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to delete trip",
            route: "/delete/:id",
        });
    }
}
exports.deleteTrip = deleteTrip;
