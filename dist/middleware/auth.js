"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../model/admin");
// verify token
async function verifyToken(req, res, next) {
    try {
        const bearerHeader = req["headers"]["authorization"];
        if (!bearerHeader) {
            return res.status(404).json({ Error: "Admin  not verified" });
        }
        // const token = bearerHeader?.slice(7, bearerHeader.length) as string;
        const token = bearerHeader?.split(' ')[1];
        let verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(403).json({ Error: "Unauthorized user" });
        }
        const { id } = verified;
        const admin = await admin_1.AdminInstance.findOne({ where: { id } });
        if (!admin) {
            return res.status(403).json({ Error: "Author not verified" });
        }
        req.adminId = id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ Error: "An error courred" });
    }
}
exports.verifyToken = verifyToken;
