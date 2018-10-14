'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var config = require('./config')
var port = config.port;
var db = config.db;

mongoose.Promise = global.Promise;
mongoose.connect(db)
	.then(function() {
		console.log("conexion a la base de datos exitosa");

		//start server
		app.listen(port, function() {
			console.log("Servidor Iniciado");
		})
	})
	.catch(function(err) {
		console.log(err);
	});


