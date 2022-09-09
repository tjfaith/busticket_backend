import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'
import { BookedTripsInstance } from './bookedTripsModel';

interface AvailableTripsAttributes {
    id: string;
    from: string,
    destination: string,
    date: string,
    time: string,
    seatCount: number,
    bookingCount: number,
    price: number
}

export class AvailableTripsInstance extends Model<AvailableTripsAttributes>{ }

AvailableTripsInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    from: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seatCount: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    bookingCount: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'available_trips'
})

//Establishing the one to many relationship
AvailableTripsInstance.hasMany(BookedTripsInstance, { foreignKey: 'tripId', as: 'booked_trips' });
BookedTripsInstance.belongsTo(AvailableTripsInstance, { foreignKey: 'tripId', as: 'available_trips' });