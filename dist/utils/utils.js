"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookedTripsSchema = exports.createBookedTripsSchema = exports.updateTripsSchema = exports.createTripsSchema = exports.options = exports.updateAdminSchema = exports.generateToken = exports.imageLoginSchema = exports.loginSchema = exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerSchema = joi_1.default.object().keys({
    // title:Joi.string().lowercase().required(),
    // completed:Joi.boolean().required(),
    email: joi_1.default.string().lowercase().required(),
    password: joi_1.default.string().lowercase().required(),
    fullname: joi_1.default.string().lowercase().required(),
    phone: joi_1.default.string().lowercase().required(),
    image: joi_1.default.string().lowercase().required(),
    face_id: joi_1.default.string().lowercase().required(),
});
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
exports.imageLoginSchema = joi_1.default.object().keys({
    face_id: joi_1.default.string().required(),
});
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.updateAdminSchema = joi_1.default.object().keys({
    email: joi_1.default.string().lowercase(),
    password: joi_1.default.string(),
    fullname: joi_1.default.string(),
    phone: joi_1.default.string(),
    image: joi_1.default.string(),
    face_id: joi_1.default.string(),
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.createTripsSchema = joi_1.default.object().keys({
    from: joi_1.default.string().required(),
    destination: joi_1.default.string().required(),
    date: joi_1.default.string().required(),
    time: joi_1.default.string().required(),
    seatCount: joi_1.default.number().required(),
    price: joi_1.default.number().required(),
});
exports.updateTripsSchema = joi_1.default.object().keys({
    from: joi_1.default.string(),
    destination: joi_1.default.string(),
    date: joi_1.default.string(),
    time: joi_1.default.string(),
    seatCount: joi_1.default.number(),
    price: joi_1.default.number(),
});
exports.createBookedTripsSchema = joi_1.default.object().keys({
    tripId: joi_1.default.string().required(),
    passenger_name: joi_1.default.string().required(),
    passenger_email: joi_1.default.string().required(),
    passenger_phone: joi_1.default.string().required(),
    payment_status: joi_1.default.string().required(),
    booking_status: joi_1.default.string().required(),
    bookingCount: joi_1.default.number().required(),
    seat_number: joi_1.default.number().required()
});
exports.updateBookedTripsSchema = joi_1.default.object().keys({
    tripId: joi_1.default.string(),
    passenger_name: joi_1.default.string(),
    passenger_email: joi_1.default.string(),
    passenger_phone: joi_1.default.string(),
    payment_status: joi_1.default.string(),
    booking_status: joi_1.default.string(),
    seat_number: joi_1.default.number()
});
