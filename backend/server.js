const authRoutes = require("");

const express = require("express");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5013;

//middleware here

app.use("api/auth", authRoutes);
app.use("api/booking", bookingRoutes);
