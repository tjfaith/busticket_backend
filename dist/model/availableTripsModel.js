"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableTripsInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const bookedTripsModel_1 = require("./bookedTripsModel");
class AvailableTripsInstance extends sequelize_1.Model {
}
exports.AvailableTripsInstance = AvailableTripsInstance;
AvailableTripsInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    from: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    seatCount: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
    bookingCount: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize: database_config_1.default,
    tableName: 'available_trips'
});
//Establishing the one to many relationship
AvailableTripsInstance.hasMany(bookedTripsModel_1.BookedTripsInstance, { foreignKey: 'tripId', as: 'booked_trips' });
bookedTripsModel_1.BookedTripsInstance.belongsTo(AvailableTripsInstance, { foreignKey: 'tripId', as: 'available_trips' });
