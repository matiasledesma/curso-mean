'use strict'

var express = require('express');
var UserController = require('../controlers/user');
var md_auth = require('../services/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/users'});


api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.put('/userupdate/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;