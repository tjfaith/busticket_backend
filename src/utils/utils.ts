import Joi from "joi";
import jwt from "jsonwebtoken";
export const registerSchema = Joi.object().keys({
    // title:Joi.string().lowercase().required(),
    // completed:Joi.boolean().required(),
    email: Joi.string().lowercase().required(),
    password: Joi.string().lowercase().required(),
    fullname: Joi.string().lowercase().required(),
    phone: Joi.string().lowercase().required(),
    image: Joi.string().lowercase().required(),
    face_id: Joi.string().lowercase().required(),
});

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});

export const imageLoginSchema = Joi.object().keys({
    face_id: Joi.string().required(), 
});

export const generateToken = (user: { [key: string]: unknown }): unknown => {
    const pass = process.env.JWT_SECRET as string;
    return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const updateAdminSchema = Joi.object().keys({
    email: Joi.string().lowercase(),
    password: Joi.string(),
    fullname: Joi.string(),
    phone: Joi.string(),
    image: Joi.string(),
    face_id: Joi.string(),
});

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};

export const createTripsSchema = Joi.object().keys({
    from: Joi.string().required(),
    destination: Joi.string().required(),
    date: Joi.string().required(),
    time: Joi.string().required(),
    seatCount: Joi.number().required(),
    price: Joi.number().required(),
})

export const updateTripsSchema = Joi.object().keys({
    from: Joi.string(),
    destination: Joi.string(),
    date: Joi.string(),
    time: Joi.string(),
    seatCount: Joi.number(),
    price: Joi.number(),
})


export const createBookedTripsSchema = Joi.object().keys({
    tripId: Joi.string().required(),
    passenger_name: Joi.string().required(),
    passenger_email: Joi.string().required(),
    passenger_phone: Joi.string().required(),
    payment_status: Joi.string().required(),
    booking_status: Joi.string().required(),
    bookingCount: Joi.number().required(),
    seat_number: Joi.number().required()
});

export const updateBookedTripsSchema = Joi.object().keys({
    tripId: Joi.string(),
    passenger_name: Joi.string(),
    passenger_email: Joi.string(),
    passenger_phone: Joi.string(),
    payment_status: Joi.string(),
    booking_status: Joi.string(),
    seat_number: Joi.number()
});
