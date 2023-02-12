const express = require("express");
const cors = require('cors');
require('dotenv').config()

// settings
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

module.exports = app