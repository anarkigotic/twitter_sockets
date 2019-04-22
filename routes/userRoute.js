'use strict'
var express = require('express');
var controllerUser = require('../controllers/usuarioController');
var api = express.Router();


api.post('/login',controllerUser.userFindUser);
api.post('/create',controllerUser.createUser);
api.post('/update',controllerUser.updateUser);

module.exports = api;