import express from "express";
import short from'short-uuid';
import { v4 as uuid4 } from 'uuid';
import { AvailableTripsInstance } from "../model/availableTripsModel";
import { BookedTripsInstance } from "../model/bookedTripsModel";
import { createBookedTripsSchema, options, updateBookedTripsSchema } from "../utils/utils";

export async function createBookedTrip(req: express.Request | any, res: express.Response) {
    const translator = short();
    const id = translator.fromUUID(uuid4());

    try {
        // const verified = req.trip;
        const validationResult = createBookedTripsSchema.validate(req.body, options)
        if (validationResult.error) {
            return res.status(400).json({ Error: validationResult.error.details[0].message })
        }
        const record = await BookedTripsInstance.create({
            id,
            ...req.body, 
        })
        
        const updatedTrip = await AvailableTripsInstance.update(
            { bookingCount: req.body.bookingCount }, 
            { where: { id: req.body.tripId } })

        
        res.status(201).json({
            message: 'You have successfully created a Bookedtrip',
            record,
            updatedTrip
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'failed to create Bookedtrip',
            route: '/create'
        })
    }
}

export async function getBookedTrips(req: express.Request, res: express.Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await BookedTripsInstance.findAndCountAll({
            where: {}, limit,
            include:[
                {
                    model: AvailableTripsInstance,
                    as: 'available_trips', 
                }
            ] 
        });

        return res.status(200).json({
            message: 'Retrieved  Bookedtrip successfully',
            products: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        })
    }
}

export async function getDateBookings(req: express.Request, res: express.Response) {
    try {
        const limit = req.query?.limit as number | undefined
        const { count, rows } = await BookedTripsInstance.findAndCountAll({
            where: {}, limit
        });

        return res.status(200).json({
            message: 'Retrieved  Bookedtrip successfully',
            products: rows
        })
    } catch (err) {
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        })
    }
}

export async function getSingleBookedTrip(req: express.Request, res: express.Response) {
    try {
        //const id = req.params.id; OR
        const { id } = req.params;
        const trip = await BookedTripsInstance.findOne({
            where: { id },
            include:[
                {
                    model: AvailableTripsInstance,
                    as: 'available_trips', 
                }
            ] 
        })
        if (!trip) return res.status(404).json({ message: "Booking with given ID not found" })
        res.status(200).json({ message: 'successfully gotten single Bookedtrip', trip: trip })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'failed to retrieve Bookedtrip',
            route: '/read '
        })
    }
}

export async function updateBookedTrip(req: express.Request, res: express.Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;

        const {
            passenger_name,
            passenger_email,
            passenger_phone,
            payment_status,
            booking_status
        } = req.body;

        const validateUpdate = updateBookedTripsSchema.validate(req.body, options)

        if (validateUpdate.error) {
            return res.status(400).json({ Error: validateUpdate.error.details[0].message })
        }

        const record = await BookedTripsInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find Bookedtrip",
            })
        }
        const updatedTrip = await record.update({
            passenger_name,
            passenger_email,
            passenger_phone,
            payment_status,
            booking_status
        })
        return res.status(200).json({
            message: 'You have successfully updated Bookedtrip',
            record: updatedTrip
        })

    } catch (err) {
        return res.status(500).json({
            message: 'failed to update Bookedtrip',
            route: '/update/:id'
        })
    }
}

//Delete single Booked trip
export async function deleteBookedTrip(req: express.Request, res: express.Response) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await BookedTripsInstance.findOne({ where: { id } })
        if (!record) {
            return res.status(400).json({
                message: 'cannot find bookedtrip'
            })
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: 'Bookedtrip deleted successfully',
            deletedRecord
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to delete Bookedtrip',
            route: '/delete/:id'
        })
    }
}
