import express from "express";
import short from "short-uuid";
import { v4 as uuid4 } from "uuid";
import { AvailableTripsInstance } from "../model/availableTripsModel";
import { BookedTripsInstance } from "../model/bookedTripsModel";
import { createTripsSchema, options, updateTripsSchema } from "../utils/utils";

export async function createAvailableTrip(
  req: express.Request | any,
  res: express.Response
) {
  const translator = short();
  const id = translator.fromUUID(uuid4());
  console.log("@tripController 11:=");

  try {
    console.log("@tripController 14:=");
    const validationResult = createTripsSchema.validate(req.body, options);
    if (validationResult.error) {
      return res
        .status(400)
        .json({ Error: validationResult.error.details[0].message });
    }
    const record = await AvailableTripsInstance.create({
      id,
      ...req.body,
    });
    return res.status(201).json({
      message: "You have successfully created a trip",
      record,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to create trip",
      route: "/create",
    });
  }
}

export async function getTrips(req: express.Request, res: express.Response) {
  try {
    const limit = req.query?.limit as number | undefined;
    const { count, rows } = await AvailableTripsInstance.findAndCountAll({
      where: {},
      limit,
      order: [["createdAT", "DESC"]],
    });

    return res.status(200).json({
      message: "Retrieved trip successfully",
      trips: rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "failed to retrieve trip",
      route: "/read ",
    });
  }
}

export async function getDayTrips(req: express.Request, res: express.Response) {
  try {
    const { from, destination, date } = req.body;
    const limit = req.query?.limit as number | undefined;
    const { count, rows } = await AvailableTripsInstance.findAndCountAll({
      where: { from, destination, date },
      limit,
      order: [["createdAT", "DESC"]],
    });

    return res.status(200).json({
      message: "Retrieved required trips successfully",
      trips: rows,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to retrieve trip",
      route: "/read ",
    });
  }
}

export async function getSingleTrip(
  req: express.Request,
  res: express.Response
) {
  try {
    //const id = req.params.id; OR
    const { id } = req.params;
    const trip = await AvailableTripsInstance.findOne({
      where: { id },
      include: [
        {
          // includes the user that has the product
          model: BookedTripsInstance,
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
  } catch (err) {
    res.status(500).json({
      message: "failed to retrieve trip",
      route: "/read ",
    });
  }
}

export async function updateTrip(req: express.Request, res: express.Response) {
  // res.json({ message: 'Hello User' });
  try {
    const { id } = req.params;

    const { from, destination, date, seatCount, price } = req.body;

    const validateUpdate = updateTripsSchema.validate(req.body, options);

    if (validateUpdate.error) {
      return res
        .status(400)
        .json({ Error: validateUpdate.error.details[0].message });
    }

    const record = await AvailableTripsInstance.findOne({
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
  } catch (err) {
    return res.status(500).json({
      message: "failed to update trip",
      route: "/update/:id",
    });
  }
}

//Delete single Product
export async function deleteTrip(req: express.Request, res: express.Response) {
  // res.json({ message: 'Hello User' });

  try {
    const { id } = req.params;
    const record = await AvailableTripsInstance.findOne({ where: { id } });
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
  } catch (err) {
    res.status(500).json({
      message: "failed to delete trip",
      route: "/delete/:id",
    });
  }
}
