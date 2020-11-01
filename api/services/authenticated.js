'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = '42823337';

exports.ensureAuth = function (req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: "la peticion no tiene la cabezera"});
    }
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: "Token expirado"});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: "Token no valido"});
    }

    req.user = payload;

    next();
};