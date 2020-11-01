'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');
const user = require('../models/user');

function pruebas(req, res) {
    res.status(200).send({
        menssage: "probando controlador"
    });
}
function saveUser(req, res) {

    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER',
        user.image = 'null';

    if (params.password) {
        //encriptar password y guardar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                //guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send("Error al guardar el usuario");
                    } else {
                        if (!userStored) {
                            res.status(404).send("No se registro en usuario");
                        } else {
                            res.status(200).send({ user: userStored });
                        }

                    }
                });
            } else {
                res.status(200).send("Introducir todos los campos")
            }
        });
    }
    else {
        res.status(200).send("Enter password!")
    }
}

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ menssage: "error en la peticion" });
        } else {
            if (!user) {
                res.status(404).send({ menssage: "el usuario no existe" });
            } else {
                //comprobar password

                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            //token jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ menssage: "el usuario no a podido logearse" });
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

        if(userId != req.user.sub){
            res.status(500).send({ menssage: "No tiene permiso para actualizar este usuario" })
        }

    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ menssage: "no se pudo actualizar el usuario" })
        } else {
            if (!userUpdate) {
                res.status(404).send({ menssage: "no se pudo actualizar el usuario" })
            } else {
                res.status(200).send({ user: userUpdate })
            }
        }
    });
};

function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'no subido..';

    if (req.files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var file_ext = file_path.split('\.');

        console.log(file_name);
        console.log(file_ext[1]);

        if (file_ext[1] == 'png' || file_ext[1] == 'jpg' || file_ext[1] == 'gif') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdate) => {
                if (err) {
                    res.status(500).send({ menssage: "no se pudo actualizar el usuario" })
                } else {
                    if (!userUpdate) {
                        res.status(404).send({ menssage: "no se pudo actualizar el usuario" })
                    } else {
                        res.status(200).send({image: file_name, user: userUpdate })
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
    var pathFile = './uploads/users/'+ImageFile;
    fs.exists(pathFile, function(exists){
        if(exists){
            res.sendFile(path.resolve(pathFile));
        }else{
            res.status(200).send({ menssage: "No existe la imagen" })
        }   
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
};