import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
interface AdminAttributes {
  id: string;
  email: string;
  password: string;
  fullname: string;
  phone: string;
  image: string;
  face_id: string;
}

export class AdminInstance extends Model<AdminAttributes> {}

AdminInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    face_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "admin",
  }
);
