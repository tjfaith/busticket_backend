"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminInstance = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class AdminInstance extends sequelize_1.Model {
}
exports.AdminInstance = AdminInstance;
AdminInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    face_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_config_1.default,
    tableName: "admin",
});
