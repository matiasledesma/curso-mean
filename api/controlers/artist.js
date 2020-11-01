'use stritc'

var fs = require('fs');
var path = require('path');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res) {
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!artist) {
                res.status(404).send({ message: "no existe el artista" });
            } else {
                res.status(200).send({ artist });
            }
        }
    })
}

function getArtists(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }
    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {
        if (err) {
            res.status(500).send({ message: "error en la peticion" });
        } else {
            if (!artists) {
                res.status(404).send({ message: "no existen artistas" });
            } else {
                res.status(200).send({ total_items: total, artists: artists });
            }
        }
    })

}

function saveArtist(req, res) {
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el artista" })
        } else {
            if (!artistStored) {
                res.status(404).send({ message: "artista no guardado" })
            } else {
                res.status(200).send({ artist: artistStored })
            }
        }
    })
}

function updateArtist(req, res) {
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({ message: "error al guardar el artista" })
        } else {
            if (!artistUpdated) {
                res.status(404).send({ message: "artista no actualizado" })
            } else {
                res.status(200).send({ artist: artistUpdated })
            }
        }
    })
}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            res.status(500).send({ message: "error en la peticion" })
        } else {
            if (!artistRemoved) {
                res.status(404).send({ message: "artista no eliminado" })
            } else {
                Album.findById({ artist: artistRemoved._id }).remove((err, albumRemoved) => {
                    if (err) {
                        res.status(500).send({ message: "error en la peticion" })
                    } else {
                        if (!albumRemoved) {
                            res.status(404).send({ message: "album no eliminado" })
                        } else {
                            Song.findById({ album: albumRemoved._id }).remove((err, songRemoved) => {
                                if (err) {
                                    res.status(500).send({ message: "error en la peticion" })
                                } else {
                                    if (!songRemoved) {
                                        res.status(404).send({ message: "song no eliminado" })
                                    } else {
                                        res.status(200).send({ artist: artistRemoved })
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'no subido';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_path.split('\.');

        console.log(file_name);
        console.log(file_ext[1]);

        if (file_ext[1] == 'png' || file_ext[1] == 'jpg' || file_ext[1] == 'gif') {
            Artist.findByIdAndUpdate(artistId, { image: file_name }, (err, artistUpdate) => {
                if (err) {
                    res.status(500).send({ menssage: "no se pudo actualizar el artista" })
                } else {
                    if (!artistUpdate) {
                        res.status(404).send({ menssage: "no se pudo actualizar el artista" })
                    } else {
                        res.status(200).send({ artist: artistUpdate })
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
    var pathFile = './uploads/artists/'+ImageFile;
    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({ menssage: "No existe la imagen" })
        }   
    })
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}