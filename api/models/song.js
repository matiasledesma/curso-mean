'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = Schema({
    number: String,
    duration: String,
    file: String,
    title: String,
    image: String,
    album: {type: Schema.Types.ObjectId, ref: 'Album'}
});

module.exports = mongoose.model('Song', SongSchema);