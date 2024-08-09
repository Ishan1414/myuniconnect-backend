import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import bodyParser from 'body-parser';

import UserRoutes from "./Users/routes.js";


const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/myuniconnect';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
UserRoutes(app);
app.listen(4000);