'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;
var db = 'mongodb://localhost:27017/firefox-bot';

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


