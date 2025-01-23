const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParkser = require("cookie-parser")

const testRouter = require("../routes/testRouter");

const logger = require('./logger');

logger.info("Route Startup");

module.exports = (app) => {
    app.use(express.json());
    app.use(cookieParkser());

    app.use(
        cors({
            credentials: true,
            origin: '*'
        })
    )

    app.get("/test", testRouter);

}