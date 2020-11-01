'use stritc'

var fs = require('fs');
var path = require('path');
var Song = require('../models/song');

function getSong(req, res) {
    var songId = req.params.id;

    Song.findById(songId).populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!song) {
                res.status(404).send({ message: "no existe el song" });
            } else {
                res.status(200).send({ song });
            }
        }
    })
}
function getSongs(req, res) {
    var albumId = req.params.album;

    if (!albumId) {
        var find = Song.find().sort('number')
    } else {
        var find = Song.find({ album: albumId }).sort('number')
    }

    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec((err, songs) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!songs) {
                res.status(404).send({ message: "no existen el songs" });
            } else {
                res.status(200).send({ songs });
            }
        }
    })
}

function saveSong(req, res) {
    var song = new Song();

    var params = req.body;
    song.title = params.title;
    song.number = params.number;
    song.file = 'null';
    song.image = 'null';
    song.album = params.album;
    song.duration = params.duration;

    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el song" })
        } else {
            if (!songStored) {
                res.status(404).send({ message: "song no guardado" })
            } else {
                res.status(200).send({ song: songStored })
            }
        }
    })
}

function updateSong(req, res) {
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el song" })
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: "song no actualizado" })
            } else {
                res.status(200).send({ song: songUpdated })
            }
        }
    })
}

function deleteSong(req, res){
    songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songDeleted) =>{
        if (err) {
            res.status(500).send({ message: "error en la peticion" })
        } else {
            if (!songDeleted) {
                res.status(404).send({ message: "song no eliminado" })
            } else {
                res.status(200).send({ song: songDeleted })
            }
        }
    })
}

function uploadImage(req, res){
    var songId = req.params.id;
    var file_name = 'no subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_path.split('\.');

        console.log(file_name);
        console.log(file_ext[1]);

        if (file_ext[1] == 'png' || file_ext[1] == 'jpg' || file_ext[1] == 'gif') {
            Song.findByIdAndUpdate(songId, { image: file_name }, (err, songUpdate) => {
                if (err) {
                    res.status(500).send({ menssage: "eroor en el servidor" })
                } else {
                    if (!songUpdate) {
                        res.status(404).send({ menssage: "no se pudo actualizar el song" })
                    } else {
                        res.status(200).send({ song: songUpdate })
                    }
                }
            })
        } else {
            res.status(200).send({ menssage: "Extension no valida" })
        }
    } else {
        res.status(200).send({ menssage: "No se subio la song" })
    }

}

function uploadFile(req, res){
    var songId = req.params.id;
    var file_name = 'no subido';

    if (req.files) {
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_path.split('\.');

        console.log(file_name);
        console.log(file_ext[1]);

        if (file_ext[1] == 'mp3' || file_ext[1] == 'wav' || file_ext[1] == 'mp4') {
            Song.findByIdAndUpdate(songId, { file: file_name }, (err, songUpdate) => {
                if (err) {
                    res.status(500).send({ menssage: "eroor en el servidor" })
                } else {
                    if (!songUpdate) {
                        res.status(404).send({ menssage: "no se pudo actualizar el song" })
                    } else {
                        res.status(200).send({ song: songUpdate })
                    }
                }
            })
        } else {
            res.status(200).send({ menssage: "Extension no valida" })
        }
    } else {
        res.status(200).send({ menssage: "No se subio la song" })
    }

}

function getFile(req, res){
    var File = req.params.File;
    var pathFile = './uploads/songs/'+File;
    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({ menssage: "No existe el archivo" })
        }   
    })
}

module.exports = {
    saveSong,
    getSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadImage,
    getFile,
    uploadFile
}