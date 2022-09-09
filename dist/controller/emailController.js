"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// import dotenv from 'dotenv';
// dotenv.config();
async function sendMail(req, res) {
    const password = process.env.EMAIL_PASS;
    const { to, subject, text, html } = req.body;
    try {
        let transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: 'group10.deca@gmail.com',
                pass: password
            },
        });
        let mailOptions = {
            from: 'group10.deca@gmail.com',
            to,
            subject,
            text,
            html
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.status(400).json({
                    message: 'An error occured',
                    err
                });
            }
            else {
                console.log('Email sent:', info.response);
                res.status(200).json({
                    message: 'email sent successfully',
                    info
                });
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'failed to send mail',
            route: '/create'
        });
    }
}
exports.sendMail = sendMail;
