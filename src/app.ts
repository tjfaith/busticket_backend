import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from 'cors';

const app = express();
app.use(cors())

import tripsRouter from './routes/trips';
import bookedTripsRouter from './routes/bookedTrips';
import mailRouter from './routes/email'
import adminRouter from "./routes/admin";
import db from "./config/database.config";
db.sync().then(() => {
  console.log("connected successfully, on port:");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/trips', tripsRouter);
app.use('/api/bookedtrips', bookedTripsRouter);
app.use('/api/mail', mailRouter);
app.use("/api/admin", adminRouter);
//app.use("/users", usersRouter);

export default app;
