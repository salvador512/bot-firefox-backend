'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//routes-files
var userRoutes = require('./users/users.routes');

//middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
// CORS configurar cabeceras http
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //cambiar * por urls permitidas
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
 
    next();	
});

//routes
app.use('/api',userRoutes);
//exports
module.exports = app;