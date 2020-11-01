'use strict'

var express = require('express');
var SongController = require('../controlers/song');
var md_auth = require('../services/authenticated');
var api = express.Router();
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: './uploads/songs'});

//rutas
api.post('/song', md_auth.ensureAuth, SongController.saveSong);
api.get('/song/:id', md_auth.ensureAuth, SongController.getSong);
api.get('/songs/:album?', md_auth.ensureAuth, SongController.getSongs);
api.put('/song/:id', md_auth.ensureAuth, SongController.updateSong);
api.delete('/song/:id', md_auth.ensureAuth, SongController.deleteSong);
api.post('/upload-image-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadImage);
api.get('/get-image-song/:File', SongController.getFile);
api.get('/get-file-song/:File', SongController.getFile);
api.post('/upload-file-song/:id', [md_auth.ensureAuth, md_upload], SongController.uploadFile);

module.exports = api; 