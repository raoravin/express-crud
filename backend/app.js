const express = require("express");
const connectToDB = require("./config/db");
const app = express();

connectToDB();

module.exports = app;
