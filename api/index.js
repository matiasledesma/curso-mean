'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017/mean2', (err, res)=>{
    if(err){
        throw err;
    }else{
        console.log("DB connection status: OK");
        app.listen(port, function(){
            console.log("Server listen in port: "+port);
        })
    }
});