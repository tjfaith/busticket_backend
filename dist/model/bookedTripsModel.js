"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookedTripsInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class BookedTripsInstance extends sequelize_1.Model {
}
exports.BookedTripsInstance = BookedTripsInstance;
BookedTripsInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    passenger_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    passenger_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    passenger_phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    payment_status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    booking_status: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    seat_number: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    tripId: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: database_config_1.default,
    tableName: 'booked_trips'
});
