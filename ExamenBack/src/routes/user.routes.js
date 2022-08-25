'use strict'

const userController = require('../controllers/user.controller');
const mdAuth = require('../middlewares/authenticated');
const express = require('express');
const api = express.Router();

api.get('/test', userController.test);
api.post('/register', userController.register);
api.post('/login', userController.login);

module.exports = api;