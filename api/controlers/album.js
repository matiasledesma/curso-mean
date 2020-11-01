'use stritc'

var fs = require('fs');
var path = require('path');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res) {
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!album) {
                res.status(404).send({ message: "no existe el album" });
            } else {
                res.status(200).send({ album });
            }
        }
    })
}

function getAlbums(req, res) {
    var artistId = req.params.id;

    if(!artistId){
        var find = Album.find().sort('title');
    }else{
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path:'artist'}).exec((err, albums) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!albums) {
                res.status(404).send({ message: "no existen albums" });
            } else {
                res.status(200).send({ albums });
            }
        }
    })
}

function saveAlbum(req, res) {
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.image = 'null';
    album.artist = params.artist;
    album.year = params.year;

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el album" })
        } else {
            if (!albumStored) {
                res.status(404).send({ message: "album no guardado" })
            } else {
                res.status(200).send({ album: albumStored })
            }
        }
    })
}

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el album" })
        } else {
            if (!albumUpdated) {
                res.status(404).send({ message: "album no actualizado" })
            } else {
                res.status(200).send({ album: albumUpdated })
            }
        }
    })
}

function deleteAlbum(req, res) {
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" })
        } else {
            if (!albumRemoved) {
                res.status(404).send({ message: "album no eliminado" })
            } else {
                Song.findById({ album: albumRemoved._id }).remove((err, songRemoved) => {
                    if (err) {
                        res.status(500).send({ message: "error en la peticion2" })
                    } else {
                        if (!songRemoved) {
                            res.status(404).send({ message: "song no eliminado" })
                        } else {
                            res.status(200).send({ album: albumRemoved })
                        }
                    }
                })
            }
        }
    })
}

function uploadImage(req, res){
    var albumId = req.params.id;
    var file_name = 'no subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_path.split('\.');

        console.log(file_name);
        console.log(file_ext[1]);

        if (file_ext[1] == 'png' || file_ext[1] == 'jpg' || file_ext[1] == 'gif') {
            Album.findByIdAndUpdate(albumId, { image: file_name }, (err, albumUpdate) => {
                if (err) {
                    res.status(500).send({ menssage: "no se pudo actualizar el album" })
                } else {
                    if (!albumUpdate) {
                        res.status(404).send({ menssage: "no se pudo actualizar el album" })
                    } else {
                        res.status(200).send({ album: albumUpdate })
                    }
                }
            })
        } else {
            res.status(200).send({ menssage: "Extension no valida" })
        }
    } else {
        res.status(200).send({ menssage: "No se subio la imagen" })
    }

}

function getImageFile(req, res){
    var ImageFile = req.params.imageFile;
    var pathFile = './uploads/albums/'+ImageFile;
    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({ menssage: "No existe la imagen" })
        }   
    })
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}