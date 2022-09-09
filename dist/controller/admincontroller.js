"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleAdmin = exports.getAdmin = exports.checkEmail = exports.deleteAdmin = exports.updateAdmin = exports.LoginAdmin = exports.ImageLoginAdmin = exports.RegisterAdmin = void 0;
const uuid_1 = require("uuid");
const admin_1 = require("../model/admin");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils/utils");
async function RegisterAdmin(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validationResult = utils_1.registerSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        if (await admin_1.AdminInstance.findOne({ where: { email: req.body.email } })) {
            return res.status(409).json({
                message: "Email already Exist"
            });
        }
        const record = await admin_1.AdminInstance.create({
            id: id,
            email: req.body.email,
            password: passwordHash,
            fullname: req.body.fullname,
            phone: req.body.phone,
            image: req.body.image,
            face_id: req.body.face_id,
        });
        return res.status(200).json({
            message: "registered successfully",
            record,
        });
    }
    catch (err) {
        console.log('@48', err);
        res.status(500).json({
            msg: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterAdmin = RegisterAdmin;
async function ImageLoginAdmin(req, res, next) {
    // const id = uuidv4();
    try {
        const validationResult = utils_1.imageLoginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const User = (await admin_1.AdminInstance.findOne({
            where: { face_id: req.body.face_id },
        }));
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        // const validUser = await bcrypt.compare(req.body.password, User.password);
        if (!User) {
            return res.status(401).json({
                message: "Email do not match",
            });
        }
        if (User) {
            return res.status(200).json({ message: "Login successful", token, User: { id: User.id, email: User.email, phone: User.phone, image: User.image, face_id: User.face_id, fullname: User.fullname, } });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.ImageLoginAdmin = ImageLoginAdmin;
async function LoginAdmin(req, res, next) {
    // const id = uuidv4();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const User = (await admin_1.AdminInstance.findOne({
            where: { email: req.body.email }
        }));
        if (!User) {
            return res.status(401).json({
                message: "Incorrect Email or password",
            });
        }
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validUser) {
            return res.status(401).json({
                message: "Incorrect Email or password",
            });
        }
        if (validUser) {
            return res.status(200).json({ message: "Login successful", token, User: { id: User.id, email: User.email, phone: User.phone, image: User.image, face_id: User.face_id, fullname: User.fullname, } });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "failed to login",
            route: "/login",
        });
    }
}
exports.LoginAdmin = LoginAdmin;
async function updateAdmin(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const { email, password, fullname, phone, image, face_id } = req.body;
        const validateUpdate = utils_1.updateAdminSchema.validate(req.body, utils_1.options);
        if (validateUpdate.error) {
            return res
                .status(400)
                .json({ Error: validateUpdate.error.details[0].message });
        }
        const record = await admin_1.AdminInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                Error: "Cannot find admin",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const updatedAdmin = await record.update({
            email,
            password: passwordHash,
            fullname,
            phone,
            image,
            face_id,
        });
        return res.status(200).json({
            message: "You have successfully updated admin",
            record: updatedAdmin,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "failed to update admin",
            route: "/update/:id",
        });
    }
}
exports.updateAdmin = updateAdmin;
async function deleteAdmin(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { id } = req.params;
        const record = await admin_1.AdminInstance.findOne({ where: { id } });
        if (!record) {
            return res.status(400).json({
                message: "cannot find user",
            });
        }
        const deletedRecord = await record.destroy();
        return res.status(200).json({
            message: "Admin deleted successfully",
            deletedRecord,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to delete admin",
            route: "/delete/:id",
        });
    }
}
exports.deleteAdmin = deleteAdmin;
async function checkEmail(req, res) {
    // res.json({ message: 'Hello User' });
    try {
        const { email } = req.params;
        const record = await admin_1.AdminInstance.findOne({ where: { email } });
        if (!record) {
            return res.status(400).json({
                message: "record not found",
            });
        }
        return res.status(200).json({
            message: "record found",
            // record,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to fetch data",
            route: "/email/:email",
        });
    }
}
exports.checkEmail = checkEmail;
async function getAdmin(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await admin_1.AdminInstance.findAndCountAll({
            limit,
            offset,
        });
        return res.status(200).json({
            msg: "You have successfully fetched all admins",
            count: record.count - 1,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read",
            route: "/allAdmins",
        });
    }
}
exports.getAdmin = getAdmin;
async function getSingleAdmin(req, res, next) {
    try {
        const { id } = req.params;
        //   const limit = req.query?.limit as number | undefined;
        //   const offset = req.query?.offset as number | undefined;
        //  const record = await TodoInstance.findAll({where: {},limit, offset})
        const record = await admin_1.AdminInstance.findOne({
            where: { id },
        });
        return res.status(200).json({
            msg: "You have successfully fetched this admin",
            record,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "failed to fetch this admin",
            route: "/singleAdmin",
        });
    }
}
exports.getSingleAdmin = getSingleAdmin;
