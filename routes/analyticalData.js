'use strict'
var express = require('express');
var analyticalDataController = require("../controllers/analyticalDataController");
var api = express.Router();

api.get('/analisis',analyticalDataController.analyticalData);
module.exports = api;