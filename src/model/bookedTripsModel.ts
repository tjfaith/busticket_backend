import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config'

interface BookedTripsAttributes {
    id: string,
    passenger_name: string;
    passenger_email: string,
    passenger_phone: string,
    payment_status: string,
    booking_status: string,
    seat_number: number,
    tripId: string
}

export class BookedTripsInstance extends Model<BookedTripsAttributes>{ }

BookedTripsInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    passenger_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passenger_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passenger_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    payment_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    booking_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    seat_number: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    tripId: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    tableName: 'booked_trips'
})