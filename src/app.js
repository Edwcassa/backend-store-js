const express = require('express');
const cors = require('cors');
require('dotenv').config()

const authRoute = require('../routes/auth');

// settings
const app = express();

// casting
app.use(cors());
app.use(express.json());

// endopoints
app.use("/api/auth", authRoute);

module.exports = app