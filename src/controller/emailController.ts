import express from 'express';
import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';

// dotenv.config();

export async function sendMail(req: express.Request | any, res: express.Response) {
    const password = process.env.EMAIL_PASS as string
    const { to, subject, text, html } = req.body;
    try {
        let transporter = nodemailer.createTransport({
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
                })
            } else {
                console.log('Email sent:', info.response)
                res.status(200).json({
                    message: 'email sent successfully',
                    info
                })
            }
        })

    } catch (err) {
        res.status(500).json({
            message: 'failed to send mail',
            route: '/create'
        })
    }
}