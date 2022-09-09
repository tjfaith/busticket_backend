"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const admincontroller_1 = require("../controller/admincontroller");
const auth_1 = require("../middleware/auth");
router.post("/register", admincontroller_1.RegisterAdmin);
router.post("/login", admincontroller_1.LoginAdmin);
router.post("/imageLogin", admincontroller_1.ImageLoginAdmin);
router.patch("/update/:id", auth_1.verifyToken, admincontroller_1.updateAdmin);
router.get("/checkemail/:email", admincontroller_1.checkEmail);
router.delete("/delete/:id", auth_1.verifyToken, admincontroller_1.deleteAdmin);
router.get("/allAdmins", admincontroller_1.getAdmin);
router.get("/singleAdmin/:id", auth_1.verifyToken, admincontroller_1.getSingleAdmin);
exports.default = router;
